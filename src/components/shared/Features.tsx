import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { features } from "@/constants";
import { textVariant } from "@/lib/motion";

const Features = () => {
  return (
    <>
      <motion.div 
        initial={{
          opacity: 0,
          translateY: 50,
        }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.8 }}
      >
        <h3 className="gradient-text base-semibold">Secretly Connect</h3>
        <span className="mt-2 h1-bold">
          <h1>Discover Exciting Features</h1>
        </span>
      </motion.div>
      <motion.p 
        className="mt-4 text-text-color text-center base-regular"
        initial={{
            opacity: 0,
            translateY: 50,
          }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.8 }}
      >
        Step into our digital playground and discover cool tools for secret chats. Have a blast with hidden modes and fun avatars. Your anonymous adventure starts now! 🕵️‍♂️🌐🚀
      </motion.p>
      <div className='mt-8 py-[1rem] grid-container w-full'>
        {features.map((feature, i) => (
          <div 
            key={i} 
            className="grid-features"
            >
            <div className="w-full mt-4 text-center">
              <div className="flex-center">
                <span className="flex items-center justify-center w-[4.5rem] h-[4.5rem] bg-primary-500 rounded-full hover-font font-bold text-[4rem]">W</span>
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

export default Features;