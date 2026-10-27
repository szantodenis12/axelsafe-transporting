import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { ParallaxLayer } from "@/components/ui/Parallax";
import { MobileEyebrow } from "@/components/ui/MobileEyebrow";

export function CarrierBand({
  t,
  cta,
}: {
  t: { eyebrow: string; title: string; paragraphs: readonly string[] };
  cta: { href: string; label: string };
}) {
  return (
    <section className="relative isolate flex min-h-[100svh] items-start overflow-hidden max-md:min-h-0">
      <ParallaxLayer className="-z-20" feather="both" amount={16} zoom={0.07}>
        <Image
          src="/media/viaduct-dawn.jpg"
          alt="A single articulated truck crossing a motorway viaduct above a misty alpine valley at blue hour."
          fill
          quality={80}
          sizes="100vw"
          className="object-cover object-[50%_60%]"
        />
      </ParallaxLayer>
      <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.25)_12%,rgba(0,0,0,0.7)_24%,#000_36%,#000_66%,rgba(0,0,0,0.6)_82%,transparent_100%)] bg-[linear-gradient(180deg,rgba(6,11,22,0.6)_0%,rgba(6,11,22,0.4)_22%,rgba(6,11,22,0.1)_48%,rgba(6,11,22,0)_70%,rgba(6,11,22,0.3)_100%)]" />
      <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.25)_12%,rgba(0,0,0,0.7)_24%,#000_36%,#000_66%,rgba(0,0,0,0.6)_82%,transparent_100%)] bg-[linear-gradient(90deg,rgba(6,11,22,0.7)_0%,rgba(6,11,22,0)_55%)]" />

      <div className="wrap grid-12 w-full gap-y-8 pt-[clamp(120px,14vw,200px)] pb-[45svh] max-md:pb-[20svh] max-md:pt-[var(--m-sec)]">
        <Reveal className="col-span-12 lg:col-span-7" data-speed="0.14">
          <MobileEyebrow>{t.eyebrow}</MobileEyebrow>
          <h2 className="t-h2 max-w-[16ch]">{t.title}</h2>
        </Reveal>
        <Reveal className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:pt-12" delay={140} data-speed="0.07">
          <div className="space-y-4">
            {t.paragraphs.map((p) => (
              <p key={p} className="t-body !text-ink/85">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8">
            <Pill href={cta.href} arrow="diag">
              {cta.label}
            </Pill>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
