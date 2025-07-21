import { useTranslations } from "next-intl";
import Image from "next/image";

const Hero = () => {
  const t = useTranslations("HeroText");
  return (
    <section className="mt-[95px]">
      <Image
        alt="Hero img"
        width={1440}
        height={1114}
        priority
        src={"/images/hero-img.png"}
      />
      <div className="w-full py-[21px] items-center flex justify-center shadow-[0_12px_24px_rgba(0,0,0,0.3)] bg-[#009398]">
        <h2 className="font-bold text-[50px] text-white">{t("text")}</h2>
      </div>
    </section>
  );
};

export default Hero;
