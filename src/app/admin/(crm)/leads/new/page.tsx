import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { adminStore } from "@/lib/admin/data";
import { ManualLeadForm } from "@/components/admin/ManualLeadForm";
import { BackLink, PageHeader, Skeleton, StoreBanner } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Lead nou" };

export default function NewLeadPage() {
  return (
    <Suspense fallback={<Skeleton rows={6} />}>
      <NewLead />
    </Suspense>
  );
}

async function NewLead() {
  const { repo, status } = await adminStore();
  return (
    <div className="mx-auto w-full max-w-[820px]">
      <div className="mb-5">
        <BackLink href="/admin/leads">
          <ArrowLeft size={14} strokeWidth={1.6} aria-hidden /> Toate cererile
        </BackLink>
      </div>
      <PageHeader title="Lead nou" eyebrow="CRM" meta="Cereri venite pe telefon, e-mail, WhatsApp, bursă sau prin recomandare." />
      {repo ? <ManualLeadForm /> : <StoreBanner status={status} />}
    </div>
  );
}
