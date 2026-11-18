import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ZearaToastContainer } from "./components/ZearaToasts";
import ZearaFinishConfirmation from "./ZearaFinishConfirmation";
import ZearaWorkoutCompleted from "./ZearaWorkoutCompleted";

const INITIAL_EXERCISES = [
  {
    id: 1,
    code: "01",
    file: "01 / BARBELL_BENCH_PRESS.EXE",
    name: "Barbell bench press",
    meta: "Chest · Compound · Barbell",
    targetSets: 3,
    repRange: "8–10 REPS",
    restSec: 90,
    lastSession: "Nov 12",
    sets: [
      { id: 101, prev: "80 kg × 8", kg: 80, reps: 8, done: true },
      { id: 102, prev: "80 kg × 8", kg: 80, reps: 8, done: true },
      { id: 103, prev: "80 kg × 8", kg: 80, reps: 8, done: false },
    ],
  },
  {
    id: 2,
    code: "02",
    file: "02 / SEATED_CABLE_ROW.EXE",
    name: "Seated cable row",
    meta: "Back · Compound · Cable",
    targetSets: 3,
    repRange: "10–12 REPS",
    restSec: 90,
    lastSession: "Nov 12",
    sets: [
      { id: 201, prev: "55 kg × 10", kg: 55, reps: 10, done: true },
      { id: 202, prev: "55 kg × 10", kg: 55, reps: 10, done: true },
      { id: 203, prev: "55 kg × 10", kg: 55, reps: 10, done: true },
    ],
  },
  {
    id: 3,
    code: "03",
    file: "03 / LAT_PULLDOWN.EXE",
    name: "Lat pulldown",
    meta: "Back · Compound · Cable",
    targetSets: 3,
    repRange: "10–12 REPS",
    restSec: 90,
    lastSession: "Nov 12",
    sets: [
      { id: 301, prev: "50 kg × 10", kg: 50, reps: 10, done: true },
      { id: 302, prev: "50 kg × 10", kg: 50, reps: 10, done: true },
      { id: 303, prev: "50 kg × 10", kg: 50, reps: 10, done: true },
    ],
  },
  {
    id: 4,
    code: "04",
    file: "04 / DB_SHOULDER_PRESS.EXE",
    name: "DB shoulder press",
    meta: "Shoulders · Compound · Dumbbell",
    targetSets: 3,
    repRange: "8–10 REPS",
    restSec: 90,
    lastSession: "Nov 12",
    sets: [
      { id: 401, prev: "18 kg × 9", kg: 18, reps: 9, done: false },
      { id: 402, prev: "18 kg × 8", kg: 18, reps: 8, done: false },
      { id: 403, prev: "18 kg × 8", kg: 18, reps: 8, done: false },
    ],
  },
  {
    id: 5,
    code: "05",
    file: "05 / CABLE_TRICEPS_PUSHDOWN.EXE",
    name: "Cable triceps pushdown",
    meta: "Triceps · Isolation · Cable",
    targetSets: 3,
    repRange: "12–15 REPS",
    restSec: 60,
    lastSession: "Nov 12",
    sets: [
      { id: 501, prev: "25 kg × 12", kg: 25, reps: 12, done: false },
      { id: 502, prev: "25 kg × 12", kg: 25, reps: 12, done: false },
      { id: 503, prev: "25 kg × 12", kg: 25, reps: 12, done: false },
    ],
  },
];

function formatDuration(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return [hrs, mins, secs].map((v) => String(v).padStart(2, "0")).join(":");
}

function formatTimer(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function ZearaActiveWorkout() {
  const navigate = useNavigate();

  // State Latihan & Set
  const [exercises, setExercises] = useState(INITIAL_EXERCISES);
  const [activeIndex, setActiveIndex] = useState(0);

  // State Live Session Timer (mulai di 00:34:18 = 2058 detik sesuai desain)
  const [sessionSeconds, setSessionSeconds] = useState(2058);
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);

  // State Rest Timer
  const [restPreset, setRestPreset] = useState(90);
  const [restSeconds, setRestSeconds] = useState(90);
  const [isRestRunning, setIsRestRunning] = useState(true);

  // State Modal Finish Confirmation & Workout Completed
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [showWorkoutCompleted, setShowWorkoutCompleted] = useState(false);

  // Toast state
  const [toasts, setToasts] = useState([]);

  const showToast = (message, subtext = "", variant = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, subtext, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Jalankan stopwatch sesi latihan (berhenti jika workout sudah selesai)
  useEffect(() => {
    if (isWorkoutFinished) return;
    const interval = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isWorkoutFinished]);

  // Jalankan rest timer countdown
  useEffect(() => {
    if (!isRestRunning || isWorkoutFinished) return;
    const interval = setInterval(() => {
      setRestSeconds((prev) => {
        if (prev <= 1) {
          setIsRestRunning(false);
          showToast("Rest complete!", "Time for your next working set.", "info");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRestRunning, isWorkoutFinished]);

  // Kalkulasi progres keseluruhan
  const totalExercises = exercises.length;
  const completedExercisesCount = exercises.filter(
    (ex) => ex.sets.length > 0 && ex.sets.every((s) => s.done)
  ).length;

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const completedSets = exercises.reduce(
    (acc, ex) => acc + ex.sets.filter((s) => s.done).length,
    0
  );

  const totalVolume = exercises.reduce(
    (acc, ex) =>
      acc +
      ex.sets
        .filter((s) => s.done)
        .reduce((sum, s) => sum + (Number(s.kg) || 0) * (Number(s.reps) || 0), 0),
    0
  );

  const progressPercent =
    totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  const currentExercise = exercises[activeIndex];

  // Handler modifikasi set
  const handleUpdateSetField = (setId, field, value) => {
    const numVal = value === "" ? "" : Math.max(0, Number(value));
    setExercises((prev) =>
      prev.map((ex, idx) =>
        idx === activeIndex
          ? {
              ...ex,
              sets: ex.sets.map((s) =>
                s.id === setId ? { ...s, [field]: numVal } : s
              ),
            }
          : ex
      )
    );
  };

  const handleToggleSetDone = (setId) => {
    setExercises((prev) =>
      prev.map((ex, idx) => {
        if (idx !== activeIndex) return ex;
        return {
          ...ex,
          sets: ex.sets.map((s) => {
            if (s.id !== setId) return s;
            const nextDone = !s.done;
            if (nextDone) {
              setRestSeconds(restPreset);
              setIsRestRunning(true);
            }
            return { ...s, done: nextDone };
          }),
        };
      })
    );
  };

  const handleAddSet = () => {
    const lastSet = currentExercise.sets[currentExercise.sets.length - 1];
    const newSet = {
      id: Date.now(),
      prev: lastSet ? lastSet.prev : "—",
      kg: lastSet ? lastSet.kg : 20,
      reps: lastSet ? lastSet.reps : 10,
      done: false,
    };
    setExercises((prev) =>
      prev.map((ex, idx) =>
        idx === activeIndex ? { ...ex, sets: [...ex.sets, newSet] } : ex
      )
    );
  };

  const handleDeleteSet = (setId) => {
    if (currentExercise.sets.length <= 1) {
      showToast("Minimum 1 set required", "", "warning");
      return;
    }
    setExercises((prev) =>
      prev.map((ex, idx) =>
        idx === activeIndex
          ? { ...ex, sets: ex.sets.filter((s) => s.id !== setId) }
          : ex
      )
    );
  };

  const handleSelectPreset = (sec) => {
    setRestPreset(sec);
    setRestSeconds(sec);
    setIsRestRunning(true);
  };

  // Buka modal FINISH_CONFIRM.EXE
  const handleFinishWorkoutClick = () => {
    setShowFinishConfirm(true);
  };

  // Konfirmasi selesai -> tutup modal konfirmasi & buka modal WORKOUT_COMPLETED.EXE
  const handleConfirmFinishAndSave = () => {
    setShowFinishConfirm(false);
    setIsWorkoutFinished(true);
    setIsRestRunning(false);
    setShowWorkoutCompleted(true);
  };

  const durationMinutesText = `${Math.max(1, Math.floor(sessionSeconds / 60))} min`;

  return (
    <div className="bg-[#F8F7FA] min-w-screen min-h-screen overflow-x-auto relative">
      <ZearaToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Background Grid */}
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
            d="M20.0002 3.33334L24.1668 15.8333L36.6668 20L24.1668 24.1667L20.0002 36.6667L15.8335 24.1667L3.3335 20L15.8335 15.8333L20.0002 3.33334Z"
            strokeWidth="1.8"
            strokeLinecap="square"
            stroke="#292B38"
          />
        </svg>
        <p className="text-[#797B8E] font-dMSans text-[9px] font-bold w-[106px] h-3 absolute left-7 top-[110px]">
          PLAN. TRACK. ANALYZE.
        </p>
        <div className="bg-[#CBCDDA] w-[194px] h-px absolute left-6 top-[140px]" />
        <p className="text-[#797B8E] font-dMSans text-[10px] font-bold w-[63px] h-[13px] absolute left-7 top-[167px]">
          WORKSPACE
        </p>

        {/* Nav Items */}
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
          className="flex items-center pl-3.5 pr-3.5 rounded-[11px] border-2 border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] w-52 h-11 absolute left-[17px] top-[249px] cursor-pointer text-left"
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
          <span className="text-[#292B38] font-dMSans text-[13px] font-bold">
            Workout Planner
          </span>
          <div className="rounded-[1px] bg-[#292B38] w-[5px] h-[5px] ml-auto" />
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

        <button
          onClick={() => navigate("/history")}
          className="w-52 h-11 absolute left-[17px] top-[359px] flex items-center pl-3.5 rounded-[11px] hover:bg-[#F8F7FA] cursor-pointer text-left"
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
          <span className="text-[#292B38] font-dMSans text-[13px]">
            Workout History
          </span>
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
            One set at a time.
          </p>
          <p className="text-[#292B38] font-dMSans text-xs absolute left-[15px] top-[80px]">
            Small steps. Stronger you.
          </p>
          <button
            onClick={() =>
              showToast("Focus on form & controlled tempo!", "", "info")
            }
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
                d="M8.17836 9.45832C7.98672 9.33328 7.80708 9.18793 7.64281 9.02367C7.01769 8.39855 6.6665 7.5507 6.6665 6.66665C6.6665 5.78259 7.01769 4.93474 7.64281 4.30962C8.26794 3.6845 9.11578 3.33331 9.99984 3.33331C10.8839 3.33331 11.7317 3.6845 12.3569 4.30962C12.982 4.93474 13.3332 5.78259 13.3332 6.66665C13.3332 7.5507 12.982 8.39855 12.3569 9.02367C12.1926 9.18793 12.013 9.33328 11.8213 9.45832M8.17836 9.45832C8.71602 9.80911 9.34809 9.99998 9.99984 9.99998C10.6516 9.99998 11.2837 9.80911 11.8213 9.45832M8.17836 9.45832C7.31815 9.74108 6.52732 10.2229 5.87505 10.8752C4.78109 11.9692 4.1665 13.4529 4.1665 15V17.5M8.17836 9.45832C8.76087 9.26684 9.37519 9.16665 9.99984 9.16665C10.6245 9.16665 11.2388 9.26684 11.8213 9.45832M11.8213 9.45832C12.6815 9.74108 13.4724 10.2229 14.1246 10.8752C15.2186 11.9692 15.8332 13.4529 15.8332 15V17.5"
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
              d="M5.25 2.91669L9.33333 7.00002L5.25 11.0834"
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

      {/* Top Header & Progress Bar */}
      <div className="bg-[#F8F7FA]/90 w-[1198px] h-[234px] absolute left-[242px] top-0">
        <p className="text-[#797B8E] font-dMSans text-[10px] font-bold tracking-wider absolute left-8 top-[27px]">
          WORKOUT IN PROGRESS
        </p>
        <h1 className="text-[#292B38] font-spaceGrotesk text-[34px] font-medium absolute left-8 top-[49px]">
          Active workout
        </h1>
        <p className="text-[#292B38] font-spaceGrotesk text-[22px] font-medium absolute left-8 top-[98px]">
          4-Day Upper/Lower · Day 1: Upper A
        </p>
        <p className="text-[#797B8E] font-dMSans text-[10px] font-medium absolute left-8 top-[134px]">
          MON, NOV 16 · STARTED 10:24 AM
        </p>

        {/* Live Session Stopwatch Card */}
        <div className="rounded-[10px] border-2 border-[#292B38] bg-[#FFF] shadow-[3px_3px_0_0_#292B38] w-[145px] h-[74px] absolute left-[775px] top-6 px-3 pt-2.5">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
              <path
                d="M7.5 4.375V8.125L10 9.375M7.5 1.875C4.3934 1.875 1.875 4.3934 1.875 7.5C1.875 10.6066 4.3934 13.125 7.5 13.125C10.6066 13.125 13.125 10.6066 13.125 7.5C13.125 4.3934 10.6066 1.875 7.5 1.875Z"
                strokeWidth="1.8"
                strokeLinecap="square"
                stroke="#292B38"
              />
            </svg>
            <p className="text-[#797B8E] font-dMSans text-[9px] font-bold">
              LIVE SESSION
            </p>
          </div>
          <p className="text-[#292B38] font-spaceGrotesk text-[26px] font-medium mt-0.5 tabular-nums">
            {formatDuration(sessionSeconds)}
          </p>
        </div>

        {/* Finish Workout Button */}
        <button
          onClick={handleFinishWorkoutClick}
          className="inline-flex px-6 items-center justify-between rounded-3xl border-2 border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all w-56 h-12 absolute left-[940px] top-[25px] cursor-pointer"
        >
          <span className="text-[#292B38] font-dMSans text-sm font-bold">
            Finish Workout
          </span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M3.75 9L6.75 12L14.25 4.5"
              strokeWidth="1.8"
              strokeLinecap="square"
              stroke="#292B38"
            />
          </svg>
        </button>

        <p className="text-[#797B8E] font-dMSans text-[11px] absolute left-[950px] top-[89px]">
          Saved automatically as you train
        </p>

        {/* Session Progress Bar */}
        <div className="rounded-md border-2 border-[#292B38] bg-[#FFF] w-[1132px] h-[42px] absolute left-8 top-[172px] flex items-center px-4">
          <p className="text-[#292B38] font-dMSans text-[13px] font-bold">
            {completedExercisesCount}/{totalExercises} Exercises ·{" "}
            {completedSets}/{totalSets} Sets · {totalVolume.toLocaleString()} kg
          </p>
          <p className="text-[#797B8E] font-dMSans text-[9px] font-bold ml-auto mr-3">
            {progressPercent}% COMPLETE
          </p>
          <div className="rounded bg-[#E9DDF4] w-[346px] h-2.5 overflow-hidden border border-[#292B38]">
            <div
              style={{ width: `${progressPercent}%` }}
              className="bg-[#A9DDF4] h-full transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Left Column Top: SESSION_EXERCISES.EXE (Lineup) */}
      <div className="rounded-xl border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] w-[352px] h-[432px] absolute left-[274px] top-[258px] overflow-hidden">
        <div className="bg-gradient-to-b from-[#E9DDF4] via-white to-[#E9DDF4] w-full h-[38px] border-b-2 border-[#292B38] flex items-center px-4 justify-between">
          <p className="text-[#292B38] font-dMSans text-xs font-bold">
            SESSION_EXERCISES.EXE
          </p>
          <div className="flex p-[3px] justify-center items-center rounded-[3px] border-2 border-[#292B38] bg-[#FFF] w-5 h-5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M6.99984 1.16667L8.45817 5.54167L12.8332 7L8.45817 8.45833L6.99984 12.8333L5.5415 8.45833L1.1665 7L5.5415 5.54167L6.99984 1.16667Z"
                strokeWidth="1.8"
                stroke="#292B38"
              />
            </svg>
          </div>
        </div>

        <p className="text-[#292B38] font-spaceGrotesk text-xl font-medium absolute left-5 top-[54px]">
          Your lineup
        </p>
        <p className="text-[#797B8E] font-dMSans text-xs absolute left-5 top-[82px]">
          {totalExercises} exercises · {totalSets} working sets
        </p>

        {/* Exercise List */}
        <div className="absolute left-3 top-[114px] w-[328px] flex flex-col gap-1">
          {exercises.map((ex, idx) => {
            const doneCount = ex.sets.filter((s) => s.done).length;
            const totalExSets = ex.sets.length;
            const isComplete = totalExSets > 0 && doneCount === totalExSets;
            const isSelected = idx === activeIndex;

            let statusText = "not started";
            if (isComplete) statusText = "complete";
            else if (doneCount > 0 || isSelected) statusText = "in progress";
            else if (idx === activeIndex + 1) statusText = "up next";

            return (
              <button
                key={ex.id}
                onClick={() => setActiveIndex(idx)}
                className={`w-full h-[55px] rounded-md px-2.5 flex items-center text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-2 border-[#292B38] bg-[#A9DDF4]"
                    : "bg-[#FFF] hover:bg-[#F8F7FA] border-2 border-transparent"
                }`}
              >
                {/* Badge / Check Icon */}
                {isComplete && !isSelected ? (
                  <div className="flex justify-center items-center rounded-[5px] bg-[#A9DDF4] w-[30px] h-[30px] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M3.3335 9.99999H6.66683V13.3333H10.0002V9.99999H13.3335V6.66666H16.6668V3.33333H13.3335V6.66666H10.0002V9.99999H6.66683V6.66666H3.3335V9.99999Z"
                        fill="#292B38"
                      />
                    </svg>
                  </div>
                ) : (
                  <div
                    className={`flex justify-center items-center rounded-[5px] w-[30px] h-[30px] shrink-0 ${
                      isSelected
                        ? "border-2 border-[#292B38] bg-[#FFF]"
                        : "bg-[#F8F7FA]"
                    }`}
                  >
                    <span
                      className={`font-spaceGrotesk text-xs font-bold ${
                        isSelected ? "text-[#292B38]" : "text-[#797B8E]"
                      }`}
                    >
                      {ex.code}
                    </span>
                  </div>
                )}

                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-[#292B38] font-dMSans text-[13px] font-bold truncate">
                    {ex.name}
                  </p>
                  <p
                    className={`font-dMSans text-[11px] ${
                      isSelected ? "text-[#292B38]" : "text-[#797B8E]"
                    }`}
                  >
                    {doneCount}/{totalExSets} sets · {statusText}
                  </p>
                </div>

                {isSelected && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="shrink-0"
                  >
                    <path
                      d="M6 3.33334L10.6667 8L6 12.6667"
                      strokeWidth="1.8"
                      stroke="#292B38"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Left Column Bottom: REST_TIMER.EXE */}
      <div className="rounded-xl border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] w-[352px] h-[276px] absolute left-[274px] top-[714px] overflow-hidden">
        <div className="bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] w-full h-[38px] border-b-2 border-[#292B38] flex items-center px-4 justify-between">
          <p className="text-[#292B38] font-dMSans text-xs font-bold">
            REST_TIMER.EXE
          </p>
          <div className="flex p-[3px] justify-center items-center rounded-[3px] border-2 border-[#292B38] bg-[#FFF] w-5 h-5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M6.99984 1.16666L8.45817 5.54166L12.8332 6.99999L8.45817 8.45832L6.99984 12.8333L5.5415 8.45832L1.1665 6.99999L5.5415 5.54166L6.99984 1.16666Z"
                strokeWidth="1.8"
                stroke="#292B38"
              />
            </svg>
          </div>
        </div>

        <p className="text-[#797B8E] font-dMSans text-[10px] font-bold absolute left-5 top-[55px]">
          NEXT SET IN
        </p>

        <div
          className={`inline-flex px-2.5 py-1 items-center rounded h-[22px] absolute right-5 top-[51px] ${
            isRestRunning
              ? "bg-[#E9DDF4]"
              : "bg-[#F8F7FA] border border-[#CBCDDA]"
          }`}
        >
          <p className="text-[#292B38] font-dMSans text-[9px] font-bold">
            {isRestRunning ? "● RUNNING" : "❚❚ PAUSED"}
          </p>
        </div>

        <p className="text-[#292B38] font-spaceGrotesk text-[54px] font-medium leading-none absolute left-5 top-[78px] tabular-nums">
          {formatTimer(restSeconds)}
        </p>
        <p className="text-[#797B8E] font-dMSans text-xs absolute left-5 top-[139px]">
          Breathe. You’ve got the next one.
        </p>

        {/* Preset Buttons: 60s, 90s, 120s */}
        <div className="absolute left-5 top-[170px] flex gap-3">
          {[60, 90, 120].map((sec) => (
            <button
              key={sec}
              onClick={() => handleSelectPreset(sec)}
              className={`w-24 h-[34px] rounded-md border-2 border-[#292B38] font-dMSans text-xs cursor-pointer transition-colors ${
                restPreset === sec
                  ? "bg-[#A9DDF4] font-bold text-[#292B38]"
                  : "bg-[#F8F7FA] text-[#292B38] hover:bg-[#E3F3FC]"
              }`}
            >
              {sec}s
            </button>
          ))}
        </div>

        {/* Pause / Resume & Reset Controls */}
        <div className="absolute left-5 top-[222px] flex gap-2.5">
          <button
            onClick={() => setIsRestRunning((prev) => !prev)}
            className="w-[150px] h-9 rounded-md border-2 border-[#292B38] bg-[#FFF] hover:bg-[#F8F7FA] flex items-center justify-center gap-2 cursor-pointer"
          >
            {isRestRunning ? (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M5.3335 3.33331V12.6666M10.6668 3.33331V12.6666"
                    strokeWidth="1.8"
                    stroke="#292B38"
                  />
                </svg>
                <span className="text-[#292B38] font-dMSans text-xs font-bold">
                  Pause
                </span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4.5 3L12.5 8L4.5 13V3Z"
                    fill="#292B38"
                    stroke="#292B38"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[#292B38] font-dMSans text-xs font-bold">
                  Resume
                </span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setRestSeconds(restPreset);
              setIsRestRunning(false);
            }}
            className="w-[150px] h-9 rounded-md border-2 border-[#292B38] bg-[#FFF] hover:bg-[#F8F7FA] flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6.6665 6H2.6665V2M2.6665 6C3.1943 4.91519 4.07429 4.04137 5.16278 3.52122C6.25127 3.00106 7.48396 2.8653 8.65956 3.13611C9.83516 3.40692 10.8842 4.0683 11.6354 5.01224C12.3867 5.95619 12.7957 7.12694 12.7957 8.33333C12.7957 9.53972 12.3867 10.7105 11.6354 11.6544C10.8842 12.5984 9.83516 13.2597 8.65956 13.5306C7.48396 13.8014 6.25127 13.6656 5.16278 13.1455C4.07429 12.6253 3.1943 11.7515 2.6665 10.6667"
                strokeWidth="1.8"
                stroke="#292B38"
              />
            </svg>
            <span className="text-[#292B38] font-dMSans text-xs font-bold">
              Reset
            </span>
          </button>
        </div>
      </div>

      {/* Right Column: Active Exercise Logger Window */}
      <div className="rounded-xl border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] w-[758px] h-[732px] absolute left-[650px] top-[258px] overflow-hidden flex flex-col">
        {/* Window Title Bar */}
        <div className="bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] w-full h-[38px] border-b-2 border-[#292B38] flex items-center px-4 justify-between shrink-0">
          <p className="text-[#292B38] font-dMSans text-xs font-bold">
            {currentExercise.file}
          </p>
          <div className="flex p-[3px] justify-center items-center rounded-[3px] border-2 border-[#292B38] bg-[#FFF] w-5 h-5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M6.99984 1.16667L8.45817 5.54167L12.8332 7L8.45817 8.45833L6.99984 12.8333L5.5415 8.45833L1.1665 7L5.5415 5.54167L6.99984 1.16667Z"
                strokeWidth="1.8"
                stroke="#292B38"
              />
            </svg>
          </div>
        </div>

        {/* Exercise Info Header */}
        <div className="px-6 pt-5 pb-4 shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[#292B38] font-spaceGrotesk text-[28px] font-medium leading-tight">
                {currentExercise.name}
              </h2>
              <p className="text-[#797B8E] font-dMSans text-[13px] mt-1">
                {currentExercise.meta}
              </p>
            </div>
            <div className="inline-flex px-3 py-1.5 items-center rounded bg-[#A9DDF4] border border-[#292B38]">
              <span className="text-[#292B38] font-dMSans text-[10px] font-bold">
                ● ACTIVE EXERCISE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 mt-4">
            <span className="px-2.5 py-1.5 rounded bg-[#F8F7FA] text-[#797B8E] font-dMSans text-[10px] font-bold">
              {currentExercise.sets.length} WORKING SETS
            </span>
            <span className="px-2.5 py-1.5 rounded bg-[#F8F7FA] text-[#797B8E] font-dMSans text-[10px] font-bold">
              {currentExercise.repRange}
            </span>
            <span className="px-2.5 py-1.5 rounded bg-[#F8F7FA] text-[#797B8E] font-dMSans text-[10px] font-bold">
              REST {currentExercise.restSec} SEC
            </span>
            <span className="text-[#797B8E] font-dMSans text-[11px] ml-auto">
              Last session · {currentExercise.lastSession}
            </span>
          </div>
        </div>

        {/* Table Header */}
        <div className="mx-4 rounded-[5px] bg-[#F8F7FA] h-[38px] flex items-center px-4 shrink-0">
          <span className="text-[#797B8E] font-dMSans text-[10px] font-bold w-14">
            SET
          </span>
          <span className="text-[#797B8E] font-dMSans text-[10px] font-bold w-44">
            PREVIOUS
          </span>
          <span className="text-[#797B8E] font-dMSans text-[10px] font-bold w-32 text-center">
            KG
          </span>
          <span className="text-[#797B8E] font-dMSans text-[10px] font-bold w-32 text-center">
            REPS
          </span>
          <span className="text-[#797B8E] font-dMSans text-[10px] font-bold w-24 text-center ml-4">
            DONE
          </span>
        </div>

        {/* Scrollable Sets List */}
        <div className="px-4 py-2 flex-1 overflow-y-auto flex flex-col gap-2">
          {currentExercise.sets.map((set, index) => (
            <div
              key={set.id}
              className={`rounded-[7px] h-[80px] shrink-0 flex items-center px-4 transition-colors ${
                set.done
                  ? "bg-[#E3F3FC]"
                  : "border-2 border-[#292B38] bg-[#FBF8FD]"
              }`}
            >
              {/* Set Number */}
              <span className="text-[#292B38] font-spaceGrotesk text-[19px] font-bold w-14">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Previous Performance */}
              <span className="text-[#797B8E] font-spaceGrotesk text-[15px] w-44">
                {set.prev}
              </span>

              {/* KG Input */}
              <div className="w-32 flex justify-center">
                <input
                  type="number"
                  value={set.kg}
                  onChange={(e) =>
                    handleUpdateSetField(set.id, "kg", e.target.value)
                  }
                  className={`w-[108px] h-[52px] rounded-md border-2 border-[#292B38] text-center text-[#292B38] font-spaceGrotesk text-2xl font-medium focus:outline-none focus:ring-2 focus:ring-[#292B38] ${
                    set.done ? "bg-[#F5FBFF]" : "bg-[#FFF]"
                  }`}
                />
              </div>

              {/* REPS Input */}
              <div className="w-32 flex justify-center">
                <input
                  type="number"
                  value={set.reps}
                  onChange={(e) =>
                    handleUpdateSetField(set.id, "reps", e.target.value)
                  }
                  className={`w-[108px] h-[52px] rounded-md border-2 border-[#292B38] text-center text-[#292B38] font-spaceGrotesk text-2xl font-medium focus:outline-none focus:ring-2 focus:ring-[#292B38] ${
                    set.done ? "bg-[#F5FBFF]" : "bg-[#FFF]"
                  }`}
                />
              </div>

              {/* DONE Checkbox */}
              <div className="w-24 flex justify-center ml-4">
                <button
                  onClick={() => handleToggleSetDone(set.id)}
                  className={`w-[58px] h-[52px] rounded border-2 border-[#292B38] flex justify-center items-center cursor-pointer transition-colors ${
                    set.done
                      ? "bg-[#A9DDF4]"
                      : "bg-[#FFF] hover:bg-[#E3F3FC]"
                  }`}
                >
                  {set.done && (
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path
                        d="M4.6665 14H9.33317V18.6667H13.9998V14H18.6665V9.33334H23.3332V4.66667H18.6665V9.33334H13.9998V14H9.33317V9.33334H4.6665V14Z"
                        fill="#292B38"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Delete Set Button */}
              <button
                onClick={() => handleDeleteSet(set.id)}
                title="Remove set"
                className="ml-auto w-[38px] h-[38px] rounded flex justify-center items-center hover:bg-[#FCEBF4] cursor-pointer transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M3 4.5H4.5M4.5 4.5H6.75M4.5 4.5L5.25 15.75H12.75L13.5 4.5M6.75 4.5H11.25M6.75 4.5V2.25H11.25V4.5M11.25 4.5H13.5M13.5 4.5H15M7.5 7.5V12.75M10.5 7.5V12.75"
                    strokeWidth="1.8"
                    stroke="#292B38"
                  />
                </svg>
              </button>
            </div>
          ))}

          {/* Add Set Button */}
          <button
            onClick={handleAddSet}
            className="mt-2 w-full h-11 shrink-0 rounded-md border-2 border-[#292B38] bg-[#FFF] hover:bg-[#F8F7FA] flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 3.75V9M9 9V14.25M9 9H3.75M9 9H14.25"
                strokeWidth="1.8"
                stroke="#292B38"
              />
            </svg>
            <span className="text-[#292B38] font-dMSans text-[13px] font-bold">
              Add Set
            </span>
          </button>

          <p className="text-[#797B8E] font-dMSans text-xs mt-1">
            Complete a set to start your {restPreset}-second rest timer.
          </p>
        </div>

        {/* Bottom Exercise Navigation */}
        <div className="px-6 py-4 border-t border-[#DDDEEA] flex items-center justify-between shrink-0 bg-[#FFF]">
          <button
            onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeIndex === 0}
            className={`w-[204px] h-12 rounded-md border-2 border-[#292B38] bg-[#F8F7FA] flex items-center justify-center gap-2.5 font-dMSans text-[13px] font-bold text-[#292B38] ${
              activeIndex === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-[#E9DDF4] cursor-pointer"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10.0002 3.33331L5.3335 7.99998L10.0002 12.6666"
                strokeWidth="1.8"
                stroke="#292B38"
              />
            </svg>
            Prev Exercise
          </button>

          <p className="text-[#797B8E] font-dMSans text-[10px] font-bold">
            EXERCISE {activeIndex + 1} OF {totalExercises}
          </p>

          <button
            onClick={() =>
              setActiveIndex((prev) => Math.min(totalExercises - 1, prev + 1))
            }
            disabled={activeIndex === totalExercises - 1}
            className={`w-52 h-12 rounded-md border-2 border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] flex items-center justify-center gap-2.5 font-dMSans text-[13px] font-bold text-[#292B38] ${
              activeIndex === totalExercises - 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:brightness-95 cursor-pointer"
            }`}
          >
            Next Exercise
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3.33331L10.6667 7.99998L6 12.6666"
                strokeWidth="1.8"
                stroke="#292B38"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-[1134px] h-[22px] absolute left-[274px] top-[1022px] flex items-center justify-between">
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

      {/* Modals: Finish Confirmation & Workout Completed */}
      <ZearaFinishConfirmation
        isOpen={showFinishConfirm}
        completedSets={completedSets}
        totalSets={totalSets}
        onKeepTraining={() => setShowFinishConfirm(false)}
        onConfirmFinish={handleConfirmFinishAndSave}
      />

      <ZearaWorkoutCompleted
        isOpen={showWorkoutCompleted}
        workoutTitle="Upper A"
        durationText={durationMinutesText}
        totalVolumeText={`${totalVolume.toLocaleString()} kg`}
        prExerciseName="BENCH PRESS"
        prDeltaText="+2.5 kg"
        onClose={() => setShowWorkoutCompleted(false)}
      />
    </div>
  );
}