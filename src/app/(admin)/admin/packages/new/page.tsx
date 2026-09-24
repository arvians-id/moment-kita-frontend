import type { Metadata } from "next";

import { PackageEditorView } from "@/components/admin/packages/package-editor-view";
import { getAdminPackageCreatorData } from "@/services/admin/package-service";

export const metadata: Metadata = {
  title: "Create Package",
  description: "Configure a new commercial digital invitation package.",
};

export default async function AdminCreatePackagePage() {
  const data = await getAdminPackageCreatorData();

  return <PackageEditorView mode="create" data={data} />;
}
