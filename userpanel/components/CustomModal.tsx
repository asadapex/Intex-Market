import { Xicon } from "@/public/icons";
import { Dispatch, ReactNode, SetStateAction } from "react";

const CustomModal = ({
  children,
  setIsModalOpen,
}: {
  children: ReactNode;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  function handleXclick() {
    setIsModalOpen(false);
  }
  return (
    <div className="flex justify-center w-[100%] h-[100vh] backdrop-blur-md items-center fixed top-0 left-0 right-0 bottom-0 z-90">
      <div className="relative shadow-[0_24px_24px_rgba(0,0,0,0.3)] z-100 w-[1130px] h-[584px] flex justify-center items-center rounded-[35px] bg-[#F8F8F8]">
        <div
          className="absolute top-[30px] right-[30px] cursor-pointer"
          onClick={handleXclick}
        >
          <Xicon />
        </div>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
