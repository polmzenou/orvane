import { getTranslations } from "next-intl/server";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { RevealText, Reveal } from "@/components/ui/Reveal";
import { img } from "@/lib/images";

export async function CtaBand() {
  const t = await getTranslations("home");
  return (
    <section className="relative">
      <ParallaxImage src={img("lake", 2000)} alt="" className="h-[80vh] min-h-[520px] w-full" strength={18} overlay={false} />
      <div className="absolute inset-0 bg-ink/65" />
      <div className="absolute inset-0 flex items-center">
        <div className="container-luxe text-center">
          <Reveal y={16}>
            <p className="eyebrow mb-6">{t("ctaEyebrow")}</p>
          </Reveal>
          <RevealText text={t("ctaTitle")} className="display mx-auto max-w-4xl text-5xl text-ivory md:text-8xl" />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-xl text-ivory/70 md:text-lg">{t("ctaText")}</p>
            <div className="mt-12 flex justify-center">
              <ButtonLink href="/contact">
                {t("ctaButton")} <Arrow />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
