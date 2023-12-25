import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HoverCard = () => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-[15px] md:gap-[10px] w-full h-[100dvh] overflow-y-hidden p-[1rem]">
      <motion.div
        className="rounded-lg cursor-pointer min-w-full md:min-w-[30.6%] glassmorphism p-[1rem] h-[16%] md:h-1/2"
        initial={{
          opacity: 0,
          translateY: 50,
        }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.6, delay: 0 * 0.2 + 3.0 }}
      >
        <Link 
          to="/home" 
          className="flex items-end h-full w-full">
          <h2>Home</h2>
        </Link>
      </motion.div>
      <motion.div
        className="rounded-lg min-w-full cursor-pointer md:min-w-[68%] glassmorphism p-[1rem] h-[36%] md:h-1/2"
        initial={{
          opacity: 0,
          translateY: 50,
        }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.6, delay: 1 * 0.2 + 3.0 }}
      >
        <Link 
          to="/profile"
          className="flex items-end h-full w-full">
          <h2>Launch App</h2>
        </Link>
      </motion.div>
      <motion.div
        className="rounded-lg cursor-pointer min-w-full md:min-w-[24%] glassmorphism p-[1rem] h-[11%] md:h-1/2"
        initial={{
          opacity: 0,
          translateY: 50,
        }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.6, delay: 2 * 0.2 + 3.0 }}
      >
        <Link 
          to="/sign-up"
          className="flex items-end h-full w-full">
          <h2>Get Started</h2>
        </Link>
      </motion.div>
      <motion.div
        className="rounded-lg cursor-pointer min-w-full md:min-w-[49%] glassmorphism p-[1rem] h-[16%] md:h-1/2"
        initial={{
          opacity: 0,
          translateY: 50,
        }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.6, delay: 3 * 0.2 + 3.0 }}
      >
        <Link 
          to="/support"
          className="flex items-end h-full w-full">
          <h2>Support</h2>
        </Link>
      </motion.div>
      <motion.div
        className="flex flex-row md:flex-col gap-[10px] justify-between min-w-full md:min-w-[24%] h-[11%] md:h-1/2"
        initial={{
          opacity: 0,
          translateY: 50,
        }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.6, delay: 4 * 0.2 + 3.0 }}
      >
        <Link 
          to="/about"
          className="flex cursor-pointer items-end rounded-lg glassmorphism w-full p-[1rem] md:h-1/2">
          <h2>About</h2>
        </Link>
        <Link 
          to="/contact"
          className="flex cursor-pointer items-end rounded-lg glassmorphism w-full p-[1rem] md:h-1/2">
          <h2>Contact</h2>
        </Link>
      </motion.div>
    </div>
  );
}

export default HoverCard;
