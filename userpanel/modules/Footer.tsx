"use client";

import CustomModal from "@/components/CustomModal";
import { API } from "@/hooks/getApi";
import {
  ClockIcon,
  Instagram,
  PhoneIcon,
  Telegram,
  TickSvg,
} from "@/public/icons";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC, useState } from "react";

const Footer: FC = () => {
  const t = useTranslations("Footer");
  const [isOpen, setIsOpen] = useState(false);
  const orders = useTranslations("Orders");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = form.elements.namedItem("name") as HTMLInputElement;
    const phone = form.elements.namedItem("phone") as HTMLInputElement;

    try {
      const response = await fetch(`${API}/consultation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          phone: phone.value,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully:", data);
        form.reset();
        setIsOpen(true);
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <footer className="bg-[#009398] text-white py-5 px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row items-start justify-between gap-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6 w-full lg:w-1/3"
        >
          <h2 className="text-2xl font-bold text-center">{t("text1")}</h2>
          <input
            name="name"
            className="py-3 px-3 text-[#919191] w-full max-w-[331px] rounded-lg bg-white"
            type="text"
            placeholder={t("placeholder1")}
            required
          />
          <input
            name="phone"
            className="py-3 px-3 text-[#919191] w-full max-w-[331px] rounded-lg bg-white"
            type="text"
            placeholder={t("placeholder2")}
            required
          />
          <button
            type="submit"
            className="py-2 px-6 bg-[#FFE600] rounded-lg text-black font-bold text-sm hover:bg-[#FFD700] transition-colors"
          >
            {t("btn")}
          </button>
        </form>

        <div className="flex flex-col items-start gap-4 w-full lg:w-1/3">
          <div className="flex gap-3 items-center">
            <ClockIcon />
            <p className="font-bold">{t("worktime")}</p>
          </div>
          <p className="font-bold max-w-[232px]">{t("workdays")}</p>
          <div className="flex items-center gap-4">
            <Link href="https://www.instagram.com/intex_market.uz/">
              <Instagram />
            </Link>
            <Link href={"https://t.me/intex_market_uz"}>
              <Telegram />
            </Link>
            <Link href="tel:+998999110204">
              <PhoneIcon />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-1/3">
          <p className="font-bold text-2xl">Intex-market.uz</p>
          <a
            className="font-bold text-2xl hover:underline"
            href="tel:+998999110204"
          >
            +998(99)911-02-04
          </a>
          <p className="font-bold text-lg max-w-[271px]">{t("address")}</p>
        </div>
      </footer>

      {isOpen && (
        <CustomModal setIsModalOpen={setIsOpen}>
          <div className="flex flex-col items-center gap-[20px] justify-center">
            <TickSvg />
            <p className="font-bold text-[60px] text-black text-center">
              {orders("success")}
            </p>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default Footer;
