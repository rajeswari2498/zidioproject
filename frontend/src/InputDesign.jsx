"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon, title, description, titleColor }) => {
  return (
    <article className="p-6 bg-white rounded-xl transition-transform duration-[0.3s] ease-[ease] shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
      <i className={`ti ${icon} mb-4 text-3xl ${titleColor}`} />
      <h3 className={`mb-3 text-xl font-semibold ${titleColor}`}>{title}</h3>
      <p className="text-sm text-slate-500">{description}</p>
    </article>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: "ti-layout-kanban",
      title: "Kanban Board",
      description:
        "Visualize your workflow with our intuitive Kanban board system",
      titleColor: "text-sky-800",
    },
    {
      icon: "ti-chart-bar",
      title: "Progress Tracking",
      description:
        "Monitor your team's progress with detailed analytics and reports",
      titleColor: "text-lime-600",
    },
    {
      icon: "ti-users",
      title: "Team Collaboration",
      description: "Work together seamlessly with built-in communication tools",
      titleColor: "text-slate-500",
    },
  ];
  

  return (
    <section className="grid gap-6 px-0 py-5 mt-16 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </section>
  );
};

const HeroSection = () => {
  return (
    <section className="flex gap-12 max-md:flex-col">
      <div className="flex flex-col flex-1">
        <h1 className="mb-6 text-5xl font-bold tracking-wider text-sky-800 max-md:text-4xl max-sm:mb-4 max-sm:text-3xl">
          KANBAN
        </h1>
        <p className="mb-8 text-lg leading-relaxed max-w-[600px] text-slate-500 max-md:mb-6 max-md:text-base max-sm:mb-5 max-sm:text-base">
          Manage and track the progress for your day to day task. It help you to
          organize work, limit work in progress and improve efficiency
        </p>
        <div className="inline-block">
          <button className="inline-flex gap-2 items-center px-6 py-3 text-base font-semibold text-indigo-50 bg-lime-600 rounded-lg transition-all cursor-pointer duration-[0.3s] ease-[ease-in-out] shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
            <i className="ti ti-arrow-right" />
            <span><Link to="/admin">← Go to Task</Link></span>
          </button>
        </div>
      </div>
      <div className="flex-1">
        <figure className="overflow-hidden relative max-w-full h-auto rounded-2xl shadow-xl transition-transform aspect-[16/9] duration-[0.3s] ease-[ease-in-out] max-md:max-h-[400px] max-sm:max-h-[300px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F5df8c00e19744252b631cb11d36a5da1%2F0dce291a5096416eb6983a842de05a92"
            alt="Kanban Board"
            className="w-full h-auto"
          />
          <figcaption className="absolute inset-x-0 bottom-0 p-5 text-indigo-50">
            <h2 className="mb-2 text-xl font-semibold">
              Start Organizing Today
            </h2>
            <p className="text-sm opacity-90">
              Visualize your workflow and boost productivity
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

const MobileMenu = ({ isOpen }) => {
  return (
    <nav
      className="hidden fixed inset-x-0 z-50 p-5 bg-white transition-transform duration-[0.3s] ease-[ease-in-out] top-[72px] max-sm:block"
      style={{
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <div className="flex flex-col gap-4">
        <button className="px-5 py-3 w-full text-sm font-semibold text-left text-indigo-50 bg-sky-800 rounded-lg border-[none]">
        <Link to="/admin">DASHBOARD</Link>
        </button>
        <button className="px-5 py-3 w-full text-sm font-semibold text-left text-indigo-50 bg-lime-600 rounded-lg border-[none]">
          REPORT
        </button>
        <button className="px-5 py-3 w-full text-sm font-semibold text-left text-indigo-50 rounded-lg bg-slate-500 border-[none]">
         <Link to="/communication">COMMUNICATION</Link> 
        </button>
      </div>
    </nav>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white border border-b max-md:px-6 max-md:py-3 max-sm:px-4 max-sm:py-2">
      <div className="flex items-center">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F5df8c00e19744252b631cb11d36a5da1%2F66e052488824fd42c29c46e9a02d5615a6d59d1611ee3d92ea059e3f96cce4c4"
          alt="Zidio Development"
          className="h-[40px]"
        />
      </div>
      <div className="flex gap-8 items-center">
        <nav className="flex gap-5 max-sm:hidden">
          <button className="px-5 py-2.5 text-sm font-semibold text-indigo-50 bg-sky-800 rounded-lg transition-all cursor-pointer border-[none] duration-[0.3s] ease-[ease-in-out] shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <Link to="/admin">DASHBOARD</Link>
          </button>
          <button className="px-5 py-2.5 text-sm font-semibold text-indigo-50 bg-lime-600 rounded-lg transition-all cursor-pointer border-[none] duration-[0.3s] ease-[ease-in-out] shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
          <Link to="/report">REPORT</Link> 
          </button>
          <button className="px-5 py-2.5 text-sm font-semibold text-indigo-50 rounded-lg transition-all cursor-pointer bg-slate-500 border-[none] duration-[0.3s] ease-[ease-in-out] shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
          <Link to="/communication">COMMUNICATION</Link> 
          </button>
        </nav>
        <button className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md transition-all cursor-pointer border-[none] duration-[0.2s] ease-[ease-in-out]">
          <Link to = "/selectrole">LOGIN</Link>
        </button>
        <button
          className="hidden ml-6 transition-transform cursor-pointer duration-[0.3s] ease-[ease] max-sm:block"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className="ti ti-menu-2 text-2xl text-gray-900" />
        </button>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} />
    </header>
  );
};

function InputDesign() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 50);
    });
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <main className="flex overflow-hidden flex-col max-w-full min-h-screen bg-blue-50">
        <Navbar />
        <div className="flex overflow-hidden relative flex-col flex-auto p-9 bg-indigo-50 max-md:p-8 max-sm:p-5">
          <HeroSection />
          <FeaturesSection />
        </div>
      </main>
    </>
  );
}

export default InputDesign;

