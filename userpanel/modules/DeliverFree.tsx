import { useTranslations } from "next-intl";

const DeliverFree = () => {
  const t = useTranslations("DeliverFree");
  return (
    <div className="flex text-white flex-col items-center bg-[#009398] gap-4 pt-[20px] pb-[39px] px-[200px]">
      <h2 className="font-bold text-[50px] text-center">{t("heading")}</h2>
      <p className="font-normal text-[23px] text-center">{t("text")}</p>
      <button className="text-black cursor-pointer py-[5px] px-[15px] font-bold text-[20px] bg-[#FFE600] rounded-[10px]">
        {t("btn")}
      </button>
    </div>
  );
};

export default DeliverFree;
