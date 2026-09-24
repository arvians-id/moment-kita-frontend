import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PackageEditorView } from "@/components/admin/packages/package-editor-view";
import {
  getAdminPackageEditorData,
  getAdminPackageIds,
} from "@/services/admin/package-service";

export const dynamicParams = false;

export async function generateStaticParams() {
  const ids = await getAdminPackageIds();
  return ids.map((id) => ({ id }));
}

interface AdminEditPackagePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: AdminEditPackagePageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await getAdminPackageEditorData(id);

  return {
    title: data?.package ? `Edit ${data.package.name}` : "Package",
    description: data?.package
      ? `Commercial configuration for ${data.package.name}.`
      : "Admin package editor.",
  };
}

export default async function AdminEditPackagePage({
  params,
}: AdminEditPackagePageProps) {
  const { id } = await params;
  const data = await getAdminPackageEditorData(id);
  if (!data) notFound();

  return <PackageEditorView mode="edit" data={data} />;
}
