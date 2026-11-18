import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_ROUTINES = [
  {
    id: "r1",
    file: "upper_lower.routine",
    headerGrad: "from-white via-[#F5B9D7]/40 to-[#F5B9D7]",
    icon: "sparkle",
    title: "4-Day Upper/Lower Split",
    desc: "A balanced split for steady strength gains.",
    days: ["Mon", "Thu", "Fri", "Sat"],
    exercises: 8,
    duration: 55,
    lastTrained: "Yesterday",
  },
  {
    id: "r2",
    file: "push_pull_legs.routine",
    headerGrad: "from-white via-[#A9DDF4]/40 to-[#A9DDF4]",
    icon: "heart",
    title: "Push Pull Legs",
    desc: "Build muscle, one movement pattern at a time.",
    days: ["Mon", "Wed", "Fri"],
    exercises: 6,
    duration: 60,
    lastTrained: "Nov 13",
  },
  {
    id: "r3",
    file: "conditioning.routine",
    headerGrad: "from-white via-[#F5B9D7]/40 to-[#F5B9D7]",
    icon: "sparkle",
    title: "Athletic Conditioning",
    desc: "Move stronger. Go further. Feel better.",
    days: ["Tue", "Thu", "Sat"],
    exercises: 7,
    duration: 45,
    lastTrained: "Nov 12",
  },
];

const TEMPLATE_LIBRARY = [
  {
    id: "t1",
    file: "starter_template_01.exe",
    icon: "sparkle",
    level: "BEGINNER",
    levelBg: "bg-[#A9DDF4]",
    goal: "FULL BODY",
    title: "Beginner Full Body 3x",
    desc: "Build your foundation with simple, effective full-body sessions.",
    daysPerWeek: 3,
    duration: 45,
    tagline: "Perfect for your first chapter.",
    defaultDays: ["Mon", "Wed", "Fri"],
    exercises: 6,
  },
  {
    id: "t2",
    file: "starter_template_02.exe",
    icon: "heart",
    level: "INTERMEDIATE",
    levelBg: "bg-[#E9DDF4]",
    goal: "MUSCLE BUILDING",
    title: "Hypertrophy PPL",
    desc: "A classic push, pull, legs split designed to build size and keep you progressing.",
    daysPerWeek: 6,
    duration: 60,
    tagline: "More volume. More room to grow.",
    defaultDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    exercises: 7,
  },
  {
    id: "t3",
    file: "starter_template_03.exe",
    icon: "sparkle",
    level: "ALL LEVELS",
    levelBg: "bg-[#F5B9D7]",
    goal: "STRENGTH",
    title: "30-Min Express Strength",
    desc: "Big movements. Short sessions. Make your busiest days count.",
    daysPerWeek: 3,
    duration: 30,
    tagline: "Small window. Strong results.",
    defaultDays: ["Tue", "Thu", "Sat"],
    exercises: 5,
  },
  {
    id: "t4",
    file: "starter_template_04.exe",
    icon: "heart",
    level: "INTERMEDIATE",
    levelBg: "bg-[#A9DDF4]",
    goal: "STRENGTH",
    title: "Powerbuilding 4-Day",
    desc: "Heavy compound lifts paired with targeted accessory hypertrophy.",
    daysPerWeek: 4,
    duration: 65,
    tagline: "Strength meets aesthetics.",
    defaultDays: ["Mon", "Tue", "Thu", "Fri"],
    exercises: 7,
  },
  {
    id: "t5",
    file: "starter_template_05.exe",
    icon: "sparkle",
    level: "BEGINNER",
    levelBg: "bg-[#E9DDF4]",
    goal: "CONDITIONING",
    title: "Cardio & Core Engine",
    desc: "Boost stamina, core stability, and athletic recovery between heavy days.",
    daysPerWeek: 3,
    duration: 35,
    tagline: "Endurance built steady.",
    defaultDays: ["Tue", "Thu", "Sat"],
    exercises: 6,
  },
  {
    id: "t6",
    file: "starter_template_06.exe",
    icon: "heart",
    level: "ALL LEVELS",
    levelBg: "bg-[#F5B9D7]",
    goal: "FULL BODY",
    title: "Dumbbell Only Home Split",
    desc: "Minimal equipment, maximum consistency from anywhere.",
    daysPerWeek: 4,
    duration: 40,
    tagline: "No excuses. Just progress.",
    defaultDays: ["Mon", "Wed", "Fri", "Sat"],
    exercises: 6,
  },
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ZearaWorkoutPlanner({
  onNavigate,
  onStartWorkout,
  onCreateRoutine,
  onViewRoutine,
}) {
    const navigate = useNavigate();
  const [routines, setRoutines] = useState(INITIAL_ROUTINES);
  const [activeTab, setActiveTab] = useState("all"); // "all" | "routines" | "templates"
  const [searchQuery, setSearchQuery] = useState("");
  const [goalFilter, setGoalFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [freqFilter, setFreqFilter] = useState("All");
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    "'Hypertrophy PPL' added to My Routines!"
  );
  const [editingRoutine, setEditingRoutine] = useState(null);

  const toggleRoutineDay = (routineId, day) => {
    setRoutines((prev) =>
      prev.map((r) => {
        if (r.id !== routineId) return r;
        const exists = r.days.includes(day);
        return {
          ...r,
          days: exists ? r.days.filter((d) => d !== day) : [...r.days, day],
        };
      })
    );
  };

  const handleCopyTemplate = (tpl) => {
    const newRoutine = {
      id: `r-${Date.now()}`,
      file: tpl.file.replace(".exe", ".routine"),
      headerGrad: "from-white via-[#A9DDF4]/40 to-[#A9DDF4]",
      icon: tpl.icon,
      title: tpl.title,
      desc: tpl.desc,
      days: tpl.defaultDays,
      exercises: tpl.exercises,
      duration: tpl.duration,
      lastTrained: "Just added",
    };
    setRoutines((prev) => [newRoutine, ...prev]);
    setToastMessage(`'${tpl.title}' added to My Routines!`);
  };

  const handleViewOrEdit = (routine) => {
    if (onViewRoutine) {
      onViewRoutine(routine);
    } else {
      setEditingRoutine(routine);
    }
  };

  const filteredRoutines = routines.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTemplates = TEMPLATE_LIBRARY.filter((tpl) => {
    const matchesSearch =
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGoal = goalFilter === "All" || tpl.goal === goalFilter;
    const matchesLevel = levelFilter === "All" || tpl.level === levelFilter;
    const matchesFreq =
      freqFilter === "All" || `${tpl.daysPerWeek} days` === freqFilter;
    return matchesSearch && matchesGoal && matchesLevel && matchesFreq;
  });

  const displayedTemplates = showAllTemplates
    ? filteredTemplates
    : filteredTemplates.slice(0, 3);

  const navItems = [
    { label: "Dashboard", id: "Dashboard" },
    { label: "Workout Planner", id: "Workout Planner" },
    { label: "Exercise Library", id: "Exercise Library" },
    { label: "Workout History", id: "Workout History" },
    { label: "Progress Analytics", id: "Progress Analytics" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F8F7FA] text-[#292B38] font-dMSans flex flex-col lg:flex-row">
      {/* LEFT SIDEBAR */}
      <aside className="w-full lg:w-[242px] shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-[#CDCED9] flex flex-col justify-between p-5 lg:py-4 lg:px-4">
        <div>
          {/* Brand Logo */}
          <div className="flex items-center justify-between lg:justify-start gap-2 px-1">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("Landing")}
              className="cursor-pointer flex items-center gap-2 text-left"
            >
              <span className="font-bodoniModa text-[48px] lg:text-[54px] leading-none text-[#292B38]">
                Zeara
              </span>
              <svg
                width="36"
                height="36"
                viewBox="0 0 40 40"
                fill="none"
                className="w-9 h-9 shrink-0"
              >
                <path
                  d="M20.0001 1.66666L25.0001 15L38.3334 20L25.0001 25L20.0001 38.3333L15.0001 25L1.66675 20L15.0001 15L20.0001 1.66666Z"
                  fill="#E9DDF4"
                  stroke="#292B38"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <p className="text-[#7B7D90] text-[9px] font-bold tracking-wider uppercase px-2 mt-2">
            YOUR MOVEMENT, CONNECTED
          </p>

          <div className="h-px bg-[#CDCED9] my-4 mx-1" />

          {/* Workspace Nav */}
          <p className="text-[#7B7D90] text-[10px] font-bold tracking-wider uppercase px-2 mb-3">
            WORKSPACE
          </p>

          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0">
            {navItems.map((item) => {
              const isActive = item.id === "Workout Planner";
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate && onNavigate(item.id)}
                  className={`cursor-pointer flex items-center justify-between px-3.5 py-2.5 rounded-[11px] text-[13px] whitespace-nowrap transition-all ${
                    isActive
                      ? "font-bold border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/45 to-[#A9DDF4] shadow-[3px_3px_0_0_#292B38]"
                      : "font-normal text-[#292B38] hover:bg-[#F8F7FA]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {item.id === "Dashboard" && (
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="2" width="5" height="5" stroke="#292B38" strokeWidth="1.7" />
                        <rect x="11" y="2" width="5" height="5" stroke="#292B38" strokeWidth="1.7" />
                        <rect x="2" y="11" width="5" height="5" stroke="#292B38" strokeWidth="1.7" />
                        <rect x="11" y="11" width="5" height="5" stroke="#292B38" strokeWidth="1.7" />
                      </svg>
                    )}
                    {item.id === "Workout Planner" && (
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                        <rect x="2.5" y="3" width="13" height="12.5" rx="1.5" stroke="#292B38" strokeWidth="1.7" />
                        <path d="M2.5 7.5H15.5M6 1.5V4.5M12 1.5V4.5" stroke="#292B38" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                    )}
                    {item.id === "Exercise Library" && (
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                        <path d="M1.5 6V12M4.5 3.75V14.25M4.5 9H13.5M13.5 3.75V14.25M16.5 6V12" stroke="#292B38" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                    )}
                    {item.id === "Workout History" && (
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                        <path d="M7.5 8.25H3V3.75M3 8.25C4.2 5.2 7.5 3.6 10.7 4.4C13.9 5.2 15.8 8.4 15 11.6C14.2 14.8 11 16.7 7.8 15.9C5.9 15.4 4.4 14.2 3.6 12.6M9 5.5V9L12 10.8" stroke="#292B38" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {item.id === "Progress Analytics" && (
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                        <path d="M2.25 2.25V15.75H16.5M5.25 11.25L9 6.75L12 9L16.5 3" stroke="#292B38" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <span>{item.label}</span>
                  </span>
                  {isActive && (
                    <span className="w-[5px] h-[5px] rounded-[1px] bg-[#292B38] ml-2" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Cards */}
        <div className="hidden lg:flex flex-col gap-4 mt-8">
          {/* daily_reminder.exe */}
          <div className="rounded-[5px] border-2 border-[#292B38] bg-[#E9DDF4] shadow-[4px_4px_0_0_#292B38] p-1">
            <div className="flex items-center gap-2 px-2 py-1 rounded-[1px] border border-[#292B38] bg-gradient-to-b from-white via-[#E9DDF4]/50 to-[#E9DDF4]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 0.5L7.5 4.5L11.5 6L7.5 7.5L6 11.5L4.5 7.5L0.5 6L4.5 4.5L6 0.5Z"
                  fill="#E9DDF4"
                  stroke="#292B38"
                  strokeWidth="1.4"
                />
              </svg>
              <span className="text-[9px] font-bold text-[#292B38]">
                daily_reminder.exe
              </span>
            </div>
            <div className="p-3">
              <p className="font-spaceGrotesk text-[19px] font-medium leading-tight text-[#292B38]">
                A little, often.
              </p>
              <p className="text-[13px] text-[#292B38] mt-1.5 leading-snug">
                Your future self is cheering you on.
              </p>
              <button
                type="button"
                onClick={() => onStartWorkout && onStartWorkout()}
                className="cursor-pointer mt-4 w-full py-1.5 rounded-[3px] border-[1.5px] border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/45 to-[#A9DDF4] shadow-[2px_2px_0_0_#292B38] text-[9px] font-bold tracking-wide text-[#292B38] active:translate-x-[1px] active:translate-y-[1px]"
              >
                KEEP SHOWING UP
              </button>
            </div>
          </div>

          <div className="h-px bg-[#CDCED9]" />

          {/* User Profile Pill */}
          <div
  onClick={() => navigate("/settings")}
  className="rounded-[10px] border-[1.5px] border-[#292B38] bg-gradient-to-b from-white to-[#E9DDF4] p-3 flex items-center justify-between cursor-pointer hover:brightness-95 active:translate-y-[1px] transition-all"
>
            <div className="flex items-center gap-2.5">
              <div className="w-[38px] h-[38px] rounded-[5px] bg-[#F5B9D7] flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="6.5" r="3" stroke="#292B38" strokeWidth="1.7" />
                  <path
                    d="M4 17C4 13.7 6.7 11 10 11C13.3 11 16 13.7 16 17"
                    stroke="#292B38"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-bold leading-tight text-[#292B38]">
                  Alex Morgan
                </p>
                <p className="text-[11px] text-[#7B7D90]">Personal account</p>
              </div>
            </div>
            <span className="text-sm font-bold text-[#292B38]">›</span>
          </div>

          <p className="text-[9px] text-[#7B7D90] px-1">ZEARA OS / V. 2.0</p>
        </div>
      </aside>

      {/* MAIN WORKSPACE CONTENT (Graph Paper 28x28) */}
      <main
        className="flex-1 min-w-0 p-5 sm:p-8 flex flex-col justify-between relative"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(217, 234, 245, 0.65) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(217, 234, 245, 0.65) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      >
        <div className="max-w-[1160px] w-full mx-auto space-y-7">
          {/* 1. TOP HEADER BAR */}
          <header className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
            <div>
              <p className="text-[#7B7D90] text-[10px] font-bold tracking-wider uppercase">
                PLAN. TRACK. ANALYZE.
              </p>
              <h1 className="font-spaceGrotesk text-[30px] sm:text-[34px] font-medium leading-tight text-[#292B38] mt-1">
                Workout Planner
              </h1>
              <p className="text-[#7B7D90] text-sm mt-1">
                Organize your training split or start from a proven template.
              </p>
            </div>

            {/* Center Retro URL Bar */}
            <div className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-[#292B38] bg-gradient-to-b from-white via-[#E9DDF4]/45 to-[#E9DDF4] shadow-[2px_2px_0_0_#292B38] px-2.5 py-1 self-start xl:mt-3">
              <span className="text-sm font-bold leading-none">↖</span>
              <div className="rounded-[2px] border border-[#CDCED9] bg-white px-2.5 py-0.5 min-w-[210px] sm:min-w-[240px]">
                <span className="text-[10px] font-bold text-[#292B38]">
                  zeara://my-space/planner
                </span>
              </div>
            </div>

            {/* Right Breadcrumb & Primary CTA */}
            <div className="flex flex-col xl:items-end gap-2.5">
              <span className="text-[#7B7D90] text-[9px] font-bold tracking-wider uppercase">
                MY SPACE / WORKOUTS
              </span>
              <button
                type="button"
                onClick={() => onCreateRoutine && onCreateRoutine()}
                className="cursor-pointer inline-flex items-center gap-3 px-4 py-2.5 rounded-[22px] border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/45 to-[#A9DDF4] shadow-[3px_3px_0_0_#292B38] hover:brightness-105 active:translate-x-[1px] active:translate-y-[1px] transition-all text-[13px] font-bold text-[#292B38]"
              >
                <span className="text-base leading-none">+</span>
                <span>Create Custom Routine</span>
              </button>
            </div>
          </header>

          {/* 2. TABS & SEARCH BAR */}
          <div className="border-b-2 border-[#292B38] pb-2 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Folder Tabs */}
            <div className="flex flex-wrap items-end gap-2.5">
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === "routines" ? "all" : "routines")}
                className={`cursor-pointer inline-flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 border-[#292B38] text-sm transition-all ${
                  activeTab === "all" || activeTab === "routines"
                    ? "font-bold bg-gradient-to-b from-white via-[#A9DDF4]/45 to-[#A9DDF4]"
                    : "font-medium bg-white hover:bg-[#F8F7FA]"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <rect x="2.5" y="3" width="13" height="12.5" rx="1.5" stroke="#292B38" strokeWidth="1.7" />
                  <path d="M2.5 7.5H15.5M6 1.5V4.5M12 1.5V4.5" stroke="#292B38" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                <span>My Routines ({routines.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab(activeTab === "templates" ? "all" : "templates")}
                className={`cursor-pointer inline-flex items-center px-5 py-2.5 rounded-xl border-2 border-[#292B38] text-sm transition-all ${
                  activeTab === "templates"
                    ? "font-bold bg-gradient-to-b from-white via-[#E9DDF4]/55 to-[#E9DDF4]"
                    : "font-medium bg-gradient-to-b from-white via-[#E9DDF4]/35 to-[#E9DDF4]/80 hover:brightness-105"
                }`}
              >
                Pre-built Templates ({TEMPLATE_LIBRARY.length})
              </button>
            </div>

            {/* Search Input Box */}
            <div className="flex items-center rounded-[7px] border-[1.5px] border-[#292B38] bg-white px-3 h-10 w-full lg:w-[390px]">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="shrink-0 mr-2.5">
                <circle cx="6.5" cy="6.5" r="4.8" stroke="#292B38" strokeWidth="1.7" />
                <path d="M10.2 10.2L13.5 13.5" stroke="#292B38" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search routines or templates..."
                className="w-full text-xs text-[#292B38] placeholder:text-[#7B7D90] focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="cursor-pointer text-xs text-[#7B7D90] hover:text-[#292B38] px-1.5"
                >
                  ×
                </button>
              )}
              <div className="w-px h-5 bg-[#CDCED9] mx-2" />
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="shrink-0">
                <path
                  d="M2.25 4.5H15.75M6 2.25V6.75M2.25 9H15.75M12 6.75V11.25M2.25 13.5H15.75M7.5 11.25V15.75"
                  stroke="#292B38"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* 3. SECTION 01 / MY ROUTINES */}
          {(activeTab === "all" || activeTab === "routines") && (
            <section>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold text-[#292B38]">
                  01 / MY ROUTINES
                </span>
                <span className="text-[10px] font-bold text-[#7B7D90] tracking-wide">
                  YOUR SPLIT. YOUR PACE.
                </span>
              </div>

              {filteredRoutines.length === 0 ? (
                <div className="rounded-xl border-2 border-[#292B38] bg-white p-6 text-center text-sm text-[#7B7D90]">
                  No routines match "{searchQuery}".
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredRoutines.map((routine) => (
                    <div
                      key={routine.id}
                      className="rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden flex flex-col justify-between"
                    >
                      {/* Window Title Bar */}
                      <div
                        className={`h-[35px] border-b-2 border-[#292B38] bg-gradient-to-b ${routine.headerGrad} px-3 flex items-center justify-between`}
                      >
                        <span className="text-[11px] font-bold text-[#292B38]">
                          {routine.file}
                        </span>
                        <span className="w-5 h-5 rounded-[3px] border border-[#292B38] bg-white flex items-center justify-center">
                          {routine.icon === "heart" ? (
                            <svg width="11" height="10" viewBox="0 0 14 12" fill="none">
                              <path
                                d="M2 0H6V2H8V0H12V2H14V6H12V8H10V10H8V12H6V10H4V8H2V6H0V2H2V0Z"
                                fill="#292B38"
                              />
                            </svg>
                          ) : (
                            <span className="text-[11px] font-bold leading-none">
                              ✦
                            </span>
                          )}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h2
                            onClick={() => handleViewOrEdit(routine)}
                            className="cursor-pointer hover:underline font-spaceGrotesk text-xl font-medium text-[#292B38]"
                          >
                            {routine.title}
                          </h2>
                          <p className="text-[#7B7D90] text-[11px] mt-1">
                            {routine.desc}
                          </p>

                          {/* Interactive Day Pills */}
                          <div className="grid grid-cols-7 gap-1.5 mt-4">
                            {WEEK_DAYS.map((day) => {
                              const isSelected = routine.days.includes(day);
                              return (
                                <button
                                  key={day}
                                  type="button"
                                  onClick={() => toggleRoutineDay(routine.id, day)}
                                  className={`cursor-pointer h-7 rounded-[14px] text-[11px] flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "border border-[#292B38] bg-[#A9DDF4] font-bold text-[#292B38]"
                                      : "bg-[#F8F7FA] text-[#7B7D90] hover:bg-[#ECEAF2]"
                                  }`}
                                >
                                  {day}
                                </button>
                              );
                            })}
                          </div>

                          {/* Stats Row */}
                          <div className="flex items-center gap-6 mt-5">
                            <div className="flex items-baseline gap-2">
                              <span className="font-spaceGrotesk text-[27px] font-medium leading-none text-[#292B38]">
                                {routine.exercises}
                              </span>
                              <span className="text-[#7B7D90] text-[11px]">
                                exercises
                              </span>
                            </div>

                            <div className="w-px h-8 bg-[#E7E5EC]" />

                            <div className="flex items-baseline gap-2">
                              <span className="font-spaceGrotesk text-[27px] font-medium leading-none text-[#292B38]">
                                {routine.duration}
                              </span>
                              <span className="text-[#7B7D90] text-[11px]">
                                min / session
                              </span>
                            </div>
                          </div>

                          <p className="text-[#7B7D90] text-[10px] mt-2.5">
                            Last trained · {routine.lastTrained}
                          </p>
                        </div>

                        {/* Divider + Action Buttons */}
                        <div>
                          <div className="h-px bg-[#E7E5EC] my-3.5" />
                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() =>
                                onStartWorkout && onStartWorkout(routine)
                              }
                              className="cursor-pointer flex-1 h-[34px] px-3.5 rounded-[17px] border-[1.5px] border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/45 to-[#A9DDF4] shadow-[2px_2px_0_0_#292B38] hover:brightness-105 active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center justify-center gap-2 text-xs font-bold text-[#292B38]"
                            >
                              <svg width="12" height="12" viewBox="0 0 15 15" fill="none">
                                <path
                                  d="M4.375 2.5L12.5 7.5L4.375 12.5V2.5Z"
                                  fill="#292B38"
                                  stroke="#292B38"
                                  strokeWidth="1.5"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>Start Workout</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleViewOrEdit(routine)}
                              className="cursor-pointer h-[34px] px-4 rounded-[17px] border-[1.5px] border-[#292B38] bg-white hover:bg-[#F8F7FA] text-xs font-bold text-[#292B38] shrink-0"
                            >
                              View / Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* 4. SECTION 02 / TEMPLATE LIBRARY */}
          {(activeTab === "all" || activeTab === "templates") && (
            <section className="pt-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-[#292B38]">
                    02 / TEMPLATE LIBRARY
                  </span>
                  <span className="text-[13px] text-[#7B7D90]">
                    A strong start, already planned for you.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAllTemplates((prev) => !prev)}
                  className="cursor-pointer text-xs font-medium text-[#292B38] hover:underline self-start sm:self-auto"
                >
                  {showAllTemplates
                    ? "Show top 3 templates ↑"
                    : `Browse all ${TEMPLATE_LIBRARY.length} templates ↗`}
                </button>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2.5 mt-3 mb-5">
                <select
                  value={goalFilter}
                  onChange={(e) => setGoalFilter(e.target.value)}
                  className="cursor-pointer h-7 px-3 rounded-[14px] border-[1.5px] border-[#292B38] bg-white text-xs font-medium text-[#292B38] focus:outline-none"
                >
                  <option value="All">Goal: All</option>
                  <option value="FULL BODY">Goal: Full Body</option>
                  <option value="MUSCLE BUILDING">Goal: Muscle Building</option>
                  <option value="STRENGTH">Goal: Strength</option>
                  <option value="CONDITIONING">Goal: Conditioning</option>
                </select>

                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="cursor-pointer h-7 px-3 rounded-[14px] border-[1.5px] border-[#292B38] bg-white text-xs font-medium text-[#292B38] focus:outline-none"
                >
                  <option value="All">Difficulty: All</option>
                  <option value="BEGINNER">Difficulty: Beginner</option>
                  <option value="INTERMEDIATE">Difficulty: Intermediate</option>
                  <option value="ALL LEVELS">Difficulty: All Levels</option>
                </select>

                <select
                  value={freqFilter}
                  onChange={(e) => setFreqFilter(e.target.value)}
                  className="cursor-pointer h-7 px-3 rounded-[14px] border-[1.5px] border-[#292B38] bg-white text-xs font-medium text-[#292B38] focus:outline-none"
                >
                  <option value="All">Frequency: All</option>
                  <option value="3 days">Frequency: 3 days/wk</option>
                  <option value="4 days">Frequency: 4 days/wk</option>
                  <option value="6 days">Frequency: 6 days/wk</option>
                </select>
              </div>

              {/* Template Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedTemplates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="rounded-xl border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden flex flex-col justify-between"
                  >
                    {/* Lavender Retro Header */}
                    <div className="h-[35px] border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#E9DDF4]/45 to-[#E9DDF4] px-3 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#292B38]">
                        {tpl.file}
                      </span>
                      <span className="w-5 h-5 rounded-[3px] border border-[#292B38] bg-white flex items-center justify-center">
                        {tpl.icon === "heart" ? (
                          <svg width="11" height="10" viewBox="0 0 14 12" fill="none">
                            <path
                              d="M2 0H6V2H8V0H12V2H14V6H12V8H10V10H8V12H6V10H4V8H2V6H0V2H2V0Z"
                              fill="#292B38"
                            />
                          </svg>
                        ) : (
                          <span className="text-[11px] font-bold leading-none">
                            ✦
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Template Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`px-3 py-1 rounded-[5px] ${tpl.levelBg} text-[10px] font-bold text-[#292B38]`}
                          >
                            {tpl.level}
                          </span>
                          <span className="text-[9px] font-bold text-[#7B7D90] tracking-wide">
                            {tpl.goal}
                          </span>
                        </div>

                        <h3 className="font-spaceGrotesk text-xl font-medium text-[#292B38] mt-3.5">
                          {tpl.title}
                        </h3>
                        <p className="text-[#7B7D90] text-xs leading-relaxed mt-1">
                          {tpl.desc}
                        </p>

                        <div className="flex items-center gap-5 mt-4">
                          <span className="text-[13px] font-bold text-[#292B38]">
                            {tpl.daysPerWeek} days / week
                          </span>
                          <span className="w-px h-5 bg-[#E7E5EC]" />
                          <span className="text-[13px] font-bold text-[#292B38]">
                            {tpl.duration} min / session
                          </span>
                        </div>

                        <p className="text-[#7B7D90] text-[11px] mt-3">
                          {tpl.tagline}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyTemplate(tpl)}
                        className="cursor-pointer mt-4 w-full h-[33px] rounded-[16.5px] border-[1.5px] border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/45 to-[#A9DDF4] shadow-[2px_2px_0_0_#292B38] hover:brightness-105 active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center justify-center gap-2 text-xs font-bold text-[#292B38]"
                      >
                        <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                          <rect x="4" y="4" width="6.5" height="6.5" rx="1" stroke="#292B38" strokeWidth="1.5" />
                          <path d="M8 2H2.5C2.2 2 2 2.2 2 2.5V8" stroke="#292B38" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span>Copy to My Routines</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* 5. BOTTOM FOOTER STATUS BAR */}
        <footer className="max-w-[1160px] w-full mx-auto mt-10 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[#7B7D90]">
          <span className="text-[9px] font-bold tracking-wider uppercase">
            A LITTLE PROGRESS, EVERY DAY.
          </span>
          <span className="text-[10px]">
            All systems go · Last synced just now
          </span>
        </footer>

        {/* 6. FLOATING RETRO TOAST: COPIED_SUCCESS.EXE */}
        {toastMessage && (
          <div className="fixed right-5 bottom-6 z-40 w-[calc(100vw-2.5rem)] max-w-[414px] rounded-md border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden">
            <div className="h-[19px] border-b border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/45 to-[#A9DDF4] px-2.5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#292B38]">
                COPIED_SUCCESS.EXE:
              </span>
              <button
                type="button"
                onClick={() => setToastMessage("")}
                aria-label="Close notification"
                className="cursor-pointer text-xs font-bold leading-none text-[#292B38]"
              >
                ×
              </button>
            </div>
            <div className="px-2.5 py-1.5 flex items-center gap-2.5">
              <span className="w-4 h-4 rounded-sm bg-[#E9DDF4] flex items-center justify-center shrink-0">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 6H4V9H6V7H8V5H10V3H13V7H11V9H9V11H7V13H4V11H2V9H1V6Z"
                    fill="#292B38"
                  />
                </svg>
              </span>
              <p className="text-xs font-medium text-[#292B38] truncate">
                {toastMessage}
              </p>
            </div>
          </div>
        )}

        {/* VIEW / EDIT ROUTINE QUICK MODAL (Fallback jika onViewRoutine tidak dikirim) */}
        {editingRoutine && (
          <div
            className="fixed inset-0 z-50 bg-[#292B38]/40 flex items-center justify-center p-4"
            onClick={() => setEditingRoutine(null)}
          >
            <div
              className="w-full max-w-md rounded-xl border-2 border-[#292B38] bg-white shadow-[6px_6px_0_0_#292B38] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-9 border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/45 to-[#A9DDF4] px-4 flex items-center justify-between">
                <span className="text-xs font-bold text-[#292B38]">
                  {editingRoutine.file}
                </span>
                <button
                  type="button"
                  onClick={() => setEditingRoutine(null)}
                  className="cursor-pointer text-base font-bold text-[#292B38]"
                >
                  ×
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-spaceGrotesk text-2xl font-medium text-[#292B38]">
                  {editingRoutine.title}
                </h3>
                <p className="text-xs text-[#7B7D90] mt-1">
                  {editingRoutine.desc}
                </p>
                <div className="mt-4 p-3 rounded-lg bg-[#F8F7FA] border border-[#CDCED9] text-xs space-y-1">
                  <p>
                    <strong>Scheduled Days:</strong>{" "}
                    {editingRoutine.days.length > 0
                      ? editingRoutine.days.join(", ")
                      : "Unscheduled"}
                  </p>
                  <p>
                    <strong>Exercises:</strong> {editingRoutine.exercises}{" "}
                    movements
                  </p>
                  <p>
                    <strong>Est. Duration:</strong> {editingRoutine.duration}{" "}
                    mins / session
                  </p>
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingRoutine(null)}
                    className="cursor-pointer px-4 py-2 rounded-full border-[1.5px] border-[#292B38] text-xs font-bold"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}