"use client";
import CustomCard from "@/components/CustomCard";
import { getQueryData } from "@/lib/getQueryData";
import { CardType } from "@/types/CardType";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface CardsType {
  cards: { data: CardType[] };
}

const InflatablePool: FC<CardsType> = ({ cards }) => {
  const t = useTranslations("HeaderItems");
  const { data } = getQueryData(
    "/product?categoryId=f8aa4e4c-66cc-4731-b0f1-d0c5e883c503&limit=3",
    cards,
    "cards"
  );
  return (
    <div className="flex flex-col items-center bg-[#F8F8F8]">
      <div className="shadow-[0_24px_24px_rgba(0,0,0,0.3)] flex justify-center items-center w-full py-[22px] bg-[#009398]">
        <h1 className="font-bold text-[50px] text-white">{t("item2")}</h1>
      </div>

      <div className="py-[97px] px-[50px]">
        <div className="flex w-full flex-wrap justify-center gap-[30px]">
          {data?.data?.map((item: CardType) => (
            <CustomCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InflatablePool;
