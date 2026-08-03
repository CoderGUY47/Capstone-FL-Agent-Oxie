import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans overflow-x-hidden flex flex-col justify-between bg-[url('/layouts/home-bg.png')] bg-cover bg-center bg-no-repeat select-none">
      {/* Dark gray overlay above home background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-lg pointer-events-none z-10" />

      {/* Top Header Navigation */}
      <Navbar />

      {/* Main Hero Content */}
      <Hero />
    </div>
  );
}
