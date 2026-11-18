import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ZearaToastContainer } from "./components/ZearaToasts";

// Detail lengkap untuk ke-12 built-in exercises di Exercise Library
const EXERCISE_DETAILS_MAP = {
  "Barbell Bench Press": {
    slug: "bench-press",
    primaryMuscle: "Chest",
    secondaryMuscle: "Triceps & Front Delts",
    equipment: "Barbell",
    trackingType: "Weighted",
    pr: "85 kg × 6 reps",
    steps: [
      {
        num: "01",
        title: "Set your foundation",
        desc: "Lie flat with your eyes under the bar. Plant your feet firmly on the floor, draw your shoulder blades back, and keep a natural arch.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "02",
        title: "Grip & unrack",
        desc: "Grip the bar just wider than shoulder-width. Stack your wrists over your forearms, brace your core, and unrack above your chest.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
      {
        num: "03",
        title: "Lower with control",
        desc: "Inhale as you lower the bar to your mid-chest. Keep elbows about 45–75° from your torso and your forearms vertical.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "04",
        title: "Press & repeat",
        desc: "Exhale and press up until your arms are extended, without forcefully locking your elbows. Reset your breath before the next rep.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
    ],
    tips: "• Keep your hips on the bench and your feet planted. • Never bounce the bar off your chest; use a steady tempo. • Use a spotter or safety bars for heavy sets. Stop if you feel pain.",
  },
  "Pull-Ups": {
    slug: "pull-ups",
    primaryMuscle: "Back (Lats)",
    secondaryMuscle: "Biceps & Rear Delts",
    equipment: "Bodyweight",
    trackingType: "Bodyweight + Reps",
    pr: "BW + 10 kg × 8 reps",
    steps: [
      {
        num: "01",
        title: "Dead hang setup",
        desc: "Grip the pull-up bar slightly wider than shoulder-width with palms facing away. Engage your shoulders down away from your ears.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "02",
        title: "Initiate with lats",
        desc: "Brace your core, squeeze your glutes, and depress your shoulder blades before bending your elbows.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
      {
        num: "03",
        title: "Pull chest to bar",
        desc: "Drive your elbows down toward your hips until your chin clears the bar cleanly without craning your neck.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "04",
        title: "Controlled descent",
        desc: "Lower yourself slowly for 2–3 seconds back to a full arm extension before starting the next repetition.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
    ],
    tips: "• Avoid kipping or swinging your legs for momentum. • Focus on driving elbows down rather than pulling with your hands. • Use resistance bands if building up your rep count.",
  },
  "Romanian Deadlift": {
    slug: "romanian-deadlift",
    primaryMuscle: "Hamstrings",
    secondaryMuscle: "Glutes & Lower Back",
    equipment: "Barbell",
    trackingType: "Weighted",
    pr: "100 kg × 8 reps",
    steps: [
      {
        num: "01",
        title: "Stand tall & brace",
        desc: "Hold the barbell at hip level with a shoulder-width overhand grip. Unlock your knees slightly and pull your lats tight.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "02",
        title: "Hinge hips back",
        desc: "Push your hips straight backward while keeping the barbell sliding closely down your thighs and shins.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
      {
        num: "03",
        title: "Feel the stretch",
        desc: "Lower the bar until mid-shin or until your hips stop moving back, maintaining a flat, neutral spine throughout.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "04",
        title: "Drive hips forward",
        desc: "Exhale and push your hips forward to stand tall, squeezing your glutes at the top without hyperextending your lower back.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
    ],
    tips: "• Keep the bar in contact with your legs the entire time. • Never round your lower back at the bottom of the rep. • Use lifting straps if grip limits your hamstrings.",
  },
  "Lateral Raises": {
    slug: "lateral-raises",
    primaryMuscle: "Shoulders (Side Delts)",
    secondaryMuscle: "Upper Traps",
    equipment: "Dumbbells",
    trackingType: "Weighted",
    pr: "12 kg × 12 reps",
    steps: [
      {
        num: "01",
        title: "Neutral stance",
        desc: "Stand tall holding dumbbells at your sides with a slight bend in your elbows and a slight forward torso lean.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "02",
        title: "Sweep outward",
        desc: "Raise the dumbbells out to the sides in the scapular plane (about 20–30° forward) leading with your elbows.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
      {
        num: "03",
        title: "Pause at shoulder height",
        desc: "Stop once your upper arms are parallel to the floor. Keep your shoulders depressed and avoid shrugging.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "04",
        title: "Lower slowly",
        desc: "Control the dumbbells back down to your sides over 2 seconds, keeping tension on the side delts.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
    ],
    tips: "• Use lighter weight with strict control rather than swinging heavy dumbbells. • Keep wrists neutral and pinky side level with your thumb.",
  },
  "Cable Row": {
    slug: "cable-row",
    primaryMuscle: "Back (Mid-Back & Lats)",
    secondaryMuscle: "Biceps & Rear Delts",
    equipment: "Cable",
    trackingType: "Weighted",
    pr: "65 kg × 10 reps",
    steps: [
      {
        num: "01",
        title: "Anchor & brace",
        desc: "Sit upright on the bench with feet planted on the footplate and knees slightly bent. Grab the V-bar or handle with a neutral grip.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "02",
        title: "Extend & stretch",
        desc: "Keep your chest proud and spine neutral while allowing your shoulder blades to protract forward slightly for a full lat stretch.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
      {
        num: "03",
        title: "Pull to lower ribs",
        desc: "Exhale and drive your elbows straight back past your torso, squeezing your shoulder blades together as the handle touches your abdomen.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "04",
        title: "Return with control",
        desc: "Slowly extend your arms back to the starting position without rounding your lower back or using momentum.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
    ],
    tips: "• Avoid rocking your torso back and forth to move the stack. • Keep your shoulders down away from your ears during the pull. • Hold the peak contraction for 1 second.",
  },
  "Bulgarian Split Squat": {
    slug: "bulgarian-split-squat",
    primaryMuscle: "Quads & Glutes",
    secondaryMuscle: "Hamstrings & Core",
    equipment: "Dumbbells",
    trackingType: "Weighted",
    pr: "20 kg × 8 reps / leg",
    steps: [
      {
        num: "01",
        title: "Set your split stance",
        desc: "Stand about two feet in front of a bench and place the top of your rear foot onto the pad behind you.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "02",
        title: "Descend vertically",
        desc: "Inhale, brace your core, and lower your back knee toward the floor while keeping your front foot flat.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
      {
        num: "03",
        title: "Hit parallel depth",
        desc: "Lower until your front thigh is parallel to the ground, allowing your front knee to track smoothly over your toes.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "04",
        title: "Drive through mid-foot",
        desc: "Exhale and push forcefully through your front foot to return to the top position. Complete all reps before switching legs.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
    ],
    tips: "• Keep 80% of your weight on the front working leg. • Lean your torso slightly forward for extra glute engagement, or stay upright for more quad focus.",
  },
  "Incline Dumbbell Press": {
    slug: "incline-dumbbell-press",
    primaryMuscle: "Upper Chest",
    secondaryMuscle: "Front Delts & Triceps",
    equipment: "Dumbbells",
    trackingType: "Weighted",
    pr: "32 kg × 8 reps",
    steps: [
      {
        num: "01",
        title: "Adjust bench angle",
        desc: "Set the bench to a 30–45° incline. Kick the dumbbells up to your shoulders and plant both feet firmly on the floor.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "02",
        title: "Tuck & stabilize",
        desc: "Retract your shoulder blades into the pad and position your elbows at a 45° angle from your torso.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
      {
        num: "03",
        title: "Lower to upper chest",
        desc: "Inhale as you lower the dumbbells slowly until they reach chest level with a deep stretch across your upper pecs.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "04",
        title: "Press in an arc",
        desc: "Exhale and press the dumbbells up and slightly inward until your arms are extended above your upper chest.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
    ],
    tips: "• Avoid setting the bench steeper than 45°, which shifts tension onto the front shoulders. • Do not clang the dumbbells together at the top.",
  },
  "Overhead Barbell Press": {
    slug: "overhead-barbell-press",
    primaryMuscle: "Shoulders (Front & Side Delts)",
    secondaryMuscle: "Triceps & Upper Chest",
    equipment: "Barbell",
    trackingType: "Weighted",
    pr: "55 kg × 5 reps",
    steps: [
      {
        num: "01",
        title: "Front rack position",
        desc: "Grip the bar just outside shoulder width. Rest it across your front delts with forearms vertical and wrists stacked.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "02",
        title: "Brace core & glutes",
        desc: "Take a deep breath into your belly, squeeze your glutes tightly, and keep your ribcage tucked down.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
      {
        num: "03",
        title: "Press vertically",
        desc: "Move your chin slightly back to clear the bar path, press straight overhead, and push your head through once the bar passes.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "04",
        title: "Lower with control",
        desc: "Bring the barbell smoothly back down to your collarbone before resetting your breath for the next rep.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
    ],
    tips: "• Never use leg drive unless performing a push press. • Squeeze your glutes throughout the set to protect your lower back from arching.",
  },
  "Cable Tricep Pushdown": {
    slug: "cable-tricep-pushdown",
    primaryMuscle: "Triceps",
    secondaryMuscle: "Anconeus & Forearms",
    equipment: "Cable",
    trackingType: "Weighted",
    pr: "35 kg × 12 reps",
    steps: [
      {
        num: "01",
        title: "Pin elbows to sides",
        desc: "Attach a rope or straight bar to a high pulley. Stand tall with a slight forward lean and lock your upper arms by your ribs.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "02",
        title: "Press down & lock out",
        desc: "Exhale and extend your forearms downward until your elbows reach full lockout, spreading the rope ends apart at the bottom.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
      {
        num: "03",
        title: "Squeeze the triceps",
        desc: "Hold the contracted position for a brief pause to maximize tricep engagement.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "04",
        title: "Controlled return",
        desc: "Allow the attachment to rise slowly until your forearms are just above parallel without letting your elbows drift forward.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
    ],
    tips: "• Keep your upper arms completely stationary like hinges. • Avoid leaning your bodyweight over the bar to cheat the weight down.",
  },
  "Barbell Back Squat": {
    slug: "barbell-back-squat",
    primaryMuscle: "Quads & Glutes",
    secondaryMuscle: "Hamstrings & Core",
    equipment: "Barbell",
    trackingType: "Weighted",
    pr: "110 kg × 5 reps",
    steps: [
      {
        num: "01",
        title: "Unrack & set stance",
        desc: "Rest the barbell across your upper traps. Step back into a shoulder-width stance with toes pointed slightly outward.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "02",
        title: "Inhale & brace",
        desc: "Take a 360-degree breath into your core, pull the bar down into your back, and break at the hips and knees simultaneously.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
      {
        num: "03",
        title: "Hit full depth",
        desc: "Descend until your hip crease drops below the top of your knee while keeping your knees tracking over your toes.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "04",
        title: "Drive up strongly",
        desc: "Push evenly through your mid-foot, keeping your chest and hips rising together until standing tall.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
    ],
    tips: "• Always set safety pins inside the squat rack before heavy sets. • Keep your heels planted flat on the floor throughout the entire lift.",
  },
  "Face Pulls": {
    slug: "face-pulls",
    primaryMuscle: "Rear Delts & Upper Back",
    secondaryMuscle: "Rotator Cuff & Traps",
    equipment: "Cable",
    trackingType: "Weighted",
    pr: "25 kg × 15 reps",
    steps: [
      {
        num: "01",
        title: "High pulley setup",
        desc: "Set the rope attachment at upper-chest or eye height. Grab the rope with thumbs pointing backward toward you.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "02",
        title: "Step back & stagger",
        desc: "Take two steps back into a staggered stance for balance with arms fully extended in front of you.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
      {
        num: "03",
        title: "Pull apart toward face",
        desc: "Pull the center of the rope toward your forehead while externally rotating your hands so your knuckles face behind you.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "04",
        title: "Return smoothly",
        desc: "Extend your arms slowly back to the start without letting the weight stack slam.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
    ],
    tips: "• Focus on external rotation—your hands should finish behind your elbows, not in front of them. • Use moderate weight for high, controlled reps.",
  },
  "Hammer Curls": {
    slug: "hammer-curls",
    primaryMuscle: "Biceps & Brachialis",
    secondaryMuscle: "Brachioradialis (Forearms)",
    equipment: "Dumbbells",
    trackingType: "Weighted",
    pr: "16 kg × 10 reps",
    steps: [
      {
        num: "01",
        title: "Neutral grip setup",
        desc: "Stand tall holding dumbbells at your sides with palms facing each other (neutral grip) and elbows tucked close.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "02",
        title: "Curl upward",
        desc: "Exhale and curl the dumbbells up toward your shoulders while keeping your wrists straight and thumbs pointing up.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
      {
        num: "03",
        title: "Squeeze at the top",
        desc: "Pause briefly near shoulder height without letting your elbows swing forward.",
        bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
      },
      {
        num: "04",
        title: "Lower with control",
        desc: "Inhale and lower the dumbbells slowly back to full arm extension.",
        bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
      },
    ],
    tips: "• Keep your torso still and avoid swinging your hips to start the curl. • Alternating arms can help maintain strict posture on heavier sets.",
  },
};

const DEFAULT_STEPS = [
  {
    num: "01",
    title: "Set your posture & grip",
    desc: "Position yourself securely with a stable stance, braced core, and neutral spine before initiating the movement.",
    bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
  },
  {
    num: "02",
    title: "Initiate with target muscle",
    desc: "Begin the repetition smoothly while focusing on engaging the primary working muscle rather than using momentum.",
    bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
  },
  {
    num: "03",
    title: "Peak contraction",
    desc: "Reach the full range of motion safely and pause briefly at peak tension.",
    bg: "from-[#A9DDF4] via-white to-[#A9DDF4]",
  },
  {
    num: "04",
    title: "Controlled eccentric return",
    desc: "Lower or return the load over 2 seconds back to the starting position and reset your breath.",
    bg: "from-[#E9DDF4] via-white to-[#E9DDF4]",
  },
];

export default function ZearaExerciseDetail({
  user,
  exercise: propExercise,
  onNavigate,
  onBack,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil data exercise dari props App.jsx atau router state, fallback ke Barbell Bench Press
  const incomingExercise = propExercise || location.state?.exercise || {
    id: 1,
    name: "Barbell Bench Press",
    muscle: "Chest",
    equipment: "Barbell",
    category: "Compound · Horizontal push",
    isCustom: false,
  };

  const extraDetail = EXERCISE_DETAILS_MAP[incomingExercise.name] || {};

  const exercise = {
    id:
      extraDetail.slug ||
      incomingExercise.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: incomingExercise.name,
    type: incomingExercise.isCustom ? "CUSTOM" : "BUILT-IN",
    category: (incomingExercise.muscle || "GENERAL").toUpperCase(),
    subtitle:
      incomingExercise.category ||
      `${incomingExercise.equipment || "Movement"} · ${incomingExercise.muscle || "Strength"}`,
    primaryMuscle: extraDetail.primaryMuscle || incomingExercise.muscle || "Target Muscle",
    secondaryMuscle: extraDetail.secondaryMuscle || "Stabilizers & Core",
    equipment: extraDetail.equipment || incomingExercise.equipment || "Bodyweight",
    trackingType: extraDetail.trackingType || incomingExercise.trackingType || "Weighted",
    pr: extraDetail.pr || "No PR logged yet",
    steps: extraDetail.steps || DEFAULT_STEPS,
    tips:
      extraDetail.tips ||
      "• Maintain a neutral spine and controlled tempo throughout every rep. • Warm up properly before working sets. • Stop immediately if you feel sharp joint pain.",
  };

  const isBuiltIn = exercise.type === "BUILT-IN";
  const displayName = user?.fullName || "Alex Morgan";

  // State untuk notifikasi Toast
  const [toasts, setToasts] = useState([]);

  const showToast = (message, subtext = "", variant = "success") => {
    const toastId = Date.now();
    setToasts((prev) => [...prev, { id: toastId, message, subtext, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 3500);
  };

  const dismissToast = (toastId) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  };

  const handleMenuClick = (label, path) => {
    if (onNavigate) {
      onNavigate(label);
    } else {
      navigate(path);
    }
  };

  const handleAddToRoutine = () => {
    showToast(
      `Added "${exercise.name}" to workout`,
      "Starting Active Workout...",
      "success"
    );
    navigate("/active", { state: { addedExercise: exercise } });
  };

  const handleEdit = () => {
    if (isBuiltIn) return;
    showToast("Opening exercise editor...", "", "info");
  };

  const handleDelete = () => {
    if (isBuiltIn) return;
    showToast("Exercise deleted", "Redirecting to library...", "warning");
    setTimeout(() => (onBack ? onBack() : navigate("/exercises")), 1000);
  };

  return (
    <div className="bg-[#F8F7FA] min-w-screen min-h-screen overflow-x-auto relative">
      {/* Container Toast Notifikasi */}
      <ZearaToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Background Grid Lines */}
      <div className="pointer-events-none">
        {Array.from({ length: 38 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{ top: `${i * 28}px` }}
            className="opacity-60 bg-[#D9EAF5] w-[1198px] h-px absolute left-[242px]"
          />
        ))}
        {Array.from({ length: 43 }).map((_, i) => (
          <div
            key={`v-${i}`}
            style={{ left: `${242 + i * 28}px` }}
            className="opacity-60 bg-[#D9EAF5] w-px h-full absolute top-0"
          />
        ))}
      </div>

      {/* Left Sidebar */}
      <div className="bg-[#FFF] w-[242px] h-full absolute left-0 top-0 z-10">
        <div className="bg-[#D1D0DB] w-px h-full absolute left-[241px] top-0" />
        <p
          onClick={() => handleMenuClick("Landing", "/")}
          className="text-[#292B38] font-bodoniModa text-[56px] w-[143px] h-[85px] absolute left-6 top-[11px] cursor-pointer"
        >
          Zeara
        </p>
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[42px] h-[42px] absolute left-[173px] top-[31px]"
        >
          <path
            d="M21 1.75L26.25 15.75L40.25 21L26.25 26.25L21 40.25L15.75 26.25L1.75 21L15.75 15.75L21 1.75Z"
            fill="#E9DDF4"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#292B38"
          />
        </svg>
        <p className="text-[#7C7E90] font-dMSans text-[9px] font-bold w-[138px] h-3 absolute left-7 top-[108px]">
          YOUR MOVEMENT, CONNECTED
        </p>
        <div className="bg-[#D1D0DB] w-[194px] h-px absolute left-6 top-[132px]" />
        <p className="text-[#7C7E90] font-dMSans text-[10px] font-bold w-[63px] h-[13px] absolute left-7 top-[162px]">
          WORKSPACE
        </p>

        {/* Nav: Dashboard */}
        <button
          onClick={() => handleMenuClick("Dashboard", "/dashboard")}
          className="w-52 h-11 absolute left-[17px] top-[188px] flex items-center pl-3.5 rounded-[10px] hover:bg-[#F8F7FA] transition-colors cursor-pointer text-left"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="mr-3.5"
          >
            <rect
              x="2.5"
              y="2.5"
              width="5"
              height="5"
              stroke="#292B38"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <rect
              x="10.5"
              y="2.5"
              width="5"
              height="5"
              stroke="#292B38"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <rect
              x="2.5"
              y="10.5"
              width="5"
              height="5"
              stroke="#292B38"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <rect
              x="10.5"
              y="10.5"
              width="5"
              height="5"
              stroke="#292B38"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px]">
            Dashboard
          </span>
        </button>

        {/* Nav: Workout Planner */}
        <button
          onClick={() => handleMenuClick("Workout Planner", "/planner")}
          className="w-52 h-11 absolute left-[17px] top-[243px] flex items-center pl-3.5 rounded-[10px] hover:bg-[#F8F7FA] transition-colors cursor-pointer text-left"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="mr-3.5"
          >
            <rect
              x="2"
              y="3"
              width="14"
              height="12"
              rx="2"
              stroke="#292B38"
              strokeWidth="1.8"
            />
            <path
              d="M5 1.5V4.5M13 1.5V4.5M2 7.5H16"
              stroke="#292B38"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px]">
            Workout Planner
          </span>
        </button>

        {/* Nav: Exercise Library (Active) */}
        <button
          onClick={() => handleMenuClick("Exercise Library", "/exercises")}
          className="rounded-[10px] border-2 border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] w-52 h-11 absolute left-[17px] top-[298px] flex items-center pl-3.5 cursor-pointer text-left"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="mr-3.5"
          >
            <path
              d="M1.5 6V12M4.5 3.75V9M4.5 9V14.25M4.5 9H13.5M13.5 9V3.75M13.5 9V14.25M16.5 6V12"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px] font-bold">
            Exercise Library
          </span>
          <div className="rounded-[1px] bg-[#292B38] w-[5px] h-[5px] ml-auto mr-3" />
        </button>

        {/* Nav: Workout History */}
        <button
          onClick={() => handleMenuClick("Workout History", "/history")}
          className="w-52 h-11 absolute left-[17px] top-[353px] flex items-center pl-3.5 rounded-[10px] hover:bg-[#F8F7FA] transition-colors cursor-pointer text-left"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="mr-3.5"
          >
            <path
              d="M3 3V7.5H7.5M3.375 6.75C4.13951 5.6317 5.25995 4.80502 6.55402 4.40447C7.84809 4.00391 9.23962 4.05305 10.5022 4.54389C11.7648 5.03474 12.8241 5.93839 13.5079 7.10783C14.1916 8.27727 14.4594 9.64367 14.2679 10.9847C14.0763 12.3257 13.4366 13.5625 12.4527 14.4937C11.4689 15.4249 10.1989 15.9958 8.84941 16.1135C7.49989 16.2312 6.15026 15.8887 5.02011 15.1418C3.88996 14.395 3.04581 13.2876 2.625 12M9 5.25V9.75L12 11.25"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px]">
            Workout History
          </span>
        </button>

        {/* Nav: Progress Analytics */}
        <button
          onClick={() => handleMenuClick("Progress Analytics", "/analytics")}
          className="w-52 h-11 absolute left-[17px] top-[408px] flex items-center pl-3.5 rounded-[10px] hover:bg-[#F8F7FA] transition-colors cursor-pointer text-left"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="mr-3.5"
          >
            <path
              d="M2.25 2.25V15.75H16.5M4.5 11.25L8.25 6.75L12 9L15.75 3.75"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px]">
            Progress Analytics
          </span>
        </button>

        {/* Daily Reminder Widget */}
        <div className="rounded-[5px] border-2 border-[#292B38] bg-[#E9DDF4] shadow-[4px_4px_0_0_#292B38] w-[200px] h-[180px] absolute left-[21px] top-[672px] overflow-hidden">
          <div className="rounded-sm border border-[#292B38] bg-gradient-to-b from-[#F8F7FA] via-white to-[#F8F7FA] w-[194px] h-[27px] absolute left-[3px] top-[3px]" />
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="w-3 h-3 absolute left-[11px] top-[11px]"
          >
            <path
              d="M6 0.5L7.5 4.5L11.5 6L7.5 7.5L6 11.5L4.5 7.5L0.5 6L4.5 4.5L6 0.5Z"
              fill="#E9DDF4"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
          <p className="text-[#292B38] font-dMSans text-[9px] font-bold absolute left-[30px] top-2.5">
            daily_reminder.exe
          </p>
          <p className="text-[#292B38] font-spaceGrotesk text-[19px] font-medium whitespace-nowrap absolute left-[15px] top-[46px]">
            A little, often.
          </p>
          <p className="text-[#292B38] font-dMSans text-[13px] leading-snug w-[165px] absolute left-[15px] top-[80px]">
            Your future self is cheering you on.
          </p>
          <button
            onClick={() => navigate("/active")}
            className="rounded-[3px] border-[1.5px] border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[2px_2px_0_0_#292B38] active:translate-x-[1px] active:translate-y-[1px] w-[168px] h-[26px] absolute left-4 top-[139px] flex items-center justify-center cursor-pointer"
          >
            <span className="text-[#292B38] font-dMSans text-[8px] font-bold tracking-wider">
              KEEP SHOWING UP
            </span>
          </button>
        </div>

        <div className="bg-[#D1D0DB] w-[202px] h-px absolute left-5 top-[932px]" />

        {/* Profile Footer */}
        <div
          onClick={() => handleMenuClick("Settings", "/settings")}
          className="rounded-[9px] border-2 border-[#292B38] bg-[#FFF] hover:bg-[#F8F7FA] shadow-[4px_4px_0_0_#292B38] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all w-52 h-[72px] absolute left-[17px] top-[952px] flex items-center px-3 cursor-pointer"
        >
          <div className="rounded-md bg-[#F5B9D7] w-[38px] h-[38px] flex items-center justify-center border border-[#292B38]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="5" r="3" stroke="#292B38" strokeWidth="1.8" />
              <path
                d="M2.5 14C2.5 11.2 5 9.5 8 9.5C11 9.5 13.5 11.2 13.5 14"
                stroke="#292B38"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-[#292B38] font-dMSans text-[13px] font-bold leading-tight">
              {displayName}
            </p>
            <p className="text-[#7C7E90] font-dMSans text-[11px]">
              Personal account
            </p>
          </div>
          <span className="text-[#292B38] font-dMSans text-2xl ml-auto">›</span>
        </div>

        <p className="text-[#7C7E90] font-dMSans text-[9px] w-[78px] h-3 absolute left-7 top-[1041px]">
          ZEARA OS / V. 2.0
        </p>
      </div>

      {/* Main Content Area */}
      {/* Top Header Section */}
      <div className="w-[1134px] h-40 absolute left-[274px] top-8">
        <button
          onClick={() => (onBack ? onBack() : navigate("/exercises"))}
          className="text-[#292B38] font-dMSans text-[13px] font-medium hover:underline cursor-pointer flex items-center gap-1 absolute left-0 top-0.5"
        >
          ← Back to Exercise Library
        </button>

        <h1 className="text-[#292B38] font-spaceGrotesk text-4xl font-bold absolute left-0 top-11">
          {exercise.name}
        </h1>

        <div
          className={`inline-flex px-2.5 py-1 items-center rounded-[5px] border border-[#292B38] ${
            isBuiltIn ? "bg-[#E9DDF4]" : "bg-[#A9DDF4]"
          } h-[25px] absolute left-0 top-[99px]`}
        >
          <span className="text-[#292B38] font-dMSans text-[10px] font-bold">
            {exercise.type}
          </span>
        </div>

        <div className="inline-flex px-3 py-1 items-center rounded-[5px] border border-[#292B38] bg-[#F5B9D7] h-[25px] absolute left-[79px] top-[99px]">
          <span className="text-[#292B38] font-dMSans text-[10px] font-bold">
            {exercise.category}
          </span>
        </div>

        {/* OS Address Bar */}
        <div className="flex px-2.5 py-1 items-center gap-2.5 rounded-md border-[1.5px] border-[#292B38] bg-gradient-to-b from-[#F8F7FA] via-white to-[#F8F7FA] shadow-[4px_4px_0_0_#292B38] w-[374px] h-[30px] absolute left-[544px] top-0">
          <span className="text-[#292B38] font-dMSans text-sm font-bold">
            ↖
          </span>
          <div className="flex items-center px-2 rounded-sm bg-[#FFF] flex-1 h-[19px] border border-[#E8E6EE]">
            <p className="text-[#292B38] font-dMSans text-[10px] font-bold truncate">
              zeara://my-space/exercises/{exercise.id}
            </p>
          </div>
        </div>

        {/* Add to Routine / Active Workout Primary CTA */}
        <button
          onClick={handleAddToRoutine}
          className="inline-flex px-5 items-center justify-center gap-3 rounded-3xl border-2 border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all w-[211px] h-11 absolute left-[919px] top-[54px] cursor-pointer"
        >
          <span className="text-[#292B38] font-dMSans text-2xl leading-none">
            +
          </span>
          <span className="text-[#292B38] font-dMSans text-sm font-bold">
            Add to Routine
          </span>
        </button>

        {/* Read-only notice + Edit/Delete buttons */}
        {isBuiltIn && (
          <p className="text-[#7C7E90] font-dMSans text-[11px] absolute left-[850px] top-[122px]">
            Built-in exercise · read only
          </p>
        )}

        <button
          onClick={handleEdit}
          disabled={isBuiltIn}
          title={isBuiltIn ? "Built-in exercise cannot be edited" : "Edit exercise"}
          className={`flex py-[9px] px-[11px] justify-center items-center rounded-lg border-[1.5px] border-[#292B38] bg-[#FFF] w-10 h-9 absolute left-[1038px] top-[111px] ${
            isBuiltIn
              ? "opacity-[38%] cursor-not-allowed"
              : "hover:bg-[#F8F7FA] cursor-pointer shadow-[2px_2px_0_0_#292B38]"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M13.5 7.5L6 15L2.25 15.75L3 12L10.5 4.5M13.5 7.5L15.75 5.25L12.75 2.25L10.5 4.5M13.5 7.5L10.5 4.5"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
        </button>

        <button
          onClick={handleDelete}
          disabled={isBuiltIn}
          title={
            isBuiltIn ? "Built-in exercise cannot be deleted" : "Delete exercise"
          }
          className={`flex py-[9px] px-[11px] justify-center items-center rounded-lg border-[1.5px] border-[#292B38] bg-[#FFF] w-10 h-9 absolute left-[1088px] top-[111px] ${
            isBuiltIn
              ? "opacity-[38%] cursor-not-allowed"
              : "hover:bg-[#FCEBF4] cursor-pointer shadow-[2px_2px_0_0_#292B38]"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M2.25 4.5H4.5M4.5 4.5H6.75M4.5 4.5L5.25 15.75H12.75L13.5 4.5M6.75 4.5H11.25M6.75 4.5V2.25H11.25V4.5M11.25 4.5H13.5M13.5 4.5H15.75M7.5 7.5V12.75M10.5 7.5V12.75"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
        </button>
      </div>

      {/* Left Window: 01 / EXERCISE_OVERVIEW.EXE */}
      <div className="rounded-xl border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] w-[444px] h-[744px] absolute left-[274px] top-56 overflow-hidden">
        <div className="bg-gradient-to-b from-[#E9DDF4] via-white to-[#E9DDF4] w-[444px] h-[38px] absolute left-0 top-0" />
        <div className="bg-[#292B38] w-[444px] h-0.5 absolute left-0 top-[37px]" />
        <p className="text-[#292B38] font-dMSans text-xs font-bold absolute left-4 top-2.5">
          01 / EXERCISE_OVERVIEW.EXE
        </p>
        <div className="flex justify-center items-center rounded-[3px] border border-[#292B38] bg-[#FFF] w-[21px] h-[21px] absolute left-[405px] top-[9px]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M6.99984 1.16663L8.74984 5.24996L12.8332 6.99996L8.74984 8.74996L6.99984 12.8333L5.24984 8.74996L1.1665 6.99996L5.24984 5.24996L6.99984 1.16663Z"
              fill="#292B38"
            />
          </svg>
        </div>

        <p className="text-[#292B38] font-spaceGrotesk text-xl font-medium absolute left-[22px] top-[58px]">
          Meet your next strong rep.
        </p>
        <p className="text-[#7C7E90] font-dMSans text-xs absolute left-[22px] top-[89px]">
          {exercise.subtitle}
        </p>

        {/* Illustration Frame */}
        <div className="rounded-[7px] border border-[#D9EAF5] bg-[#F8F7FA] w-[400px] h-[270px] absolute left-[22px] top-[124px] overflow-hidden">
          {exercise.slug === "bench-press" ? (
            <div className="flex justify-center items-center w-[390px] h-[260px] absolute left-[5px] top-0">
              <div className="shrink-0 w-[390px] h-[260px] overflow-hidden relative">
                <svg
                  width="390"
                  height="260"
                  viewBox="0 0 390 260"
                  fill="none"
                  className="w-[390px] h-[260px] absolute left-0 top-0"
                >
                  <path d="M390 0H0V260H390V0Z" fill="white" />
                </svg>
                {/* Bench */}
                <div className="w-[196px] h-[67px] absolute left-14 top-[157px]">
                  <svg
                    width="25"
                    height="55"
                    viewBox="0 0 25 55"
                    fill="none"
                    className="w-[23px] h-[53px] absolute left-[22px] top-[13px]"
                  >
                    <path
                      d="M11 1H24L16 54H1L11 1Z"
                      fill="#E9DDF4"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      stroke="#292B38"
                    />
                  </svg>
                  <svg
                    width="30"
                    height="55"
                    viewBox="0 0 30 55"
                    fill="none"
                    className="w-7 h-[53px] absolute left-[162px] top-[13px]"
                  >
                    <path
                      d="M1 1H14L29 54H14L1 1Z"
                      fill="#E9DDF4"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      stroke="#292B38"
                    />
                  </svg>
                  <svg
                    width="181"
                    height="31"
                    viewBox="0 0 181 31"
                    fill="none"
                    className="w-[179px] h-[29px] absolute left-[17px] top-[38px]"
                  >
                    <path
                      d="M24 1H157M1 30H30M154 30H180"
                      strokeWidth="2"
                      strokeLinecap="round"
                      stroke="#292B38"
                    />
                  </svg>
                  <svg
                    width="189"
                    height="17"
                    viewBox="0 0 189 17"
                    fill="none"
                    className="w-[187px] h-[15px] absolute left-0 top-0"
                  >
                    <path
                      d="M7 1H182C186 1 188 3 188 7V11C188 14.3333 186 16 182 16H7C3 16 1 14 1 10V7C1 3 3 1 7 1Z"
                      fill="#E9DDF4"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      stroke="#292B38"
                    />
                  </svg>
                  <svg
                    width="173"
                    height="2"
                    viewBox="0 0 173 2"
                    fill="none"
                    className="w-[171px] absolute left-2 top-[9px]"
                  >
                    <path
                      d="M1 1H172"
                      strokeWidth="2"
                      strokeLinecap="round"
                      stroke="#292B38"
                    />
                  </svg>
                </div>
                {/* Lifter Body */}
                <div className="w-[257px] h-[177px] absolute left-[54px] top-[52px]">
                  <div className="w-[87px] h-[77px] absolute left-[164px] top-[93px]">
                    <svg
                      width="64"
                      height="69"
                      viewBox="0 0 64 69"
                      fill="none"
                      className="w-[62px] h-[67px] absolute left-0 top-0"
                    >
                      <path
                        d="M3 1L40 7C46.6667 8.33333 51 13 53 21L63 63L52 68L34 29L1 20L3 1Z"
                        fill="#F7E9E1"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="41"
                      height="19"
                      viewBox="0 0 41 19"
                      fill="none"
                      className="w-[38px] h-[17px] absolute left-12 top-[60px]"
                    >
                      <path
                        d="M3.57192 3L14.5719 1L21.5719 8L36.5719 12C39.2386 13.3333 39.9053 15.3333 38.5719 18H4.57192C1.23858 17.3333 0.238584 15.3333 1.57192 12L3.57192 3Z"
                        fill="#E9DDF4"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        stroke="#292B38"
                      />
                    </svg>
                  </div>
                  <svg
                    width="34"
                    height="82"
                    viewBox="0 0 34 82"
                    fill="none"
                    className="w-8 h-20 absolute left-[91px] top-px"
                  >
                    <path
                      d="M7 80.6674C14.3333 80.6674 19 77.0007 21 69.6674L30 27.6674V14.6674C32.6667 12.0007 33.3333 9.00073 32 5.6674L28 1.6674C26 0.334066 24.3333 1.00073 23 3.6674L22 9.6674L18 13.6674L17 25.6674L7 59.6674L1 67.6674L7 80.6674Z"
                      fill="#F7E9E1"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      stroke="#292B38"
                    />
                  </svg>
                  <div className="w-[59px] h-[41px] absolute left-0 top-16">
                    <svg
                      width="57"
                      height="42"
                      viewBox="0 0 57 42"
                      fill="none"
                      className="w-[54px] h-[39px] absolute left-[5px] top-0"
                    >
                      <path
                        d="M55.4 21.125L41.4 20.125L39.4 11.125L30.4 10.125L27.4 2.125C26.0667 0.125 24.4 0.791667 22.4 4.125L19.4 8.125L7.4 10.125C2.06667 12.7917 0.0666667 18.125 1.4 26.125C2.06667 34.125 7.06667 38.7917 16.4 40.125L33.4 38.125L51.4 36.125L55.4 21.125Z"
                        fill="#F7E9E1"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="45"
                      height="34"
                      viewBox="0 0 45 34"
                      fill="none"
                      className="w-[42px] h-8 absolute left-0 top-[9px]"
                    >
                      <path
                        d="M11.0833 1C3.75 2.33333 0.416667 7.33333 1.08333 16C1.08333 25.3333 6.08333 31 16.0833 33L34.0833 32L43.0833 27L41.0833 16H34.0833C33.4167 22 31.0833 24 27.0833 22L25.0833 13C17.0833 13.6667 12.4167 9.66667 11.0833 1Z"
                        fill="#292B38"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      className="w-[18px] h-[19px] absolute left-[19px] top-[11px]"
                    >
                      <path
                        d="M1 1H5M16 17C18.6667 15.6667 19.6667 16.6667 19 20"
                        strokeWidth="2"
                        strokeLinecap="round"
                        stroke="#292B38"
                      />
                    </svg>
                  </div>
                  <div className="w-[109px] h-[38px] absolute left-[47px] top-[68px]">
                    <svg
                      width="111"
                      height="40"
                      viewBox="0 0 111 40"
                      fill="none"
                      className="w-[109px] h-[38px] absolute left-0 top-0"
                    >
                      <path
                        d="M2 16.0667C11.3333 7.4 22.3333 2.4 35 1.06667C45.6667 0.4 56 4.73333 66 14.0667C74.6667 20.7333 86 23.7333 100 23.0667L110 36.0667C96 40.0667 82 39.4 68 34.0667C55.3333 29.4 44 29.4 34 34.0667C22 38.0667 11 37.4 1 32.0667C4.33333 26.7333 4.66667 21.4 2 16.0667Z"
                        fill="#A9DDF4"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="41"
                      height="23"
                      viewBox="0 0 41 23"
                      fill="none"
                      className="w-[41px] h-[23px] absolute left-[11px] top-1.5"
                    >
                      <path
                        d="M1 7.69231C9 1.02564 17 -1.30769 25 0.692308C33 2.69231 38.3333 6.69231 41 12.6923C34.3333 16.0256 27.6667 19.359 21 22.6923C13 23.359 6 22.0256 0 18.6923L1 7.69231Z"
                        fill="#F5B9D7"
                      />
                    </svg>
                    <svg
                      width="87"
                      height="21"
                      viewBox="0 0 87 21"
                      fill="none"
                      className="w-[85px] h-[19px] absolute left-1 top-3.5"
                    >
                      <path
                        d="M1 1C6.33333 7 7 13.3333 3 20M72 14L86 18"
                        strokeWidth="2"
                        strokeLinecap="round"
                        stroke="#292B38"
                      />
                    </svg>
                  </div>
                  <div className="w-[117px] h-[89px] absolute left-[140px] top-[88px]">
                    <svg
                      width="61"
                      height="70"
                      viewBox="0 0 61 70"
                      fill="none"
                      className="w-[59px] h-[68px] absolute left-[26px] top-[9px]"
                    >
                      <path
                        d="M7 1L38 13C42.6667 15 45.6667 19 47 25L60 65L47 69L31 32L1 20L7 1Z"
                        fill="#F7E9E1"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="46"
                      height="35"
                      viewBox="0 0 46 35"
                      fill="none"
                      className="w-11 h-[33px] absolute left-0 top-0"
                    >
                      <path
                        d="M3 1.9C13 -0.1 22.3333 1.23333 31 5.9L45 13.9L36 33.9L15 23.9C10.3333 23.2333 5.66667 21.2333 1 17.9L3 1.9Z"
                        fill="#E9DDF4"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="27"
                      height="26"
                      viewBox="0 0 27 26"
                      fill="none"
                      className="w-[25px] h-6 absolute left-[13px] top-[5px]"
                    >
                      <path
                        d="M5.00049 1.00024L1.00049 12.0002M26.0005 10.0002L18.0005 25.0002"
                        strokeWidth="2"
                        strokeLinecap="round"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      className="w-[15px] h-3.5 absolute left-[72px] top-[65px]"
                    >
                      <path
                        d="M1.00049 4.00024L12.0005 1.00024L16.0005 12.0002L4.00049 15.0002L1.00049 4.00024Z"
                        fill="white"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="50"
                      height="18"
                      viewBox="0 0 50 18"
                      fill="none"
                      className="w-[47px] h-4 absolute left-[70px] top-[73px]"
                    >
                      <path
                        d="M5.16618 3C8.49951 5 12.4995 4.33333 17.1662 1L25.1662 7L44.1662 10C47.4995 10.6667 48.8328 13 48.1662 17H5.16618C1.83284 17 0.499512 15.3333 1.16618 12L5.16618 3Z"
                        fill="#E9DDF4"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="44"
                      height="8"
                      viewBox="0 0 44 8"
                      fill="none"
                      className="w-[42px] h-1.5 absolute left-[73px] top-[79px]"
                    >
                      <path
                        d="M1 7H43M17 1L14 4M23 3L20 6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        stroke="#292B38"
                      />
                    </svg>
                  </div>
                  <div className="w-7 h-[87px] absolute left-[72px] top-0">
                    <svg
                      width="30"
                      height="89"
                      viewBox="0 0 30 89"
                      fill="none"
                      className="w-7 h-[87px] absolute left-0 top-0"
                    >
                      <path
                        d="M1 78.25C1 72.25 3 65.25 7 57.25L13 43.25L15 18.25L13 11.25C11.6667 8.58333 12 6.25 14 4.25L19 1.25C21 0.583333 22.6667 1.25 24 3.25L28 9.25C29.3333 11.9167 28.3333 14.5833 25 17.25L26 45.25C26.6667 48.5833 26 52.9167 24 58.25L18 81.25C16 86.5833 12.6667 88.5833 8 87.25C4 86.5833 1.66667 83.5833 1 78.25Z"
                        fill="#F7E9E1"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="7"
                      height="4"
                      viewBox="0 0 7 4"
                      fill="none"
                      className="w-[5px] h-0.5 absolute left-3.5 top-[47px]"
                    >
                      <path
                        d="M1.00049 1.00024L6.00049 3.00024"
                        strokeWidth="2"
                        strokeLinecap="round"
                        stroke="#292B38"
                      />
                    </svg>
                  </div>
                </div>
                {/* Barbell */}
                <div className="w-[127px] h-[63px] absolute left-[95px] top-[26px]">
                  <svg
                    width="129"
                    height="19"
                    viewBox="0 0 129 19"
                    fill="none"
                    className="w-[127px] h-[17px] absolute left-0 top-[23px]"
                  >
                    <path
                      d="M2 1L128 13L127 18L1 6L2 1Z"
                      fill="#D6D5E1"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      stroke="#292B38"
                    />
                  </svg>
                  <div className="w-[31px] h-[53px] absolute left-0 top-0">
                    <svg
                      width="20"
                      height="56"
                      viewBox="0 0 20 56"
                      fill="none"
                      className="w-[17px] h-[53px] absolute left-3.5 top-0"
                    >
                      <path
                        d="M3.03467 1.12744L11.0347 2.12744C17.0347 3.46077 19.368 12.4608 18.0347 29.1274C17.368 45.7941 14.368 54.1274 9.03467 54.1274L1.03467 53.1274L3.03467 1.12744Z"
                        fill="#C9BADB"
                        strokeWidth="2"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="22"
                      height="54"
                      viewBox="0 0 22 54"
                      fill="none"
                      className="w-5 h-[52px] absolute left-[5px] top-0"
                    >
                      <path
                        d="M11 53C16.5228 53 21 41.3594 21 27C21 12.6406 16.5228 1 11 1C5.47715 1 1 12.6406 1 27C1 41.3594 5.47715 53 11 53Z"
                        fill="#E9DDF4"
                        strokeWidth="2"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="10"
                      height="34"
                      viewBox="0 0 10 34"
                      fill="none"
                      className="w-2 h-8 absolute left-[11px] top-2.5"
                    >
                      <path
                        d="M5 33C7.20914 33 9 25.8366 9 17C9 8.16344 7.20914 1 5 1C2.79086 1 1 8.16344 1 17C1 25.8366 2.79086 33 5 33Z"
                        fill="#C9BADB"
                        strokeWidth="2"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="18"
                      height="9"
                      viewBox="0 0 18 9"
                      fill="none"
                      className="w-4 h-[7px] absolute left-0 top-[23px]"
                    >
                      <path
                        d="M2 1L17 3V8L1 6L2 1Z"
                        fill="#D6D5E1"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        stroke="#292B38"
                      />
                    </svg>
                  </div>
                  <div className="w-[33px] h-[53px] absolute left-[94px] top-2.5">
                    <svg
                      width="20"
                      height="56"
                      viewBox="0 0 20 56"
                      fill="none"
                      className="w-[17px] h-[53px] absolute left-[9px] top-0"
                    >
                      <path
                        d="M3.03467 1.12744L11.0347 2.12744C17.0347 3.46077 19.368 12.4608 18.0347 29.1274C17.368 45.7941 14.368 54.1274 9.03467 54.1274L1.03467 53.1274L3.03467 1.12744Z"
                        fill="#C9BADB"
                        strokeWidth="2"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="22"
                      height="54"
                      viewBox="0 0 22 54"
                      fill="none"
                      className="w-5 h-[52px] absolute left-0 top-0"
                    >
                      <path
                        d="M11 53C16.5228 53 21 41.3594 21 27C21 12.6406 16.5228 1 11 1C5.47715 1 1 12.6406 1 27C1 41.3594 5.47715 53 11 53Z"
                        fill="#E9DDF4"
                        strokeWidth="2"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="10"
                      height="34"
                      viewBox="0 0 10 34"
                      fill="none"
                      className="w-2 h-8 absolute left-1.5 top-2.5"
                    >
                      <path
                        d="M5 33C7.20914 33 9 25.8366 9 17C9 8.16344 7.20914 1 5 1C2.79086 1 1 8.16344 1 17C1 25.8366 2.79086 33 5 33Z"
                        fill="#C9BADB"
                        strokeWidth="2"
                        stroke="#292B38"
                      />
                    </svg>
                    <svg
                      width="26"
                      height="9"
                      viewBox="0 0 26 9"
                      fill="none"
                      className="w-6 h-[7px] absolute left-[9px] top-[23px]"
                    >
                      <path
                        d="M1 1L25 3L24 8L1 6V1Z"
                        fill="#D6D5E1"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        stroke="#292B38"
                      />
                    </svg>
                  </div>
                  <svg
                    width="38"
                    height="14"
                    viewBox="0 0 38 14"
                    fill="none"
                    className="w-9 h-[11px] absolute left-[45px] top-[26px]"
                  >
                    <path
                      d="M1 6.25V3.25C1 1.25 2 0.583333 4 1.25L9 2.25C11 2.91667 12 4.25 12 6.25V9.25M27 9.25V6.25C27 4.25 28 3.58333 30 4.25L34 5.25C36 5.91667 37 7.25 37 9.25L36 12.25"
                      fill="#F7E9E1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#292B38"
                    />
                  </svg>
                </div>
                {/* Direction Arrow */}
                <div className="w-2.5 h-12 absolute left-[234px] top-[47px]">
                  <svg
                    width="2"
                    height="49"
                    viewBox="0 0 2 49"
                    fill="none"
                    className="h-[47px] absolute left-[5px] top-px"
                  >
                    <path
                      d="M1 48V47.5204M1 1V1.47959M1 7.23469V8.19388M1 13.949V14.9082M1 20.6633V21.6224M1 27.3775V28.3367M1 34.0918V35.051M1 40.8061V41.7653"
                      strokeWidth="2"
                      strokeLinecap="round"
                      stroke="#292B38"
                    />
                  </svg>
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    className="w-2.5 h-1.5 absolute left-0 top-0"
                  >
                    <path
                      d="M1 7L6 1L11 7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#292B38"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            /* Tampilan Blueprint Retro untuk Exercise Lainnya (Cable Row, Squat, dll.) */
            <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6 text-center relative">
              <div className="w-20 h-20 rounded-2xl border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] flex items-center justify-center mb-3">
                <svg width="42" height="30" viewBox="0 0 28 20" fill="none">
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
              <p className="font-spaceGrotesk text-base font-bold text-[#292B38]">
                {exercise.name}
              </p>
              <p className="font-dMSans text-xs text-[#7C7E90] mt-1">
                {exercise.equipment} · Focus on {exercise.primaryMuscle}
              </p>
            </div>
          )}

          <p className="text-[#7C7E90] font-dMSans text-[9px] font-bold absolute left-[13px] top-3">
            START / FINISH POSITION
          </p>
          <div className="inline-flex px-2.5 py-[3px] items-center rounded bg-[#F5B9D7] h-5 right-3 bottom-3 absolute">
            <p className="text-[#292B38] font-dMSans text-[9px] font-bold">
              {exercise.category} ACTIVATION
            </p>
          </div>
        </div>

        {/* Movement Details Table */}
        <p className="text-[#7C7E90] font-dMSans text-[10px] font-bold absolute left-[22px] top-[416px]">
          MOVEMENT DETAILS
        </p>
        <div className="flex flex-col items-start w-[400px] h-[164px] absolute left-[22px] top-[440px]">
          <div className="flex justify-between items-center border-b border-b-[#E8E6EE] w-full h-[41px]">
            <p className="text-[#7C7E90] font-dMSans text-xs">Primary muscle</p>
            <p className="text-[#292B38] font-dMSans text-[13px] font-medium">
              {exercise.primaryMuscle}
            </p>
          </div>
          <div className="flex justify-between items-center border-b border-b-[#E8E6EE] w-full h-[41px]">
            <p className="text-[#7C7E90] font-dMSans text-xs">Secondary</p>
            <p className="text-[#292B38] font-dMSans text-[13px] font-medium">
              {exercise.secondaryMuscle}
            </p>
          </div>
          <div className="flex justify-between items-center border-b border-b-[#E8E6EE] w-full h-[41px]">
            <p className="text-[#7C7E90] font-dMSans text-xs">Equipment</p>
            <p className="text-[#292B38] font-dMSans text-[13px] font-medium">
              {exercise.equipment}
            </p>
          </div>
          <div className="flex justify-between items-center border-b border-b-[#E8E6EE] w-full h-[41px]">
            <p className="text-[#7C7E90] font-dMSans text-xs">Tracking type</p>
            <p className="text-[#292B38] font-dMSans text-[13px] font-medium">
              {exercise.trackingType}
            </p>
          </div>
        </div>

        {/* Personal Best Card */}
        <div className="rounded-[7px] border-[1.5px] border-[#292B38] bg-[#E9DDF4] w-[400px] h-[88px] absolute left-[22px] top-[628px]">
          <div className="rounded-[7px] border border-[#292B38] bg-[#FFF] w-[45px] h-[45px] absolute left-[15px] top-[19px] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M14.1667 4.16667V2.5H5.83333V4.16667M14.1667 4.16667V8.33333C14.1667 9.4384 13.7277 10.4982 12.9463 11.2796C12.1649 12.061 11.1051 12.5 10 12.5M14.1667 4.16667H17.5V7.5C17.5 8.38405 17.1488 9.2319 16.5237 9.85702C15.8986 10.4821 15.0507 10.8333 14.1667 10.8333M10 12.5C8.89493 12.5 7.83512 12.061 7.05372 11.2796C6.27232 10.4982 5.83333 9.4384 5.83333 8.33333V4.16667M10 12.5V17.5M5.83333 4.16667H2.5V7.5C2.5 8.38405 2.85119 9.2319 3.47631 9.85702C4.10143 10.4821 4.94928 10.8333 5.83333 10.8333M10 17.5H5.83333M10 17.5H14.1667"
                strokeWidth="1.8"
                stroke="#292B38"
              />
            </svg>
          </div>
          <p className="text-[#292B38] font-dMSans text-[10px] font-bold absolute left-[75px] top-3">
            YOUR PERSONAL BEST
          </p>
          <p className="text-[#292B38] font-spaceGrotesk text-[19px] font-bold absolute left-[75px] top-[30px]">
            Current PR: {exercise.pr}
          </p>
          <p className="text-[#7C7E90] font-dMSans text-[11px] absolute left-[75px] top-[61px]">
            A little stronger, every session.
          </p>
        </div>
      </div>

      {/* Right Window: 02 / HOW_TO_PERFORM.EXE */}
      <div className="rounded-xl border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] w-[666px] h-[744px] absolute left-[742px] top-56 overflow-hidden">
        <div className="bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] w-[666px] h-[38px] absolute left-0 top-0" />
        <div className="bg-[#292B38] w-[666px] h-0.5 absolute left-0 top-[37px]" />
        <p className="text-[#292B38] font-dMSans text-xs font-bold absolute left-4 top-2.5">
          02 / HOW_TO_PERFORM.EXE
        </p>
        <div className="flex justify-center items-center rounded-[3px] border border-[#292B38] bg-[#FFF] w-[21px] h-[21px] absolute left-[627px] top-[9px]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 11.6667L1.75 6.41667V2.91667H3.5V1.75H5.83333L7 3.5L8.16667 1.75H10.5V2.91667H12.25V6.41667L7 11.6667Z"
              fill="#292B38"
            />
          </svg>
        </div>

        <p className="text-[#292B38] font-spaceGrotesk text-[22px] font-medium absolute left-6 top-[58px]">
          Good form. Strong foundations.
        </p>
        <p className="text-[#7C7E90] font-dMSans text-[13px] absolute left-6 top-[92px]">
          Control the movement. Make every rep count.
        </p>

        {/* Execution Steps */}
        <div className="absolute left-6 top-[140px] w-[618px] flex flex-col gap-3">
          {exercise.steps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="flex items-start gap-4 h-[92px]">
                <div
                  className={`shrink-0 flex justify-center items-center rounded-[9px] border-[1.5px] border-[#292B38] bg-gradient-to-b ${step.bg} w-9 h-9 mt-0.5`}
                >
                  <span className="text-[#292B38] font-spaceGrotesk text-base font-bold">
                    {step.num}
                  </span>
                </div>
                <div>
                  <h3 className="text-[#292B38] font-spaceGrotesk text-lg font-bold">
                    {step.title}
                  </h3>
                  <p className="text-[#292B38] font-dMSans text-sm mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
              {idx < exercise.steps.length - 1 && (
                <div className="bg-[#E8E6EE] w-[565px] h-px ml-[52px]" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Tips & Safety Callout */}
        <div className="rounded-lg border-[1.5px] border-[#292B38] bg-[#FCEBF4] w-[618px] h-[146px] absolute left-6 top-[570px] overflow-hidden">
          <div className="bg-gradient-to-b from-[#F5B9D7] via-white to-[#F5B9D7] w-[618px] h-[37px] absolute left-0 top-0" />
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="w-5 h-5 absolute left-3.5 top-[9px]"
          >
            <path
              d="M9.99984 7.5V11.6667M9.99984 14.1667V15M9.99984 2.5L1.6665 17.5H18.3332L9.99984 2.5Z"
              strokeWidth="1.8"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
          <p className="text-[#292B38] font-spaceGrotesk text-[15px] font-bold absolute left-[43px] top-2">
            Form Tips &amp; Safety
          </p>
          <p className="text-[#292B38] font-dMSans text-[13px] w-[586px] leading-relaxed absolute left-4 top-[50px]">
            {exercise.tips}
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex justify-between items-center w-[1134px] h-6 absolute left-[274px] top-[1018px]">
        <p className="text-[#7C7E90] font-dMSans text-[9px] font-bold">
          A LITTLE PROGRESS, EVERY DAY.
        </p>
        <p className="text-[#7C7E90] font-dMSans text-[10px]">
          Zeara / Plan. Track. Analyze.
        </p>
      </div>
    </div>
  );
}