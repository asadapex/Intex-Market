import { useTranslations } from "next-intl";

const Service = () => {
  const t = useTranslations("ServiceItems");
  return (
    <div className="flex items-center justify-between text-white my-[105px] mx-[126px]">
      <div className="w-[340px] shadow-[0_24px_24px_rgba(0,0,0,0.3)] h-[125px] flex items-center gap-[19px] bg-[#009398] rounded-tr-[40px] rounded-bl-[40px] py-[10px] px-[13px]">
        <h2 className="font-bold text-[65px]">1</h2>
        <div className="flex flex-col gap-0">
          <h3 className="font-bold text-[24px] w-[250px] leading-[25px]">
            {t("item1Header")}
          </h3>
          <p className="font-normal text-[15px] w-[250px]">{t("item1Text")}</p>
        </div>
      </div>
      <div className="w-[340px] shadow-[0_24px_24px_rgba(0,0,0,0.3)] h-[125px] flex items-center gap-[19px] bg-[#009398] rounded-tr-[40px] rounded-bl-[40px] py-[10px] px-[13px]">
        <h2 className="font-bold text-[65px]">2</h2>
        <div className="flex flex-col">
          <h3 className="font-bold text-[24px] w-[250px] leading-[25px]">
            {t("item2Header")}
          </h3>
          <p className="font-normal text-[15px] w-[250px]">{t("item2Text")}</p>
        </div>
      </div>
      <div className="w-[340px] h-[125px] shadow-[0_24px_24px_rgba(0,0,0,0.3)] flex items-center gap-[19px] bg-[#009398] rounded-tr-[40px] rounded-bl-[40px] py-[10px] px-[13px]">
        <h2 className="font-bold text-[65px]">3</h2>
        <div className="flex flex-col">
          <h3 className="font-bold text-[24px] w-[250px] leading-[25px]">
            {t("item2Header")}
          </h3>
          <p className="font-normal text-[15px] w-[250px]">{t("item2Text")}</p>
        </div>
      </div>
    </div>
  );
};

export default Service;
