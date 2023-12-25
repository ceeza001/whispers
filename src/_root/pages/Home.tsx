import { useNavigate } from "react-router-dom"

import { 
  Hero,
  Features,
  Features2,
  Process,
  Footer,
} from "@/components/shared"
import { Button } from "@/components/ui"

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container overflow-hidden">
      <Hero />

      <div className="md:px-8 lg:px-14 relative w-full md:w-[80%] mx-auto p-[1rem] pt-[5rem]">
        <div className="absolute z-[-1] w-[60%] h-[60%] -left-[60%] rounded-full neon-mist top-[-20%]" />
        <Features />
        <div className="absolute z-[-1] w-[60%] h-[60%] -right-[50%] rounded-full neon-mist bottom-40" />
      </div>

      <div className="md:px-8 lg:px-14 relative w-full md:w-[80%] mx-auto p-[1rem] pt-[5rem]">
        <div className="absolute z-[1] w-[60%] h-[60%] -left-[50%] rounded-full neon-mist top-[-4%]" />
        <Features2 />
        <div className="absolute z-[-1] w-[60%] h-[60%] -right-[50%] rounded-full neon-mist bottom-20" />
      </div>

      <div className="md:px-8 lg:px-14 w-full mt-[5rem]">
        <Process />
      </div>

      <div className="md:px-8 lg:px-14 mt-8 text-left p-[1rem] md:w-[50%]">
        <h1 className="h1-bold">Go incognito</h1>
        <p className="my-4 text-text-color">
          In the big world of the internet, discover a place where things get mysterious. Get ready to be part of a space where who you are doesn't matter, and talks stay in soft whispers. Take a dive into this hidden world with <span className="hover-font body-bold text-light-2">Whispers</span>. Follow your curiosity, and see the unfolding secrets of digital chatting. It's not just about hiding; it's an open door to new ways of connecting. Welcome to a world where quiet talks speak louder than you'd expect.
        </p>
      </div>
      
      <div className="md:px-8 lg:px-14 mt-10 text-center mx-auto md:w-[80%]">
        <h1 className="h3-bold">Interested in discovering people's opinions about you?</h1>
        <p className="my-4 text-text-color body-bold">Sit back and let the whispers gently reveal their secrets.</p>
        <Button
          onClick={() => window.location.href = '/sign-up'}
          className="mt-8 shad-button_primary my-4 cursor-pointer mx-auto base-semibold">
          Get Started
        </Button>
      </div>

      <hr className="h-[1px] w-full border-light-4 mt-40"/>
      <Footer />
    </div>
  );
};

export default Home;