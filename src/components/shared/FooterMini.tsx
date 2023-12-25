import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <section className="flex-col mt-[6rem] pb-4">
      <div className="text-center w-full flex items-center flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
        <p className="font-poppins font-small text-center text-[14px] leading-[24px] text-white">
          Copyright Ⓒ 2024 Whispers. All Rights Reserved.
        </p>

        <div className="text-gray-500 mt-2 small-semibold">
          Powered by Blackcube Tech
        </div>
      </div>
    </section>
  );
};

export default Footer;