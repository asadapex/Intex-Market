"use client";
import CustomCard from "@/components/CustomCard";
import { getQueryData } from "@/lib/getQueryData";
import { CardType } from "@/types/CardType";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface CardsType {
  cards: { data: CardType[] };
}

const FrameBasseyn: FC<CardsType> = ({ cards }) => {
  const t = useTranslations("HeaderItems");
  const { data } = getQueryData("/product", cards, "cards");
  return (
    <div className="flex flex-col items-center bg-[#F8F8F8]">
      <div className="shadow-[0_24px_24px_rgba(0,0,0,0.3)] flex justify-center items-center w-full py-[22px] bg-[#009398]">
        <h1 className="font-bold text-[50px] text-white">{t("item1")}</h1>
      </div>

      <div className="py-[97px] px-[136px]">
        <div className="flex flex-wrap justify-center gap-[30px]">
          {data?.data?.map((item: CardType) => (
            <CustomCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrameBasseyn;
