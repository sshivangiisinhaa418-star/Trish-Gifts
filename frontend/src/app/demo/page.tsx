import { ParticleCanvas } from "@/components/ui/particle-canvas-1";

export default function DemoOne() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-900 text-white">
      <ParticleCanvas />
      <span className="pointer-events-none z-10 text-center text-5xl md:text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap font-heading text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-accent-500">
       QUMI Particles
      </span>
      <p className="z-10 mt-4 text-gray-300 font-light max-w-md text-center">Move your mouse to control the particle gravity center.</p>
    </div>
  )
}
