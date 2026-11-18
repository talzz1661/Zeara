import React, { useState } from "react";

const TEMPLATES = [
  {
    id: "01",
    file: "routine_01.tpl",
    title: "Push / Pull / Legs",
    subtitle: "3 days/week · Hypertrophy",
    badge: "6 exercises / session",
    tag: "PUSH / PULL / LEGS",
    headerGrad: "from-white via-[#A9DDF4]/40 to-[#A9DDF4]",
    badgeBg: "bg-[#A9DDF4]",
    icon: "sparkle",
    exercises: ["Bench Press · 4×8", "Incline DB Press · 3×10", "Barbell Row · 4×8", "Lat Pulldown · 3×12", "Back Squat · 4×6", "Romanian Deadlift · 3×10"],
  },
  {
    id: "02",
    file: "routine_02.tpl",
    title: "Upper / Lower Split",
    subtitle: "4 days/week · Balanced Strength",
    badge: "6 exercises / session",
    tag: "UPPER / LOWER / REPEAT",
    headerGrad: "from-white via-[#F5B9D7]/40 to-[#F5B9D7]",
    badgeBg: "bg-[#F5B9D7]",
    icon: "heart",
    exercises: ["Overhead Press · 4×8", "Pull-Ups · 4×8", "Cable Row · 3×12", "Front Squat · 4×8", "Leg Curl · 3×12", "Calf Raises · 4×15"],
  },
  {
    id: "03",
    file: "routine_03.tpl",
    title: "Full Body Starter",
    subtitle: "3 days/week · Beginner Friendly",
    badge: "5 exercises / session",
    tag: "FULL BODY / REST / REPEAT",
    headerGrad: "from-white via-[#E9DDF4]/40 to-[#E9DDF4]",
    badgeBg: "bg-[#E9DDF4]",
    icon: "sparkle",
    exercises: ["Goblet Squat · 3×10", "Push-Ups · 3×12", "Dumbbell Row · 3×10", "Glute Bridge · 3×12", "Plank Hold · 3×45s"],
  },
];

const VOLUME_BARS = [
  { week: "W1", height: "h-[18px]", color: "bg-[#A9DDF4]" },
  { week: "W2", height: "h-[24px]", color: "bg-[#A9DDF4]" },
  { week: "W3", height: "h-[20px]", color: "bg-[#A9DDF4]" },
  { week: "W4", height: "h-[31px]", color: "bg-[#A9DDF4]" },
  { week: "W5", height: "h-[28px]", color: "bg-[#A9DDF4]" },
  { week: "W6", height: "h-[38px]", color: "bg-[#A9DDF4]" },
  { week: "W7", height: "h-[47px]", color: "bg-[#A9DDF4]" },
  { week: "W8", height: "h-[54px]", color: "bg-[#F5B9D7]" },
];

export default function ZearaDesktopLandingPage({
  onSignIn,
  onGetStarted,
  onExploreDemo,
}) {
  const [showPrPopup, setShowPrPopup] = useState(true);
  const [loggedSets, setLoggedSets] = useState({ set1: true, set2: false });
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const toggleSet = (key) => {
    setLoggedSets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F7FA] text-[#292B38] font-dMSans overflow-x-hidden selection:bg-[#E9DDF4]">
      {/* 1. TOP STICKY NAVBAR */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#292B38]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 h-[84px] lg:h-[102px] flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="font-bodoniModa text-[40px] sm:text-5xl leading-none text-[#292B38]">
              Zeara
            </span>
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              className="w-7 h-7 sm:w-[35px] sm:h-[35px] transition-transform duration-300 group-hover:rotate-12"
            >
              <path
                d="M17.5 1.45834L21.875 13.125L33.5416 17.5L21.875 21.875L17.5 33.5417L13.125 21.875L1.45831 17.5L13.125 13.125L17.5 1.45834Z"
                stroke="#292B38"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[15px] font-medium text-[#292B38]">
            <button
              type="button"
              onClick={() => scrollToSection("features")}
              className="cursor-pointer hover:underline underline-offset-4"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("how-it-works")}
              className="cursor-pointer hover:underline underline-offset-4"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("templates")}
              className="cursor-pointer hover:underline underline-offset-4"
            >
              Templates
            </button>
          </nav>

          {/* Right Auth CTAs */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => onSignIn && onSignIn()}
              className="cursor-pointer h-11 sm:h-12 px-5 sm:px-6 rounded-3xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] hover:bg-[#F8F7FA] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all text-sm sm:text-base font-bold text-[#292B38]"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => onGetStarted && onGetStarted()}
              className="cursor-pointer h-11 sm:h-12 px-5 sm:px-7 rounded-3xl border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all text-sm sm:text-base font-bold text-[#292B38]"
            >
              Get Started ↗
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION (Graph Paper Background 28x28) */}
      <section
        id="top"
        className="w-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, #D9EAF5 1px, transparent 1px),
            linear-gradient(to bottom, #D9EAF5 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 pt-9 pb-14 lg:py-12">
          {/* Top Micro-Tagline Right */}
          <div className="hidden lg:flex justify-end mb-2">
            <span className="font-spaceGrotesk text-[11px] font-medium tracking-wide text-[#676B7F]">
              A LITTLE PROGRESS, EVERY DAY.
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
            {/* Left Copy Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-start">
              {/* Retro Address Pill */}
              <div className="inline-flex items-center gap-2 rounded-[7px] border-2 border-[#292B38] bg-white px-3 py-1.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2.66669 1.33333L12.6667 8L7.33335 8.66666L5.33335 14L2.66669 1.33333Z"
                    stroke="#292B38"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-spaceGrotesk text-xs font-medium text-[#292B38]">
                  zeara://your-fitness-space
                </span>
              </div>

              {/* Dual-Font Display Headline */}
              <h1 className="mt-6">
                <span className="block font-spaceGrotesk text-[48px] sm:text-[64px] xl:text-[70px] font-bold leading-[1.08] text-[#292B38]">
                  Plan. Track.
                </span>
                <span className="relative inline-block font-bodoniModa text-[62px] sm:text-[82px] xl:text-[88px] leading-[1.05] text-[#292B38] mt-1">
                  Analyze.
                  {/* Pink Underline Bar */}
                  <span className="block w-full max-w-[341px] h-2 bg-[#F5B9D7] mt-1" />
                </span>
              </h1>

              <h2 className="font-spaceGrotesk text-[32px] sm:text-[44px] xl:text-[50px] font-medium leading-[1.1] text-[#292B38] mt-6">
                Your workouts, organized.
              </h2>

              <p className="text-[#676B7F] text-base sm:text-[17px] leading-[27px] max-w-[540px] mt-5">
                A little structure. A lot of progress. Build your routines, log
                every rep, and watch your stronger self take shape.
              </p>

              {/* Hero CTAs */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-5 mt-8">
                <button
                  type="button"
                  onClick={() => onGetStarted && onGetStarted()}
                  className="cursor-pointer h-12 px-8 rounded-3xl border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all text-base font-bold text-[#292B38]"
                >
                  Start Free ↗
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onExploreDemo ? onExploreDemo() : scrollToSection("features")
                  }
                  className="cursor-pointer h-12 px-7 rounded-3xl border-2 border-[#292B38] bg-gradient-to-b from-white via-[#F5B9D7]/40 to-[#F5B9D7] shadow-[4px_4px_0_0_#292B38] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all text-base font-bold text-[#292B38]"
                >
                  Explore Demo ▷
                </button>
              </div>

              <p className="text-[#676B7F] text-[13px] font-medium mt-6">
                No credit card. Just your next rep.
              </p>

              {/* Bottom Pixel Heart + Tagline */}
              <div className="flex items-center gap-2.5 mt-7">
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                  <path
                    d="M2 0H6V2H8V0H12V2H14V6H12V8H10V10H8V12H6V10H4V8H2V6H0V2H2V0Z"
                    fill="#292B38"
                  />
                </svg>
                <span className="font-spaceGrotesk text-[11px] font-medium tracking-wide text-[#292B38]">
                  YOUR SPACE. YOUR PACE. YOUR PROGRESS.
                </span>
              </div>
            </div>

            {/* Right Layered Retro Browser Stack (7 cols) */}
            <div className="lg:col-span-7 relative pt-6 pb-8 sm:pl-6">
              {/* Top-Left Pink Pixel Sparkle */}
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                className="hidden sm:block w-[35px] h-[35px] absolute left-0 top-1 z-20 pointer-events-none"
              >
                <path
                  d="M15 0H20V10H25V15H35V20H25V25H20V35H15V25H10V20H0V15H10V10H15V0Z"
                  fill="#F5B9D7"
                />
              </svg>

              {/* Back Lavender Window: your_stronger_self.exe */}
              <div className="hidden sm:block w-[88%] h-[82%] rounded-[13px] border-2 border-[#292B38] bg-[#E9DDF4] shadow-[4px_4px_0_0_#292B38] absolute right-0 top-3 overflow-hidden">
                <div className="h-[34px] border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#E9DDF4]/40 to-[#E9DDF4] px-4 flex items-center justify-between">
                  <span className="font-spaceGrotesk text-xs font-medium text-[#292B38]">
                    your_stronger_self.exe
                  </span>
                  <span className="font-spaceGrotesk text-sm font-medium text-[#292B38]">
                    — □ ×
                  </span>
                </div>
              </div>

              {/* Front Main Browser Frame: zeara://my-space/dashboard */}
              <div className="relative z-10 sm:mt-10 sm:mr-8 rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden">
                {/* Browser Top Bar */}
                <div className="h-11 border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] px-3.5 flex items-center justify-between gap-3">
                  {/* 3 Retro Square Dots */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-sm border-2 border-[#292B38] bg-[#F5B9D7]" />
                    <span className="w-2.5 h-2.5 rounded-sm border-2 border-[#292B38] bg-[#E9DDF4]" />
                    <span className="w-2.5 h-2.5 rounded-sm border-2 border-[#292B38] bg-white" />
                  </div>

                  {/* URL Box */}
                  <div className="flex-1 max-w-[445px] h-[26px] rounded-[5px] border-2 border-[#292B38] bg-white px-3 flex items-center">
                    <span className="font-spaceGrotesk text-[11px] font-medium text-[#292B38] truncate">
                      zeara://my-space/dashboard
                    </span>
                  </div>

                  <span className="hidden sm:inline font-spaceGrotesk text-sm font-medium text-[#292B38] shrink-0">
                    — □ ×
                  </span>
                </div>

                {/* Dashboard Screenshot Preview */}
                <div className="p-3 bg-white">
                  <img
                    src="/DashboardV3Preview.png"
                    alt="Dashboard V3 preview"
                    className="w-full h-auto rounded-sm object-cover block"
                  />
                </div>
              </div>

              {/* Floating Achievement Toast: achievement_unlocked.exe */}
              {showPrPopup ? (
                <div className="relative sm:absolute sm:right-2 sm:bottom-1 z-20 mt-4 sm:mt-0 w-full sm:w-[254px] rounded-[9px] border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden">
                  <div className="h-7 border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#F5B9D7]/40 to-[#F5B9D7] px-2.5 flex items-center justify-between">
                    <span className="font-spaceGrotesk text-[10px] font-medium text-[#292B38]">
                      achievement_unlocked.exe
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPrPopup(false)}
                      aria-label="Close achievement toast"
                      className="cursor-pointer font-spaceGrotesk text-base font-medium leading-none text-[#292B38] hover:opacity-70"
                    >
                      ×
                    </button>
                  </div>
                  <div className="p-3.5 flex items-center gap-3">
                    {/* Pixel Sparkle Icon */}
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
                      <path
                        d="M12 0H16V8H20V12H28V16H20V20H16V28H12V20H8V16H0V12H8V8H12V0Z"
                        fill="#F5B9D7"
                      />
                    </svg>
                    <div>
                      <p className="font-spaceGrotesk text-lg font-bold leading-tight text-[#292B38]">
                        New PR! +5 kg
                      </p>
                      <p className="text-[#676B7F] text-[11px] mt-0.5">
                        Look at you getting stronger.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPrPopup(true)}
                  className="cursor-pointer sm:absolute sm:right-2 sm:bottom-2 z-20 mt-3 sm:mt-0 px-3 py-1 rounded-full border-2 border-[#292B38] bg-[#F5B9D7] font-spaceGrotesk text-[11px] font-bold shadow-[2px_2px_0_0_#292B38]"
                >
                  ✦ Show PR Toast
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION: 01 / A HOME FOR EVERY REP */}
      <section id="features" className="w-full bg-[#F8F7FA]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-12">
          <div className="w-full h-px bg-[#D9EAF5] mb-11" />

          {/* Section Heading Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <p className="font-spaceGrotesk text-xs font-medium text-[#676B7F]">
                01 / A HOME FOR EVERY REP
              </p>
              <h2 className="font-spaceGrotesk text-[32px] sm:text-[40px] font-medium leading-[1.2] text-[#292B38] mt-3">
                Less friction. More momentum.
              </h2>
            </div>
            <p className="text-[#676B7F] text-[15px] leading-[23px] max-w-[340px]">
              Everything you need to keep showing up. Nothing to get in your
              way.
            </p>
          </div>

          {/* 3 Feature Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {/* Card 01 / PLAN */}
            <div className="rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden flex flex-col justify-between">
              <div className="h-[39px] border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] px-4 flex items-center justify-between">
                <span className="font-spaceGrotesk text-[13px] font-bold text-[#292B38]">
                  01 / PLAN
                </span>
                <span className="w-[23px] h-[23px] rounded-[3px] border-2 border-[#292B38] bg-white flex items-center justify-center text-sm font-bold leading-none">
                  ✦
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-spaceGrotesk text-[23px] font-medium leading-8 text-[#292B38]">
                    Routine &amp; Template Builder
                  </h3>
                  <p className="text-[#676B7F] text-sm leading-[22px] mt-2">
                    Your plan, your way. Build a routine from scratch or start
                    with a template that fits your goals.
                  </p>
                </div>

                {/* Mini UI Widget */}
                <div className="mt-5 rounded-[7px] bg-[#F8F7FA] p-3 space-y-2.5">
                  <div className="flex items-center justify-between px-0.5">
                    <span className="font-spaceGrotesk text-[10px] font-medium text-[#676B7F]">
                      MY ROUTINES
                    </span>
                    <span className="text-[11px] font-bold text-[#292B38]">
                      + New
                    </span>
                  </div>

                  {/* Mini Routine 1 */}
                  <div className="rounded-[5px] border-2 border-[#292B38] bg-white px-2.5 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-[5px] bg-[#A9DDF4] flex items-center justify-center shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M6 3V5M6 5H5C3.66667 5 3 5.66667 3 7V9M6 5H18M18 3V5M18 5H19C20.3333 5 21 5.66667 21 7V9M3 9H21M3 9V19C3 20.3333 3.66667 21 5 21H19C20.3333 21 21 20.3333 21 19V9"
                            stroke="#292B38"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <div>
                        <p className="text-[13px] font-medium leading-tight text-[#292B38]">
                          Upper body strength
                        </p>
                        <p className="text-[10px] text-[#676B7F]">
                          6 exercises · 50 min
                        </p>
                      </div>
                    </div>
                    <span className="text-base font-medium text-[#292B38]">↗</span>
                  </div>

                  {/* Mini Routine 2 */}
                  <div className="rounded-[5px] border-2 border-[#292B38] bg-white px-2.5 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-[5px] bg-[#E9DDF4] flex items-center justify-center shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M6 3V5M6 5H5C3.66667 5 3 5.66667 3 7V9M6 5H18M18 3V5M18 5H19C20.3333 5 21 5.66667 21 7V9M3 9H21M3 9V19C3 20.3333 3.66667 21 5 21H19C20.3333 21 21 20.3333 21 19V9"
                            stroke="#292B38"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <div>
                        <p className="text-[13px] font-medium leading-tight text-[#292B38]">
                          Lower body power
                        </p>
                        <p className="text-[10px] text-[#676B7F]">
                          5 exercises · 45 min
                        </p>
                      </div>
                    </div>
                    <span className="text-base font-medium text-[#292B38]">↗</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 02 / TRACK */}
            <div className="rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden flex flex-col justify-between">
              <div className="h-[39px] border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#F5B9D7]/40 to-[#F5B9D7] px-4 flex items-center justify-between">
                <span className="font-spaceGrotesk text-[13px] font-bold text-[#292B38]">
                  02 / TRACK
                </span>
                <span className="w-[23px] h-[23px] rounded-[3px] border-2 border-[#292B38] bg-white flex items-center justify-center">
                  <svg width="13" height="11" viewBox="0 0 14 12" fill="none">
                    <path
                      d="M2 0H6V2H8V0H12V2H14V6H12V8H10V10H8V12H6V10H4V8H2V6H0V2H2V0Z"
                      fill="#292B38"
                    />
                  </svg>
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-spaceGrotesk text-[23px] font-medium leading-8 text-[#292B38]">
                    Fast Set &amp; Rep Logger
                  </h3>
                  <p className="text-[#676B7F] text-sm leading-[22px] mt-2">
                    Stay in your flow. Log weight, reps, and sets without losing
                    focus between lifts.
                  </p>
                </div>

                {/* Mini Interactive Logger Widget */}
                <div className="mt-5 rounded-[7px] bg-[#F8F7FA] p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-spaceGrotesk text-[11px] font-bold text-[#292B38]">
                      BENCH PRESS
                    </span>
                    <span className="font-spaceGrotesk text-[10px] font-medium text-[#292B38]">
                      ● LIVE
                    </span>
                  </div>

                  {/* Table Columns */}
                  <div className="grid grid-cols-12 items-center text-[9px] font-bold text-[#676B7F] mt-3 mb-1.5 px-1">
                    <span className="col-span-3">SET</span>
                    <span className="col-span-3 text-center">KG</span>
                    <span className="col-span-3 text-center">REPS</span>
                    <span className="col-span-3 text-right">DONE</span>
                  </div>

                  {/* Row 01 */}
                  <div className="grid grid-cols-12 items-center gap-2 py-1 px-1">
                    <span className="col-span-3 font-spaceGrotesk text-[15px] font-medium">
                      01
                    </span>
                    <div className="col-span-3 flex justify-center">
                      <span className="w-[74px] h-[30px] rounded border-2 border-[#292B38] bg-white flex items-center justify-center font-spaceGrotesk text-sm font-medium">
                        60
                      </span>
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <span className="w-[74px] h-[30px] rounded border-2 border-[#292B38] bg-white flex items-center justify-center font-spaceGrotesk text-sm font-medium">
                        8
                      </span>
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => toggleSet("set1")}
                        aria-label="Toggle set 1"
                        className={`cursor-pointer w-[23px] h-[23px] rounded border-2 border-[#292B38] flex items-center justify-center transition-colors ${
                          loggedSets.set1 ? "bg-[#F5B9D7]" : "bg-white"
                        }`}
                      >
                        {loggedSets.set1 && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M5 12L10 17L20 6"
                              stroke="#292B38"
                              strokeWidth="2.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Row 02 */}
                  <div className="grid grid-cols-12 items-center gap-2 py-1 px-1 mt-1">
                    <span className="col-span-3 font-spaceGrotesk text-[15px] font-medium">
                      02
                    </span>
                    <div className="col-span-3 flex justify-center">
                      <span className="w-[74px] h-[30px] rounded border-2 border-[#292B38] bg-white flex items-center justify-center font-spaceGrotesk text-sm font-medium">
                        60
                      </span>
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <span className="w-[74px] h-[30px] rounded border-2 border-[#292B38] bg-white flex items-center justify-center font-spaceGrotesk text-sm font-medium">
                        8
                      </span>
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => toggleSet("set2")}
                        aria-label="Toggle set 2"
                        className={`cursor-pointer w-[23px] h-[23px] rounded border-2 border-[#292B38] flex items-center justify-center transition-colors ${
                          loggedSets.set2 ? "bg-[#F5B9D7]" : "bg-white"
                        }`}
                      >
                        {loggedSets.set2 && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M5 12L10 17L20 6"
                              stroke="#292B38"
                              strokeWidth="2.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 03 / ANALYZE */}
            <div className="rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden flex flex-col justify-between">
              <div className="h-[39px] border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#E9DDF4]/40 to-[#E9DDF4] px-4 flex items-center justify-between">
                <span className="font-spaceGrotesk text-[13px] font-bold text-[#292B38]">
                  03 / ANALYZE
                </span>
                <span className="w-[23px] h-[23px] rounded-[3px] border-2 border-[#292B38] bg-white flex items-center justify-center text-sm font-bold leading-none">
                  ✦
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-spaceGrotesk text-[23px] font-medium leading-8 text-[#292B38]">
                    Volume &amp; PR Analytics
                  </h3>
                  <p className="text-[#676B7F] text-sm leading-[22px] mt-2">
                    See the bigger picture. Turn everyday effort into progress
                    you can actually see.
                  </p>
                </div>

                {/* Mini Bar Chart Widget */}
                <div className="mt-5 rounded-[7px] bg-[#F8F7FA] p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-spaceGrotesk text-[10px] font-medium text-[#676B7F]">
                      WEEKLY VOLUME
                    </span>
                    <span className="font-spaceGrotesk text-[11px] font-bold text-[#292B38]">
                      +18.4% ↗
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="font-spaceGrotesk text-3xl font-medium text-[#292B38]">
                      4,150
                    </span>
                    <span className="text-xs text-[#676B7F]">kg</span>
                  </div>

                  {/* Bar Graph */}
                  <div className="relative h-[60px] mt-1 flex flex-col justify-between">
                    <div className="w-full h-px bg-[#D9EAF5]" />
                    <div className="w-full h-px bg-[#D9EAF5]" />
                    <div className="w-full h-px bg-[#D9EAF5]" />

                    <div className="absolute inset-x-1 bottom-0 flex items-end justify-between gap-2">
                      {VOLUME_BARS.map((bar) => (
                        <div
                          key={bar.week}
                          className={`flex-1 max-w-[23px] rounded-[3px] ${bar.height} ${bar.color}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="font-spaceGrotesk text-[8px] font-medium text-[#676B7F] mt-2">
                    8 WEEKS OF GETTING STRONGER
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-9">
            <span className="font-spaceGrotesk text-[11px] font-medium text-[#676B7F]">
              BUILT FOR REAL ROUTINES. AND REAL LIFE.
            </span>
            <button
              type="button"
              onClick={() => onGetStarted && onGetStarted()}
              className="cursor-pointer text-sm font-medium text-[#292B38] hover:underline self-start sm:self-auto"
            >
              Small steps. Stronger you. ↗
            </button>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION: 02 / YOUR ROUTINE, ON REPEAT */}
      <section
        id="how-it-works"
        className="w-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, #D9EAF5 1px, transparent 1px),
            linear-gradient(to bottom, #D9EAF5 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-11 lg:py-12">
          <p className="font-spaceGrotesk text-xs font-medium text-[#676B7F]">
            02 / YOUR ROUTINE, ON REPEAT
          </p>
          <h2 className="font-spaceGrotesk text-[32px] sm:text-[40px] font-medium leading-[1.2] text-[#292B38] mt-3">
            Find your rhythm in three steps.
          </h2>

          {/* 3 Steps with Desktop Arrows */}
          <div className="mt-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
            {/* Step 01 */}
            <div className="flex-1 rounded-[10px] border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden">
              <div className="h-[30px] border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] px-3.5 flex items-center justify-between">
                <span className="font-spaceGrotesk text-[11px] font-medium text-[#292B38]">
                  step_01.exe
                </span>
                <span className="font-spaceGrotesk text-sm font-medium text-[#292B38]">
                  ×
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3.5">
                  <span className="w-[34px] h-[34px] rounded-md border-2 border-[#292B38] bg-[#A9DDF4] flex items-center justify-center font-spaceGrotesk text-xl font-bold shrink-0">
                    1
                  </span>
                  <h3 className="font-spaceGrotesk text-[19px] font-medium leading-tight text-[#292B38]">
                    Pick or Build a Routine
                  </h3>
                </div>
                <p className="text-[#676B7F] text-[15px] leading-6 mt-4">
                  Choose a ready-to-go template or build something that feels
                  like you.
                </p>
              </div>
            </div>

            {/* Connector Arrow 1 */}
            <div className="hidden lg:flex items-center shrink-0">
              <div className="w-10 h-0.5 bg-[#292B38]" />
              <span className="font-spaceGrotesk text-[27px] leading-none -ml-2">
                →
              </span>
            </div>

            {/* Step 02 */}
            <div className="flex-1 rounded-[10px] border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden">
              <div className="h-[30px] border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#F5B9D7]/40 to-[#F5B9D7] px-3.5 flex items-center justify-between">
                <span className="font-spaceGrotesk text-[11px] font-medium text-[#292B38]">
                  step_02.exe
                </span>
                <span className="font-spaceGrotesk text-sm font-medium text-[#292B38]">
                  ×
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3.5">
                  <span className="w-[34px] h-[34px] rounded-md border-2 border-[#292B38] bg-[#F5B9D7] flex items-center justify-center font-spaceGrotesk text-xl font-bold shrink-0">
                    2
                  </span>
                  <h3 className="font-spaceGrotesk text-[19px] font-medium leading-tight text-[#292B38]">
                    Log Sets in Real Time
                  </h3>
                </div>
                <p className="text-[#676B7F] text-[15px] leading-6 mt-4">
                  Your next set is one tap away. Less screen time, more lift
                  time.
                </p>
              </div>
            </div>

            {/* Connector Arrow 2 */}
            <div className="hidden lg:flex items-center shrink-0">
              <div className="w-10 h-0.5 bg-[#292B38]" />
              <span className="font-spaceGrotesk text-[27px] leading-none -ml-2">
                →
              </span>
            </div>

            {/* Step 03 */}
            <div className="flex-1 rounded-[10px] border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden">
              <div className="h-[30px] border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#E9DDF4]/40 to-[#E9DDF4] px-3.5 flex items-center justify-between">
                <span className="font-spaceGrotesk text-[11px] font-medium text-[#292B38]">
                  step_03.exe
                </span>
                <span className="font-spaceGrotesk text-sm font-medium text-[#292B38]">
                  ×
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3.5">
                  <span className="w-[34px] h-[34px] rounded-md border-2 border-[#292B38] bg-[#E9DDF4] flex items-center justify-center font-spaceGrotesk text-xl font-bold shrink-0">
                    3
                  </span>
                  <h3 className="font-spaceGrotesk text-[19px] font-medium leading-tight text-[#292B38]">
                    Track Volume &amp; PRs
                  </h3>
                </div>
                <p className="text-[#676B7F] text-[15px] leading-6 mt-4">
                  Watch your consistency add up. Celebrate every little
                  breakthrough.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TEMPLATES SECTION: 03 / WORKOUT TEMPLATES */}
      <section id="templates" className="w-full bg-[#F8F7FA]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
            <div>
              <p className="font-spaceGrotesk text-xs font-medium text-[#676B7F]">
                03 / WORKOUT TEMPLATES
              </p>
              <h2 className="font-spaceGrotesk text-[32px] sm:text-[40px] font-medium leading-[1.2] text-[#292B38] mt-3">
                Start fast with proven routines.
              </h2>
            </div>
            <span className="font-spaceGrotesk text-[11px] font-medium text-[#676B7F]">
              YOUR NEXT ROUTINE IS READY.
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {TEMPLATES.map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden flex flex-col justify-between"
              >
                <div
                  className={`h-[39px] border-b-2 border-[#292B38] bg-gradient-to-b ${tpl.headerGrad} px-4 flex items-center justify-between`}
                >
                  <span className="font-spaceGrotesk text-[13px] font-medium text-[#292B38]">
                    {tpl.file}
                  </span>
                  <span className="w-[23px] h-[23px] rounded-[3px] border-2 border-[#292B38] bg-white flex items-center justify-center">
                    {tpl.icon === "heart" ? (
                      <svg width="13" height="11" viewBox="0 0 14 12" fill="none">
                        <path
                          d="M2 0H6V2H8V0H12V2H14V6H12V8H10V10H8V12H6V10H4V8H2V6H0V2H2V0Z"
                          fill="#292B38"
                        />
                      </svg>
                    ) : (
                      <span className="text-sm font-bold leading-none">✦</span>
                    )}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="font-spaceGrotesk text-2xl font-medium text-[#292B38]">
                    {tpl.title}
                  </h3>
                  <p className="text-[#676B7F] text-sm mt-1">{tpl.subtitle}</p>

                  <span
                    className={`inline-block mt-4 px-3.5 py-1.5 rounded-[5px] ${tpl.badgeBg} font-spaceGrotesk text-[11px] font-medium text-[#292B38]`}
                  >
                    {tpl.badge}
                  </span>

                  <p className="font-spaceGrotesk text-[10px] font-medium text-[#676B7F] mt-4">
                    {tpl.tag}
                  </p>

                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(tpl)}
                    className="cursor-pointer mt-4 w-full h-11 rounded-3xl border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all text-sm font-bold text-[#292B38]"
                  >
                    Preview Template →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM LAVENDER CTA BANNER */}
      <section className="w-full bg-[#E9DDF4] border-y-2 border-[#292B38] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-9 relative flex items-center justify-center">
          {/* Decorative Left Pixel Heart */}
          <svg
            width="49"
            height="42"
            viewBox="0 0 49 42"
            fill="none"
            className="hidden xl:block w-[49px] h-[42px] absolute left-36 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <path
              d="M7 0H21V7H28V0H42V7H49V21H42V28H35V35H28V42H21V35H14V28H7V21H0V7H7V0Z"
              fill="#F5B9D7"
            />
          </svg>

          {/* Decorative Right White Sparkle */}
          <svg
            width="49"
            height="49"
            viewBox="0 0 49 49"
            fill="none"
            className="hidden xl:block w-[49px] h-[49px] absolute right-36 top-16 pointer-events-none"
          >
            <path
              d="M21 0H28V14H35V21H49V28H35V35H28V49H21V35H14V28H0V21H14V14H21V0Z"
              fill="#FFFFFF"
            />
          </svg>

          {/* Decorative Bottom-Right Dark Sparkle */}
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            className="hidden xl:block w-[21px] h-[21px] absolute right-36 bottom-16 pointer-events-none"
          >
            <path
              d="M9 0H12V6H15V9H21V12H15V15H12V21H9V15H6V12H0V9H6V6H9V0Z"
              fill="#292B38"
            />
          </svg>

          {/* Center Retro Window */}
          <div className="w-full max-w-[992px] rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden">
            <div className="h-[38px] border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] px-4 flex items-center justify-between">
              <span className="font-spaceGrotesk text-xs font-medium text-[#292B38]">
                zeara://a-stronger-you
              </span>
              <span className="font-spaceGrotesk text-sm font-medium text-[#292B38]">
                — □ ×
              </span>
            </div>

            <div className="px-6 py-8 sm:py-10 text-center flex flex-col items-center">
              <h2 className="font-spaceGrotesk text-[30px] sm:text-[42px] font-medium leading-[1.18] text-[#292B38]">
                Your stronger self is loading...
              </h2>
              <p className="text-[#676B7F] text-base sm:text-[17px] mt-3">
                Plan with purpose. Track with ease. Make progress your own.
              </p>

              <button
                type="button"
                onClick={() => onGetStarted && onGetStarted()}
                className="cursor-pointer mt-7 h-[49px] px-8 rounded-[25px] border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all text-[15px] font-bold text-[#292B38]"
              >
                Get Started — It’s Free ↗
              </button>

              <p className="text-[#676B7F] text-xs mt-5">
                No credit card required. Your future self says thanks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <span className="font-bodoniModa text-4xl leading-none text-[#292B38]">
              Zeara
            </span>
            <div className="w-px h-9 bg-[#D9EAF5]" />
            <div>
              <p className="font-spaceGrotesk text-xs font-medium text-[#292B38]">
                ZEARA OS / V. 2.0
              </p>
              <p className="text-[#676B7F] text-[11px] mt-0.5">
                A little progress, every day.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[13px] font-medium text-[#292B38]">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:underline">
              Privacy
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:underline">
              Terms
            </a>
            <div className="flex items-center gap-2 text-xs font-normal text-[#676B7F]">
              <span className="w-2 h-2 rounded bg-[#A9DDF4] inline-block" />
              <span>All systems go · © 2026 Zeara</span>
            </div>
          </div>
        </div>
      </footer>

      {/* OPTIONAL TEMPLATE PREVIEW MODAL */}
      {previewTemplate && (
        <div
          className="fixed inset-0 z-50 bg-[#292B38]/40 backdrop-blur-[1px] flex items-center justify-center p-4"
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            className="w-full max-w-md rounded-xl border-2 border-[#292B38] bg-white shadow-[6px_6px_0_0_#292B38] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`h-[38px] border-b-2 border-[#292B38] bg-gradient-to-b ${previewTemplate.headerGrad} px-4 flex items-center justify-between`}
            >
              <span className="font-spaceGrotesk text-xs font-bold text-[#292B38]">
                {previewTemplate.file}
              </span>
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="cursor-pointer font-spaceGrotesk text-base font-bold text-[#292B38]"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <h3 className="font-spaceGrotesk text-2xl font-medium text-[#292B38]">
                {previewTemplate.title}
              </h3>
              <p className="text-[#676B7F] text-sm mt-1">
                {previewTemplate.subtitle}
              </p>
              <ul className="mt-4 space-y-2">
                {previewTemplate.exercises.map((ex) => (
                  <li
                    key={ex}
                    className="rounded-md border border-[#D2D2D8] bg-[#F8F7FA] px-3 py-2 font-spaceGrotesk text-xs font-medium text-[#292B38]"
                  >
                    {ex}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  setPreviewTemplate(null);
                  if (onGetStarted) onGetStarted();
                }}
                className="cursor-pointer mt-5 w-full h-11 rounded-3xl border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] text-sm font-bold text-[#292B38]"
              >
                Use This Template ↗
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}