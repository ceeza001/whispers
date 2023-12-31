import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

const ParticlesContainer = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
      await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async () => {}, []);

    return (
        <Particles 
          className="max-w-[100vw] h-[600px] top-0 absolute overflow-hidden translate-z-0"
          id="tsparticles"
          init={particlesInit} 
          loaded={particlesLoaded}
          options={{
            fullScreen: { enable: false },
            // Additional particle options here
            background: {
              color: {
                value: 'red',
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: false,
                  mode: 'push',
                },
                onHover: {
                  enable: true,
                  mode: 'repulse',
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 90,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: '#877EFF',
              },
              links: {
                color: '#f5d393',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: 'none',
                enable: true,
                outModes: {
                  default: 'bounce',
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 100,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: 'circle'
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
    );
};

export default ParticlesContainer;