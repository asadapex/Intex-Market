import { formatPrice } from "@/hooks/formatPrice";
import { API } from "@/hooks/getApi";
import { CardType } from "@/types/CardType";
import Image from "next/image";

const CustomCard = ({item}: {item: CardType}) => {
  return (
    <div className="flex bg-white shadow-[0_24px_24px_rgba(0,0,0,0.3)] flex-col py-[35px] px-[20px] hover:scale-[1.03] duration-300 items-start gap-[10px] w-[340px] h-[304px] rounded-tl-[35px] rounded-br-[35px] rounded-bl-[35px]">
      <p className="font-medium text-[20px] text-[#009398]">{item.name}</p>
      <Image
        className="w-[275px] h-[172px]"
        priority
        width={275}
        height={172}
        src={`${API}/multer/${item.image}`}
        alt="Card img"
      />
      <div className="flex items-center gap-15">
        <strong className="font-bold text-[12px]">
          {formatPrice(item.price)} сум
        </strong>
        <button className="cursor-pointer hover:scale-[1.03] duration-300 bg-[#FFE600] rounded-tr-[10px] rounded-bl-[10px] shadow-[0_12px_24px_rgba(0,0,0,0.2)] py-[3px] px-[8px]">
          Заказать
        </button>
      </div>
    </div>
  );
};

export default CustomCard;
