import { Link } from "react-router-dom";

import { footerLinks } from "@/constants";

const Footer = () => {
  
  return (
    <section className="flex-center p-[1rem] md:px-8 lg:px-14 flex-col bg-dark-1">
      <div className="flex-start md:flex-row flex-col mb-8 w-full">
        <div className="flex-[1] flex flex-col justify-start md:mr-10">
          <span
            className="hover-font text-[2.5rem] font-semibold object-contain"
          >Whispers</span>
          <p className="text-text-color mt-4 md:max-w-[312px]">
            Anonymity meets genuine connections. Explore heartfelt messages, engage in lively discussions, and experience the freedom of genuine interactions—all while preserving your privacy.
          </p>
        </div>

        <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
          {footerLinks.map((footerlink) => (
            <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
              <h4 className="font-poppins base-semibold text-light-2">
                {footerlink.title}
              </h4>
              <ul className="list-none mt-2">
                {footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-poppins base-medium text-text-color hover:text-primary-600 cursor-pointer ${
                      index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                    }`}
                  >
                    <Link to={link.link}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center w-full flex items-center flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
        <p className="font-poppins font-normal text-center text-[14px] leading-[27px] text-white">
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