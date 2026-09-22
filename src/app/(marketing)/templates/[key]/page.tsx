import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/marketing/page-intro";
import {
  getTemplateByKey,
  getTemplates,
} from "@/services/public/template-service";

interface TemplatePageProps {
  params: Promise<{ key: string }>;
}

export async function generateStaticParams() {
  const templates = await getTemplates();
  return templates.map((template) => ({ key: template.key }));
}

export async function generateMetadata({
  params,
}: TemplatePageProps): Promise<Metadata> {
  const { key } = await params;
  const template = await getTemplateByKey(key);

  if (!template) return {};

  return {
    title: `${template.name} Template`,
    description: template.description,
  };
}

export default async function TemplatePreviewPage({
  params,
}: TemplatePageProps) {
  const { key } = await params;
  const template = await getTemplateByKey(key);

  if (!template) notFound();

  return (
    <PageIntro
      eyebrow={`Template preview · ${template.rendererKey}`}
      title={template.name}
      description={`${template.description} The final renderer and interactive preview are intentionally deferred to FE-1.`}
    >
      <ul className="grid max-w-2xl gap-3 sm:grid-cols-3">
        {template.features.map((feature) => (
          <li key={feature} className="rounded-xl border bg-card p-4 text-sm">
            {feature}
          </li>
        ))}
      </ul>
    </PageIntro>
  );
}
