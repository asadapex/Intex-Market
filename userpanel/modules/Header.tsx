import { InstagramIcon, RuIcon, TelegramIcon } from "@/public/icons";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Header = () => {
  const t = useTranslations("HeaderItems");

  return (
    <header className="z-50 shadow-[0_12px_24px_rgba(0,0,0,0.3)] fixed top-0 left-0 right-0 flex items-center justify-between py-6 px-12 bg-[#009398] text-white">
      <Link href="/" className="font-semibold text-2xl">
        INTEX-MARKET.UZ
      </Link>

      <nav className="flex items-center gap-10">
        <Link href="/ramkali-basseynlar" className="font-bold text-lg">
          {t("item1")}
        </Link>
        <Link href="/puflanadigan-basseynlar" className="font-bold text-lg">
          {t("item2")}
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <a href="tel:+9989110204" className="font-bold text-lg">
          (99) 911 02 04
        </a>

        <div className="flex items-center gap-2">
          <a
            href="https://t.me/example"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramIcon />
          </a>
          <a
            href="https://instagram.com/example"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <RuIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
