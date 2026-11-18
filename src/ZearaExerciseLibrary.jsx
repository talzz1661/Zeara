import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const EXERCISES_DATA = [
  {
    id: 1,
    file: "exercise_01.exe",
    name: "Barbell Bench Press",
    muscle: "Chest",
    equipment: "Barbell",
    category: "Compound · Horizontal push",
    isCustom: false,
    theme: "blue",
  },
  {
    id: 2,
    file: "exercise_02.exe",
    name: "Pull-Ups",
    muscle: "Back",
    equipment: "Bodyweight",
    category: "Compound · Vertical pull",
    isCustom: false,
    theme: "pink",
  },
  {
    id: 3,
    file: "exercise_03.exe",
    name: "Romanian Deadlift",
    muscle: "Hamstrings",
    equipment: "Barbell",
    category: "Compound · Hip hinge",
    isCustom: false,
    theme: "purple",
  },
  {
    id: 4,
    file: "exercise_04.exe",
    name: "Lateral Raises",
    muscle: "Shoulders",
    equipment: "Dumbbells",
    category: "Isolation · Shoulder abduction",
    isCustom: true,
    theme: "purple",
  },
  {
    id: 5,
    file: "exercise_05.exe",
    name: "Cable Row",
    muscle: "Back",
    equipment: "Cable",
    category: "Compound · Horizontal pull",
    isCustom: false,
    theme: "blue",
  },
  {
    id: 6,
    file: "exercise_06.exe",
    name: "Bulgarian Split Squat",
    muscle: "Quads",
    equipment: "Dumbbells",
    category: "Compound · Single-leg squat",
    isCustom: true,
    theme: "pink",
  },
  {
    id: 7,
    file: "exercise_07.exe",
    name: "Incline Dumbbell Press",
    muscle: "Chest",
    equipment: "Dumbbells",
    category: "Compound · Incline push",
    isCustom: false,
    theme: "blue",
  },
  {
    id: 8,
    file: "exercise_08.exe",
    name: "Overhead Barbell Press",
    muscle: "Shoulders",
    equipment: "Barbell",
    category: "Compound · Vertical push",
    isCustom: false,
    theme: "purple",
  },
  {
    id: 9,
    file: "exercise_09.exe",
    name: "Cable Tricep Pushdown",
    muscle: "Arms",
    equipment: "Cable",
    category: "Isolation · Elbow extension",
    isCustom: true,
    theme: "pink",
  },
  {
    id: 10,
    file: "exercise_10.exe",
    name: "Barbell Back Squat",
    muscle: "Quads",
    equipment: "Barbell",
    category: "Compound · Squat pattern",
    isCustom: false,
    theme: "blue",
  },
  {
    id: 11,
    file: "exercise_11.exe",
    name: "Face Pulls",
    muscle: "Shoulders",
    equipment: "Cable",
    category: "Isolation · Scapular retraction",
    isCustom: true,
    theme: "purple",
  },
  {
    id: 12,
    file: "exercise_12.exe",
    name: "Hammer Curls",
    muscle: "Arms",
    equipment: "Dumbbells",
    category: "Isolation · Elbow flexion",
    isCustom: false,
    theme: "pink",
  },
];

const THEME_STYLES = {
  blue: {
    headerBg: "bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4]",
    iconBg: "bg-[#A9DDF4]",
    badgeBg: "bg-[#A9DDF4]",
    btnBg: "bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4]",
    iconType: "sparkle",
  },
  pink: {
    headerBg: "bg-gradient-to-b from-white via-[#F5B9D7]/40 to-[#F5B9D7]",
    iconBg: "bg-[#F5B9D7]",
    badgeBg: "bg-[#F5B9D7]",
    btnBg: "bg-gradient-to-b from-white via-[#F5B9D7]/40 to-[#F5B9D7]",
    iconType: "heart",
  },
  purple: {
    headerBg: "bg-gradient-to-b from-white via-[#E9DDF4]/40 to-[#E9DDF4]",
    iconBg: "bg-[#E9DDF4]",
    badgeBg: "bg-[#E9DDF4]",
    btnBg: "bg-gradient-to-b from-white via-[#E9DDF4]/40 to-[#E9DDF4]",
    iconType: "sparkle",
  },
};

const MUSCLE_GROUPS = ["All", "Chest", "Back", "Hamstrings", "Shoulders", "Quads", "Arms"];
const EQUIPMENTS = ["All", "Barbell", "Bodyweight", "Dumbbells", "Cable"];
const ITEMS_PER_PAGE = 6;

export default function ZearaExerciseLibrary({
  user,
  customExercises = [],
  onNavigate,
  onCreateExercise,
  onViewExercise,
  onStartWorkout,
}) {
    const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Exercise Library");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("All");
  const [selectedEquipment, setSelectedEquipment] = useState("All");
  const [activeTab, setActiveTab] = useState("all"); // "all" | "custom"
  const [sortBy, setSortBy] = useState("recommended"); // "recommended" | "az"
  const [currentPage, setCurrentPage] = useState(1);

  const displayName = user?.fullName || "Alex Morgan";

  // Gabungkan customExercises (dari App.jsx) dengan EXERCISES_DATA bawaan
  const allExercises = useMemo(() => {
    const formattedCustom = customExercises.map((ex, idx) => ({
      id: ex.id || `custom-${Date.now()}-${idx}`,
      file: ex.file || `custom_${String(idx + 1).padStart(2, "0")}.exe`,
      name: ex.name || "Custom Movement",
      muscle: ex.muscle || "Chest",
      equipment: ex.equipment || "Bodyweight",
      category: ex.category || ex.trackingType || "Custom · User created",
      isCustom: true,
      theme: ex.theme || "pink",
    }));

    return [...formattedCustom, ...EXERCISES_DATA];
  }, [customExercises]);

  const customCount = allExercises.filter((ex) => ex.isCustom).length;

  const filteredExercises = useMemo(() => {
    let list = allExercises.filter((ex) => {
      if (activeTab === "custom" && !ex.isCustom) return false;
      if (selectedMuscle !== "All" && ex.muscle !== selectedMuscle) return false;
      if (selectedEquipment !== "All" && ex.equipment !== selectedEquipment) return false;
      if (
        searchQuery.trim() !== "" &&
        !ex.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !ex.muscle.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    if (sortBy === "az") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [allExercises, activeTab, selectedMuscle, selectedEquipment, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredExercises.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedExercises = filteredExercises.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const handleNavClick = (label) => {
    setActiveNav(label);
    if (onNavigate) onNavigate(label);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F7FA] text-[#292B38] font-dMSans flex flex-col lg:flex-row selection:bg-[#E9DDF4]">
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-full lg:w-[242px] shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-[#D2D2D8] flex flex-col justify-between p-4 lg:py-5 lg:px-4">
        <div>
          {/* Brand Logo + Silver Sparkle */}
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
                d="M21.0641 1.89737L25.8558 16.2724L40.2308 21.064L25.8558 25.8557L21.0641 40.2307L16.2725 25.8557L1.89746 21.064L16.2725 16.2724L21.0641 1.89737Z"
                fill="url(#zeara_lib_sparkle)"
                stroke="#292B38"
                strokeWidth="1.2"
                strokeLinecap="square"
              />
              <defs>
                <linearGradient
                  id="zeara_lib_sparkle"
                  x1="21.0641"
                  y1="1.89737"
                  x2="21.0641"
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
                    d="M2.49186 1.5H12.4919C13.4123 1.5 14.1585 2.24619 14.1585 3.16667V12.3333C14.1585 13.2538 13.4123 14 12.4919 14H2.49186C1.57139 14 0.825195 13.2538 0.825195 12.3333V3.16667C0.825195 2.24619 1.57139 1.5 2.49186 1.5Z"
                    stroke="#292B38"
                    strokeWidth="1.65"
                  />
                  <path
                    d="M0.825195 6.65833H14.1585M4.15853 0.825001V4.15833M10.8252 0.825001V4.15833"
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
                    d="M0.825195 3.325V9.99167M3.3252 0.825V6.65833M3.3252 6.65833V12.4917M3.3252 6.65833H13.3252M13.3252 6.65833V0.825M13.3252 6.65833V12.4917M15.8252 3.325V9.99167"
                    stroke="#292B38"
                    strokeWidth="1.65"
                    strokeLinecap="square"
                  />
                </svg>
                Exercise Library
              </span>
              {activeNav === "Exercise Library" && (
                <span className="w-[5px] h-[5px] rounded-sm bg-[#292B38]" />
              )}
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
                    d="M0.825195 6.20591C1.11388 4.7372 1.88841 3.40837 3.02411 2.43337C4.1598 1.45837 5.59057 0.893921 7.08605 0.83091C8.58153 0.767898 10.0547 1.20999 11.2684 2.086C12.4821 2.96201 13.3657 4.22098 13.7769 5.66019C14.1881 7.09941 14.103 8.63513 13.5353 10.0201C12.9676 11.4051 11.9503 12.5587 10.6473 13.2953C9.34426 14.0319 7.83127 14.3085 6.3519 14.0806C4.87254 13.8528 3.51289 13.1337 2.49186 12.0392M5.8252 6.20591H0.825195V1.20591M7.49186 2.87257V7.03924L10.8252 8.70591"
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
                    d="M0.825195 0.824997V14.1583H14.9919M4.15853 9.99166L7.49186 5.825L10.8252 7.49166L14.9919 2.49166"
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
          <div className="hidden lg:block rounded-[7px] border-2 border-[#292B38] bg-gradient-to-b from-white via-[#E9E9EF] to-[#ADB2C2] shadow-[4px_4px_0_0_#292B38] p-1">
            <div className="rounded-[3px] bg-[#E9DDF4] overflow-hidden">
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
                d="M1.1665 1.16675L5.24984 5.25008L1.1665 9.33342"
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

      {/* 2. MAIN WORKSPACE CANVAS */}
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
          {/* TOP HEADER */}
          <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <p className="text-[#777987] text-[10px] font-bold tracking-wider uppercase">
                PLAN. TRACK. ANALYZE.
              </p>
              <h1 className="font-spaceGrotesk text-[30px] sm:text-[34px] font-medium text-[#292B38] leading-tight mt-1">
                Exercise Library
              </h1>
              <p className="text-[#777987] text-sm mt-1">
                Browse built-in movements or manage your custom exercises.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
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
                    zeara://my-space/exercises
                  </span>
                </div>
              </div>

              {/* + Create Custom Exercise CTA */}
              <button
                type="button"
                onClick={() =>
                  onCreateExercise
                    ? onCreateExercise()
                    : alert("Membuka form Create Custom Exercise...")
                }
                className="cursor-pointer rounded-3xl border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all px-5 py-2.5 text-[#292B38] text-sm font-bold"
              >
                + Create Custom Exercise
              </button>
            </div>
          </header>

          {/* 3. FILTER & SEARCH WINDOW (FIND_YOUR_MOVEMENT.EXE) */}
          <section className="rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden">
            {/* Lavender Retro Title Bar */}
            <div className="h-[34px] px-4 border-b border-[#292B38] bg-gradient-to-b from-white via-[#E9DDF4]/40 to-[#E9DDF4] flex items-center justify-between">
              <span className="font-spaceGrotesk text-[11px] font-bold text-[#292B38] tracking-wide">
                FIND_YOUR_MOVEMENT.EXE
              </span>
              <span className="w-5 h-5 rounded-[4px] border border-[#292B38] bg-white flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M8.7 3.5H11.3V6.1H12.6V7.4H13.9V8.7H16.5V11.3H13.9V12.6H12.6V13.9H11.3V16.5H8.7V13.9H7.4V12.6H6.1V11.3H3.5V8.7H6.1V7.4H7.4V6.1H8.7V3.5Z"
                    fill="#292B38"
                  />
                </svg>
              </span>
            </div>

            {/* Search & Filter Controls */}
            <div className="p-4 sm:p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                {/* Search Input */}
                <div className="md:col-span-6 relative">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <path
                      d="M12.5 12.5L18 18M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                      stroke="#292B38"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search exercises by name..."
                    className="w-full h-[42px] pl-11 pr-4 rounded-[7px] border-2 border-[#292B38] bg-[#F8F7FA] focus:bg-white focus:outline-none text-sm text-[#292B38] placeholder:text-[#777987]"
                  />
                </div>

                {/* Muscle Group Select */}
                <div className="md:col-span-3 relative">
                  <select
                    value={selectedMuscle}
                    onChange={(e) => {
                      setSelectedMuscle(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="cursor-pointer w-full h-[42px] appearance-none rounded-[21px] border-2 border-[#292B38] bg-white pl-4 pr-9 text-[13px] font-medium text-[#292B38] focus:outline-none"
                  >
                    {MUSCLE_GROUPS.map((m) => (
                      <option key={m} value={m}>
                        Muscle Group: {m}
                      </option>
                    ))}
                  </select>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <path
                      d="M2 5L7 10L12 5"
                      stroke="#292B38"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Equipment Select */}
                <div className="md:col-span-3 relative">
                  <select
                    value={selectedEquipment}
                    onChange={(e) => {
                      setSelectedEquipment(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="cursor-pointer w-full h-[42px] appearance-none rounded-[21px] border-2 border-[#292B38] bg-white pl-4 pr-9 text-[13px] font-medium text-[#292B38] focus:outline-none"
                  >
                    {EQUIPMENTS.map((eq) => (
                      <option key={eq} value={eq}>
                        Equipment: {eq}
                      </option>
                    ))}
                  </select>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <path
                      d="M2 5L7 10L12 5"
                      stroke="#292B38"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Folder Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("all");
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer inline-flex items-center gap-2.5 px-4 py-2.5 rounded-[9px] border-2 border-[#292B38] text-[13px] transition-all ${
                    activeTab === "all"
                      ? "bg-[#A9DDF4] font-bold shadow-[2px_2px_0_0_#292B38]"
                      : "bg-white font-medium hover:bg-[#F8F7FA]"
                  }`}
                >
                  <svg width="20" height="19" viewBox="0 0 21 20" fill="none">
                    <path
                      d="M2 6V3H8L11 6H19V18H2V6Z"
                      stroke="#292B38"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  All Exercises ({allExercises.length})
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("custom");
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer inline-flex items-center gap-2.5 px-4 py-2.5 rounded-[9px] border-2 border-[#292B38] text-[13px] transition-all ${
                    activeTab === "custom"
                      ? "bg-[#E9DDF4] font-bold shadow-[2px_2px_0_0_#292B38]"
                      : "bg-[#E9DDF4]/50 font-medium hover:bg-[#E9DDF4]"
                  }`}
                >
                  <svg width="20" height="19" viewBox="0 0 21 20" fill="none">
                    <path
                      d="M2 6V3H8L11 6H19V18H2V6Z"
                      stroke="#292B38"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  My Custom Exercises ({customCount})
                </button>
              </div>
            </div>
          </section>

          {/* 4. DIRECTORY HEADER & CARDS GRID */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <p className="text-[#292B38] text-[11px] font-bold tracking-wider uppercase">
                  YOUR MOVEMENT DIRECTORY
                </p>
                <p className="text-[#777987] text-xs mt-0.5">
                  {filteredExercises.length} movements · Find your next favorite.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSortBy((prev) =>
                    prev === "recommended" ? "az" : "recommended"
                  )
                }
                className="cursor-pointer self-start sm:self-auto text-[#292B38] text-xs font-medium hover:underline"
              >
                Sorted by: {sortBy === "recommended" ? "Recommended ↓" : "Name (A–Z) ↓"}
              </button>
            </div>

            {paginatedExercises.length === 0 ? (
              <div className="rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] p-10 text-center">
                <p className="font-spaceGrotesk text-lg font-medium text-[#292B38]">
                  No exercises matched your filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedMuscle("All");
                    setSelectedEquipment("All");
                    setActiveTab("all");
                  }}
                  className="cursor-pointer mt-3 px-4 py-1.5 rounded-full border-2 border-[#292B38] bg-[#A9DDF4] text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedExercises.map((ex) => {
                  const style = THEME_STYLES[ex.theme] || THEME_STYLES.blue;
                  return (
                    <article
                      key={ex.id}
                      className="rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden flex flex-col justify-between transition-transform hover:-translate-y-0.5"
                    >
                      <div>
                        {/* Retro Window Title Bar */}
                        <div
                          className={`h-[34px] px-4 border-b border-[#292B38] ${style.headerBg} flex items-center justify-between`}
                        >
                          <span className="font-spaceGrotesk text-xs font-bold text-[#292B38]">
                            {ex.file}
                          </span>
                          <span className="w-5 h-5 rounded-[4px] border border-[#292B38] bg-white flex items-center justify-center">
                            {style.iconType === "heart" ? (
                              <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                                <path
                                  d="M5.125 3.5H9.1875V5.125H10.8125V3.5H14.875V5.125H16.5V10H14.875V11.625H13.25V13.25H11.625V14.875H10V16.5H8.375V14.875H6.75V13.25H5.125V11.625H3.5V5.125H5.125V3.5Z"
                                  fill="#292B38"
                                />
                              </svg>
                            ) : (
                              <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                                <path
                                  d="M8.7 3.5H11.3V6.1H12.6V7.4H13.9V8.7H16.5V11.3H13.9V12.6H12.6V13.9H11.3V16.5H8.7V13.9H7.4V12.6H6.1V11.3H3.5V8.7H6.1V7.4H7.4V6.1H8.7V3.5Z"
                                  fill="#292B38"
                                />
                              </svg>
                            )}
                          </span>
                        </div>

                        {/* Card Content */}
                        <div className="p-5">
                          <div className="flex items-center justify-between">
                            {/* Pixel Dumbbell Icon Box */}
                            <div
                              className={`w-12 h-12 rounded-[9px] ${style.iconBg} flex items-center justify-center`}
                            >
                              <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                                <path
                                  d="M0 4H4V0H8V8H20V0H24V4H28V16H24V20H20V12H8V20H4V16H0V4Z"
                                  fill="#292B38"
                                />
                                <path
                                  d="M5 6H7V14H5V6ZM21 6H23V14H21V6Z"
                                  fill="white"
                                />
                              </svg>
                            </div>

                            {ex.isCustom ? (
                              <span className="px-3 py-1 rounded-[13px] border border-[#292B38] bg-[#F5B9D7] text-[#292B38] text-[10px] font-bold tracking-wider uppercase">
                                CUSTOM
                              </span>
                            ) : (
                              <span className="text-[#777987] text-[10px] font-bold tracking-wider uppercase">
                                BUILT-IN
                              </span>
                            )}
                          </div>

                          <h3 className="font-spaceGrotesk text-xl font-medium text-[#292B38] mt-3.5">
                            {ex.name}
                          </h3>

                          {/* Tags */}
                          <div className="flex flex-wrap items-center gap-2 mt-2.5">
                            <span
                              className={`px-3 py-1 rounded-[13px] ${style.badgeBg} text-[#292B38] text-xs font-medium`}
                            >
                              {ex.muscle}
                            </span>
                            <span className="px-3 py-1 rounded-[13px] bg-[#F8F7FA] text-[#292B38] text-xs font-medium">
                              {ex.equipment}
                            </span>
                          </div>

                          <p className="text-[#777987] text-xs mt-3">
                            {ex.category}
                          </p>
                        </div>
                      </div>

                      {/* View Details CTA */}
                      <div className="px-5 pb-4">
                        <button
                          type="button"
                          onClick={() =>
                            onViewExercise
                              ? onViewExercise(ex)
                              : alert(`${ex.name} (${ex.muscle} · ${ex.equipment})`)
                          }
                          className={`cursor-pointer w-full h-8 rounded-[14px] border-2 border-[#292B38] ${style.btnBg} hover:brightness-105 text-[#292B38] text-xs font-bold flex items-center justify-center`}
                        >
                          View Details →
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          {/* 5. PAGINATION FOOTER */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#777987] text-xs">
              Showing{" "}
              {filteredExercises.length === 0
                ? 0
                : (safePage - 1) * ITEMS_PER_PAGE + 1}
              –
              {Math.min(safePage * ITEMS_PER_PAGE, filteredExercises.length)} of{" "}
              {filteredExercises.length} exercises
            </p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed px-3.5 h-9 rounded-lg border border-[#292B38] bg-white hover:bg-[#F8F7FA] text-xs font-medium text-[#292B38]"
              >
                ← Previous
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`cursor-pointer w-9 h-9 rounded-lg text-xs transition-all ${
                      safePage === pageNum
                        ? "border-2 border-[#292B38] bg-[#A9DDF4] font-bold"
                        : "border border-[#292B38] bg-white hover:bg-[#F8F7FA] font-medium"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}

              <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed px-3.5 h-9 rounded-lg border border-[#292B38] bg-white hover:bg-[#F8F7FA] text-xs font-medium text-[#292B38]"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM STATUS BAR */}
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