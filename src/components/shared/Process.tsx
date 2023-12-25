import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { features } from "@/constants";
import { textVariant } from "@/lib/motion";

const Process = () => {
  return (
    <>
      <motion.div
        className="md:w-[80%] mx-auto px-[1rem]"
        initial={{
          opacity: 0,
          translateY: 50,
        }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true, amount: 0.8 }}
      >
        <h3 className="gradient-text base-semibold">The process</h3>
        <span className="h1-bold">
          <h1>One, two...</h1>
          <h1>One-two-three-four!</h1>
        </span>
      </motion.div>
      <motion.p 
        className="md:w-[80%] mx-auto px-[1rem] mt-4 text-text-color text-center base-regular"
        initial={{
          opacity: 0,
          translateY: 50,
        }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true, amount: 0.8 }}
      >
        Anonymous chatting is like being a text ninja—swift, sneaky, and totally incognito. It's the digital equivalent of whispering in a crowded room, where your words wear a virtual mask. So, let's keep it simple and enjoy the low-key fun of text adventures! 😎🕵️‍♂️
      </motion.p>
      <div className=' p-[1rem] static top-0 mt-8 py-[1rem] flex flex-row overflow-x-scroll gap-4'>
        {features.map((feature, i) => (
          <div 
            key={i} 
            className="min-w-[20rem] min-h-[10rem] rounded-lg bg-dark-2 p-[1rem] shadow-md hover:shadow-lg transition-shadow duration-300]"
            >
            <div className="w-full mt-4 text-center md:m-5">
              <div className="flex-center md:flex-start">
                <span className="w-[2.5rem] h-[2.5rem] hover-font flex items-center justify-center border-2 border-primary-500 rounded-full font-bold text-[1.5rem]">
                  {i + 1}
                </span>
              </div>
              <h2 className="my-2 body-bold">{feature.title}</h2>
              <ul className="text-text-color base-bold">
                {feature.points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Process;