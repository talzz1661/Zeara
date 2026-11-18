import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TIME_RANGES = {
  "4 Weeks": {
    dateRange: "OCT 19 — NOV 16, 2026",
    totalVolume: "16,850",
    volumeDelta: "↗ 8.2%",
    volumeSub: "vs. previous 4 weeks",
    totalWorkouts: "16",
    workoutAvg: "4.0 / week avg",
    prsTotal: "8",
    prsMonth: "3 this month",
    avgDuration: "52",
    durationSub: "Your average, across 16 sessions.",
    footerVolumeNote: "16,850 kg moved. Every rep counts.",
    chartPoints: [
      { label: "Oct 19", value: 4050, x: 0, y: 40.3 },
      { label: "Oct 26", value: 3850, x: 198, y: 45.03 },
      { label: "Nov 2", value: 4400, x: 396, y: 14.27 },
      { label: "Nov 9", value: 4800, x: 495, y: 1.25 },
      { label: "Nov 16", value: 4150, x: 595, y: 43.85 },
    ],
  },
  "8 Weeks": {
    dateRange: "SEP 28 — NOV 16, 2026",
    totalVolume: "34,850",
    volumeDelta: "↗ 12.4%",
    volumeSub: "vs. previous 8 weeks",
    totalWorkouts: "32",
    workoutAvg: "4.0 / week avg",
    prsTotal: "14",
    prsMonth: "3 this month",
    avgDuration: "51",
    durationSub: "Your average, across 32 sessions.",
    footerVolumeNote: "34,850 kg moved. Every rep counts.",
    chartPoints: [
      { label: "Sep 28", value: 3500, x: 0, y: 59.23 },
      { label: "Oct 5", value: 3800, x: 85, y: 52.13 },
      { label: "Oct 12", value: 3650, x: 170, y: 55.68 },
      { label: "Oct 19", value: 4300, x: 255, y: 40.3 },
      { label: "Oct 26", value: 4100, x: 340, y: 45.03 },
      { label: "Nov 2", value: 5400, x: 425, y: 14.27 },
      { label: "Nov 9", value: 5950, x: 510, y: 1.25 },
      { label: "Nov 16", value: 4150, x: 595, y: 43.85 },
    ],
  },
  "6 Months": {
    dateRange: "MAY 18 — NOV 16, 2026",
    totalVolume: "102,400",
    volumeDelta: "↗ 18.6%",
    volumeSub: "vs. previous 6 months",
    totalWorkouts: "94",
    workoutAvg: "3.9 / week avg",
    prsTotal: "31",
    prsMonth: "3 this month",
    avgDuration: "54",
    durationSub: "Your average, across 94 sessions.",
    footerVolumeNote: "102,400 kg moved. Every rep counts.",
    chartPoints: [
      { label: "May", value: 3100, x: 0, y: 58 },
      { label: "Jun", value: 3600, x: 119, y: 46 },
      { label: "Jul", value: 4000, x: 238, y: 36 },
      { label: "Aug", value: 4450, x: 357, y: 24 },
      { label: "Sep", value: 4900, x: 476, y: 12 },
      { label: "Nov", value: 5350, x: 595, y: 4 },
    ],
  },
  "All Time": {
    dateRange: "JAN 05 — NOV 16, 2026",
    totalVolume: "148,920",
    volumeDelta: "↗ 24.1%",
    volumeSub: "since joining Zeara",
    totalWorkouts: "128",
    workoutAvg: "4.2 / week avg",
    prsTotal: "42",
    prsMonth: "3 this month",
    avgDuration: "53",
    durationSub: "Your average, across 128 sessions.",
    footerVolumeNote: "148,920 kg moved. Every rep counts.",
    chartPoints: [
      { label: "Q1", value: 2800, x: 0, y: 59 },
      { label: "Q2", value: 3750, x: 198, y: 42 },
      { label: "Q3", value: 4600, x: 396, y: 21 },
      { label: "Q4", value: 5500, x: 595, y: 3 },
    ],
  },
};

const EXERCISE_STRENGTH_DATA = {
  "Barbell Bench Press": {
    progression: "75 → 82.5 kg",
    percentGain: "↗ 10%",
    summary: "+7.5 kg stronger since September.",
    yTicks: ["85", "80", "75", "70"],
    pathD:
      "M0 56.75C24.8 56.75 24.8 56.75 49.6 56.75C74.4 56.75 74.4 38.25 99.2 38.25C124 38.25 124 38.25 148.8 38.25C173.6 38.25 173.6 19.75 198.4 19.75C223.2 19.75 223.2 19.75 248 19.75C272.8 19.75 272.8 1.25 297.6 1.25C322.4 1.25 322.4 1.25 347.2 1.25",
    dots: [
      { left: 56, top: 239 },
      { left: 105, top: 239 },
      { left: 155, top: 220 },
      { left: 204, top: 220 },
      { left: 254, top: 202 },
      { left: 304, top: 202 },
      { left: 353, top: 183 },
      { left: 403, top: 183 },
    ],
  },
  "Barbell Back Squat": {
    progression: "95 → 110 kg",
    percentGain: "↗ 15.8%",
    summary: "+15 kg stronger since September.",
    yTicks: ["115", "105", "95", "85"],
    pathD:
      "M0 56.75C40 52 65 44 99.2 38.25C140 32 165 25 198.4 19.75C240 14 265 8 297.6 3C320 1.5 335 1.25 347.2 1.25",
    dots: [
      { left: 56, top: 239 },
      { left: 155, top: 220 },
      { left: 254, top: 202 },
      { left: 353, top: 185 },
      { left: 403, top: 183 },
    ],
  },
  "Conventional Deadlift": {
    progression: "120 → 140 kg",
    percentGain: "↗ 16.7%",
    summary: "+20 kg stronger since September.",
    yTicks: ["145", "135", "125", "115"],
    pathD:
      "M0 56.75C45 50 75 42 115 34C155 26 195 19 235 12C275 6 310 2 347.2 1.25",
    dots: [
      { left: 56, top: 239 },
      { left: 171, top: 216 },
      { left: 291, top: 194 },
      { left: 403, top: 183 },
    ],
  },
  "Overhead Press": {
    progression: "42.5 → 50 kg",
    percentGain: "↗ 17.6%",
    summary: "+7.5 kg stronger since September.",
    yTicks: ["52", "48", "44", "40"],
    pathD:
      "M0 56.75C50 56.75 75 40 124 38.25C175 36 200 20 248 19.75C290 19.75 315 2 347.2 1.25",
    dots: [
      { left: 56, top: 239 },
      { left: 180, top: 220 },
      { left: 304, top: 202 },
      { left: 403, top: 183 },
    ],
  },
};

const PERSONAL_RECORDS = [
  {
    id: 1,
    exercise: "Barbell Bench Press",
    heaviest: "82.5 kg",
    highestReps: "12 reps × 65 kg",
    date: "Nov 16, 2026",
    isNew: true,
    badgeBg: "bg-[#A9DDF4]",
  },
  {
    id: 2,
    exercise: "Barbell Back Squat",
    heaviest: "110 kg",
    highestReps: "10 reps × 90 kg",
    date: "Nov 14, 2026",
    isNew: true,
    badgeBg: "bg-[#E9DDF4]",
  },
  {
    id: 3,
    exercise: "Conventional Deadlift",
    heaviest: "140 kg",
    highestReps: "8 reps × 120 kg",
    date: "Nov 12, 2026",
    isNew: true,
    badgeBg: "bg-[#F5B9D7]",
  },
  {
    id: 4,
    exercise: "Overhead Press",
    heaviest: "50 kg",
    highestReps: "12 reps × 35 kg",
    date: "Oct 28, 2026",
    isNew: false,
    badgeBg: "bg-[#E9DDF4]",
  },
];

export default function ZearaProgressAnalytics() {
  const navigate = useNavigate();

  const [selectedRange, setSelectedRange] = useState("8 Weeks");
  const [selectedExercise, setSelectedExercise] = useState(
    "Barbell Bench Press"
  );
  const [hoveredPointIndex, setHoveredPointIndex] = useState(null);

  const rangeData = TIME_RANGES[selectedRange];
  const exerciseData = EXERCISE_STRENGTH_DATA[selectedExercise];

  const activePointIdx =
    hoveredPointIndex !== null &&
    hoveredPointIndex < rangeData.chartPoints.length
      ? hoveredPointIndex
      : rangeData.chartPoints.length - 1;
  const activePoint = rangeData.chartPoints[activePointIdx];

  return (
    <div className="bg-[#F8F7FA] min-w-screen min-h-screen overflow-x-auto relative">
      {/* Background Grid */}
      <div className="w-[1198px] h-full absolute left-[242px] top-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 43 }).map((_, i) => (
          <div
            key={`v-${i}`}
            style={{ left: `${i * 28}px` }}
            className="opacity-[65%] bg-[#D9EAF5] w-px h-full absolute top-0"
          />
        ))}
        {Array.from({ length: 38 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{ top: `${i * 28}px` }}
            className="opacity-[65%] bg-[#D9EAF5] w-[1198px] h-px absolute left-0"
          />
        ))}
      </div>

      {/* Left Sidebar */}
      <div className="bg-[#FFF] w-[242px] h-full absolute left-0 top-0 z-10">
        <div className="bg-[#D0D1DD] w-px h-full absolute left-[241px] top-0" />
        <img
          src="/ZearaWordmark.png"
          onClick={() => navigate("/")}
          className="w-48 h-12 absolute left-6 top-[30px] max-w-none cursor-pointer"
          alt="Zeara wordmark"
        />
        <p className="text-[#7B7D90] font-dMSans text-[9px] font-bold w-[138px] h-3 absolute left-7 top-[108px]">
          YOUR MOVEMENT, CONNECTED
        </p>
        <div className="bg-[#D0D1DD] w-[194px] h-px absolute left-6 top-[132px]" />
        <p className="text-[#7B7D90] font-dMSans text-[10px] font-bold w-[63px] h-[13px] absolute left-7 top-[162px]">
          WORKSPACE
        </p>

        {/* Dashboard */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-52 h-11 absolute left-[17px] top-[188px] flex items-center pl-3.5 rounded-xl hover:bg-[#F8F7FA] cursor-pointer text-left"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="w-[18px] h-[18px] mr-3"
          >
            <path
              d="M2.4541 2.45454H7.36319V7.36363H2.4541V2.45454ZM10.6359 2.45454H15.545V7.36363H10.6359V2.45454ZM2.4541 10.6364H7.36319V15.5455H2.4541V10.6364ZM10.6359 10.6364H15.545V15.5455H10.6359V10.6364Z"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px]">
            Dashboard
          </span>
        </button>

        {/* Workout Planner */}
        <button
          onClick={() => navigate("/planner")}
          className="w-52 h-11 absolute left-[17px] top-[243px] flex items-center pl-3.5 rounded-xl hover:bg-[#F8F7FA] cursor-pointer text-left"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="w-[18px] h-[18px] mr-3"
          >
            <path
              d="M5.72701 4.09091H3.27246V7.36364M5.72701 4.09091H12.2725M5.72701 4.09091V1.63636M5.72701 4.09091V6.54545M12.2725 4.09091H14.727V7.36364M12.2725 4.09091V1.63636M12.2725 4.09091V6.54545M14.727 7.36364V15.5455H3.27246V7.36364M14.727 7.36364H3.27246M5.72701 9.81818H8.18155M10.6361 9.81818H12.2725M5.72701 12.2727H8.18155"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px]">
            Workout Planner
          </span>
        </button>

        {/* Exercise Library */}
        <button
          onClick={() => navigate("/exercises")}
          className="w-52 h-11 absolute left-[17px] top-[298px] flex items-center pl-3.5 rounded-xl hover:bg-[#F8F7FA] cursor-pointer text-left"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="w-[18px] h-[18px] mr-3"
          >
            <path
              d="M2.4541 4.90909V13.0909M4.90865 3.27273V9M4.90865 9V14.7273M4.90865 9H13.0905M13.0905 3.27273V9M13.0905 9V14.7273M15.545 4.90909V13.0909"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px]">
            Exercise Library
          </span>
        </button>

        {/* Workout History */}
        <button
          onClick={() => navigate("/history")}
          className="w-52 h-11 absolute left-[17px] top-[353px] flex items-center pl-3.5 rounded-xl hover:bg-[#F8F7FA] cursor-pointer text-left"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="w-[18px] h-[18px] mr-3"
          >
            <path
              d="M3.27246 4.09091V7.36363M3.27246 7.36363V8.18182H7.36337M3.27246 7.36363C3.75497 5.99888 4.70442 4.84864 5.95299 4.11621C7.20156 3.38378 8.66886 3.11632 10.0956 3.3611C11.5222 3.60588 12.8165 4.34714 13.7495 5.45388C14.6825 6.56061 15.1942 7.96155 15.1942 9.40909C15.1942 10.8566 14.6825 12.2576 13.7495 13.3643C12.8165 14.471 11.5222 15.2123 10.0956 15.4571C8.66886 15.7019 7.20156 15.4344 5.95299 14.702C4.70442 13.9695 3.75497 12.8193 3.27246 11.4545M8.99973 4.09091V9.81818L12.2725 11.4545"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px]">
            Workout History
          </span>
        </button>

        {/* Active Item: Progress Analytics */}
        <button
          onClick={() => navigate("/analytics")}
          className="rounded-xl border-2 border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[3px_3px_0_0_#292B38] w-52 h-11 absolute left-[17px] top-[408px] flex items-center pl-3.5 pr-3.5 cursor-pointer text-left"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="w-[18px] h-[18px] mr-3"
          >
            <path
              d="M2.4541 2.45454V15.5455H16.3632M4.90865 11.4545L8.18137 7.36364L11.4541 9.81818L16.3632 4.09091"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px] font-bold">
            Progress Analytics
          </span>
          <div className="rounded-[1px] bg-[#292B38] w-[5px] h-[5px] ml-auto" />
        </button>

        {/* Daily Reminder Card */}
        <div className="rounded-[5px] border-2 border-[#292B38] bg-[#E9DDF4] shadow-[4px_4px_0_0_#292B38] w-[200px] h-[180px] absolute left-[21px] top-[672px] overflow-hidden">
          <div className="flex items-center px-2 gap-2 rounded-sm border-b border-[#292B38] bg-gradient-to-b from-[#E9DDF4] via-white to-[#E9DDF4] w-[194px] h-[26px] absolute left-[1px] top-[1px]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 0.545441V3.27271H8.72727V5.99999H11.4545V6.54544H8.72727V9.27271H6V12H5.45455V9.27271H2.72727V6.54544H0V5.99999H2.72727V3.27271H5.45455V0.545441H6Z"
                fill="#292B38"
              />
            </svg>
            <p className="text-[#292B38] font-dMSans text-[9px] font-bold">
              daily_reminder.exe
            </p>
          </div>
          <p className="text-[#292B38] font-spaceGrotesk text-[19px] font-medium absolute left-[15px] top-[46px]">
            A little, often.
          </p>
          <p className="text-[#292B38] font-dMSans text-[13px] leading-snug absolute left-[15px] top-[80px] w-[165px]">
            Your future self is cheering you on.
          </p>
          <button
            onClick={() => navigate("/planner")}
            className="flex items-center justify-center rounded border-2 border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[1px_1px_0_0_#292B38] active:translate-x-[1px] active:translate-y-[1px] w-[168px] h-[27px] absolute left-[14px] top-[137px] cursor-pointer"
          >
            <span className="text-[#292B38] font-dMSans text-[8px] font-bold tracking-wider">
              KEEP SHOWING UP
            </span>
          </button>
        </div>

        <div className="bg-[#D0D1DD] w-[202px] h-px absolute left-5 top-[932px]" />

        {/* Profile Footer */}
        <div
          onClick={() => navigate("/settings")}
          className="rounded-[9px] border-2 border-[#292B38] bg-[#FFF] hover:bg-[#F8F7FA] shadow-[4px_4px_0_0_#292B38] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all w-52 h-[72px] absolute left-[17px] top-[952px] flex items-center px-3 cursor-pointer"
        >
          <div className="rounded-md bg-[#F5B9D7] w-[38px] h-[38px] flex items-center justify-center border border-[#292B38]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M6.81903 9.94319C6.5232 9.40882 6.36399 8.80354 6.36399 8.18183C6.36399 7.21741 6.74711 6.29249 7.42906 5.61054C8.11101 4.92859 9.03593 4.54547 10.0004 4.54547C10.9648 4.54547 11.8897 4.92859 12.5717 5.61054C13.2536 6.29249 13.6367 7.21741 13.6367 8.18183C13.6367 8.80354 13.4775 9.40882 13.1817 9.94319M6.81903 9.94319C6.98211 10.2378 7.18672 10.5108 7.42906 10.7531C8.11101 11.4351 9.03593 11.8182 10.0004 11.8182C10.9648 11.8182 11.8897 11.4351 12.5717 10.7531C12.814 10.5108 13.0186 10.2378 13.1817 9.94319M6.81903 9.94319C6.34126 10.219 5.89742 10.558 5.50058 10.9548C4.30717 12.1482 3.63672 13.7668 3.63672 15.4546V18.1818M6.81903 9.94319C7.77808 9.38964 8.87382 9.09093 10.0004 9.09093C11.1269 9.09093 12.2226 9.38964 13.1817 9.94319M13.1817 9.94319C13.6594 10.219 14.1033 10.558 14.5001 10.9548C15.6935 12.1482 16.364 13.7668 16.364 15.4546V18.1818"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#292B38"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-[#292B38] font-dMSans text-[13px] font-bold leading-tight">
              Alex Morgan
            </p>
            <p className="text-[#7B7D90] font-dMSans text-[11px]">
              Personal account
            </p>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="w-4 h-4 ml-auto"
          >
            <path
              d="M5.81836 3.63635L10.182 7.99999L5.81836 12.3636"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
        </div>

        <p className="text-[#7B7D90] font-dMSans text-[9px] w-[78px] h-3 absolute left-7 top-[1041px]">
          ZEARA OS / V. 2.0
        </p>
      </div>

      {/* Top Header & Time Range Filter */}
      <div className="w-[1134px] h-28 absolute left-[274px] top-8">
        <p className="text-[#7B7D90] font-dMSans text-[10px] font-bold absolute left-0 top-0">
          PLAN. TRACK. ANALYZE.
        </p>

        {/* Browser Address Bar */}
        <div className="rounded-md border-2 border-[#292B38] bg-gradient-to-b from-[#E4E4EC] via-white to-[#E4E4EC] shadow-[2px_2px_0_0_#292B38] w-[301px] h-[30px] absolute left-[419px] top-0 flex items-center px-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1.90918 1.27274L5.091 12.0909L7.00009 8.27274L10.8183 7.00001L1.90918 1.27274Z"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
          <div className="rounded-sm border border-[#D0D1DD] bg-[#FFF] w-[263px] h-5 ml-2 flex items-center px-2">
            <p className="text-[#292B38] font-dMSans text-[10px] font-bold">
              zeara://my-space/analytics
            </p>
          </div>
        </div>

        <p className="text-[#7B7D90] font-dMSans text-[10px] font-medium absolute right-0 top-[5px]">
          {rangeData.dateRange}
        </p>

        <h1 className="text-[#292B38] font-spaceGrotesk text-[34px] font-medium absolute left-0 top-7">
          Progress Analytics
        </h1>
        <p className="text-[#7B7D90] font-dMSans text-[13px] absolute left-0 top-[77px]">
          Track long-term strength gains, training volume, and personal records.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-2.5 absolute right-0 top-[63px]">
          {Object.keys(TIME_RANGES).map((range) => {
            const isActive = selectedRange === range;
            return (
              <button
                key={range}
                onClick={() => {
                  setSelectedRange(range);
                  setHoveredPointIndex(null);
                }}
                className={`cursor-pointer text-nowrap px-5 py-2 rounded-[17px] border-[1.5px] border-[#292B38] font-dMSans text-xs transition-all ${
                  isActive
                    ? "bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[2px_2px_0_0_#292B38] font-bold text-[#292B38]"
                    : "bg-[#FFF] hover:bg-[#F8F7FA] font-medium text-[#292B38]"
                }`}
              >
                {range}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 KPI Stat Cards Row */}
      <div className="grid grid-cols-4 gap-6 w-[1134px] h-[156px] absolute left-[274px] top-[172px]">
        {/* Card 1: Total Volume */}
        <div className="rounded-xl border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] h-[156px] relative overflow-hidden">
          <div className="bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] w-full h-[33px] border-b-2 border-[#292B38] flex items-center px-3.5 justify-between">
            <p className="text-[#292B38] font-dMSans text-[11px] font-bold">
              Total Volume
            </p>
            <div className="flex p-1 justify-center items-center rounded-[3px] border border-[#292B38] bg-[#FFF] w-5 h-5">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 0.545456V3.27273H8.72727V6H11.4545V6.54546H8.72727V9.27273H6V12H5.45455V9.27273H2.72727V6.54546H0V6H2.72727V3.27273H5.45455V0.545456H6Z"
                  fill="#292B38"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 absolute left-[17px] top-[46px]">
            <p className="text-[#292B38] font-spaceGrotesk text-[34px] font-medium leading-none">
              {rangeData.totalVolume}
            </p>
            <span className="text-[#7B7D90] font-dMSans text-xs">kg</span>
          </div>
          <div className="rounded-[7px] bg-[#A9DDF4] w-[33px] h-[33px] absolute right-4 top-[51px] flex items-center justify-center border border-[#292B38]">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path
                d="M2.31836 4.63637V12.3636M4.63654 3.09091V8.5M4.63654 8.5V13.9091M4.63654 8.5H12.3638M12.3638 3.09091V8.5M12.3638 8.5V13.9091M14.682 4.63637V12.3636"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#292B38"
              />
            </svg>
          </div>
          <p className="text-[#292B38] font-dMSans text-[11px] font-bold absolute left-[17px] top-[111px]">
            {rangeData.volumeDelta}
          </p>
          <p className="text-[#7B7D90] font-dMSans text-[10px] absolute left-[17px] top-[130px]">
            {rangeData.volumeSub}
          </p>
        </div>

        {/* Card 2: Total Workouts */}
        <div className="rounded-xl border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] h-[156px] relative overflow-hidden">
          <div className="bg-gradient-to-b from-[#E9DDF4] via-white to-[#E9DDF4] w-full h-[33px] border-b-2 border-[#292B38] flex items-center px-3.5 justify-between">
            <p className="text-[#292B38] font-dMSans text-[11px] font-bold">
              Total Workouts
            </p>
            <div className="flex p-1 justify-center items-center rounded-[3px] border border-[#292B38] bg-[#FFF] w-5 h-5">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 0.545456V3.27273H8.72727V6H11.4545V6.54546H8.72727V9.27273H6V12H5.45455V9.27273H2.72727V6.54546H0V6H2.72727V3.27273H5.45455V0.545456H6Z"
                  fill="#292B38"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 absolute left-[17px] top-[46px]">
            <p className="text-[#292B38] font-spaceGrotesk text-[34px] font-medium leading-none">
              {rangeData.totalWorkouts}
            </p>
            <span className="text-[#7B7D90] font-dMSans text-xs">sessions</span>
          </div>
          <div className="rounded-[7px] bg-[#E9DDF4] w-[33px] h-[33px] absolute right-4 top-[51px] flex items-center justify-center border border-[#292B38]">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path
                d="M5.409 3.86364H3.09082V6.95455M5.409 3.86364H11.5908M5.409 3.86364V1.54546M5.409 3.86364V6.18182M11.5908 3.86364H13.909V6.95455M11.5908 3.86364V1.54546M11.5908 3.86364V6.18182M13.909 6.95455V14.6818H3.09082V6.95455M13.909 6.95455H3.09082M5.409 9.27273H7.72718M10.0454 9.27273H11.5908M5.409 11.5909H7.72718"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#292B38"
              />
            </svg>
          </div>
          <p className="text-[#292B38] font-dMSans text-[11px] font-bold absolute left-[17px] top-[111px]">
            {rangeData.workoutAvg}
          </p>
          <p className="text-[#7B7D90] font-dMSans text-[10px] absolute left-[17px] top-[130px]">
            Consistency looks good.
          </p>
        </div>

        {/* Card 3: Personal Records */}
        <div className="rounded-xl border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] h-[156px] relative overflow-hidden">
          <div className="bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] w-full h-[33px] border-b-2 border-[#292B38] flex items-center px-3.5 justify-between">
            <p className="text-[#292B38] font-dMSans text-[11px] font-bold">
              Personal Records
            </p>
            <div className="flex p-1 justify-center items-center rounded-[3px] border border-[#292B38] bg-[#FFF] w-5 h-5">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 0.545456V3.27273H8.72727V6H11.4545V6.54546H8.72727V9.27273H6V12H5.45455V9.27273H2.72727V6.54546H0V6H2.72727V3.27273H5.45455V0.545456H6Z"
                  fill="#292B38"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 absolute left-[17px] top-[46px]">
            <p className="text-[#292B38] font-spaceGrotesk text-[34px] font-medium leading-none">
              {rangeData.prsTotal}
            </p>
            <span className="text-[#7B7D90] font-dMSans text-xs">PRs</span>
          </div>
          <div className="rounded-[7px] bg-[#A9DDF4] w-[33px] h-[33px] absolute right-4 top-[51px] flex items-center justify-center border border-[#292B38]">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path
                d="M8.50044 1.54546L10.5868 5.87273L15.455 6.56818L11.9777 9.96818L12.7504 14.7591L8.50044 12.5182L4.25044 14.7591L5.02317 9.96818L1.5459 6.56818L6.41408 5.87273L8.50044 1.54546Z"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#292B38"
              />
            </svg>
          </div>
          <p className="text-[#292B38] font-dMSans text-[11px] font-bold absolute left-[17px] top-[111px]">
            {rangeData.prsMonth}
          </p>
          <p className="text-[#7B7D90] font-dMSans text-[10px] absolute left-[17px] top-[130px]">
            A little stronger, every week.
          </p>
        </div>

        {/* Card 4: Avg Session Duration */}
        <div className="rounded-xl border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] h-[156px] relative overflow-hidden">
          <div className="bg-gradient-to-b from-[#F5B9D7] via-white to-[#F5B9D7] w-full h-[33px] border-b-2 border-[#292B38] flex items-center px-3.5 justify-between">
            <p className="text-[#292B38] font-dMSans text-[11px] font-bold">
              Avg Session Duration
            </p>
            <div className="flex p-1 justify-center items-center rounded-[3px] border border-[#292B38] bg-[#FFF] w-5 h-5">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 0.545456V3.27273H8.72727V6H11.4545V6.54546H8.72727V9.27273H6V12H5.45455V9.27273H2.72727V6.54546H0V6H2.72727V3.27273H5.45455V0.545456H6Z"
                  fill="#292B38"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 absolute left-[17px] top-[46px]">
            <p className="text-[#292B38] font-spaceGrotesk text-[34px] font-medium leading-none">
              {rangeData.avgDuration}
            </p>
            <span className="text-[#7B7D90] font-dMSans text-xs">min</span>
          </div>
          <div className="rounded-[7px] bg-[#F5B9D7] w-[33px] h-[33px] absolute right-4 top-[51px] flex items-center justify-center border border-[#292B38]">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path
                d="M8.50018 4.63637V9.27273L11.5911 10.8182M8.50018 2.31818C6.86066 2.31818 5.28829 2.96948 4.12897 4.1288C2.96966 5.28811 2.31836 6.86048 2.31836 8.5C2.31836 10.1395 2.96966 11.7119 4.12897 12.8712C5.28829 14.0305 6.86066 14.6818 8.50018 14.6818C10.1397 14.6818 11.7121 14.0305 12.8714 12.8712C14.0307 11.7119 14.682 10.1395 14.682 8.5C14.682 6.86048 14.0307 5.28811 12.8714 4.1288C11.7121 2.96948 10.1397 2.31818 8.50018 2.31818Z"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#292B38"
              />
            </svg>
          </div>
          <p className="text-[#292B38] font-dMSans text-[11px] font-bold absolute left-[17px] top-[111px]">
            Time well spent
          </p>
          <p className="text-[#7B7D90] font-dMSans text-[10px] absolute left-[17px] top-[130px]">
            {rangeData.durationSub}
          </p>
        </div>
      </div>

      {/* Decorative Pixel Star Badge between KPI & Chart */}
      <div className="w-[34px] h-[34px] absolute left-[258px] top-[347px] z-20 pointer-events-none">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <path
            d="M13.75 0.75H19.75V8.75H24.75V13.75H32.75V19.75H24.75V24.75H19.75V32.75H13.75V24.75H8.75V19.75H0.75V13.75H8.75V8.75H13.75V0.75Z"
            fill="#F5B9D7"
            strokeWidth="1.5"
            stroke="#292B38"
          />
        </svg>
        <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          className="w-4 h-3 absolute left-[15px] top-[3px]"
        >
          <path d="M0 1H3V9H9V13H16" strokeWidth="2" stroke="white" />
        </svg>
      </div>

      {/* Chart 01: WEEKLY_VOLUME_TREND.EXE */}
      <div className="rounded-[13px] border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] w-[680px] h-[340px] absolute left-[274px] top-[360px] overflow-hidden">
        <div className="bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] w-full h-[38px] border-b-2 border-[#292B38] flex items-center px-4 justify-between">
          <p className="text-[#292B38] font-dMSans text-[11px] font-bold">
            01 / WEEKLY_VOLUME_TREND.EXE
          </p>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect
              x="0.5"
              y="0.5"
              width="19"
              height="19"
              rx="2.5"
              fill="white"
              stroke="#292B38"
            />
            <path
              d="M9 3H11V7H15V9H17V11H13V15H9V13H7V11H3V9H7V5H9V3Z"
              fill="#292B38"
            />
          </svg>
        </div>

        <p className="text-[#292B38] font-spaceGrotesk text-xl font-medium absolute left-[21px] top-14">
          Your training, over time.
        </p>
        <p className="text-[#7B7D90] font-dMSans text-xs absolute left-[21px] top-[85px]">
          Weekly training volume · kg
        </p>

        <div className="inline-flex px-3 py-1.5 items-center rounded-[5px] bg-[#A9DDF4] border border-[#292B38] absolute right-5 top-14">
          <p className="text-[#292B38] font-spaceGrotesk text-[13px] font-medium">
            {rangeData.volumeDelta}
          </p>
        </div>

        <div className="flex items-center gap-2 absolute right-5 top-[93px]">
          <div className="rounded-sm bg-[#A9DDF4] w-2 h-2 border border-[#292B38]" />
          <p className="text-[#7B7D90] font-dMSans text-[10px]">
            Weekly volume
          </p>
        </div>

        {/* Y-Axis Gridlines */}
        {[
          { label: "6k", top: 136 },
          { label: "4k", top: 183 },
          { label: "2k", top: 231 },
          { label: "0", top: 278 },
        ].map((line) => (
          <React.Fragment key={line.label}>
            <div
              style={{ top: `${line.top}px` }}
              className="bg-[#D9EAF5] w-[595px] h-px absolute left-[61px]"
            />
            <p
              style={{ top: `${line.top - 6}px` }}
              className="text-[#7B7D90] font-spaceGrotesk text-[10px] absolute left-[22px]"
            >
              {line.label}
            </p>
          </React.Fragment>
        ))}

        {/* Area & Line SVG */}
        <svg
          width="595"
          height="141"
          viewBox="0 0 595 141"
          fill="none"
          className="w-[595px] h-[141px] absolute left-[61px] top-[137px]"
        >
          <path
            d="M0 57.9833C42.5 57.9833 42.5 50.8833 85 50.8833C127.5 50.8833 127.5 54.4333 170 54.4333C212.5 54.4333 212.5 39.05 255 39.05C297.5 39.05 297.5 43.7833 340 43.7833C382.5 43.7833 382.5 13.0167 425 13.0167C467.5 13.0167 467.5 0 510 0C552.5 0 552.5 42.6 595 42.6V140.817H0V57.9833Z"
            fill="url(#paint0_linear_analytics)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_analytics"
              x1="297.5"
              y1="0"
              x2="297.5"
              y2="140.817"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#A9DDF4" stopOpacity="0.65" />
              <stop offset="1" stopColor="#A9DDF4" stopOpacity="0.08" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          width="595"
          height="61"
          viewBox="0 0 595 61"
          fill="none"
          className="w-[595px] h-[58px] absolute left-[61px] top-[137px]"
        >
          <path
            d="M0 59.2333C42.5 59.2333 42.5 52.1333 85 52.1333C127.5 52.1333 127.5 55.6833 170 55.6833C212.5 55.6833 212.5 40.3 255 40.3C297.5 40.3 297.5 45.0333 340 45.0333C382.5 45.0333 382.5 14.2667 425 14.2667C467.5 14.2667 467.5 1.25 510 1.25C552.5 1.25 552.5 43.85 595 43.85"
            strokeWidth="2.5"
            stroke="#66B9DB"
          />
        </svg>

        {/* Interactive Data Nodes & X-Axis Labels */}
        {rangeData.chartPoints.map((pt, idx) => {
          const leftPos = 61 + pt.x;
          const topPos = 137 + pt.y;
          const isSelected = idx === activePointIdx;
          return (
            <React.Fragment key={pt.label}>
              <button
                onMouseEnter={() => setHoveredPointIndex(idx)}
                onClick={() => setHoveredPointIndex(idx)}
                style={{ left: `${leftPos - 5}px`, top: `${topPos - 5}px` }}
                className={`w-2.5 h-2.5 rounded-full border-2 border-[#292B38] cursor-pointer transition-transform z-10 ${
                  isSelected
                    ? "bg-[#292B38] scale-125"
                    : "bg-[#FFF] hover:scale-125"
                }`}
                title={`${pt.label}: ${pt.value.toLocaleString()} kg`}
              />
              <p
                style={{ left: `${leftPos - 16}px` }}
                className="text-[#7B7D90] font-spaceGrotesk text-[10px] absolute top-[292px]"
              >
                {pt.label}
              </p>
            </React.Fragment>
          );
        })}

        {/* Vertical Dashed Guideline & Dynamic Tooltip */}
        <div
          style={{ left: `${61 + activePoint.x}px` }}
          className="h-[146px] w-px border-l border-dashed border-[#66B9DB] absolute top-[132px] pointer-events-none transition-all duration-150"
        />

        <div
          style={{
            left: `${Math.min(493, Math.max(70, 61 + activePoint.x - 140))}px`,
          }}
          className="inline-flex px-3 py-1.5 items-center rounded-[5px] bg-[#292B38] shadow-md absolute top-[148px] pointer-events-none transition-all duration-150 z-20"
        >
          <p className="text-[#FFF] font-spaceGrotesk text-xs font-medium whitespace-nowrap">
            {activePoint.label}: {activePoint.value.toLocaleString()} kg
          </p>
        </div>

        <p className="text-[#7B7D90] font-dMSans text-[9px] font-bold uppercase absolute left-[22px] top-[319px]">
          {selectedRange}
        </p>
        <p className="text-[#7B7D90] font-dMSans text-[10px] absolute right-5 top-[318px]">
          {rangeData.footerVolumeNote}
        </p>
      </div>

      {/* Chart 02: EXERCISE_STRENGTH_PROGRESS.EXE */}
      <div className="rounded-[13px] border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] w-[430px] h-[340px] absolute left-[978px] top-[360px] overflow-hidden">
        <div className="bg-gradient-to-b from-[#E9DDF4] via-white to-[#E9DDF4] w-full h-[38px] border-b-2 border-[#292B38] flex items-center px-4 justify-between">
          <p className="text-[#292B38] font-dMSans text-[11px] font-bold">
            02 / EXERCISE_STRENGTH_PROGRESS.EXE
          </p>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect
              x="0.5"
              y="0.5"
              width="19"
              height="19"
              rx="2.5"
              fill="white"
              stroke="#292B38"
            />
            <path
              d="M9 3H11V7H15V9H17V11H13V15H9V13H7V11H3V9H7V5H9V3Z"
              fill="#292B38"
            />
          </svg>
        </div>

        {/* Interactive Exercise Dropdown */}
        <div className="relative w-[388px] h-9 absolute left-[21px] top-[55px]">
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="w-full h-full appearance-none rounded-[5px] border-[1.5px] border-[#D0D1DD] hover:border-[#292B38] bg-[#FFF] px-3 pr-8 text-[#292B38] font-dMSans text-[13px] font-medium focus:outline-none focus:border-[#292B38] cursor-pointer"
          >
            {Object.keys(EXERCISE_STRENGTH_DATA).map((exName) => (
              <option key={exName} value={exName}>
                {exName}
              </option>
            ))}
          </select>
          <span className="text-[#292B38] font-dMSans text-sm pointer-events-none absolute right-3 top-2">
            ▾
          </span>
        </div>

        <p className="text-[#7B7D90] font-dMSans text-[9px] font-bold absolute left-[22px] top-[108px]">
          TOP WORKING WEIGHT
        </p>
        <p className="text-[#292B38] font-spaceGrotesk text-[19px] font-medium absolute left-[22px] top-[125px]">
          {exerciseData.progression}
        </p>

        <div className="inline-flex px-2.5 py-1 items-center rounded-[5px] bg-[#E9DDF4] border border-[#292B38] absolute right-5 top-[114px]">
          <p className="text-[#292B38] font-spaceGrotesk text-xs font-medium">
            {exerciseData.percentGain}
          </p>
        </div>

        {/* Y-Axis Gridlines */}
        {[167, 204, 241, 278].map((topVal, idx) => (
          <React.Fragment key={topVal}>
            <div
              style={{ top: `${topVal}px` }}
              className="bg-[#D9EAF5] w-[347px] h-px absolute left-[58px]"
            />
            <p
              style={{ top: `${topVal - 6}px` }}
              className="text-[#7B7D90] font-spaceGrotesk text-[10px] absolute left-[25px]"
            >
              {exerciseData.yTicks[idx]}
            </p>
          </React.Fragment>
        ))}

        {/* Strength Line SVG */}
        <svg
          width="348"
          height="58"
          viewBox="0 0 348 58"
          fill="none"
          className="w-[347px] h-14 absolute left-[58px] top-[186px]"
        >
          <path
            d={exerciseData.pathD}
            strokeWidth="2.5"
            stroke="#A18AB7"
            className="transition-all duration-300"
          />
        </svg>

        {/* Data Dots */}
        {exerciseData.dots.map((dot, idx) => (
          <div
            key={idx}
            style={{ left: `${dot.left}px`, top: `${dot.top}px` }}
            className="w-2 h-2 rounded-full bg-[#A18AB7] border border-[#292B38] absolute"
          />
        ))}

        {/* X-Axis Labels */}
        <p className="text-[#7B7D90] font-spaceGrotesk text-[10px] absolute left-[41px] top-[292px]">
          Sep 28
        </p>
        <p className="text-[#7B7D90] font-spaceGrotesk text-[10px] absolute left-[142px] top-[292px]">
          Oct 12
        </p>
        <p className="text-[#7B7D90] font-spaceGrotesk text-[10px] absolute left-60 top-[292px]">
          Oct 26
        </p>
        <p className="text-[#7B7D90] font-spaceGrotesk text-[10px] absolute left-[390px] top-[292px]">
          Nov 16
        </p>

        <p className="text-[#292B38] font-dMSans text-[11px] font-medium absolute left-[22px] top-[318px]">
          {exerciseData.summary}
        </p>
      </div>

      {/* Section 03: PERSONAL_RECORDS_LOG.EXE */}
      <div className="rounded-xl border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] w-[1134px] h-[286px] absolute left-[274px] top-[727px] overflow-hidden">
        <div className="bg-gradient-to-b from-[#F5B9D7] via-white to-[#F5B9D7] w-full h-[38px] border-b-2 border-[#292B38] flex items-center px-4 justify-between">
          <p className="text-[#292B38] font-dMSans text-[11px] font-bold">
            03 / PERSONAL_RECORDS_LOG.EXE
          </p>
          <div className="flex items-center justify-center rounded-[3px] border border-[#292B38] bg-[#FFF] w-5 h-5">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path
                d="M6.54572 0.727264H9.45481V3.63636H12.3639V6.54545H15.273V9.45454H12.3639V12.3636H9.45481V15.2727H6.54572V12.3636H3.63663V9.45454H0.727539V6.54545H3.63663V3.63636H6.54572V0.727264Z"
                fill="#292B38"
              />
            </svg>
          </div>
        </div>

        <p className="text-[#292B38] font-spaceGrotesk text-lg font-medium absolute left-[21px] top-[53px]">
          Stronger than yesterday.
        </p>
        <p className="text-[#7B7D90] font-dMSans text-[11px] absolute right-6 top-[57px]">
          {rangeData.prsTotal} personal records · {rangeData.prsMonth}
        </p>

        {/* PR Table */}
        <div className="w-[1098px] h-[182px] absolute left-[18px] top-[85px] overflow-hidden">
          <div className="rounded-md bg-[#F8F7FA] w-full h-[30px] flex items-center px-4">
            <span className="text-[#7B7D90] font-dMSans text-[9px] font-bold w-[330px]">
              EXERCISE
            </span>
            <span className="text-[#7B7D90] font-dMSans text-[9px] font-bold w-[197px]">
              HEAVIEST WEIGHT PR
            </span>
            <span className="text-[#7B7D90] font-dMSans text-[9px] font-bold w-[212px]">
              HIGHEST REPS PR
            </span>
            <span className="text-[#7B7D90] font-dMSans text-[9px] font-bold w-[210px]">
              DATE ACHIEVED
            </span>
            <span className="text-[#7B7D90] font-dMSans text-[9px] font-bold">
              HIGHLIGHTS
            </span>
          </div>

          {PERSONAL_RECORDS.map((pr, index) => (
            <div
              key={pr.id}
              onClick={() => setSelectedExercise(pr.exercise)}
              className={`w-full h-[38px] flex items-center px-2.5 hover:bg-[#F8F7FA] cursor-pointer transition-colors ${
                index > 0 ? "border-t border-[#F8F7FA]" : ""
              }`}
            >
              <div className="w-[336px] flex items-center gap-3">
                <div
                  className={`rounded-md ${pr.badgeBg} w-[27px] h-[27px] flex items-center justify-center border border-[#292B38]`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2.18164 4.36366V11.6364M4.36346 2.90912V8.00003M4.36346 8.00003V13.0909M4.36346 8.00003H11.6362M11.6362 2.90912V8.00003M11.6362 8.00003V13.0909M13.818 4.36366V11.6364"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                      stroke="#292B38"
                    />
                  </svg>
                </div>
                <span className="text-[#292B38] font-dMSans text-[13px] font-medium">
                  {pr.exercise}
                </span>
              </div>

              <span className="text-[#292B38] font-spaceGrotesk text-sm font-medium w-[197px]">
                {pr.heaviest}
              </span>

              <span className="text-[#292B38] font-dMSans text-xs font-medium w-[212px]">
                {pr.highestReps}
              </span>

              <span className="text-[#7B7D90] font-dMSans text-xs w-[210px]">
                {pr.date}
              </span>

              {pr.isNew ? (
                <div className="inline-flex px-2.5 py-1 items-center gap-1.5 rounded-[5px] bg-[#E9DDF4] border border-[#292B38]">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6.54572 0.727295H9.45481V3.63639H12.3639V6.54548H15.273V9.45457H12.3639V12.3637H9.45481V15.2727H6.54572V12.3637H3.63663V9.45457H0.727539V6.54548H3.63663V3.63639H6.54572V0.727295Z"
                      fill="white"
                      strokeWidth="1.6"
                      stroke="#292B38"
                    />
                  </svg>
                  <span className="text-[#292B38] font-dMSans text-[9px] font-bold">
                    NEW PR
                  </span>
                </div>
              ) : (
                <span className="text-[#7B7D90] font-dMSans text-[10px]">
                  Personal best
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <p className="text-[#7B7D90] font-dMSans text-[9px] font-bold absolute left-[274px] top-[1035px]">
        A LITTLE PROGRESS, EVERY DAY.
      </p>
      <p className="text-[#7B7D90] font-dMSans text-[9px] absolute left-[1183px] top-[1035px]">
        All systems go · Last synced just now
      </p>
    </div>
  );
}