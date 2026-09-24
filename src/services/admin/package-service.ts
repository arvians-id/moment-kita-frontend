import { mockAdminMetrics } from "@/data/mocks/admin";
import {
  mockAdminCustomerDetails,
  mockAdminCustomers,
} from "@/data/mocks/admin-customers";
import { findPackage, listPackages } from "@/data/mocks/admin-packages-store";
import { getAdminTemplateList } from "@/services/admin/template-service";
import { getAdminTransactionList } from "@/services/admin/transaction-service";
import type {
  AdminCustomerQuotaRow,
  AdminPackageEditorData,
  AdminPackageEditorTemplateOption,
  AdminPackageListItem,
  AdminPackageQuotaSummary,
  AdminPackagesQuotaData,
  AdminQuotaLedgerEntry,
} from "@/types";

/**
 * Packages & Quota registry.
 *
 * Package identity, pricing, quota, and duration stay owned by the shared
 * `Package` records (the same ones Create Invitation and Template Detail's
 * Commercial Settings already read) — this only adds operational
 * projections on top. Quota rows and ledger history read the same Customer
 * registry Customer Detail already owns, and the headline totals reuse the
 * Dashboard's existing KPI values rather than recomputing a second global
 * total from this page's own (representative-sample) customer array.
 */

async function buildPackages(): Promise<AdminPackageListItem[]> {
  const { templates } = await getAdminTemplateList();

  return listPackages().map((pkg) => ({
    ...pkg,
    templateAccessCount: templates.filter((template) =>
      template.packageAccess.includes(pkg.name),
    ).length,
    activeCustomerCount: mockAdminCustomers.filter(
      (customer) =>
        mockAdminCustomerDetails.get(customer.id)?.currentPackage?.name ===
        pkg.name,
    ).length,
  }));
}

function buildCustomerRows(): AdminCustomerQuotaRow[] {
  return mockAdminCustomers.map((customer) => {
    const history = mockAdminCustomerDetails.get(customer.id)?.quotaHistory ?? [];
    const lastActivityAt = history.length
      ? history.reduce(
          (latest, entry) =>
            new Date(entry.createdAt) > new Date(latest) ? entry.createdAt : latest,
          history[0].createdAt,
        )
      : null;

    return { customer: { ...customer }, lastActivityAt };
  });
}

async function buildHistory(): Promise<AdminQuotaLedgerEntry[]> {
  const { transactions } = await getAdminTransactionList();

  const entries = Array.from(mockAdminCustomerDetails.entries()).flatMap(
    ([customerId, detail]) => {
      const customer = {
        id: detail.customer.id,
        name: detail.customer.name,
        accountType: detail.customer.accountType,
      };
      const firstInvitation = detail.invitations[0] ?? null;

      return detail.quotaHistory.map((entry): AdminQuotaLedgerEntry => {
        const isPurchaseSource =
          entry.source === "Package purchase" ||
          entry.source === "Additional quota purchase";
        const relatedTransaction = isPurchaseSource
          ? (transactions.find(
              (transaction) =>
                transaction.customer.id === customerId &&
                (transaction.purpose === "package" ||
                  transaction.purpose === "quotaAddon"),
            ) ?? null)
          : null;

        return {
          ...entry,
          customer,
          relatedTransactionId: relatedTransaction?.id ?? null,
          relatedInvitationId:
            entry.source === "Invitation" && firstInvitation
              ? firstInvitation.id
              : null,
        };
      });
    },
  );

  return entries.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

function buildSummary(packages: AdminPackageListItem[]): AdminPackageQuotaSummary {
  const totalQuotaSold = mockAdminMetrics.totalQuotaSold.value;
  const quotaUsed = mockAdminMetrics.quotaUsed.value;

  return {
    activePackages: packages.filter((pkg) => pkg.active).length,
    totalQuotaSold,
    quotaUsed,
    remainingCustomerQuota: Math.max(0, totalQuotaSold - quotaUsed),
    customersWithNoQuota: mockAdminCustomers.filter(
      (customer) => customer.quotaRemaining === 0,
    ).length,
  };
}

export async function getAdminPackageIds(): Promise<string[]> {
  return listPackages().map((pkg) => pkg.id);
}

export async function getAdminPackagesQuota(): Promise<AdminPackagesQuotaData> {
  const [packages, history] = await Promise.all([buildPackages(), buildHistory()]);
  const customers = buildCustomerRows();
  const summary = buildSummary(packages);

  return { packages, summary, customers, history };
}

/*
 * Package Editor. Reads and writes go through the same in-memory package
 * store `getAdminPackagesQuota` reads — there is no second package model.
 * Template access is expressed as the package's own `templateAccessMode` /
 * `selectedTemplateKeys`, which Template List/Detail already derive
 * `packageAccess` from, so a save here is visible on both surfaces on
 * their next read.
 */

async function getTemplateOptions(): Promise<AdminPackageEditorTemplateOption[]> {
  const { templates } = await getAdminTemplateList();
  return templates.map((template) => ({
    key: template.key,
    name: template.name,
    thumbnailUrl: template.imageUrl,
    category: template.styleLabel,
    enabled: template.enabled,
  }));
}

/** For the Create Package route — never null. */
export async function getAdminPackageCreatorData(): Promise<AdminPackageEditorData> {
  return { package: null, templates: await getTemplateOptions() };
}

/** For the Edit Package route — null when the package id does not resolve. */
export async function getAdminPackageEditorData(
  packageId: string,
): Promise<AdminPackageEditorData | null> {
  const pkg = findPackage(packageId);
  if (!pkg) return null;

  return { package: pkg, templates: await getTemplateOptions() };
}
