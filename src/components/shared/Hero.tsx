import { motion } from "framer-motion";
import { textVariant } from "@/lib/motion";
import { Button } from "@/components/ui"
import { ParticlesContainer, VelocityScroll } from "./"
import { Link } from "react-router-dom"

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.5, ease: "easeOut" } },
};

const Hero = () => {
  return (
    <div className="w-full max-w-screen overflow-hidden">
      <ParticlesContainer />
      <div className="mt-28 flex flex-col items-left md:items-center md:text-center">
        <motion.h1
          className="p-[1rem] h1-bold hover-font leading-[90%]"
          initial={{
            opacity: 0,
            translateY: 50,
          }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", duration: 1.4, delay: 0.4 }}
        >
          Explore <span className="gradient-text">Anonymity </span>, Uncover secrets
        </motion.h1>
        <p className="p-[1rem] hidden mt-[2rem] md:mt-[1rem] md:block mx-auto text-center text-light-2 text-[1.2rem] font-semibold md:w-4/5">
          Embark on a delightful journey of anonymous connections, where heartfelt messages from friends and cheerful group chats await, all wrapped in the warmth of concealed identities, creating a welcoming haven for genuine friendships to blossom.
        </p>
        <p className="px-[1rem] md:hidden mt-[2rem] mx-auto text-left text-text-color base-semibold md:w-2/3">
          Explore the enchanting world of anonymous connections on Whispers, where heartfelt messages and vibrant group chats thrive, fostering genuine friendships in a cozy haven of concealed identities.
        </p>
        <div className="px-[1rem] my-8 mb-[4rem] flex gap-4 items-center">
          <Button 
            className="z-[49] shad-button_primary rounded-lg p-[1rem] py-[1.8rem] body-bold"
            onClick={() => window.location.href = '/profile'}
          >
            Launch App
          </Button>
          <Link
            to="/info/about"
            className="z-[49] rounded-lg glassmorphism p-[1rem] body-bold">
            Learn more
          </Link>
        </div>
        <VelocityScroll />
      </div>
    </div>
  );
};

export default Hero;
