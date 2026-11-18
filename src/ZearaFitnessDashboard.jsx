import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CHART_DATA = {
  "8 weeks": {
    subtitle: "Weekly training volume · kg",
    labels: ["Sep 28", "Oct 5", "Oct 12", "Oct 19", "Oct 26", "Nov 2", "Nov 9", "Nov 16"],
    tooltip: "4,150 kg",
    // Path area & line sesuai desain Figma
    areaPath:
      "M0 44.0625C45.14 44.0625 45.14 31.875 90.28 31.875C135.42 31.875 135.42 36.5625 180.56 36.5625C225.7 36.5625 225.7 19.6875 270.84 19.6875C315.98 19.6875 315.98 24.375 361.12 24.375C406.26 24.375 406.26 6.5625 451.4 6.5625C496.54 6.5625 496.54 0 541.68 0C586.82 0 586.82 59.5312 631.96 59.5312L632 98.4375H0V44.0625Z",
    linePath:
      "M0 45.3125C45.14 45.3125 45.14 33.125 90.28 33.125C135.42 33.125 135.42 37.8125 180.56 37.8125C225.7 37.8125 225.7 20.9375 270.84 20.9375C315.98 20.9375 315.98 25.625 361.12 25.625C406.26 25.625 406.26 7.8125 451.4 7.8125C496.54 7.8125 496.54 1.25 541.68 1.25C586.82 1.25 586.82 60.7812 631.96 60.7812",
  },
  "6 months": {
    subtitle: "Monthly average volume · kg",
    labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    tooltip: "13,840 kg",
    areaPath:
      "M0 68C63 68 63 54 126 54C189 54 189 42 252 42C315 42 315 28 378 28C441 28 441 16 504 16C567 16 567 10 632 10L632 98.4375H0V68Z",
    linePath:
      "M0 69.25C63 69.25 63 55.25 126 55.25C189 55.25 189 43.25 252 43.25C315 43.25 315 29.25 378 29.25C441 29.25 441 17.25 504 17.25C567 17.25 567 11.25 632 11.25",
  },
};

const WEEK_DAYS = [
  { day: "M", date: "16", status: "completed" },
  { day: "T", date: "17", status: "rest" },
  { day: "W", date: "18", status: "planned" },
  { day: "T", date: "19", status: "rest" },
  { day: "F", date: "20", status: "planned" },
  { day: "S", date: "21", status: "planned" },
  { day: "S", date: "22", status: "rest" },
];

const RECENT_SESSIONS = [
  {
    id: 1,
    name: "Upper body strength",
    date: "Today, Nov 16",
    duration: "52 min",
    volume: "4,150 kg",
    prs: "2 PRs",
    badgeBg: "bg-[#A9DDF4]",
  },
  {
    id: 2,
    name: "Lower body power",
    date: "Sat, Nov 14",
    duration: "48 min",
    volume: "3,900 kg",
    prs: "1 PR",
    badgeBg: "bg-[#E9DDF4]",
  },
  {
    id: 3,
    name: "Full body flow",
    date: "Thu, Nov 12",
    duration: "56 min",
    volume: "4,400 kg",
    prs: "3 PRs",
    badgeBg: "bg-[#F5B9D7]",
  },
];

export default function ZearaFitnessDashboard({
  user,
  onNavigate,
  onCreateRoutine,
  onStartWorkout,
}) {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [timeframe, setTimeframe] = useState("8 weeks");
  const [selectedDay, setSelectedDay] = useState("16");

  const displayName = user?.fullName || "Alex Morgan";
  const firstName = displayName.split(" ")[0];
  const currentChart = CHART_DATA[timeframe];

  const handleNavClick = (label) => {
    setActiveNav(label);
    if (onNavigate) onNavigate(label);
  };

  const handleOpenSession = (session) => {
    if (onNavigate) {
      onNavigate("Workout History");
    }
    navigate("/history", { state: { selectedSession: session } });
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F7FA] text-[#292B38] font-dMSans flex flex-col lg:flex-row selection:bg-[#E9DDF4]">
      {/* 1. LEFT SIDEBAR (242px on desktop) */}
      <aside className="w-full lg:w-[242px] shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-[#D2D2D8] flex flex-col justify-between p-4 lg:py-5 lg:px-4">
        <div>
          {/* Brand Logo + Metallic Silver Sparkle */}
          <div className="flex items-center justify-between px-2 pt-1">
            <span className="font-bodoniModa text-[48px] lg:text-[54px] leading-none tracking-[-0.037em] text-[#292B38]">
              Zeara
            </span>
            <svg
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[38px] h-[38px] shrink-0"
            >
              <path
                d="M21.064 1.89737L25.8557 16.2724L40.2307 21.064L25.8557 25.8557L21.064 40.2307L16.2723 25.8557L1.89734 21.064L16.2723 16.2724L21.064 1.89737Z"
                fill="url(#zeara_silver_sparkle)"
                stroke="#292B38"
                strokeWidth="1.2"
                strokeLinecap="square"
              />
              <defs>
                <linearGradient
                  id="zeara_silver_sparkle"
                  x1="21.064"
                  y1="1.89737"
                  x2="21.064"
                  y2="40.2307"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="0.2" stopColor="#E9E9EF" />
                  <stop offset="0.43" stopColor="white" />
                  <stop offset="0.49" stopColor="#969BAA" />
                  <stop offset="0.54" stopColor="#E9EAF1" />
                  <stop offset="0.78" stopColor="white" />
                  <stop offset="1" stopColor="#ADB2C2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p className="text-[#777987] text-[9px] font-bold tracking-wider uppercase px-3 mt-3">
            YOUR MOVEMENT, CONNECTED
          </p>

          <div className="h-px bg-[#D2D2D8] my-4 mx-2" />

          {/* Navigation Menu */}
          <p className="text-[#777987] text-[10px] font-bold tracking-wider uppercase px-3 mb-2.5">
            WORKSPACE
          </p>

          <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
            {/* Dashboard */}
            <button
              type="button"
              onClick={() => handleNavClick("Dashboard")}
              className={`cursor-pointer w-full h-[45px] px-3.5 rounded-[10px] flex items-center justify-between text-[13px] transition-all ${
                activeNav === "Dashboard"
                  ? "border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/30 to-[#A9DDF4] shadow-[3px_3px_0_0_#292B38] font-bold"
                  : "hover:bg-[#F8F7FA] font-medium"
              }`}
            >
              <span className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
                  <rect x="1.5" y="1.5" width="4.5" height="4.5" stroke="#292B38" strokeWidth="1.65" />
                  <rect x="9" y="1.5" width="4.5" height="4.5" stroke="#292B38" strokeWidth="1.65" />
                  <rect x="1.5" y="9" width="4.5" height="4.5" stroke="#292B38" strokeWidth="1.65" />
                  <rect x="9" y="9" width="4.5" height="4.5" stroke="#292B38" strokeWidth="1.65" />
                </svg>
                Dashboard
              </span>
              {activeNav === "Dashboard" && (
                <span className="w-[5px] h-[5px] rounded-sm bg-[#292B38]" />
              )}
            </button>

            {/* Workout Planner */}
            <button
              type="button"
              onClick={() => handleNavClick("Workout Planner")}
              className={`cursor-pointer w-full h-[45px] px-3.5 rounded-[10px] flex items-center justify-between text-[13px] transition-all ${
                activeNav === "Workout Planner"
                  ? "border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/30 to-[#A9DDF4] shadow-[3px_3px_0_0_#292B38] font-bold"
                  : "hover:bg-[#F8F7FA] font-medium"
              }`}
            >
              <span className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M2.49168 1.5H12.4917C13.4122 1.5 14.1583 2.24619 14.1583 3.16667V12.3333C14.1583 13.2538 13.4122 14 12.4917 14H2.49168C1.5712 14 0.825012 13.2538 0.825012 12.3333V3.16667C0.825012 2.24619 1.5712 1.5 2.49168 1.5Z"
                    stroke="#292B38"
                    strokeWidth="1.65"
                  />
                  <path
                    d="M0.825012 6.65833H14.1583M4.15835 0.825001V4.15833M10.825 0.825001V4.15833"
                    stroke="#292B38"
                    strokeWidth="1.65"
                    strokeLinecap="square"
                  />
                </svg>
                Workout Planner
              </span>
            </button>

            {/* Exercise Library */}
            <button
              type="button"
              onClick={() => handleNavClick("Exercise Library")}
              className={`cursor-pointer w-full h-[45px] px-3.5 rounded-[10px] flex items-center justify-between text-[13px] transition-all ${
                activeNav === "Exercise Library"
                  ? "border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/30 to-[#A9DDF4] shadow-[3px_3px_0_0_#292B38] font-bold"
                  : "hover:bg-[#F8F7FA] font-medium"
              }`}
            >
              <span className="flex items-center gap-3">
                <svg width="17" height="14" viewBox="0 0 17 14" fill="none">
                  <path
                    d="M0.825012 3.325V9.99167M3.32501 0.825V6.65833M3.32501 6.65833V12.4917M3.32501 6.65833H13.325M13.325 6.65833V0.825M13.325 6.65833V12.4917M15.825 3.325V9.99167"
                    stroke="#292B38"
                    strokeWidth="1.65"
                    strokeLinecap="square"
                  />
                </svg>
                Exercise Library
              </span>
            </button>

            {/* Workout History */}
            <button
              type="button"
              onClick={() => handleNavClick("Workout History")}
              className={`cursor-pointer w-full h-[45px] px-3.5 rounded-[10px] flex items-center justify-between text-[13px] transition-all ${
                activeNav === "Workout History"
                  ? "border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/30 to-[#A9DDF4] shadow-[3px_3px_0_0_#292B38] font-bold"
                  : "hover:bg-[#F8F7FA] font-medium"
              }`}
            >
              <span className="flex items-center gap-3">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M0.825012 6.20591C1.11369 4.7372 1.88823 3.40837 3.02393 2.43337C4.15962 1.45837 5.59039 0.893921 7.08587 0.83091C8.58135 0.767898 10.0545 1.20999 11.2682 2.086C12.4819 2.96201 13.3655 4.22098 13.7767 5.66019C14.1879 7.09941 14.1028 8.63513 13.5351 10.0201C12.9674 11.4051 11.9502 12.5587 10.6471 13.2953C9.34408 14.0319 7.83108 14.3085 6.35172 14.0806C4.87235 13.8528 3.5127 13.1337 2.49168 12.0392M5.82501 6.20591H0.825012V1.20591M7.49168 2.87257V7.03924L10.825 8.70591"
                    stroke="#292B38"
                    strokeWidth="1.65"
                    strokeLinecap="square"
                  />
                </svg>
                Workout History
              </span>
            </button>

            {/* Progress Analytics */}
            <button
              type="button"
              onClick={() => handleNavClick("Progress Analytics")}
              className={`cursor-pointer w-full h-[45px] px-3.5 rounded-[10px] flex items-center justify-between text-[13px] transition-all ${
                activeNav === "Progress Analytics"
                  ? "border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/30 to-[#A9DDF4] shadow-[3px_3px_0_0_#292B38] font-bold"
                  : "hover:bg-[#F8F7FA] font-medium"
              }`}
            >
              <span className="flex items-center gap-3">
                <svg width="17" height="15" viewBox="0 0 17 15" fill="none">
                  <path
                    d="M0.825012 0.824997V14.1583H14.9917M4.15835 9.99166L7.49168 5.825L10.825 7.49166L14.9917 2.49166"
                    stroke="#292B38"
                    strokeWidth="1.65"
                    strokeLinecap="square"
                  />
                </svg>
                Progress Analytics
              </span>
            </button>
          </nav>
        </div>

        {/* Bottom Sidebar Widgets */}
        <div className="mt-8 space-y-4">
          {/* Retro Dialog: daily_reminder.exe */}
          <div className="hidden lg:block rounded-[7px] border-2 border-[#292B38] bg-gradient-to-b from-white via-[#E9E9EF] to-[#ADB2C2] shadow-[4px_4px_0_0_#292B38] p-1">
            <div className="rounded-[3px] bg-[#E9DDF4] overflow-hidden">
              {/* Mini Title Bar */}
              <div className="border-b border-[#292B38] bg-gradient-to-b from-white via-[#E9EAF1] to-[#ADB2C2] px-2 py-1 flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M4.8 0H7.2V2.4H8.4V3.6H9.6V4.8H12V7.2H9.6V8.4H8.4V9.6H7.2V12H4.8V9.6H3.6V8.4H2.4V7.2H0V4.8H2.4V3.6H3.6V2.4H4.8V0Z"
                    fill="#292B38"
                  />
                </svg>
                <span className="text-[#292B38] text-[9px] font-bold">
                  daily_reminder.exe
                </span>
              </div>

              <div className="p-3">
                <p className="font-spaceGrotesk text-[19px] font-medium leading-tight text-[#292B38]">
                  A little, often.
                </p>
                <p className="text-[#292B38] text-[13px] leading-5 mt-2">
                  Your future self is cheering you on.
                </p>
                <button
                  type="button"
                  onClick={() => onStartWorkout && onStartWorkout()}
                  className="cursor-pointer mt-3.5 w-full py-1.5 rounded border-[1.5px] border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] shadow-[2px_2px_0_0_#292B38] hover:brightness-105 text-[#292B38] text-[9px] font-bold tracking-wider uppercase"
                >
                  KEEP SHOWING UP
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block h-px bg-[#D2D2D8]" />

          {/* User Profile Card */}
          <div
            onClick={() => navigate("/settings")}
            className="rounded-[10px] border-[1.5px] border-[#292B38] bg-gradient-to-b from-white to-[#E9DDF4] p-3 flex items-center justify-between cursor-pointer hover:brightness-95 active:translate-y-[1px] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-[9px] border-[1.5px] border-[#D2D2D8] bg-[#F5B9D7] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="4.2" r="2.5" stroke="#292B38" strokeWidth="1.65" />
                  <path
                    d="M1.5 13V10.5C1.5 8.95 2.75 7.7 4.3 7.7H9.7C11.25 7.7 12.5 8.95 12.5 10.5V13"
                    stroke="#292B38"
                    strokeWidth="1.65"
                    strokeLinecap="square"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[#292B38] text-[13px] font-bold leading-tight">
                  {displayName}
                </p>
                <p className="text-[#777987] text-[11px]">Personal account</p>
              </div>
            </div>

            <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
              <path
                d="M1.16672 1.16675L5.25005 5.25008L1.16672 9.33342"
                stroke="#292B38"
                strokeWidth="1.65"
                strokeLinecap="square"
              />
            </svg>
          </div>

          <p className="hidden lg:block text-[#777987] text-[9px] px-2">
            ZEARA OS / V. 2.0
          </p>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CANVAS (Graph Paper Grid 28x28) */}
      <div
        className="flex-1 flex flex-col justify-between p-5 sm:p-8"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(217, 234, 245, 0.65) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(217, 234, 245, 0.65) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      >
        <div className="max-w-[1134px] w-full mx-auto space-y-6">
          {/* TOP HEADER BAR */}
          <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-5">
            <div>
              <p className="text-[#777987] text-[10px] font-bold tracking-wider uppercase">
                YOUR FITNESS, IN FOCUS
              </p>
              <h1 className="font-spaceGrotesk text-[30px] sm:text-[34px] font-medium text-[#292B38] leading-tight mt-1">
                Welcome back, {firstName}!
              </h1>
              <p className="text-[#777987] text-sm mt-1">
                Small steps. Stronger you. Let’s make today count.
              </p>
            </div>

            {/* Right Controls: Address Bar + Date + Dual CTAs */}
            <div className="flex flex-col items-start xl:items-end gap-3">
              <div className="flex flex-wrap items-center gap-3">
                {/* Retro URL Bar */}
                <div className="flex items-center gap-2 rounded-[7px] border-[1.5px] border-[#292B38] bg-gradient-to-b from-white via-[#E9EAF1] to-[#ADB2C2] shadow-[2px_2px_0_0_#292B38] px-2.5 py-1">
                  <svg width="11" height="14" viewBox="0 0 12 16" fill="none">
                    <path
                      d="M0 0V14.1176L3.69231 10.3529L6.46154 16L9.23077 14.1176L6.46154 8.47059H12L0 0Z"
                      fill="#292B38"
                    />
                  </svg>
                  <div className="bg-white border-[1.5px] border-[#D2D2D8] rounded-[3px] px-2.5 py-0.5">
                    <span className="text-[#292B38] text-[9px] font-bold">
                      zeara://my-space/dashboard
                    </span>
                  </div>
                </div>

                {/* Date Pill */}
                <div className="flex items-center gap-2 rounded-[7px] border-[1.5px] border-[#292B38] bg-gradient-to-b from-white via-[#E9EAF1] to-[#ADB2C2] px-3 py-1">
                  <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                    <rect
                      x="0.825"
                      y="1.5"
                      width="10.66"
                      height="9.3"
                      rx="1.3"
                      stroke="#292B38"
                      strokeWidth="1.65"
                    />
                    <path
                      d="M0.825 5.5H11.49M3.5 0.825V3.5M8.825 0.825V3.5"
                      stroke="#292B38"
                      strokeWidth="1.65"
                      strokeLinecap="square"
                    />
                  </svg>
                  <span className="text-[#292B38] text-[11px] font-medium">
                    Monday, November 16, 2026
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onCreateRoutine && onCreateRoutine()}
                  className="cursor-pointer rounded-[23px] border-2 border-[#292B38] bg-gradient-to-b from-white via-[#F5B9D7]/40 to-[#F5B9D7] shadow-[4px_4px_0_0_#292B38] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all p-[2px]"
                >
                  <span className="flex items-center gap-2 rounded-[20px] border border-white/85 px-4 py-2 text-[#292B38] text-[13px] font-bold">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path
                        d="M6.07501 0.824997V11.325M0.825012 6.075H11.325"
                        stroke="#292B38"
                        strokeWidth="1.65"
                        strokeLinecap="square"
                      />
                    </svg>
                    Create Routine
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onStartWorkout && onStartWorkout()}
                  className="cursor-pointer rounded-[23px] border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all p-[2px]"
                >
                  <span className="flex items-center gap-2 rounded-[20px] border border-white/85 px-4 py-2 text-[#292B38] text-[13px] font-bold">
                    <svg width="11" height="14" viewBox="0 0 11 14" fill="none">
                      <path
                        d="M0.825012 1.50288L9.07501 6.75288L0.825012 12.0029V1.50288Z"
                        fill="#292B38"
                        stroke="#292B38"
                        strokeWidth="1.65"
                      />
                    </svg>
                    Start Workout
                  </span>
                </button>
              </div>
            </div>
          </header>

          {/* 3. TOP 4 KPI STAT CARDS */}
          <section className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Floating Pixel Heart Sticker on Top Right */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="hidden sm:block w-[30px] h-[30px] absolute -right-3 -top-3.5 z-10 pointer-events-none drop-shadow-[2px_2px_0_#292B38]"
            >
              <path
                d="M4.5 1H13.25V4.5H16.75V1H25.5V4.5H29V15H25.5V18.5H22V22H18.5V25.5H15V29H11.5V25.5H8V22H4.5V18.5H1V4.5H4.5V1Z"
                fill="url(#silver_heart_grad)"
                stroke="#292B38"
              />
              <defs>
                <linearGradient id="silver_heart_grad" x1="15" y1="1" x2="15" y2="29" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" />
                  <stop offset="0.43" stopColor="white" />
                  <stop offset="0.49" stopColor="#969BAA" />
                  <stop offset="0.78" stopColor="white" />
                  <stop offset="1" stopColor="#ADB2C2" />
                </linearGradient>
              </defs>
            </svg>

            {/* Card 1: Total Workouts */}
            <div className="rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden flex flex-col justify-between">
              <div className="h-[34px] px-3.5 border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] flex items-center justify-between">
                <span className="text-[#292B38] text-[11px] font-bold">Total Workouts</span>
                <span className="w-[21px] h-[21px] rounded-[4px] border border-[#292B38] bg-white flex items-center justify-center">
                  <svg width="13" height="13" viewBox="0 0 21 21" fill="none">
                    <path d="M9.2 4H11.8V6.6H13.1V7.9H14.4V9.2H17V11.8H14.4V13.1H13.1V14.4H11.8V17H9.2V14.4H7.9V13.1H6.6V11.8H4V9.2H6.6V7.9H7.9V6.6H9.2V4Z" fill="#292B38" />
                  </svg>
                </span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-spaceGrotesk text-[34px] font-medium leading-none">128</span>
                  <span className="text-[#777987] text-xs">workouts</span>
                </div>
                <div className="w-[33px] h-[33px] rounded-[7px] bg-[#D9EAF5] flex items-center justify-center">
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <path d="M0.85 2.375V8.70833M3.225 0V11.0833M3.225 5.54167H12.725M12.725 0V11.0833M15.1 2.375V8.70833" stroke="#292B38" strokeWidth="1.7" />
                  </svg>
                </div>
              </div>
              <p className="px-4 pb-3.5 text-[#292B38] text-[11px] font-medium">↗ 12 this month</p>
            </div>

            {/* Card 2: Weekly Volume */}
            <div className="rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden flex flex-col justify-between">
              <div className="h-[34px] px-3.5 border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#E9DDF4]/40 to-[#E9DDF4] flex items-center justify-between">
                <span className="text-[#292B38] text-[11px] font-bold">Weekly Volume</span>
                <span className="w-[21px] h-[21px] rounded-[4px] border border-[#292B38] bg-white flex items-center justify-center">
                  <svg width="13" height="13" viewBox="0 0 21 21" fill="none">
                    <path d="M5.625 4H9.6875V5.625H11.3125V4H15.375V5.625H17V10.5H15.375V12.125H13.75V13.75H12.125V15.375H10.5V17H8.875V15.375H7.25V13.75H5.625V12.125H4V5.625H5.625V4Z" fill="#292B38" />
                  </svg>
                </span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-spaceGrotesk text-[34px] font-medium leading-none">4,150</span>
                  <span className="text-[#777987] text-xs">kg</span>
                </div>
                <div className="w-[33px] h-[33px] rounded-[7px] bg-[#E9DDF4] flex items-center justify-center">
                  <svg width="15" height="13" viewBox="0 0 15 13" fill="none">
                    <path d="M0 11.9333H14.25M2.375 10.35V5.6H5.54167V10.35M8.70833 10.35V0.849998H11.875V10.35" stroke="#292B38" strokeWidth="1.7" />
                  </svg>
                </div>
              </div>
              <p className="px-4 pb-3.5 text-[#292B38] text-[11px] font-medium">1 session completed this week</p>
            </div>

            {/* Card 3: Workout Frequency */}
            <div className="rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden flex flex-col justify-between">
              <div className="h-[34px] px-3.5 border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] flex items-center justify-between">
                <span className="text-[#292B38] text-[11px] font-bold">Workout Frequency</span>
                <span className="w-[21px] h-[21px] rounded-[4px] border border-[#292B38] bg-white flex items-center justify-center">
                  <svg width="13" height="13" viewBox="0 0 21 21" fill="none">
                    <path d="M9.2 4H11.8V6.6H13.1V7.9H14.4V9.2H17V11.8H14.4V13.1H13.1V14.4H11.8V17H9.2V14.4H7.9V13.1H6.6V11.8H4V9.2H6.6V7.9H7.9V6.6H9.2V4Z" fill="#292B38" />
                  </svg>
                </span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-spaceGrotesk text-[34px] font-medium leading-none">4.2</span>
                  <span className="text-[#777987] text-xs">/ week</span>
                </div>
                <div className="w-[33px] h-[33px] rounded-[7px] bg-[#D9EAF5] flex items-center justify-center">
                  <svg width="15" height="17" viewBox="0 0 15 17" fill="none">
                    <path d="M0 9.04527H3.16667L5.54167 2.71194L8.70833 13.7953L11.0833 6.67027H14.25" stroke="#292B38" strokeWidth="1.7" />
                  </svg>
                </div>
              </div>
              <p className="px-4 pb-3.5 text-[#292B38] text-[11px] font-medium">4-week average · goal 4</p>
            </div>

            {/* Card 4: Current Streak */}
            <div className="rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden flex flex-col justify-between">
              <div className="h-[34px] px-3.5 border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#F5B9D7]/40 to-[#F5B9D7] flex items-center justify-between">
                <span className="text-[#292B38] text-[11px] font-bold">Current Streak</span>
                <span className="w-[21px] h-[21px] rounded-[4px] border border-[#292B38] bg-white flex items-center justify-center">
                  <svg width="13" height="13" viewBox="0 0 21 21" fill="none">
                    <path d="M5.625 4H9.6875V5.625H11.3125V4H15.375V5.625H17V10.5H15.375V12.125H13.75V13.75H12.125V15.375H10.5V17H8.875V15.375H7.25V13.75H5.625V12.125H4V5.625H5.625V4Z" fill="#292B38" />
                  </svg>
                </span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-spaceGrotesk text-[34px] font-medium leading-none">4</span>
                  <span className="text-[#777987] text-xs">weeks</span>
                </div>
                <div className="w-[33px] h-[33px] rounded-[7px] bg-[#F5B9D7] flex items-center justify-center">
                  <svg width="15" height="19" viewBox="0 0 15 19" fill="none">
                    <path d="M8.00252 1.58334L1.66919 10.2917H6.41919L5.62752 17.4167L12.7525 7.91667H8.00252V1.58334Z" stroke="#292B38" strokeWidth="1.7" />
                  </svg>
                </div>
              </div>
              <p className="px-4 pb-3.5 text-[#292B38] text-[11px] font-medium">Weekly goal streak · best 8 weeks</p>
            </div>
          </section>

          {/* 4. MIDDLE ANALYTICS & WEEKLY OVERVIEW ROW */}
          <section className="relative grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Floating Pink Pixel Diamond (Top-left of chart card) */}
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              className="hidden sm:block w-8 h-8 absolute -left-3.5 -top-3.5 z-10 pointer-events-none drop-shadow-[2px_2px_0_#292B38]"
            >
              <path
                d="M13 1H19V7H22V10H25V13H31V19H25V22H22V25H19V31H13V25H10V22H7V19H1V13H7V10H10V7H13V1Z"
                fill="url(#pink_diamond_grad)"
                stroke="#292B38"
              />
              <defs>
                <linearGradient id="pink_diamond_grad" x1="16" y1="1" x2="16" y2="31" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" />
                  <stop offset="0.08" stopColor="#F5B9D7" />
                  <stop offset="0.44" stopColor="white" />
                  <stop offset="0.51" stopColor="#F5B9D7" />
                  <stop offset="1" stopColor="#F5B9D7" />
                </linearGradient>
              </defs>
            </svg>

            {/* 01 / TRAINING VOLUME & PROGRESS (8 cols ~ 720px) */}
            <div className="xl:col-span-8 relative rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden flex flex-col justify-between">
              {/* Retro Header */}
              <div className="h-[39px] px-4 border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] flex items-center justify-between">
                <span className="text-[#292B38] text-xs font-bold tracking-wide">
                  01 / TRAINING VOLUME & PROGRESS
                </span>
                <span className="w-[21px] h-[21px] rounded-[4px] border border-[#292B38] bg-white flex items-center justify-center">
                  <svg width="13" height="13" viewBox="0 0 21 21" fill="none">
                    <path d="M9.2 4H11.8V6.6H13.1V7.9H14.4V9.2H17V11.8H14.4V13.1H13.1V14.4H11.8V17H9.2V14.4H7.9V13.1H6.6V11.8H4V9.2H6.6V7.9H7.9V6.6H9.2V4Z" fill="#292B38" />
                  </svg>
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h2 className="font-spaceGrotesk text-[19px] font-medium text-[#292B38]">
                      You’re building momentum.
                    </h2>
                    <p className="text-[#777987] text-xs mt-0.5">{currentChart.subtitle}</p>
                  </div>

                  {/* Interactive Timeframe Toggle + Legend */}
                  <div className="flex flex-col items-start sm:items-end gap-2.5">
                    <div className="inline-flex p-[3px] rounded-md border-[1.5px] border-[#D2D2D8] bg-[#F8F7FA]">
                      {["8 weeks", "6 months"].map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setTimeframe(tab)}
                          className={`cursor-pointer px-3 py-1 rounded text-[11px] transition-all ${
                            timeframe === tab
                              ? "border-[1.5px] border-[#D2D2D8] bg-white text-[#292B38] font-bold"
                              : "text-[#777987] font-medium hover:text-[#292B38]"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-[10px] text-[#777987]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-sm bg-[#A9DDF4]" />
                        Volume
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-sm bg-[#E9DDF4]" />
                        12k goal
                      </span>
                    </div>
                  </div>
                </div>

                {/* Area Chart Canvas */}
                <div className="mt-5 relative">
                  <div className="flex gap-3">
                    {/* Y-Axis Labels */}
                    <div className="flex flex-col justify-between text-[#777987] text-[10px] h-[160px] py-0.5 select-none">
                      <span>16k</span>
                      <span>12k</span>
                      <span>8k</span>
                      <span>4k</span>
                      <span>0</span>
                    </div>

                    {/* Grid Lines + SVG Curve */}
                    <div className="flex-1 relative h-[160px] flex flex-col justify-between">
                      <div className="w-full h-px bg-[#D9EAF5]" />
                      {/* 12k Goal Highlight Line */}
                      <div className="w-full h-0.5 bg-[#E9DDF4]" />
                      <div className="w-full h-px bg-[#D9EAF5]" />
                      <div className="w-full h-px bg-[#D9EAF5]" />
                      <div className="w-full h-px bg-[#D9EAF5]" />

                      {/* SVG Chart */}
                      <svg
                        viewBox="0 0 632 99"
                        preserveAspectRatio="none"
                        className="w-full h-[108px] absolute bottom-0 left-0 overflow-visible"
                      >
                        <defs>
                          <linearGradient id="zeara_vol_fill" x1="316" y1="0" x2="316" y2="98.4" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#A9DDF4" stopOpacity="0.65" />
                            <stop offset="1" stopColor="#A9DDF4" stopOpacity="0.06" />
                          </linearGradient>
                        </defs>
                        <path d={currentChart.areaPath} fill="url(#zeara_vol_fill)" />
                        <path
                          d={currentChart.linePath}
                          fill="none"
                          stroke="#75B9DA"
                          strokeWidth="2.5"
                        />
                      </svg>

                      {/* Floating Tooltip Pill */}
                      <div className="absolute right-2 bottom-9 rounded-md bg-[#292B38] px-2.5 py-1 shadow-sm">
                        <span className="text-white text-[11px] font-bold">
                          {currentChart.tooltip}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* X-Axis Date Labels */}
                  <div className="pl-7 mt-2 flex items-center justify-between text-[#777987] text-[10px]">
                    {currentChart.labels.map((lbl) => (
                      <span key={lbl}>{lbl}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 02 / WEEKLY OVERVIEW (4 cols ~ 390px) */}
            <div className="xl:col-span-4 rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden flex flex-col justify-between">
              {/* Retro Header */}
              <div className="h-[39px] px-4 border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#E9DDF4]/40 to-[#E9DDF4] flex items-center justify-between">
                <span className="text-[#292B38] text-xs font-bold tracking-wide">
                  02 / WEEKLY OVERVIEW
                </span>
                <span className="w-[21px] h-[21px] rounded-[4px] border border-[#292B38] bg-white flex items-center justify-center">
                  <svg width="13" height="13" viewBox="0 0 21 21" fill="none">
                    <path d="M5.625 4H9.6875V5.625H11.3125V4H15.375V5.625H17V10.5H15.375V12.125H13.75V13.75H12.125V15.375H10.5V17H8.875V15.375H7.25V13.75H5.625V12.125H4V5.625H5.625V4Z" fill="#292B38" />
                  </svg>
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-spaceGrotesk text-[19px] font-medium text-[#292B38]">
                      Make time for you.
                    </h2>
                    <p className="text-[#777987] text-xs mt-0.5">November 16–22</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-[5px] border-[1.5px] border-[#D2D2D8] bg-[#F8F7FA] text-[#777987] text-[9px] font-bold tracking-wider">
                    WEEK 47
                  </span>
                </div>

                {/* 7 Day Pills */}
                <div className="grid grid-cols-7 gap-1.5 my-5">
                  {WEEK_DAYS.map((item) => {
                    const isSelected = selectedDay === item.date;
                    let pillStyle = "border-[#D2D2D8] bg-[#F8F7FA]";
                    if (item.status === "completed") {
                      pillStyle = "border-[#292B38] bg-[#A9DDF4]";
                    } else if (item.status === "planned") {
                      pillStyle = "border-[#D2D2D8] bg-[#E9DDF4]";
                    }

                    return (
                      <button
                        key={item.date}
                        type="button"
                        onClick={() => setSelectedDay(item.date)}
                        className={`cursor-pointer h-[87px] rounded-[20px] border-[1.5px] flex flex-col items-center justify-between py-3 transition-transform hover:-translate-y-0.5 ${pillStyle} ${
                          isSelected ? "ring-2 ring-[#292B38]/30" : ""
                        }`}
                      >
                        <span className="text-[#292B38] text-[11px] font-bold">{item.day}</span>
                        <span className="font-spaceGrotesk text-sm font-medium text-[#292B38]">
                          {item.date}
                        </span>
                        <span className="h-3 flex items-center justify-center">
                          {item.status === "completed" && (
                            <svg width="11" height="8" viewBox="0 0 12 9" fill="none">
                              <path
                                d="M0.601044 4.35104L3.72604 7.47604L10.601 0.601044"
                                stroke="#292B38"
                                strokeWidth="1.7"
                              />
                            </svg>
                          )}
                          {item.status === "planned" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#777987]" />
                          )}
                          {item.status === "rest" && (
                            <span className="w-[9px] h-px bg-[#D2D2D8]" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Progress Bar & Legend */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[#292B38] text-[13px] font-bold">
                      1 of 4 workouts completed
                    </span>
                    <span className="text-[#777987] font-medium">25%</span>
                  </div>
                  <div className="w-full h-[7px] rounded bg-[#F8F7FA] overflow-hidden">
                    <div className="w-1/4 h-full rounded bg-[#A9DDF4]" />
                  </div>

                  <div className="flex items-center gap-5 mt-3.5 text-[10px] text-[#777987]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-[7px] h-[7px] rounded-sm bg-[#A9DDF4]" />
                      Completed
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-[7px] h-[7px] rounded-sm bg-[#E9DDF4]" />
                      Planned
                    </span>
                  </div>

                  <p className="text-[#777987] text-[10px] mt-2">
                    Next: Lower body · Wed
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. BOTTOM SECTION: 03 / RECENT WORKOUTS */}
          <section className="rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden">
            {/* Pink Retro Header */}
            <div className="h-[39px] px-4 border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#F5B9D7]/40 to-[#F5B9D7] flex items-center justify-between">
              <span className="text-[#292B38] text-xs font-bold tracking-wide">
                03 / RECENT WORKOUTS
              </span>
              <span className="w-[21px] h-[21px] rounded-[4px] border border-[#292B38] bg-white flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 21 21" fill="none">
                  <path d="M9.2 4H11.8V6.6H13.1V7.9H14.4V9.2H17V11.8H14.4V13.1H13.1V14.4H11.8V17H9.2V14.4H7.9V13.1H6.6V11.8H4V9.2H6.6V7.9H7.9V6.6H9.2V4Z" fill="#292B38" />
                </svg>
              </span>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-spaceGrotesk text-base font-medium text-[#292B38]">
                  Your latest sessions
                </h2>
                <button
                  type="button"
                  onClick={() => handleNavClick("Workout History")}
                  className="cursor-pointer text-[#292B38] text-xs font-medium hover:underline"
                >
                  View all history ↗
                </button>
              </div>

              {/* Responsive Table */}
              <div className="overflow-x-auto">
                <div className="min-w-[680px]">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 rounded-[5px] bg-[#F8F7FA] px-4 py-2 text-[#777987] text-[9px] font-bold tracking-wider uppercase">
                    <div className="col-span-4">SESSION</div>
                    <div className="col-span-2">DATE</div>
                    <div className="col-span-2">DURATION</div>
                    <div className="col-span-2">TOTAL VOLUME</div>
                    <div className="col-span-2">HIGHLIGHTS</div>
                  </div>

                  {/* Table Rows */}
                  <div className="divide-y divide-[#F8F7FA]">
                    {RECENT_SESSIONS.map((session) => (
                      <div
                        key={session.id}
                        onClick={() => handleOpenSession(session)}
                        className="grid grid-cols-12 items-center px-3 py-2.5 hover:bg-[#F8F7FA] transition-colors cursor-pointer group"
                      >
                        <div className="col-span-4 flex items-center gap-3">
                          <span
                            className={`w-[33px] h-[33px] rounded-[7px] ${session.badgeBg} flex items-center justify-center shrink-0`}
                          >
                            <svg width="15" height="11" viewBox="0 0 16 12" fill="none">
                              <path
                                d="M0.8 2.375V8.70833M3.175 0V11.0833M3.175 5.54167H12.675M12.675 0V11.0833M15.05 2.375V8.70833"
                                stroke="#292B38"
                                strokeWidth="1.6"
                              />
                            </svg>
                          </span>
                          <span className="text-[#292B38] text-[13px] font-medium">
                            {session.name}
                          </span>
                        </div>

                        <div className="col-span-2 text-[#777987] text-xs">
                          {session.date}
                        </div>

                        <div className="col-span-2 text-[#292B38] text-xs">
                          {session.duration}
                        </div>

                        <div className="col-span-2 font-spaceGrotesk text-[13px] font-medium text-[#292B38]">
                          {session.volume}
                        </div>

                        <div className="col-span-2 flex items-center justify-between pr-2">
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#E9DDF4] px-2.5 py-1 text-[#292B38] text-[10px] font-bold">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                              <path
                                d="M7.00002 1.16669L8.75002 4.95835L12.8334 5.54169L9.91669 8.45835L10.5 12.8334L7.00002 10.7917L3.50002 12.8334L4.08335 8.45835L1.16669 5.54169L5.25002 4.95835L7.00002 1.16669Z"
                                stroke="#292B38"
                                strokeWidth="1.6"
                              />
                            </svg>
                            {session.prs}
                          </span>

                          <svg
                            width="7"
                            height="11"
                            viewBox="0 0 7 11"
                            fill="none"
                            className="transition-transform group-hover:translate-x-1"
                          >
                            <path
                              d="M0.565674 0.565674L5.23234 5.23234L0.565674 9.89901"
                              stroke="#292B38"
                              strokeWidth="1.6"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* BOTTOM STATUS FOOTER */}
        <footer className="max-w-[1134px] w-full mx-auto pt-8 pb-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[#777987]">
          <span className="text-[9px] font-bold tracking-wider uppercase">
            A LITTLE PROGRESS, EVERY DAY.
          </span>
          <span className="text-[10px]">All systems go · Last synced just now</span>
        </footer>
      </div>
    </div>
  );
}