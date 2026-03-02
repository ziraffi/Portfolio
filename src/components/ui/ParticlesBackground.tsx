import React, { useEffect, useState } from "react";
import type { Container } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "@/src/context/ThemeContext";

export function ParticlesBackground() {
  const { theme } = useTheme();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container) => {
    // console.log(container);
  };

  const isDarkMode = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-0 pointer-events-none"
      particlesLoaded={particlesLoaded}
      options={{
        fullScreen: { enable: false },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: { enable: true },
          },
          modes: {
            grab: {
              distance: 180,
              links: {
                opacity: isDarkMode ? 0.6 : 0.4,
              },
            },
          },
        },
        particles: {
          color: {
            value: isDarkMode ? "#ffffff" : "#000000",
          },
          links: {
            color: isDarkMode ? "#ffffff" : "#000000",
            distance: 180,
            enable: true,
            opacity: isDarkMode ? 0.4 : 0.25,
            width: 1.5,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1.2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 120,
          },
          opacity: {
            value: isDarkMode ? 0.6 : 0.4,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
