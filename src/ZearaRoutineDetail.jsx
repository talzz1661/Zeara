import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MUSCLE_BADGE_COLORS = {
  Chest: "bg-[#F5B9D7]",
  Back: "bg-[#A9DDF4]",
  Shoulders: "bg-[#E9DDF4]",
  Arms: "bg-[#F5B9D7]",
  Quads: "bg-[#A9DDF4]",
  Hamstrings: "bg-[#E9DDF4]",
  Posterior: "bg-[#E9DDF4]",
  Calves: "bg-[#A9DDF4]",
  Core: "bg-[#F5B9D7]",
};

const ROUTINE_PRESETS = {
  "4-Day Upper/Lower Split": {
    slug: "upper-lower",
    category: "Strength",
    days: [
      {
        tab: "Day 1: Upper A (Mon)",
        title: "Day 1 / Upper A",
        subtitle: "Chest, back & shoulders · Monday",
        dayBadge: "MONDAY",
        estMinutes: 55,
        exercises: [
          { id: "01", name: "Barbell Bench Press", muscle: "Chest", sets: 4, reps: "8-10", rest: "120 sec", restSub: "between sets", notes: "Focus on controlled eccentric, 2s pause at chest" },
          { id: "02", name: "Lat Pulldown", muscle: "Back", sets: 4, reps: "10-12", rest: "90 sec", restSub: "between sets", notes: "Pull to upper chest" },
          { id: "03", name: "Incline Dumbbell Press", muscle: "Chest", sets: 3, reps: "10-12", rest: "90 sec", restSub: "between sets", notes: "30-degree bench angle" },
          { id: "04", name: "Seated Cable Row", muscle: "Back", sets: 4, reps: "10-12", rest: "90 sec", restSub: "between sets", notes: "Squeeze scapulae at peak contraction" },
          { id: "05", name: "Lateral Raises", muscle: "Shoulders", sets: 3, reps: "12-15", rest: "60 sec", restSub: "between sets", notes: "Lead with elbows" },
        ],
      },
      {
        tab: "Day 2: Lower A (Thu)",
        title: "Day 2 / Lower A",
        subtitle: "Quads, hamstrings & calves · Thursday",
        dayBadge: "THURSDAY",
        estMinutes: 50,
        exercises: [
          { id: "01", name: "Barbell Back Squat", muscle: "Quads", sets: 4, reps: "6-8", rest: "150 sec", restSub: "between sets", notes: "Break parallel, drive through mid-foot" },
          { id: "02", name: "Romanian Deadlift", muscle: "Hamstrings", sets: 3, reps: "8-10", rest: "120 sec", restSub: "between sets", notes: "Hinge at hips, feel hamstring stretch" },
          { id: "03", name: "Leg Press", muscle: "Quads", sets: 3, reps: "10-12", rest: "90 sec", restSub: "between sets", notes: "Do not lock knees at top" },
          { id: "04", name: "Seated Leg Curl", muscle: "Hamstrings", sets: 3, reps: "12-15", rest: "60 sec", restSub: "between sets", notes: "Control the return" },
          { id: "05", name: "Standing Calf Raises", muscle: "Calves", sets: 4, reps: "12-15", rest: "60 sec", restSub: "between sets", notes: "Full stretch at bottom" },
        ],
      },
      {
        tab: "Day 3: Upper B (Fri)",
        title: "Day 3 / Upper B",
        subtitle: "Upper hypertrophy & arms · Friday",
        dayBadge: "FRIDAY",
        estMinutes: 50,
        exercises: [
          { id: "01", name: "Incline Dumbbell Press", muscle: "Chest", sets: 4, reps: "8-10", rest: "90 sec", restSub: "between sets", notes: "30-degree bench angle" },
          { id: "02", name: "Chest-Supported T-Bar Row", muscle: "Back", sets: 4, reps: "8-10", rest: "90 sec", restSub: "between sets", notes: "Full protraction at bottom" },
          { id: "03", name: "Dumbbell Lateral Raises", muscle: "Shoulders", sets: 4, reps: "12-15", rest: "60 sec", restSub: "between sets", notes: "Lead with elbows" },
          { id: "04", name: "Face Pulls", muscle: "Shoulders", sets: 3, reps: "15-20", rest: "60 sec", restSub: "between sets", notes: "External rotation at peak" },
          { id: "05", name: "Overhead Cable Tricep Extension", muscle: "Arms", sets: 3, reps: "12-15", rest: "60 sec", restSub: "between sets", notes: "Full stretch behind head" },
        ],
      },
      {
        tab: "Day 4: Lower B (Sat)",
        title: "Day 4 / Lower B",
        subtitle: "Posterior chain & core · Saturday",
        dayBadge: "SATURDAY",
        estMinutes: 48,
        exercises: [
          { id: "01", name: "Conventional Deadlift", muscle: "Posterior", sets: 3, reps: "5", rest: "180 sec", restSub: "between sets", notes: "Reset each rep, brace core hard" },
          { id: "02", name: "Bulgarian Split Squat", muscle: "Quads", sets: 3, reps: "8-10", rest: "90 sec", restSub: "between sets", notes: "Per leg, upright torso" },
          { id: "03", name: "Lying Leg Curl", muscle: "Hamstrings", sets: 3, reps: "10-12", rest: "60 sec", restSub: "between sets", notes: "Keep hips pressed into pad" },
          { id: "04", name: "Hanging Leg Raises", muscle: "Core", sets: 3, reps: "12-15", rest: "60 sec", restSub: "between sets", notes: "Posterior pelvic tilt" },
        ],
      },
    ],
  },

  "Push Pull Legs": {
    slug: "push-pull-legs",
    category: "Hypertrophy",
    days: [
      {
        tab: "Day 1: Push",
        title: "Day 1 / Push",
        subtitle: "Chest, shoulders & triceps",
        dayBadge: "DAY 01",
        estMinutes: 60,
        exercises: [
          { id: "01", name: "Barbell Bench Press", muscle: "Chest", sets: 4, reps: "6-8", rest: "120 sec", restSub: "between sets", notes: "2s controlled eccentric, drive bar up explosively" },
          { id: "02", name: "Incline Dumbbell Press", muscle: "Chest", sets: 3, reps: "8-10", rest: "90 sec", restSub: "between sets", notes: "30-degree bench angle, full stretch at bottom" },
          { id: "03", name: "Seated Dumbbell Shoulder Press", muscle: "Shoulders", sets: 3, reps: "8-12", rest: "90 sec", restSub: "between sets", notes: "Keep core braced, avoid lower back arch" },
          { id: "04", name: "Dumbbell Lateral Raises", muscle: "Shoulders", sets: 4, reps: "12-15", rest: "60 sec", restSub: "between sets", notes: "Lead with elbows, slight pause at shoulder height" },
          { id: "05", name: "Cable Tricep Pushdowns", muscle: "Arms", sets: 3, reps: "10-12", rest: "60 sec", restSub: "between sets", notes: "Pin elbows to ribs, full lockout at bottom" },
          { id: "06", name: "Overhead Cable Tricep Extension", muscle: "Arms", sets: 3, reps: "12-15", rest: "60 sec", restSub: "between sets", notes: "Maximize long-head stretch behind head" },
        ],
      },
      {
        tab: "Day 2: Pull",
        title: "Day 2 / Pull",
        subtitle: "Back, rear delts & biceps",
        dayBadge: "DAY 02",
        estMinutes: 58,
        exercises: [
          { id: "01", name: "Conventional Deadlift", muscle: "Back", sets: 3, reps: "5-6", rest: "180 sec", restSub: "between sets", notes: "Slack pull before lift, keep bar close to shins" },
          { id: "02", name: "Lat Pulldown (Wide Grip)", muscle: "Back", sets: 4, reps: "8-10", rest: "90 sec", restSub: "between sets", notes: "Drive elbows down toward hips, chest up" },
          { id: "03", name: "Chest-Supported T-Bar Row", muscle: "Back", sets: 3, reps: "8-10", rest: "90 sec", restSub: "between sets", notes: "Squeeze shoulder blades together for 1s" },
          { id: "04", name: "Face Pulls", muscle: "Shoulders", sets: 3, reps: "15-20", rest: "60 sec", restSub: "between sets", notes: "Pull rope to forehead, externally rotate at end" },
          { id: "05", name: "Incline Dumbbell Curls", muscle: "Arms", sets: 3, reps: "10-12", rest: "60 sec", restSub: "between sets", notes: "Keep elbows back for full bicep stretch" },
          { id: "06", name: "Hammer Curls", muscle: "Arms", sets: 3, reps: "12-15", rest: "60 sec", restSub: "between sets", notes: "Neutral grip, no torso swinging" },
        ],
      },
      {
        tab: "Day 3: Legs",
        title: "Day 3 / Legs",
        subtitle: "Quads, hamstrings & calves",
        dayBadge: "DAY 03",
        estMinutes: 55,
        exercises: [
          { id: "01", name: "Barbell Back Squat", muscle: "Quads", sets: 4, reps: "6-8", rest: "150 sec", restSub: "between sets", notes: "Brace hard, break parallel, push knees out" },
          { id: "02", name: "Romanian Deadlift", muscle: "Hamstrings", sets: 3, reps: "8-10", rest: "120 sec", restSub: "between sets", notes: "Push hips back until deep hamstring tension" },
          { id: "03", name: "Leg Press", muscle: "Quads", sets: 3, reps: "10-12", rest: "90 sec", restSub: "between sets", notes: "Mid-low foot placement, controlled depth" },
          { id: "04", name: "Lying Leg Curl", muscle: "Hamstrings", sets: 3, reps: "12-15", rest: "60 sec", restSub: "between sets", notes: "Keep hips glued to the bench pad" },
          { id: "05", name: "Standing Calf Raises", muscle: "Calves", sets: 4, reps: "12-15", rest: "60 sec", restSub: "between sets", notes: "2s pause in bottom stretch, full rise onto toes" },
          { id: "06", name: "Hanging Leg Raises", muscle: "Core", sets: 3, reps: "12-15", rest: "60 sec", restSub: "between sets", notes: "Curl pelvis upward, slow descent" },
        ],
      },
    ],
  },

  "Athletic Conditioning": {
    slug: "athletic-conditioning",
    category: "Conditioning",
    days: [
      {
        tab: "Day 1: Explosive Power",
        title: "Day 1 / Explosive Power",
        subtitle: "Speed, plyometrics & lower power",
        dayBadge: "DAY 01",
        estMinutes: 45,
        exercises: [
          { id: "01", name: "Trap Bar / Barbell Squat Jump", muscle: "Quads", sets: 4, reps: "5", rest: "120 sec", restSub: "between sets", notes: "Maximal intent on every jump, full reset" },
          { id: "02", name: "Romanian Deadlift", muscle: "Hamstrings", sets: 3, reps: "8", rest: "90 sec", restSub: "between sets", notes: "Snappy hip extension on concentric" },
          { id: "03", name: "Bulgarian Split Squat", muscle: "Quads", sets: 3, reps: "8 / leg", rest: "90 sec", restSub: "between sets", notes: "Focus on single-leg stability and balance" },
          { id: "04", name: "Push Press", muscle: "Shoulders", sets: 3, reps: "6", rest: "90 sec", restSub: "between sets", notes: "Use leg drive, punch overhead fast" },
          { id: "05", name: "Hanging Leg Raises", muscle: "Core", sets: 3, reps: "12", rest: "60 sec", restSub: "between sets", notes: "Anti-swing strict core control" },
        ],
      },
      {
        tab: "Day 2: Upper Stamina",
        title: "Day 2 / Upper Stamina",
        subtitle: "Upper endurance & postural stability",
        dayBadge: "DAY 02",
        estMinutes: 40,
        exercises: [
          { id: "01", name: "Incline Dumbbell Press", muscle: "Chest", sets: 3, reps: "10-12", rest: "45 sec", restSub: "between sets", notes: "45s rest between sets to keep heart rate up" },
          { id: "02", name: "Lat Pulldown (Wide Grip)", muscle: "Back", sets: 3, reps: "10-12", rest: "45 sec", restSub: "between sets", notes: "Controlled tempo, full lat stretch" },
          { id: "03", name: "Bent Over Barbell Row", muscle: "Back", sets: 3, reps: "10", rest: "60 sec", restSub: "between sets", notes: "Strong isometric core brace throughout" },
          { id: "04", name: "Face Pulls", muscle: "Shoulders", sets: 3, reps: "15", rest: "45 sec", restSub: "between sets", notes: "Postural endurance for upper back" },
        ],
      },
      {
        tab: "Day 3: MetCon Circuit",
        title: "Day 3 / MetCon Circuit",
        subtitle: "Full-body conditioning circuit",
        dayBadge: "DAY 03",
        estMinutes: 35,
        exercises: [
          { id: "01", name: "Goblet Squat", muscle: "Quads", sets: 4, reps: "15", rest: "30 sec", restSub: "between sets", notes: "Continuous pace, 30s rest" },
          { id: "02", name: "Kettlebell / Dumbbell Swing", muscle: "Posterior", sets: 4, reps: "20", rest: "30 sec", restSub: "between sets", notes: "Explosive hip hinge, float weight to chest" },
          { id: "03", name: "Push-Ups", muscle: "Chest", sets: 4, reps: "15-20", rest: "30 sec", restSub: "between sets", notes: "Elbows 45 degrees, rigid plank line" },
          { id: "04", name: "Plank Shoulder Taps", muscle: "Core", sets: 4, reps: "20 total", rest: "30 sec", restSub: "between sets", notes: "Minimize hip rotation" },
        ],
      },
    ],
  },
};

export default function ZearaRoutineDetail({
  routine: routineProp,
  onNavigate,
  onBack,
  onStartWorkout,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDay, setActiveDay] = useState(0);

  // Ambil routine dari prop App.jsx atau dari state router
  const selectedRoutine = routineProp || location.state?.routine;

  // Reset tab ke Day 1 setiap kali rutin yang dibuka berubah
  useEffect(() => {
    setActiveDay(0);
  }, [selectedRoutine?.id, selectedRoutine?.title]);

  // Cocokkan preset berdasarkan judul rutin (atau fallback ke Upper/Lower)
  const matchedPreset =
    (selectedRoutine?.title && ROUTINE_PRESETS[selectedRoutine.title]) ||
    (selectedRoutine?.title?.toLowerCase().includes("ppl")
      ? ROUTINE_PRESETS["Push Pull Legs"]
      : ROUTINE_PRESETS["4-Day Upper/Lower Split"]);

  const routineTitle = selectedRoutine?.title || "4-Day Upper/Lower Split";
  const scheduledDays = selectedRoutine?.days || ["Mon", "Thu", "Fri", "Sat"];
  const routineDays = selectedRoutine?.workoutDays || matchedPreset.days;
  const currentDay = routineDays[activeDay] || routineDays[0];

  const totalSets = currentDay.exercises.reduce(
    (sum, ex) => sum + (Number(ex.sets) || 0),
    0
  );
  const estDuration =
    currentDay.estMinutes || Math.max(30, Math.round(totalSets * 3));

  const dayCode = String(activeDay + 1).padStart(2, "0");
  const routeSlug =
    selectedRoutine?.slug ||
    matchedPreset.slug ||
    routineTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleNav = (path, menuName) => {
    if (onNavigate && menuName) {
      onNavigate(menuName);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="bg-[#F8F7FA] min-w-[1440px] min-h-screen overflow-x-auto relative text-[#292B38]">
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
          onClick={() => handleNav("/dashboard", "Dashboard")}
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

        {/* Active Item: Workout Planner */}
        <button
          onClick={() => handleNav("/planner", "Workout Planner")}
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
          onClick={() => handleNav("/exercises")}
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
          onClick={() => handleNav("/history")}
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
          onClick={() => handleNav("/analytics")}
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

      {/* Main Content Area */}
      <div className="w-[1134px] min-h-[1060px] relative ml-[274px] pt-7 pb-10">
        {/* Top Navigation Row: Back Link, Address Bar, Tagline */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => (onBack ? onBack() : navigate("/planner"))}
            className="inline-flex items-center gap-2 text-[#292B38] font-dMSans text-[13px] font-medium hover:underline cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M11.6668 7H2.3335M2.3335 7L6.41683 2.91667M2.3335 7L6.41683 11.0833"
                stroke="#292B38"
                strokeWidth="1.6"
                strokeLinecap="square"
              />
            </svg>
            Back to Workout Planner
          </button>

          {/* Browser Address Pill */}
          <div className="rounded-md border-2 border-[#292B38] bg-gradient-to-b from-[#E9DDF4] via-white to-[#E9DDF4] shadow-[4px_4px_0_0_#292B38] w-[356px] h-[30px] flex items-center px-2">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 12L12 4M12 4H5.33333M12 4V10.6667"
                stroke="#292B38"
                strokeWidth="1.8"
                strokeLinecap="square"
              />
            </svg>
            <div className="rounded-sm bg-[#FFF] flex-1 h-5 ml-2 flex items-center px-2.5">
              <p className="text-[#292B38] font-dMSans text-[10px] font-bold truncate">
                zeara://my-space/planner/{routeSlug}
              </p>
            </div>
          </div>

          <p className="text-[#797B8E] font-dMSans text-[10px] font-bold tracking-wider">
            PLAN. TRACK. ANALYZE.
          </p>
        </div>

        {/* Routine Title & Action Buttons Row */}
        <div className="mt-7 flex items-start justify-between">
          <div>
            <h1 className="text-[#292B38] font-spaceGrotesk text-[34px] font-medium leading-tight">
              {routineTitle}
            </h1>
            <div className="flex items-center gap-3 mt-2.5">
              <span className="inline-flex items-center px-3 py-1 rounded-[5px] border border-[#292B38] bg-[#E9DDF4] text-[#292B38] font-dMSans text-[10px] font-bold tracking-wider uppercase">
                {selectedRoutine?.badge || "CUSTOM ROUTINE"}
              </span>
              <span className="text-[#797B8E] font-dMSans text-xs">
                {selectedRoutine?.category || matchedPreset.category} ·{" "}
                {routineDays.length} training days / week
              </span>
            </div>
          </div>

          {/* Pill Action Buttons */}
          <div className="flex items-center gap-3.5 pt-1">
            <button
              onClick={() => navigate("/planner/new")}
              className="inline-flex items-center justify-center gap-2.5 h-11 px-6 rounded-full border-2 border-[#292B38] bg-gradient-to-b from-[#F5B9D7] via-white to-[#F5B9D7] shadow-[4px_4px_0_0_#292B38] active:translate-x-[1px] active:translate-y-[1px] text-[#292B38] font-dMSans text-[13px] font-bold cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path
                  d="M11.3335 2.00004C11.5086 1.82494 11.7165 1.68605 11.9453 1.59129C12.1741 1.49653 12.4193 1.44775 12.6668 1.44775C12.9144 1.44775 13.1596 1.49653 13.3884 1.59129C13.6172 1.68605 13.8251 1.82494 14.0002 2.00004C14.1753 2.17513 14.3141 2.383 14.4089 2.61178C14.5037 2.84055 14.5525 3.08575 14.5525 3.33337C14.5525 3.58099 14.5037 3.82619 14.4089 4.05497C14.3141 4.28374 14.1753 4.49161 14.0002 4.66671L5.00016 13.6667L1.3335 14.6667L2.3335 11L11.3335 2.00004Z"
                  stroke="#292B38"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              </svg>
              Edit Routine
            </button>

            <button
              onClick={() =>
                onStartWorkout
                  ? onStartWorkout(selectedRoutine || { title: routineTitle })
                  : navigate("/active", {
                      state: {
                        routine: selectedRoutine || { title: routineTitle },
                        day: currentDay,
                      },
                    })
              }
              className="inline-flex items-center justify-center gap-2.5 h-11 px-7 rounded-full border-2 border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] active:translate-x-[1px] active:translate-y-[1px] text-[#292B38] font-dMSans text-[13px] font-bold cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3.5 2.33337L11.0833 7.00004L3.5 11.6667V2.33337Z"
                  fill="#292B38"
                  stroke="#292B38"
                  strokeWidth="1.4"
                />
              </svg>
              Start Workout
            </button>
          </div>
        </div>

        {/* Full-Width Day Selector Folder Tabs */}
        <div className="grid grid-cols-4 gap-3 mt-8 items-end">
          {routineDays.map((day, idx) => {
            const isActive = activeDay === idx;
            const fallbackDay = scheduledDays[idx]
              ? ` (${scheduledDays[idx]})`
              : "";
            const label =
              day.tab || `${day.title || `Day ${idx + 1}`}${fallbackDay}`;

            return (
              <button
                key={label + idx}
                onClick={() => setActiveDay(idx)}
                className={`px-4 rounded-t-[10px] border-2 border-[#292B38] flex items-center justify-between text-left transition-all cursor-pointer ${
                  isActive
                    ? "h-12 bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] text-[#292B38] font-bold"
                    : "h-11 bg-gradient-to-b from-[#E9DDF4] via-white to-[#E9DDF4] text-[#292B38] font-medium hover:brightness-[0.98]"
                }`}
              >
                <span className="font-dMSans text-[13px] truncate">{label}</span>
                {isActive && (
                  <span className="w-[5px] h-[5px] rounded-[1px] bg-[#292B38] shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Window: DAY_XX_EXERCISES.EXE */}
        <div className="mt-4 rounded-xl border-2 border-[#292B38] bg-[#FFF] shadow-[6px_6px_0_0_#292B38] overflow-hidden">
          {/* Window Titlebar */}
          <div className="bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] w-full h-[38px] border-b-2 border-[#292B38] px-4 flex items-center justify-between">
            <p className="text-[#292B38] font-dMSans text-xs font-bold tracking-wide">
              DAY_{dayCode}_EXERCISES.EXE
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

          {/* Window Content Body */}
          <div className="p-6">
            {/* Day Header & Day Pill */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[#292B38] font-spaceGrotesk text-[24px] font-medium leading-tight">
                  {currentDay.title}
                </h2>
                <p className="text-[#797B8E] font-dMSans text-xs mt-1">
                  {currentDay.subtitle ||
                    `${currentDay.exercises.length} scheduled exercises`}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9DDF4]">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M4.66683 2.91669H2.3335V5.83335M4.66683 2.91669H9.3335M4.66683 2.91669V1.16669M4.66683 2.91669V4.66669M9.3335 2.91669H11.6668V5.83335M9.3335 2.91669V1.16669M9.3335 2.91669V4.66669M11.6668 5.83335V12.25H2.3335V5.83335M11.6668 5.83335H2.3335"
                    stroke="#292B38"
                    strokeWidth="1.5"
                  />
                </svg>
                <span className="text-[#292B38] font-dMSans text-[10px] font-bold tracking-wider uppercase">
                  {currentDay.dayBadge ||
                    (scheduledDays[activeDay]
                      ? scheduledDays[activeDay].toUpperCase()
                      : `DAY ${dayCode}`)}
                </span>
              </div>
            </div>

            {/* Table Column Header Strip */}
            <div className="mt-5 rounded-md bg-[#F4F3F8] px-4 py-2.5 grid grid-cols-[64px_1fr_140px_140px_180px_44px] items-center text-[#797B8E] font-dMSans text-[9px] font-bold tracking-wider uppercase">
              <span>ORDER #</span>
              <span>EXERCISE / MUSCLE GROUP</span>
              <span>TARGET SETS</span>
              <span>TARGET REPS</span>
              <span>REST NOTE</span>
              <span />
            </div>

            {/* Exercise Rows */}
            <div className="divide-y divide-[#ECEBF2]">
              {currentDay.exercises.map((ex, idx) => {
                const badgeColor =
                  MUSCLE_BADGE_COLORS[ex.muscle] || "bg-[#E9DDF4]";
                return (
                  <div
                    key={ex.id || idx}
                    className="px-4 py-4 grid grid-cols-[64px_1fr_140px_140px_180px_44px] items-center hover:bg-[#FAF9FC] transition-colors"
                  >
                    {/* Order Box */}
                    <div>
                      <div className="w-8 h-8 rounded-[6px] border-[1.5px] border-[#292B38] bg-[#FFF] flex items-center justify-center font-spaceGrotesk text-xs font-medium text-[#292B38]">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Exercise Name & Muscle Tag */}
                    <div>
                      <p className="text-[#292B38] font-dMSans text-[15px] font-medium">
                        {ex.name}
                      </p>
                      <span
                        className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-[4px] ${badgeColor} text-[#292B38] font-dMSans text-[9px] font-bold tracking-wider uppercase`}
                      >
                        {ex.muscle}
                      </span>
                    </div>

                    {/* Target Sets */}
                    <p className="text-[#292B38] font-spaceGrotesk text-sm font-medium">
                      {ex.sets} sets
                    </p>

                    {/* Target Reps */}
                    <p className="text-[#292B38] font-spaceGrotesk text-sm font-medium">
                      {ex.reps} reps
                    </p>

                    {/* Rest Note */}
                    <div>
                      <p className="text-[#292B38] font-spaceGrotesk text-xs font-medium">
                        {ex.rest || "90 sec"}
                      </p>
                      <p className="text-[#797B8E] font-dMSans text-[11px] mt-0.5">
                        {ex.restSub || "between sets"}
                      </p>
                    </div>

                    {/* Circular Chevron Button */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => navigate("/exercises")}
                        title={`View ${ex.name} details`}
                        className="w-8 h-8 rounded-full border-[1.5px] border-[#292B38] bg-[#FFF] hover:bg-[#EAF7FD] flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M5.25 2.91663L9.33333 6.99996L5.25 11.0833"
                            stroke="#292B38"
                            strokeWidth="1.6"
                            strokeLinecap="square"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Summary Bar */}
            <div className="mt-3 rounded-lg bg-[#F4F3F8] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M2.25 6V12M4.5 3.75V9M4.5 9V14.25M4.5 9H13.5M13.5 9V3.75M13.5 9V14.25M15.75 6V12"
                    stroke="#292B38"
                    strokeWidth="1.7"
                    strokeLinecap="square"
                  />
                </svg>
                <p className="text-[#292B38] font-dMSans text-xs font-bold">
                  {currentDay.exercises.length} Exercises · {totalSets} Total
                  Sets · Est. {estDuration} min
                </p>
              </div>
              <p className="text-[#797B8E] font-dMSans text-[9px] font-bold tracking-wider uppercase">
                YOUR SPLIT. YOUR PACE.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Page Footer */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-[#797B8E] font-dMSans text-[9px] font-bold tracking-wider">
            A LITTLE PROGRESS, EVERY DAY.
          </p>
          <p className="text-[#797B8E] font-dMSans text-[10px]">
            All systems go · Last synced just now
          </p>
        </div>
      </div>
    </div>
  );
}