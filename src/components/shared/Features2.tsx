import React from "react";
import { motion } from "framer-motion";
import { features2 } from "@/constants";

const Features2 = () => {
  return (
    <>
      <motion.div 
        initial={{
          opacity: 0,
          translateY: 50,
        }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true, amount: 0.8 }}
      >
        <h3 className="gradient-text base-semibold">Still perplexed ?</h3>
        <span className="mt-2 h1-bold">
          <h1>Here's how we keep it anonymous</h1>
        </span>
      </motion.div>
      <motion.p 
        className="mt-4 text-text-color text-center base-regular"
        initial={{
          opacity: 0,
          translateY: 50,
        }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true, amount: 0.8 }}
      >
        Keeping it anonymous is like having a secret online disguise. It's like putting on a cool digital mask for your words, so you can be the mysterious character in your own chat story.
      </motion.p>
      <div className='mt-8 py-[1rem] w-full'>
        {features2.map((feature, i) => (
          <motion.div 
            key={i} 
            className="grid-features2"
            initial={{
              opacity: 0,
              translateY: 50,
            }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.8 }}
            >
            <div className="w-[4px] h-[1.5rem] bg-primary-500" />
            <div className="w-full">
              <h2 className="h3-bold md:body-bold">{feature.title}</h2>
              <ul className="text-text-color mt-4 base-bold">
                {feature.description}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Features2;