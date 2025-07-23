"use client";
import { formatPrice } from "@/hooks/formatPrice";
import { API } from "@/hooks/getApi";
import { CardType } from "@/types/CardType";
import { useTranslations } from "next-intl";
import Image from "next/image";
import CustomModal from "./CustomModal";
import { FormEvent, useState } from "react";
import { AddressIcon, TickSvg } from "@/public/icons";
import clsx from "clsx";

const CustomCard = ({ item }: { item: CardType }) => {
  const t = useTranslations("Currency");
  const placeholder = useTranslations("PlaceHolders");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);
  const orders = useTranslations("Orders");

  function handleBuyClick() {
    setIsModalOpen(true);
    setIsOrderSuccessful(false); // Reset order success state when opening modal
  }

  async function handleBuy(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString();
    const phone = formData.get("phone")?.toString();
    const address = formData.get("address")?.toString();

    if (!name || !phone || !address) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const res = await fetch(`${API}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.id,
          name,
          phone,
          address,
          check: false,
        }),
      }).then((res) => res.json());
      console.log(res);
      setIsOrderSuccessful(true); // Set order success state to true
    } catch (error) {
      console.log(error);
      alert("An error occurred while placing the order.");
    }
  }

  return (
    <>
      <div className="relative flex bg-white shadow-custom-1 flex-col py-[30px] px-[20px] hover:scale-[1.01] duration-300 items-start gap-[10px] w-[340px] rounded-tr-[35px] rounded-br-[35px] rounded-bl-[35px]">
        <div
          className={clsx(
            "absolute top-0 left-0 px-[18px] py-[5px] font-bold text-white rounded-br-[10px]",
            {
              "bg-[#139D4B]": item.status === "Рекомендуем",
              "bg-[#FFD600]": item.status === "Cкидка",
              "bg-[#ED2020]":
                item.status &&
                item.status !== "Рекомендуем" &&
                item.status !== "Cкидка",
              hidden: !item.status,
            }
          )}
        >
          <strong>{item.status}</strong>
        </div>
        <p className="font-medium text-[20px] text-[#009398]">
          {item.frame_ru}
        </p>
        <Image
          className="w-[275px] min-h-[172px]"
          priority
          width={275}
          height={172}
          src={`${API}/file/${item.image}`}
          alt={`Image of ${item.frame_ru}`}
        />
        <div className="flex items-center gap-4">
          <div>
            {item.discountedPrice && (
              <p className="text-slate-500 line-through decoration-red-500">
                {formatPrice(item.discountedPrice)}
              </p>
            )}
            <strong className="font-bold">
              {formatPrice(item.price)} {t("currency")}
            </strong>
          </div>
          <button
            onClick={handleBuyClick}
            className="cursor-pointer hover:scale-[1.03] duration-300 bg-[#FFE600] rounded-tr-[10px] rounded-bl-[10px] shadow-custom-2 py-[3px] px-[8px]"
          >
            {t("btn")}
          </button>
        </div>
      </div>
      {isModalOpen && (
        <CustomModal setIsModalOpen={setIsModalOpen}>
          {isOrderSuccessful ? (
            <div className="flex flex-col items-center gap-[20px] justify-center">
              <TickSvg />
              <p className="font-bold text-[60px] text-black text-center">
                {orders("success")}
              </p>
              <p className="font-normal text-[25px] text-black text-center">{orders("text")}</p>
            </div>
          ) : (
            <div className="flex items-center gap-[50px]">
              <div className="bg-white flex gap-[20px] flex-col items-center w-[633px] h-[450px] py-[25px] rounded-tr-[35px] rounded-br-[35px] rounded-bl-[35px]">
                <p className="font-medium text-[20px] text-[#009398]">
                  {item.frame_ru}
                </p>
                <Image
                  className="w-[489px] min-h-[305px]"
                  priority
                  width={489}
                  height={305}
                  src={`${API}/file/${item.image}`}
                  alt={`Image of ${item.frame_ru}`}
                />
                <strong className="font-bold text-[30px] text-black">
                  {formatPrice(item.price)}
                </strong>
              </div>
              <form
                autoComplete="off"
                onSubmit={handleBuy}
                className="flex flex-col items-center !gap-[20px]"
              >
                <label htmlFor="name" className="sr-only">
                  {placeholder("name")}
                </label>
                <input
                  name="name"
                  id="name"
                  className="text-[#A3A3A3] py-[10px] px-[20px] shadow-custom-1 w-[359px] font-bold text-[25px] border-[1px] border-[#CBCBCB] rounded-[17px]"
                  type="text"
                  placeholder={placeholder("name")}
                  required
                />
                <label htmlFor="phone" className="sr-only">
                  {placeholder("phone")}
                </label>
                <input
                  name="phone"
                  id="phone"
                  className="text-[#A3A3A3] py-[10px] px-[20px] shadow-custom-1 w-[359px] font-bold text-[25px] border-[1px] border-[#CBCBCB] rounded-[17px]"
                  type="tel"
                  placeholder={placeholder("phone")}
                  required
                />
                <div className="flex items-center">
                  <label htmlFor="address" className="sr-only">
                    {placeholder("address")}
                  </label>
                  <input
                    name="address"
                    id="address"
                    className="text-[#A3A3A3] ml-[10px] py-[10px] px-[20px] shadow-custom-1 w-[270px] font-bold text-[25px] border-[1px] border-[#CBCBCB] rounded-[17px]"
                    type="text"
                    placeholder={placeholder("address")}
                    required
                  />
                  <AddressIcon aria-label="Address icon" />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-[#FFE600] cursor-pointer shadow-custom-1 py-[5px] px-[60px] rounded-[10px] text-[25px] font-bold"
                  >
                    {t("btn")}
                  </button>
                </div>
              </form>
            </div>
          )}
        </CustomModal>
      )}
    </>
  );
};

export default CustomCard;
