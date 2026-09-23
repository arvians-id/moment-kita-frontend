import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/shared/container";
import {
  getPublicInvitationBySlug,
  getPublicInvitationSlugs,
} from "@/services/public/invitation-service";

interface InvitationPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPublicInvitationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: InvitationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await getPublicInvitationBySlug(slug);

  return {
    title: invitation
      ? `${invitation.couple.partnerOne} & ${invitation.couple.partnerTwo}`
      : "Invitation",
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

export default async function PublicInvitationPage({
  params,
}: InvitationPageProps) {
  const { slug } = await params;
  const invitation = await getPublicInvitationBySlug(slug);

  if (!invitation) notFound();

  return (
    <main className="flex min-h-screen items-center bg-secondary/50 py-20 text-center">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.25em] text-accent-foreground uppercase">
          The wedding of
        </p>
        <h1 className="mt-5 font-serif text-5xl tracking-tight sm:text-7xl">
          {invitation.couple.partnerOne}{" "}
          <span className="text-accent-foreground">&</span>{" "}
          {invitation.couple.partnerTwo}
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
          {invitation.message}
        </p>
        <p className="mt-8 text-sm text-muted-foreground">
          Public renderer foundation · {invitation.template.rendererKey}
        </p>
      </Container>
    </main>
  );
}
