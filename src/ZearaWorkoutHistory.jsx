import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PAST_SESSIONS_DATA = [
  {
    id: "sess-1",
    title: "Upper body strength",
    routine: "4-Day Upper/Lower",
    month: "November 2026",
    dateShort: "Today, Nov 16",
    dateFull: "Nov 16, 2026",
    duration: "52 min",
    volume: "4,150 kg",
    workingSets: 15,
    prsCount: 2,
    iconBg: "#A9DDF4",
    exercises: [
      {
        id: "ex-101",
        name: "Barbell Bench Press",
        isPR: true,
        defaultExpanded: true,
        sets: [
          { set: "01", kg: "80", reps: "6", volume: "480 kg", isPrSet: false },
          { set: "02", kg: "80", reps: "6", volume: "480 kg", isPrSet: false },
          { set: "03", kg: "82.5", reps: "4", volume: "330 kg", isPrSet: true },
        ],
      },
      {
        id: "ex-102",
        name: "Lat Pulldown",
        isPR: false,
        defaultExpanded: true,
        sets: [
          { set: "01", kg: "65", reps: "6", volume: "390 kg", isPrSet: false },
          { set: "02", kg: "65", reps: "6", volume: "390 kg", isPrSet: false },
          { set: "03", kg: "65", reps: "6", volume: "390 kg", isPrSet: false },
        ],
      },
      {
        id: "ex-103",
        name: "Incline DB Press",
        isPR: true,
        defaultExpanded: true,
        sets: [
          { set: "01", kg: "26", reps: "10", volume: "260 kg", isPrSet: false },
          { set: "02", kg: "26", reps: "10", volume: "260 kg", isPrSet: false },
          { set: "03", kg: "26", reps: "10", volume: "260 kg", isPrSet: true },
        ],
      },
      {
        id: "ex-104",
        name: "Seated cable row",
        isPR: false,
        defaultExpanded: false,
        summaryText: "3 sets · 720 kg",
        sets: [
          { set: "01", kg: "60", reps: "4", volume: "240 kg", isPrSet: false },
          { set: "02", kg: "60", reps: "4", volume: "240 kg", isPrSet: false },
          { set: "03", kg: "60", reps: "4", volume: "240 kg", isPrSet: false },
        ],
      },
      {
        id: "ex-105",
        name: "Cable triceps pushdown",
        isPR: false,
        defaultExpanded: false,
        summaryText: "3 sets · 190 kg",
        sets: [
          { set: "01", kg: "20", reps: "4", volume: "80 kg", isPrSet: false },
          { set: "02", kg: "20", reps: "3", volume: "60 kg", isPrSet: false },
          { set: "03", kg: "25", reps: "2", volume: "50 kg", isPrSet: false },
        ],
      },
    ],
  },
  {
    id: "sess-2",
    title: "Lower body power",
    routine: "4-Day Upper/Lower",
    month: "November 2026",
    dateShort: "Sat, Nov 14",
    dateFull: "Nov 14, 2026",
    duration: "48 min",
    volume: "3,900 kg",
    workingSets: 12,
    prsCount: 1,
    iconBg: "#E9DDF4",
    exercises: [
      {
        id: "ex-201",
        name: "Barbell Back Squat",
        isPR: true,
        defaultExpanded: true,
        sets: [
          { set: "01", kg: "100", reps: "6", volume: "600 kg", isPrSet: false },
          { set: "02", kg: "105", reps: "5", volume: "525 kg", isPrSet: false },
          { set: "03", kg: "110", reps: "5", volume: "550 kg", isPrSet: true },
        ],
      },
      {
        id: "ex-202",
        name: "Romanian Deadlift",
        isPR: false,
        defaultExpanded: true,
        sets: [
          { set: "01", kg: "90", reps: "8", volume: "720 kg", isPrSet: false },
          { set: "02", kg: "90", reps: "8", volume: "720 kg", isPrSet: false },
          { set: "03", kg: "90", reps: "8", volume: "720 kg", isPrSet: false },
        ],
      },
      {
        id: "ex-203",
        name: "Standing Calf Raise",
        isPR: false,
        defaultExpanded: false,
        summaryText: "3 sets · 65 kg",
        sets: [
          { set: "01", kg: "25", reps: "1", volume: "25 kg", isPrSet: false },
          { set: "02", kg: "20", reps: "1", volume: "20 kg", isPrSet: false },
          { set: "03", kg: "20", reps: "1", volume: "20 kg", isPrSet: false },
        ],
      },
    ],
  },
  {
    id: "sess-3",
    title: "Full body flow",
    routine: "Full Body Foundation",
    month: "November 2026",
    dateShort: "Thu, Nov 12",
    dateFull: "Nov 12, 2026",
    duration: "56 min",
    volume: "4,400 kg",
    workingSets: 16,
    prsCount: 3,
    iconBg: "#F5B9D7",
    exercises: [
      {
        id: "ex-301",
        name: "Conventional Deadlift",
        isPR: true,
        defaultExpanded: true,
        sets: [
          { set: "01", kg: "120", reps: "5", volume: "600 kg", isPrSet: false },
          { set: "02", kg: "125", reps: "5", volume: "625 kg", isPrSet: false },
          { set: "03", kg: "130", reps: "4", volume: "520 kg", isPrSet: true },
        ],
      },
      {
        id: "ex-302",
        name: "Overhead Barbell Press",
        isPR: true,
        defaultExpanded: true,
        sets: [
          { set: "01", kg: "50", reps: "6", volume: "300 kg", isPrSet: false },
          { set: "02", kg: "50", reps: "6", volume: "300 kg", isPrSet: false },
          { set: "03", kg: "52.5", reps: "5", volume: "262.5 kg", isPrSet: true },
        ],
      },
      {
        id: "ex-303",
        name: "Weighted Pull-Ups",
        isPR: true,
        defaultExpanded: true,
        sets: [
          { set: "01", kg: "70", reps: "8", volume: "560 kg", isPrSet: false },
          { set: "02", kg: "72.5", reps: "8", volume: "580 kg", isPrSet: false },
          { set: "03", kg: "75", reps: "6", volume: "450 kg", isPrSet: true },
        ],
      },
    ],
  },
  {
    id: "sess-4",
    title: "Upper body strength",
    routine: "4-Day Upper/Lower",
    month: "November 2026",
    dateShort: "Tue, Nov 10",
    dateFull: "Nov 10, 2026",
    duration: "50 min",
    volume: "4,050 kg",
    workingSets: 14,
    prsCount: 0,
    iconBg: "#A9DDF4",
    exercises: [
      {
        id: "ex-401",
        name: "Barbell Bench Press",
        isPR: false,
        defaultExpanded: true,
        sets: [
          { set: "01", kg: "77.5", reps: "6", volume: "465 kg", isPrSet: false },
          { set: "02", kg: "77.5", reps: "6", volume: "465 kg", isPrSet: false },
          { set: "03", kg: "80", reps: "5", volume: "400 kg", isPrSet: false },
        ],
      },
      {
        id: "ex-402",
        name: "Barbell Bent-Over Row",
        isPR: false,
        defaultExpanded: true,
        sets: [
          { set: "01", kg: "70", reps: "8", volume: "560 kg", isPrSet: false },
          { set: "02", kg: "70", reps: "8", volume: "560 kg", isPrSet: false },
          { set: "03", kg: "70", reps: "8", volume: "560 kg", isPrSet: false },
        ],
      },
    ],
  },
];

export default function ZearaWorkoutHistory() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedSessionId, setSelectedSessionId] = useState(
    location.state?.sessionId || "sess-1"
  );

  useEffect(() => {
    if (location.state?.sessionId) {
      setSelectedSessionId(location.state.sessionId);
    }
  }, [location.state?.sessionId]);

  const [searchQuery, setSearchQuery] = useState("");
  const [routineFilter, setRoutineFilter] = useState("All Routines");
  const [monthFilter, setMonthFilter] = useState("November 2026");
  const [expandedExerciseIds, setExpandedExerciseIds] = useState(() => {
    const initial = {};
    PAST_SESSIONS_DATA.forEach((s) =>
      s.exercises.forEach((ex) => {
        if (ex.defaultExpanded) initial[ex.id] = true;
      })
    );
    return initial;
  });

  const filteredSessions = useMemo(() => {
    return PAST_SESSIONS_DATA.filter((session) => {
      const matchesSearch =
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.exercises.some((ex) =>
          ex.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesRoutine =
        routineFilter === "All Routines" || session.routine === routineFilter;
      const matchesMonth =
        monthFilter === "All Months" || session.month === monthFilter;
      return matchesSearch && matchesRoutine && matchesMonth;
    });
  }, [searchQuery, routineFilter, monthFilter]);

  const activeSession =
    filteredSessions.find((s) => s.id === selectedSessionId) ||
    filteredSessions[0] ||
    PAST_SESSIONS_DATA[0];

  const toggleExerciseExpand = (exId) => {
    setExpandedExerciseIds((prev) => ({
      ...prev,
      [exId]: !prev[exId],
    }));
  };

  return (
    <div className="bg-[#F8F7FA] min-w-screen min-h-screen overflow-x-auto relative">
      {/* Background Blueprint Grid */}
      <div className="w-[1198px] h-full absolute left-[242px] top-0 pointer-events-none">
        {Array.from({ length: 43 }).map((_, i) => (
          <div
            key={`v-${i}`}
            style={{ left: `${i * 28}px` }}
            className="bg-[#D9EAF5] w-px h-full absolute top-0"
          />
        ))}
        {Array.from({ length: 38 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{ top: `${i * 28}px` }}
            className="bg-[#D9EAF5] w-[1198px] h-px absolute left-0"
          />
        ))}
      </div>

      {/* Left Sidebar */}
      <div className="bg-[#FFF] w-[242px] h-full absolute left-0 top-0 z-10">
        <div className="bg-[#CBCDDA] w-px h-full absolute left-[241px] top-0" />
        <p
          onClick={() => navigate("/")}
          className="text-[#292B38] font-bodoniModa text-[58px] w-[148px] h-[88px] absolute left-6 top-[15px] cursor-pointer"
        >
          Zeara
        </p>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          className="w-10 h-10 absolute left-[174px] top-[31px]"
        >
          <path
            d="M20.0002 3.33331L24.1668 15.8333L36.6668 20L24.1668 24.1666L20.0002 36.6666L15.8335 24.1666L3.3335 20L15.8335 15.8333L20.0002 3.33331Z"
            strokeWidth="1.8"
            strokeLinecap="square"
            stroke="#292B38"
          />
        </svg>
        <p className="text-[#797B8E] font-dMSans text-[9px] font-bold tracking-wider w-[194px] h-3 absolute left-7 top-[110px]">
          YOUR MOVEMENT, CONNECTED
        </p>
        <div className="bg-[#CBCDDA] w-[194px] h-px absolute left-6 top-[140px]" />
        <p className="text-[#797B8E] font-dMSans text-[10px] font-bold w-[63px] h-[13px] absolute left-7 top-[167px]">
          WORKSPACE
        </p>

        {/* Navigation Links */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-52 h-11 absolute left-[17px] top-[194px] flex items-center pl-3.5 rounded-[11px] hover:bg-[#F8F7FA] cursor-pointer text-left"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="mr-3.5"
          >
            <path
              d="M2.25 2.25H6.75V6.75H2.25V2.25ZM11.25 2.25H15.75V6.75H11.25V2.25ZM2.25 11.25H6.75V15.75H2.25V11.25ZM11.25 11.25H15.75V15.75H11.25V11.25Z"
              strokeWidth="1.8"
              strokeLinecap="square"
              stroke="#292B38"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px]">
            Dashboard
          </span>
        </button>

        <button
          onClick={() => navigate("/planner")}
          className="w-52 h-11 absolute left-[17px] top-[249px] flex items-center pl-3.5 rounded-[11px] hover:bg-[#F8F7FA] cursor-pointer text-left"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="mr-3.5"
          >
            <path
              d="M6 3.75H3V7.5M6 3.75H12M6 3.75V1.5M6 3.75V6M12 3.75H15V7.5M12 3.75V1.5M12 3.75V6M15 7.5V15.75H3V7.5M15 7.5H3M6 10.5H7.5M10.5 10.5H12"
              strokeWidth="1.8"
              strokeLinecap="square"
              stroke="#292B38"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px]">
            Workout Planner
          </span>
        </button>

        <button
          onClick={() => navigate("/exercises")}
          className="w-52 h-11 absolute left-[17px] top-[304px] flex items-center pl-3.5 rounded-[11px] hover:bg-[#F8F7FA] cursor-pointer text-left"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="mr-3.5"
          >
            <path
              d="M2.25 6V12M4.5 3.75V9M4.5 9V14.25M4.5 9H13.5M13.5 9V3.75M13.5 9V14.25M15.75 6V12"
              strokeWidth="1.8"
              strokeLinecap="square"
              stroke="#292B38"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px]">
            Exercise Library
          </span>
        </button>

        {/* Active Item: Workout History */}
        <button
          onClick={() => navigate("/history")}
          className="flex items-center pl-3.5 pr-3.5 rounded-[11px] border-2 border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] w-52 h-11 absolute left-[17px] top-[359px] cursor-pointer text-left"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="mr-3.5"
          >
            <path
              d="M7.5 7.5H3V3M3 7.5C3.52215 6.2092 4.47699 5.1402 5.70087 4.47619C6.92476 3.81218 8.34148 3.59451 9.70825 3.86048C11.075 4.12645 12.3067 4.85951 13.1923 5.93402C14.0779 7.00853 14.5621 8.35759 14.5621 9.75C14.5621 11.1424 14.0779 12.4915 13.1923 13.566C12.3067 14.6405 11.075 15.3735 9.70825 15.6395C8.34148 15.9055 6.92476 15.6878 5.70087 15.0238C4.47699 14.3598 3.52215 13.2908 3 12M9 4.5V9L12 11.25"
              strokeWidth="1.8"
              strokeLinecap="square"
              stroke="#292B38"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px] font-bold">
            Workout History
          </span>
          <div className="rounded-[1px] bg-[#292B38] w-[5px] h-[5px] ml-auto" />
        </button>

        <button
          onClick={() => navigate("/analytics")}
          className="w-52 h-11 absolute left-[17px] top-[414px] flex items-center pl-3.5 rounded-[11px] hover:bg-[#F8F7FA] cursor-pointer text-left"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="mr-3.5"
          >
            <path
              d="M2.25 2.25V15.75H15.75M4.5 12L8.25 7.5L11.25 9.75L15.75 3.75"
              strokeWidth="1.8"
              strokeLinecap="square"
              stroke="#292B38"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px]">
            Progress Analytics
          </span>
        </button>

        {/* Daily Reminder Card */}
        <div className="rounded border-2 border-[#292B38] bg-[#E9DDF4] shadow-[4px_4px_0_0_#292B38] w-[200px] h-[180px] absolute left-[21px] top-[673px] overflow-hidden">
          <div className="flex items-center px-2 gap-2 rounded-[1px] border-b-2 border-[#292B38] bg-gradient-to-b from-[#E9DDF4] via-white to-[#E9DDF4] w-full h-[27px]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1L7.25 4.75L11 6L7.25 7.25L6 11L4.75 7.25L1 6L4.75 4.75L6 1Z"
                strokeWidth="1.8"
                strokeLinecap="square"
                stroke="#292B38"
              />
            </svg>
            <p className="text-[#292B38] font-dMSans text-[9px] font-bold">
              daily_reminder.exe
            </p>
          </div>
          <p className="text-[#292B38] font-spaceGrotesk text-[19px] font-medium absolute left-[15px] top-[46px]">
            A little, often.
          </p>
          <p className="text-[#292B38] font-dMSans text-[13px] leading-5 w-[150px] absolute left-[15px] top-[76px]">
            Your future self is cheering you on.
          </p>
          <button
            onClick={() => navigate("/active")}
            className="flex items-center justify-center rounded border-2 border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[2px_2px_0_0_#292B38] active:translate-x-[1px] active:translate-y-[1px] w-[170px] h-7 absolute left-[13px] top-[132px] cursor-pointer"
          >
            <span className="text-[#292B38] font-dMSans text-[8px] font-bold tracking-wider">
              KEEP SHOWING UP
            </span>
          </button>
        </div>

        <div className="bg-[#CBCDDA] w-[202px] h-px absolute left-5 top-[932px]" />

        {/* Profile Footer */}
        <div
          onClick={() => navigate("/settings")}
          className="rounded-[9px] border-2 border-[#292B38] bg-[#FFF] hover:bg-[#F8F7FA] shadow-[4px_4px_0_0_#292B38] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all w-52 h-[72px] absolute left-[17px] top-[952px] flex items-center px-3 cursor-pointer"
        >
          <div className="flex justify-center items-center rounded-md bg-[#F5B9D7] w-[38px] h-[38px] border border-[#292B38]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M8.17836 9.45838C7.98672 9.33334 7.80708 9.18799 7.64281 9.02373C7.01769 8.39861 6.6665 7.55076 6.6665 6.66671C6.6665 5.78265 7.01769 4.93481 7.64281 4.30968C8.26794 3.68456 9.11578 3.33337 9.99984 3.33337C10.8839 3.33337 11.7317 3.68456 12.3569 4.30968C12.982 4.93481 13.3332 5.78265 13.3332 6.66671C13.3332 7.55076 12.982 8.39861 12.3569 9.02373C12.1926 9.18799 12.013 9.33334 11.8213 9.45838M8.17836 9.45838C8.71602 9.80917 9.34809 10 9.99984 10C10.6516 10 11.2837 9.80917 11.8213 9.45838M8.17836 9.45838C7.31815 9.74114 6.52732 10.223 5.87505 10.8753C4.78109 11.9692 4.1665 13.4529 4.1665 15V17.5M8.17836 9.45838C8.76087 9.2669 9.37519 9.16671 9.99984 9.16671C10.6245 9.16671 11.2388 9.2669 11.8213 9.45838M11.8213 9.45838C12.6815 9.74114 13.4724 10.223 14.1246 10.8753C15.2186 11.9692 15.8332 13.4529 15.8332 15V17.5"
                strokeWidth="1.8"
                strokeLinecap="square"
                stroke="#292B38"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-[#292B38] font-dMSans text-[13px] font-bold leading-tight">
              Alex Morgan
            </p>
            <p className="text-[#797B8E] font-dMSans text-[11px]">
              Personal account
            </p>
          </div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="ml-auto"
          >
            <path
              d="M5.25 2.91663L9.33333 6.99996L5.25 11.0833"
              strokeWidth="1.8"
              strokeLinecap="square"
              stroke="#292B38"
            />
          </svg>
        </div>
        <p className="text-[#797B8E] font-dMSans text-[9px] w-[78px] h-3 absolute left-7 top-[1041px]">
          ZEARA OS / V. 2.0
        </p>
      </div>

      {/* Main Header & Filter Bar */}
      <div className="w-[1134px] h-[146px] absolute left-[274px] top-7">
        <p className="text-[#797B8E] font-dMSans text-[10px] font-bold tracking-wider absolute left-0 top-1.5">
          PLAN. TRACK. ANALYZE.
        </p>
        <h1 className="text-[#292B38] font-spaceGrotesk text-[34px] font-medium absolute left-0 top-[29px]">
          Workout History
        </h1>
        <p className="text-[#797B8E] font-dMSans text-sm absolute left-0 top-[78px]">
          Review past training sessions, sets, and personal records.
        </p>

        {/* Browser Address Pill */}
        <div className="rounded-md border-2 border-[#292B38] bg-gradient-to-b from-[#E9DDF4] via-white to-[#E9DDF4] shadow-[4px_4px_0_0_#292B38] w-[260px] h-[30px] absolute left-[419px] top-1 flex items-center px-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2.6665 1.33331V12.6666L5.99984 9.33331L8.6665 14.6666L11.3332 13.3333L7.99984 7.99998L12.6665 7.33331L2.6665 1.33331Z"
              fill="#292B38"
              strokeWidth="1.6"
              stroke="#292B38"
            />
          </svg>
          <div className="rounded-sm bg-[#FFF] w-[220px] h-5 ml-1.5 flex items-center px-2">
            <p className="text-[#292B38] font-dMSans text-[10px] font-bold">
              zeara://my-space/history
            </p>
          </div>
        </div>

        {/* Date Pill */}
        <div className="inline-flex px-3 items-center gap-2.5 rounded-md border-2 border-[#292B38] bg-gradient-to-b from-[#E9DDF4] via-white to-[#E9DDF4] w-[234px] h-7 absolute left-[900px] top-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M4.66683 2.91669H2.3335V5.83335M4.66683 2.91669H9.3335M4.66683 2.91669V1.16669M4.66683 2.91669V4.66669M9.3335 2.91669H11.6668V5.83335M9.3335 2.91669V1.16669M9.3335 2.91669V4.66669M11.6668 5.83335V12.25H2.3335V5.83335M11.6668 5.83335H2.3335M4.66683 8.16669H5.8335M8.16683 8.16669H9.3335"
              strokeWidth="1.6"
              stroke="#292B38"
            />
          </svg>
          <p className="text-[#292B38] font-dMSans text-[11px]">
            Monday, November 16, 2026
          </p>
        </div>

        {/* Search Input */}
        <div className="flex items-center px-3.5 gap-2.5 rounded-md border-2 border-[#292B38] bg-[#FFF] w-[500px] h-9 absolute left-0 top-28">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M10 10L14 14M6.66667 2C4.08934 2 2 4.08934 2 6.66667C2 9.244 4.08934 11.3333 6.66667 11.3333C9.244 11.3333 11.3333 9.244 11.3333 6.66667C11.3333 4.08934 9.244 2 6.66667 2Z"
              strokeWidth="1.6"
              stroke="#292B38"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search past sessions..."
            className="w-full bg-transparent text-[#292B38] placeholder-[#797B8E] font-dMSans text-xs focus:outline-none"
          />
        </div>

        {/* Routine Filter Select */}
        <div className="w-[250px] h-9 absolute left-[524px] top-28">
          <select
            value={routineFilter}
            onChange={(e) => setRoutineFilter(e.target.value)}
            className="appearance-none w-full h-full px-3.5 pr-8 rounded-md border-2 border-[#292B38] bg-[#FFF] text-[#292B38] font-dMSans text-xs font-medium focus:outline-none cursor-pointer"
          >
            <option value="All Routines">All Routines</option>
            <option value="4-Day Upper/Lower">4-Day Upper/Lower</option>
            <option value="Full Body Foundation">Full Body Foundation</option>
          </select>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="absolute right-3 top-[11px] pointer-events-none"
          >
            <path
              d="M3.5 5.25L7 8.75L10.5 5.25"
              strokeWidth="1.6"
              stroke="#292B38"
            />
          </svg>
        </div>

        {/* Month Filter Select */}
        <div className="w-[344px] h-9 absolute left-[790px] top-28">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="absolute left-3.5 top-2.5 pointer-events-none"
          >
            <path
              d="M5.33317 3.33337H2.6665V6.66671M5.33317 3.33337H10.6665M5.33317 3.33337V1.33337M5.33317 3.33337V5.33337M10.6665 3.33337H13.3332V6.66671M10.6665 3.33337V1.33337M10.6665 3.33337V5.33337M13.3332 6.66671V14H2.6665V6.66671M13.3332 6.66671H2.6665M5.33317 9.33337H6.6665M9.33317 9.33337H10.6665"
              strokeWidth="1.6"
              stroke="#292B38"
            />
          </svg>
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="appearance-none w-full h-full pl-10 pr-8 rounded-md border-2 border-[#292B38] bg-[#FFF] text-[#292B38] font-dMSans text-xs font-medium focus:outline-none cursor-pointer"
          >
            <option value="November 2026">November 2026</option>
            <option value="All Months">All Months (2026)</option>
          </select>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="absolute right-3.5 top-[11px] pointer-events-none"
          >
            <path
              d="M3.5 5.25L7 8.75L10.5 5.25"
              strokeWidth="1.6"
              stroke="#292B38"
            />
          </svg>
        </div>
      </div>

      {/* Left Window: 01 / PAST_SESSIONS.EXE */}
      <div className="rounded-xl border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] w-[500px] h-[818px] absolute left-[274px] top-[196px] overflow-hidden flex flex-col">
        {/* Titlebar */}
        <div className="bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] w-full h-[38px] border-b-2 border-[#292B38] flex items-center px-4 justify-between shrink-0">
          <p className="text-[#292B38] font-dMSans text-xs font-bold">
            01 / PAST_SESSIONS.EXE
          </p>
          <div className="flex p-1 justify-center items-center rounded-[3px] border-2 border-[#292B38] bg-[#FFF] w-5 h-5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M5 1H7V3.5H8.5V5H11V7H8.5V8.5H7V11H5V8.5H3.5V7H1V5H3.5V3.5H5V1Z"
                fill="#292B38"
                strokeWidth="1.6"
                stroke="#292B38"
              />
            </svg>
          </div>
        </div>

        {/* Subheader */}
        <div className="px-[22px] pt-5 pb-3 flex items-end justify-between shrink-0">
          <div>
            <h2 className="text-[#292B38] font-spaceGrotesk text-[22px] font-medium leading-tight">
              Your training, logged.
            </h2>
            <p className="text-[#797B8E] font-dMSans text-xs mt-1">
              {filteredSessions.length} completed sessions
            </p>
          </div>
          <p className="text-[#797B8E] font-dMSans text-[9px] font-bold">
            NEWEST FIRST
          </p>
        </div>

        {/* Session Cards List */}
        <div className="px-[18px] flex-1 overflow-y-auto flex flex-col gap-3.5 pb-4">
          {filteredSessions.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#CBCDDA] rounded-lg">
              <p className="text-[#292B38] font-spaceGrotesk text-base font-medium">
                No sessions match your filter
              </p>
              <p className="text-[#797B8E] font-dMSans text-xs mt-1">
                Try clearing your search or selecting another routine.
              </p>
            </div>
          ) : (
            filteredSessions.map((session) => {
              const isSelected = activeSession?.id === session.id;
              return (
                <button
                  key={session.id}
                  onClick={() => setSelectedSessionId(session.id)}
                  className={`rounded-lg border-2 border-[#292B38] w-full h-36 shrink-0 relative text-left transition-colors cursor-pointer overflow-hidden ${
                    isSelected
                      ? "bg-[#EAF7FD]"
                      : "bg-[#FFF] hover:bg-[#F8F7FA]"
                  }`}
                >
                  {isSelected && (
                    <div className="bg-[#A9DDF4] w-[5px] h-full absolute left-0 top-0" />
                  )}

                  {/* Icon Badge */}
                  <div
                    style={{ backgroundColor: session.iconBg }}
                    className="flex p-2 justify-center items-center rounded-[7px] w-9 h-9 absolute left-4 top-4"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M2.5 6.66663V13.3333M5 4.16663V9.99996M5 9.99996V15.8333M5 9.99996H15M15 9.99996V4.16663M15 9.99996V15.8333M17.5 6.66663V13.3333"
                        strokeWidth="1.6"
                        stroke="#292B38"
                      />
                    </svg>
                  </div>

                  {/* Title & Date */}
                  <p className="text-[#292B38] font-spaceGrotesk text-lg font-medium absolute left-16 top-[16px]">
                    {session.title}
                  </p>
                  <p className="text-[#797B8E] font-dMSans text-xs absolute left-16 top-[43px]">
                    {session.dateShort}
                  </p>

                  {/* Chevron */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    className="w-[18px] h-[18px] absolute right-4 top-7"
                  >
                    <path
                      d="M6.75 3.75L12 9L6.75 14.25"
                      strokeWidth="1.6"
                      stroke="#292B38"
                    />
                  </svg>

                  {/* Divider */}
                  <div
                    className={`w-[432px] h-px absolute left-4 top-[78px] ${
                      isSelected ? "bg-[#C7E2F1]" : "bg-[#E9E8EF]"
                    }`}
                  />

                  {/* Metrics Row */}
                  <p className="text-[#797B8E] font-dMSans text-[9px] font-bold absolute left-4 top-[92px]">
                    DURATION
                  </p>
                  <p className="text-[#292B38] font-spaceGrotesk text-[17px] font-medium absolute left-4 top-[108px]">
                    {session.duration}
                  </p>

                  <p className="text-[#797B8E] font-dMSans text-[9px] font-bold absolute left-[141px] top-[92px]">
                    VOLUME
                  </p>
                  <p className="text-[#292B38] font-spaceGrotesk text-[17px] font-medium absolute left-[141px] top-[108px]">
                    {session.volume}
                  </p>

                  {/* PRs or Completed Badge */}
                  {session.prsCount > 0 ? (
                    <div className="inline-flex px-2.5 items-center gap-2 rounded-[5px] bg-[#E9DDF4] h-[27px] absolute right-4 top-[100px]">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M5.41683 1.08337H7.5835V3.79171H9.2085V5.41671H11.9168V7.58337H9.2085V9.20837H7.5835V11.9167H5.41683V9.20837H3.79183V7.58337H1.0835V5.41671H3.79183V3.79171H5.41683V1.08337Z"
                          fill="#292B38"
                          strokeWidth="1.6"
                          stroke="#292B38"
                        />
                      </svg>
                      <span className="text-[#292B38] font-dMSans text-[11px] font-bold">
                        {session.prsCount}{" "}
                        {session.prsCount === 1 ? "PR" : "PRs"}
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 absolute right-4 top-[105px]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3.3335 8L6.00016 10.6667L12.6668 4"
                          strokeWidth="1.6"
                          stroke="#292B38"
                        />
                      </svg>
                      <span className="text-[#797B8E] font-dMSans text-[11px] font-medium">
                        Completed
                      </span>
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-[22px] py-3 border-t border-[#E9E8EF] shrink-0">
          <p className="text-[#797B8E] font-dMSans text-[11px]">
            Showing {filteredSessions.length} sessions · {monthFilter}
          </p>
        </div>
      </div>

      {/* Right Window: 02 / SESSION_DETAIL.EXE */}
      <div className="rounded-xl border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] w-[610px] h-[818px] absolute left-[798px] top-[196px] overflow-hidden flex flex-col">
        {/* Titlebar */}
        <div className="bg-gradient-to-b from-[#F5B9D7] via-white to-[#F5B9D7] w-full h-[38px] border-b-2 border-[#292B38] flex items-center px-4 justify-between shrink-0">
          <p className="text-[#292B38] font-dMSans text-xs font-bold">
            02 / SESSION_DETAIL.EXE
          </p>
          <div className="flex p-1 justify-center items-center rounded-[3px] border-2 border-[#292B38] bg-[#FFF] w-5 h-5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M5 1H7V3.5H8.5V5H11V7H8.5V8.5H7V11H5V8.5H3.5V7H1V5H3.5V3.5H5V1Z"
                fill="#292B38"
                strokeWidth="1.7"
                stroke="#292B38"
              />
            </svg>
          </div>
        </div>

        {/* Session Header Info */}
        <div className="px-[22px] pt-5 pb-4 shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[#292B38] font-spaceGrotesk text-[26px] font-medium leading-tight">
                {activeSession.title}
              </h2>
              <p className="text-[#797B8E] font-dMSans text-xs mt-1">
                {activeSession.dateFull} · {activeSession.exercises.length}{" "}
                exercises completed
              </p>
            </div>
            <div className="inline-flex px-2.5 py-1.5 items-center gap-2 rounded bg-[#E9DDF4]">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M2.7085 6.5L4.87516 8.66667L10.2918 3.25"
                  strokeWidth="1.7"
                  stroke="#292B38"
                />
              </svg>
              <span className="text-[#292B38] font-dMSans text-[9px] font-bold">
                COMPLETED
              </span>
            </div>
          </div>

          {/* 3 Summary KPI Boxes */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="rounded-md bg-[#F8F7FA] h-[54px] relative pl-3.5 pt-2">
              <div className="rounded-sm bg-[#A9DDF4] w-1 h-full absolute left-0 top-0" />
              <p className="text-[#797B8E] font-dMSans text-[9px] font-bold">
                DURATION
              </p>
              <p className="text-[#292B38] font-spaceGrotesk text-[21px] font-medium leading-tight">
                {activeSession.duration}
              </p>
            </div>

            <div className="rounded-md bg-[#F8F7FA] h-[54px] relative pl-3.5 pt-2">
              <div className="rounded-sm bg-[#E9DDF4] w-1 h-full absolute left-0 top-0" />
              <p className="text-[#797B8E] font-dMSans text-[9px] font-bold">
                TOTAL VOLUME
              </p>
              <p className="text-[#292B38] font-spaceGrotesk text-[21px] font-medium leading-tight">
                {activeSession.volume}
              </p>
            </div>

            <div className="rounded-md bg-[#F8F7FA] h-[54px] relative pl-3.5 pt-2">
              <div className="rounded-sm bg-[#F5B9D7] w-1 h-full absolute left-0 top-0" />
              <p className="text-[#797B8E] font-dMSans text-[9px] font-bold">
                WORKING SETS
              </p>
              <p className="text-[#292B38] font-spaceGrotesk text-[21px] font-medium leading-tight">
                {activeSession.workingSets} sets
              </p>
            </div>
          </div>
        </div>

        {/* Exercise Breakdown Cards */}
        <div className="px-[22px] flex-1 overflow-y-auto flex flex-col gap-3 pb-3">
          {activeSession.exercises.map((ex) => {
            const isExpanded = !!expandedExerciseIds[ex.id];

            if (!isExpanded) {
              return (
                <button
                  key={ex.id}
                  onClick={() => toggleExerciseExpand(ex.id)}
                  className="rounded-[5px] bg-[#F8F7FA] hover:bg-[#EFEFF5] w-full h-9 shrink-0 px-3 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="text-[#292B38] font-dMSans text-xs font-medium">
                    {ex.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#797B8E] font-spaceGrotesk text-[11px]">
                      {ex.summaryText || `${ex.sets.length} sets`}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M4.5 2.5L8 6L4.5 9.5"
                        strokeWidth="1.7"
                        stroke="#292B38"
                      />
                    </svg>
                  </div>
                </button>
              );
            }

            return (
              <div
                key={ex.id}
                className="rounded-md border-2 border-[#292B38] bg-[#FFF] w-full shrink-0 overflow-hidden"
              >
                {/* Exercise Card Header */}
                <div
                  onClick={() => toggleExerciseExpand(ex.id)}
                  className="bg-[#F8F7FA] w-full h-10 px-3.5 flex items-center justify-between cursor-pointer"
                >
                  <p className="text-[#292B38] font-dMSans text-[15px] font-bold">
                    {ex.name}
                  </p>
                  {ex.isPR ? (
                    <div className="inline-flex px-2 py-1 items-center gap-1.5 rounded-[3px] bg-[#E9DDF4]">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M6.50016 1.08337L8.12516 4.33337L11.9168 4.87504L9.2085 7.58337L9.75016 11.375L6.50016 9.75004L3.25016 11.375L3.79183 7.58337L1.0835 4.87504L4.87516 4.33337L6.50016 1.08337Z"
                          strokeWidth="1.7"
                          stroke="#292B38"
                        />
                      </svg>
                      <span className="text-[#292B38] font-dMSans text-[9px] font-bold">
                        NEW PR
                      </span>
                    </div>
                  ) : (
                    <span className="text-[#797B8E] font-dMSans text-[9px] font-bold">
                      {ex.sets.length} SETS
                    </span>
                  )}
                </div>

                {/* Column Headers */}
                <div className="grid grid-cols-4 px-3.5 pt-2 pb-1 text-[#797B8E] font-dMSans text-[9px] font-bold">
                  <span>SET</span>
                  <span>KG</span>
                  <span>REPS</span>
                  <span>VOLUME</span>
                </div>

                {/* Set Rows */}
                {ex.sets.map((s) => (
                  <div
                    key={s.set}
                    className={`grid grid-cols-4 px-3.5 py-1.5 border-t border-[#EFEEF3] items-center ${
                      s.isPrSet ? "bg-[#EEF8FE]" : "bg-[#FFF]"
                    }`}
                  >
                    <span className="text-[#797B8E] font-spaceGrotesk text-[13px]">
                      {s.set}
                    </span>
                    <span
                      className={`text-[#292B38] font-spaceGrotesk text-sm ${
                        s.isPrSet ? "font-bold" : "font-medium"
                      }`}
                    >
                      {s.kg}
                    </span>
                    <span className="text-[#292B38] font-spaceGrotesk text-sm font-medium">
                      {s.reps}
                    </span>
                    <span className="text-[#292B38] font-spaceGrotesk text-sm">
                      {s.volume}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Detail Footer */}
        <div className="px-[22px] py-2.5 shrink-0 bg-[#FFF]">
          <p className="text-[#797B8E] font-dMSans text-[10px]">
            {activeSession.workingSets} completed sets · {activeSession.prsCount}{" "}
            personal records · All sets saved
          </p>
        </div>
      </div>

      {/* Bottom Page Footer */}
      <div className="w-[1134px] h-[22px] absolute left-[274px] top-[1035px] flex items-center justify-between">
        <p className="text-[#797B8E] font-dMSans text-[9px] font-bold">
          A LITTLE PROGRESS, EVERY DAY.
        </p>
        <div className="flex items-center gap-2">
          <div className="rounded-[3px] bg-[#A9DDF4] w-2 h-2 border border-[#292B38]" />
          <p className="text-[#797B8E] font-dMSans text-[10px]">
            All changes saved · Synced just now
          </p>
        </div>
      </div>
    </div>
  );
}