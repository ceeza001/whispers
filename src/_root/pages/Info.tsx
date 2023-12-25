import React from 'react'
import { NavLink, Outlet } from "react-router-dom"

import { Footer } from "@/components/shared"

export const links = [
  {
    title: 'About Whispers',
    path: '/info/about',
  },
  {
    title: 'Faq',
    path: '/info/faq',
  },
  {
    title: 'Disclaimer',
    path: '/info/support',
  },
];

const Info = () => {
  return (
    <div className="max-w-screen home-container overflow-x-hidden">

      <div className="fixed z-[-1] w-[60%] h-[60%] right-[-20%] rounded-full neon-mist top-[50%]" />

      <div className="fixed z-[-1] w-[60%] h-[60%] left-[-40%] rounded-full neon-mist top-[-30%]" />
      <div className="md:px-8 lg:px-14 px-[1rem] my-4 pt-[1rem] md:pt-2 flex gap-2 items-center w-full max-w-5xl">
        <img
          src="/assets/icons/about.svg"
          width={24}
          height={24}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Info</h2>
      </div>

      <div className="px-[1rem] md:px-8 lg:px-14 my-4 mb-[3rem] text-gray-500 flex gap-4 items-center border-b-[2px] border-dark-4 w-full">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({isActive}) => isActive ? "border-b-2 border-primary-500 font-bold text-light-1" : ""}
          >
            {link.title}
          </NavLink>
        ))}
      </div>

      <div className="px-[1rem] md:px-8 lg:px-14">
        <Outlet />
      </div>

      <div className="relative pt-[10rem]">
        <div className="absolute z-[-2] w-[100%] h-[60%] right-[-20%] rounded-full neon-mist-black top-0" />
        <Footer />
      </div>
      </div>
  )
}

export default Info