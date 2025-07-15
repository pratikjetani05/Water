import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useNavigate } from "react-router-dom";
import NameBadges from "./NameBadges";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <style jsx>{`
        .cloud-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 150px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(240, 249, 255, 0.7) 50%,
            rgba(219, 234, 254, 0.6) 100%
          );
          clip-path: polygon(0 0, 100% 0, 100% 70%, 0 90%);
          animation: cloud-drift 10s ease-in-out infinite;
          z-index: 1;
        }

        .cloud-layer::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.6),
            rgba(240, 249, 255, 0.5)
          );
          clip-path: polygon(0 20%, 100% 0, 100% 80%, 0 100%);
          animation: cloud-drift-reverse 12s ease-in-out infinite;
        }

        .river-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 200px;
          background: linear-gradient(
            180deg,
            rgba(14, 165, 233, 0.7) 0%,
            rgba(6, 182, 212, 0.8) 50%,
            rgba(8, 145, 178, 0.9) 100%
          );
          clip-path: polygon(0 30%, 100% 0, 100% 100%, 0 100%);
          animation: river-flow 8s ease-in-out infinite;
          z-index: 1;
        }

        .river-wave::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            45deg,
            rgba(6, 182, 212, 0.4),
            rgba(8, 145, 178, 0.4)
          );
          clip-path: polygon(0 50%, 100% 20%, 100% 100%, 0 100%);
          animation: river-flow-reverse 10s ease-in-out infinite;
        }

        .river-surface {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100px;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100"><path d="M0,50 Q250,20 500,50 T1000,50 L1000,100 L0,100 Z" fill="rgba(255,255,255,0.2)"/></svg>')
            repeat-x;
          animation: river-surface-move 12s linear infinite;
          z-index: 2;
        }

        @keyframes cloud-drift {
          0%,
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 70%, 0 90%);
            transform: translateX(0);
          }
          50% {
            clip-path: polygon(0 0, 100% 0, 100% 90%, 0 70%);
            transform: translateX(-15px);
          }
        }

        @keyframes cloud-drift-reverse {
          0%,
          100% {
            clip-path: polygon(0 20%, 100% 0, 100% 80%, 0 100%);
            transform: translateX(0);
          }
          50% {
            clip-path: polygon(0 40%, 100% 10%, 100% 60%, 0 80%);
            transform: translateX(20px);
          }
        }

        @keyframes river-flow {
          0%,
          100% {
            clip-path: polygon(0 30%, 100% 0, 100% 100%, 0 100%);
            transform: translateX(0);
          }
          50% {
            clip-path: polygon(0 50%, 100% 20%, 100% 100%, 0 100%);
            transform: translateX(-12px);
          }
        }

        @keyframes river-flow-reverse {
          0%,
          100% {
            clip-path: polygon(0 50%, 100% 20%, 100% 100%, 0 100%);
            transform: translateX(0);
          }
          50% {
            clip-path: polygon(0 70%, 100% 40%, 100% 100%, 0 100%);
            transform: translateX(15px);
          }
        }

        @keyframes river-surface-move {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1000px);
          }
        }

        .bubble {
          position: absolute;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: float-up 4s ease-in-out infinite;
          z-index: 2;
        }

        .bubble:nth-child(1) {
          left: 10%;
          width: 8px;
          height: 8px;
          animation-delay: 0s;
        }
        .bubble:nth-child(2) {
          left: 25%;
          width: 12px;
          height: 12px;
          animation-delay: 1s;
        }
        .bubble:nth-child(3) {
          left: 40%;
          width: 6px;
          height: 6px;
          animation-delay: 2s;
        }
        .bubble:nth-child(4) {
          left: 55%;
          width: 10px;
          height: 10px;
          animation-delay: 0.5s;
        }
        .bubble:nth-child(5) {
          left: 70%;
          width: 14px;
          height: 14px;
          animation-delay: 1.5s;
        }
        .bubble:nth-child(6) {
          left: 85%;
          width: 5px;
          height: 5px;
          animation-delay: 2.5s;
        }
        .bubble:nth-child(7) {
          left: 15%;
          width: 9px;
          height: 9px;
          animation-delay: 3s;
        }
        .bubble:nth-child(8) {
          left: 60%;
          width: 7px;
          height: 7px;
          animation-delay: 3.5s;
        }

        @keyframes float-up {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }

        .water-ripple {
          position: absolute;
          width: 100%;
          height: 100%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100"><path d="M0,50 Q250,0 500,50 T1000,50 L1000,100 L0,100 Z" fill="rgba(255,255,255,0.05)"/></svg>')
            repeat-x;
          animation: water-move 15s linear infinite;
          z-index: 1;
        }

        @keyframes water-move {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1000px);
          }
        }

        .rain-drop {
          position: absolute;
          width: 3px;
          height: 15px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.9),
            rgba(6, 182, 212, 0.8)
          );
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          animation: rain-fall 2s linear infinite;
          z-index: 3;
        }

        .rain-drop:nth-child(1) {
          left: 15%;
          animation-delay: 0s;
        }
        .rain-drop:nth-child(2) {
          left: 25%;
          animation-delay: 0.3s;
        }
        .rain-drop:nth-child(3) {
          left: 35%;
          animation-delay: 0.6s;
        }
        .rain-drop:nth-child(4) {
          left: 45%;
          animation-delay: 0.9s;
        }
        .rain-drop:nth-child(5) {
          left: 55%;
          animation-delay: 1.2s;
        }
        .rain-drop:nth-child(6) {
          left: 65%;
          animation-delay: 1.5s;
        }
        .rain-drop:nth-child(7) {
          left: 75%;
          animation-delay: 1.8s;
        }
        .rain-drop:nth-child(8) {
          left: 85%;
          animation-delay: 0.2s;
        }
        .rain-drop:nth-child(9) {
          left: 20%;
          animation-delay: 0.5s;
        }
        .rain-drop:nth-child(10) {
          left: 60%;
          animation-delay: 0.8s;
        }
        .rain-drop:nth-child(11) {
          left: 80%;
          animation-delay: 1.1s;
        }
        .rain-drop:nth-child(12) {
          left: 30%;
          animation-delay: 1.4s;
        }

        @keyframes rain-fall {
          0% {
            transform: translateY(150px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh - 200px)) rotate(5deg);
            opacity: 0;
          }
        }

        .ripple-effect {
          position: absolute;
          bottom: 180px;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: ripple-expand 1.5s ease-out infinite;
          z-index: 2;
        }

        .ripple-effect:nth-child(1) {
          left: 15%;
          animation-delay: 2s;
        }
        .ripple-effect:nth-child(2) {
          left: 25%;
          animation-delay: 2.3s;
        }
        .ripple-effect:nth-child(3) {
          left: 35%;
          animation-delay: 2.6s;
        }
        .ripple-effect:nth-child(4) {
          left: 45%;
          animation-delay: 2.9s;
        }
        .ripple-effect:nth-child(5) {
          left: 55%;
          animation-delay: 3.2s;
        }
        .ripple-effect:nth-child(6) {
          left: 65%;
          animation-delay: 3.5s;
        }
        .ripple-effect:nth-child(7) {
          left: 75%;
          animation-delay: 3.8s;
        }
        .ripple-effect:nth-child(8) {
          left: 85%;
          animation-delay: 2.2s;
        }

        @keyframes ripple-expand {
          0% {
            width: 0px;
            height: 0px;
            opacity: 1;
          }
          100% {
            width: 40px;
            height: 40px;
            opacity: 0;
          }
        }

        .hydrate-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(6, 182, 212, 0.1) 0%,
            transparent 70%
          );
          border-radius: 50%;
          animation: pulse-glow 4s ease-in-out infinite;
          z-index: 1;
        }

        @keyframes pulse-glow {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.8;
          }
        }
      `}</style>

      <BackgroundBeamsWithCollision>
        <div className="relative overflow-hidden min-h-screen w-full">
          {/* Cloud Layer at Top */}
          <div className="cloud-layer"></div>

          {/* River Wave at Bottom */}
          <div className="river-wave"></div>
          <div className="river-surface"></div>
          <div className="water-ripple"></div>
          <div className="hydrate-glow"></div>

          {/* Floating Bubbles */}
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>

          {/* Rain Drops from Clouds */}
          <div className="rain-drop"></div>
          <div className="rain-drop"></div>
          <div className="rain-drop"></div>
          <div className="rain-drop"></div>
          <div className="rain-drop"></div>
          <div className="rain-drop"></div>
          <div className="rain-drop"></div>
          <div className="rain-drop"></div>
          <div className="rain-drop"></div>
          <div className="rain-drop"></div>
          <div className="rain-drop"></div>
          <div className="rain-drop"></div>

          {/* Ripple Effects where rain hits river */}
          <div className="ripple-effect"></div>
          <div className="ripple-effect"></div>
          <div className="ripple-effect"></div>
          <div className="ripple-effect"></div>
          <div className="ripple-effect"></div>
          <div className="ripple-effect"></div>
          <div className="ripple-effect"></div>
          <div className="ripple-effect"></div>

          {/* Water Drops */}
          <div className="water-drop"></div>
          <div className="water-drop"></div>
          <div className="water-drop"></div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center min-h-screen w-full justify-center text-center">
            <h1 className="text-6xl font-bold text-[#333446] mb-10 p-5 drop-shadow-lg">
              Welcome to HeheHydrates 💧
            </h1>
            <h3 className="text-xl font-semibold text-[#b8cfce] drop-shadow-md max-w-4xl px-4">
              Track Every Drop, Share Every Sip — Your Smart Water Log with
              Friends
            </h3>

            {/* Additional Water-themed Elements */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/submit")}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:from-cyan-500 hover:to-blue-600 transition duration-300 shadow-lg transform hover:scale-105"
              >
                Start Tracking 💧
              </button>
              <button className="border-2 border-cyan-400 text-cyan-600 px-8 py-3 rounded-full font-semibold hover:bg-cyan-400 hover:text-white transition duration-300 backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
            <NameBadges/>
    </>
  );
};

export default Hero;
