import { TruckSvg } from "@/public/icons";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ClientValue = () => {
  const t = useTranslations("ClientValue");
  return (
    <div className="mt-[89px] flex flex-col items-center">
      <div className="flex items-center w-full justify-center py-[20px] px-[240px] bg-[#00939817]">
        <h2 className="font-bold text-[50px] text-[#009398]">{t("heading")}</h2>
      </div>

      <div className="flex items-center justify-between px-[120px] py-[90px]">
        <div className="flex items-center gap-[18px]">
          <Image
            className="w-[108px] h-[105px]"
            width={108}
            height={105}
            priority
            alt="Experience img"
            src={"/images/experience.png"}
          />
          <div className="w-[220px]">
            <h2 className="font-bold text-[40px] leading-[45px]">
              {t("header1")}
            </h2>
            <p className="font-normal text-[20px] leading-[25px]">
              {t("text1")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[18px]">
          <TruckSvg />
          <div className="w-[220px]">
            <h2 className="font-bold text-[40px] leading-[45px]">
              {t("header2")}
            </h2>
            <p className="font-normal text-[20px] leading-[25px]">
              {t("text2")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[18px]">
          <Image
            className="w-[108px] h-[105px]"
            width={108}
            height={105}
            priority
            alt="Experience img"
            src={"/images/quality.png"}
          />
          <div className="w-[220px]">
            <h2 className="font-bold text-[40px] leading-[45px]">
              {t("header3")}
            </h2>
            <p className="font-normal text-[20px] leading-[25px]">
              {t("text3")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientValue;
