import { TickIcon } from "@/public/icons";
import { useTranslations } from "next-intl";

const TashkentPools = () => {
  const t = useTranslations("TashkentPool");
  return (
    <div className="text-[25px]">
      <div className="flex items-center w-full justify-center py-[20px] px-[240px] bg-[#00939817]">
        <h2 className="font-bold text-[50px] text-[#009398]">{t("heading")}</h2>
      </div>

      <div className="flex items-start gap-[70px] px-[120px] py-[75px]">
        <p className="font-normal w-[503px]">{t("text1")}</p>
        <div className="space-y-[15px]">
          <p className="w-[535px]">{t("text2")}</p>
          <div>
            <div className="flex items-center gap-[4px]">
              <TickIcon /> <p>{t("item1")}</p>
            </div>
            <div className="flex items-center gap-[4px]">
              <TickIcon /> <p>{t("item2")}</p>
            </div>
            <div className="flex items-center gap-[4px]">
              <TickIcon /> <p>{t("item3")}</p>
            </div>
            <div className="flex items-center gap-[4px]">
              <TickIcon /> <p>{t("item4")}</p>
            </div>
            <div className="flex items-center gap-[4px]">
              <TickIcon /> <p>{t("item5")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TashkentPools;
