import React, { useEffect } from "react";
import "particles.js";

const ParticlesBackground = () => {
  useEffect(() => {
    // Initialize particles.js
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
          },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: true,
      });
    }

    // Optional: stats.js setup (if you really need particle count)
    const script = document.createElement("script");
    script.src = "https://threejs.org/examples/js/libs/stats.min.js";
    script.onload = () => {
      const stats = new window.Stats();
      stats.setMode(0);
      stats.dom.style.position = "absolute";
      stats.dom.style.left = "0px";
      stats.dom.style.top = "0px";
      document.body.appendChild(stats.dom);

      const countParticles = document.querySelector(".js-count-particles");
      const update = () => {
        stats.begin();
        stats.end();
        const particles =
          window.pJSDom?.[0]?.pJS?.particles?.array?.length || 0;
        if (countParticles) countParticles.innerText = particles;
        requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div id="particles-js"></div>
      <div className="count-particles">
      </div>

      <style jsx>{`
        body {
          margin: 0;
          font: normal 75% Arial, Helvetica, sans-serif;
        }
        canvas {
          display: block;
          vertical-align: bottom;
        }
        #particles-js {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: #000000;
          background-size: cover;
          background-position: 50% 50%;
        }
        .count-particles {
          background: #000022;
          position: absolute;
          top: 48px;
          left: 0;
          width: 80px;
          color: #13e8e9;
          font-size: 0.8em;
          text-align: left;
          text-indent: 4px;
          line-height: 14px;
          padding-bottom: 2px;
          font-family: Helvetica, Arial, sans-serif;
          font-weight: bold;
          border-radius: 0 0 3px 3px;
          user-select: none;
        }
        .js-count-particles {
          font-size: 1.1em;
        }
      `}</style>
    </>
  );
};

export default ParticlesBackground;