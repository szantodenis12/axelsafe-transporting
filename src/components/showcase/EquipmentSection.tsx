import { factL } from "@/content/facts";
import { Reveal } from "@/components/ui/Reveal";
import { Ph } from "@/components/ui/Ph";
import type { Dictionary } from "@/content/copy/en";
import { TrailerExplorer } from "./TrailerExplorer";

const KEYS = ["curtainsider", "refrigerated", "mega"] as const;

/** "Equipment at a glance" — explorer of the three confirmed trailer types with typical specs. */
export function EquipmentSection({ t, locale }: { t: Dictionary["showcase"]["equipment"]; locale: string }) {
  const types = factL("transportTypes", locale).map((x, i) => ({ key: KEYS[i], title: x.title, text: x.text }));

  return (
    <section className="section-y relative overflow-hidden">
      <div aria-hidden className="watermark pointer-events-none absolute -right-[4vw] top-[6%] text-[clamp(8rem,22vw,22rem)]" data-speed="-0.12" data-speed-x="0.05">
        13.6
      </div>
      <div className="wrap relative">
        <div className="grid-12 items-end gap-y-6">
          <Reveal className="col-span-12 lg:col-span-7" data-speed="0.05">
            <h2 className="t-h2">{t.title}</h2>
          </Reveal>
          <p className="t-lead col-span-12 lg:col-span-4 lg:col-start-9" data-speed="0.025">{t.text}</p>
        </div>
        <Ph k="equipmentSpecs" as="div" className="m-block mt-12 block md:mt-14">
          <TrailerExplorer types={types} specs={factL("equipmentSpecs", locale)} t={t} />
        </Ph>
      </div>
    </section>
  );
}
