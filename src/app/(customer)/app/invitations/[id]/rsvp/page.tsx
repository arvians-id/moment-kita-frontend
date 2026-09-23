import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RsvpManagement } from "@/components/customer/rsvp-management/rsvp-management";
import { getRsvpManagement } from "@/services/customer/rsvp-management-service";

export const metadata: Metadata = { title: "RSVP Management" };

/** RSVP records will be request-scoped through the Customer BFF later. */
export default async function RsvpManagementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getRsvpManagement(id);

  if (!data) notFound();

  return <RsvpManagement initialData={data} />;
}
