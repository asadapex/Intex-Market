"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

interface LangType {
  id: number;
  title: string;
  content: string;
}
const LangConfig = () => {
  const router = useRouter();
  const pathname = usePathname();
  const b = getCookie("NEXT_LOCALE");
  const langList: LangType[] = [
    { id: 1, title: "ru", content: "RU" },
    { id: 2, title: "uz", content: "UZ" },
  ];
  const [lang, setLang] = useState<LangType>(langList[0]);
  function handleChangeLang(item: LangType) {
    setLang(item);
    router.push(pathname, { locale: item.title });
  }
  useEffect(() => {
    if (b == "uz" || b == "ru") {
      const findLang = langList.find((item) => item.title == b);
      if (findLang) setLang(findLang);
    }
  }, []);
  return (
    <div className="lang-wrapper w-[25px] flex items-center justify-center h-[25px] p-3 relative cursor-pointer bg-amber-50 text-[#00979C] rounded-[3px] mb-[8px]">
      <div className=" text-[15px] font-semibold">
        <span>{lang.content}</span>
      </div>
      <div className="h-0 lang-popup overflow-hidden duration-300 space-y-1 absolute left-[-15px] top-[50px]  rounded-md bg-[#00979C]">
        {langList
          .filter((item: LangType) => item.id != lang.id)
          .map((item: LangType) => (
            <div
              onClick={() => handleChangeLang(item)}
              key={item.id}
              className="flex bg-white hover:text-[#00979C] p-2 rounded-md items-center gap-2 text-[14px] font-semibold"
            >
              <span>{item.content}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
export default LangConfig;
