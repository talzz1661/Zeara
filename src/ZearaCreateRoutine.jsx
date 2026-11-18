import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const EXERCISE_LIBRARY = [
  { id: "lib-1", name: "Barbell Bench Press", muscle: "Chest", equipment: "Barbell", type: "Compound" },
  { id: "lib-2", name: "Incline Dumbbell Press", muscle: "Chest", equipment: "Dumbbell", type: "Compound" },
  { id: "lib-3", name: "Barbell Back Squat", muscle: "Legs", equipment: "Barbell", type: "Compound" },
  { id: "lib-4", name: "Romanian Deadlift", muscle: "Legs", equipment: "Barbell", type: "Compound" },
  { id: "lib-5", name: "Bent Over Barbell Row", muscle: "Back", equipment: "Barbell", type: "Compound" },
  { id: "lib-6", name: "Lat Pulldown (Wide Grip)", muscle: "Back", equipment: "Cable", type: "Compound" },
  { id: "lib-7", name: "Seated Dumbbell Shoulder Press", muscle: "Shoulders", equipment: "Dumbbell", type: "Compound" },
  { id: "lib-8", name: "Dumbbell Lateral Raises", muscle: "Shoulders", equipment: "Dumbbell", type: "Isolation" },
  { id: "lib-9", name: "Cable Tricep Pushdowns", muscle: "Arms", equipment: "Cable", type: "Isolation" },
  { id: "lib-10", name: "Dumbbell Bicep Curls", muscle: "Arms", equipment: "Dumbbell", type: "Isolation" },
  { id: "lib-11", name: "Hanging Leg Raises", muscle: "Core", equipment: "Bodyweight", type: "Isolation" },
];

export default function ZearaCreateRoutine() {
  const navigate = useNavigate();

  // Form State
  const [routineName, setRoutineName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDays, setSelectedDays] = useState(["Mon", "Tue", "Thu", "Fri"]);
  const [workoutDays, setWorkoutDays] = useState([
    {
      id: "day-1",
      title: "Day 1 — Push Focus",
      exercises: [
        { id: "ex-1", name: "Barbell Bench Press", muscle: "Chest", sets: 4, reps: "6-8" },
        { id: "ex-2", name: "Dumbbell Lateral Raises", muscle: "Shoulders", sets: 3, reps: "12-15" },
      ],
    },
  ]);

  // Modal State
  const [modalOpenForDayId, setModalOpenForDayId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [muscleFilter, setMuscleFilter] = useState("All");
  const [selectedLibraryIds, setSelectedLibraryIds] = useState([]);

  // Toast State
  const [toast, setToast] = useState(null); // { type: 'error' | 'success', title: string, message: string }

  const toggleDayPill = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const addWorkoutDay = () => {
    const nextNum = workoutDays.length + 1;
    setWorkoutDays((prev) => [
      ...prev,
      { id: `day-${Date.now()}`, title: `Day ${nextNum} — Custom Split`, exercises: [] },
    ]);
  };

  const updateDayTitle = (dayId, newTitle) => {
    setWorkoutDays((prev) =>
      prev.map((d) => (d.id === dayId ? { ...d, title: newTitle } : d))
    );
  };

  const updateExerciseField = (dayId, exId, field, value) => {
    setWorkoutDays((prev) =>
      prev.map((d) =>
        d.id === dayId
          ? {
              ...d,
              exercises: d.exercises.map((ex) =>
                ex.id === exId ? { ...ex, [field]: value } : ex
              ),
            }
          : d
      )
    );
  };

  const removeExercise = (dayId, exId) => {
    setWorkoutDays((prev) =>
      prev.map((d) =>
        d.id === dayId
          ? { ...d, exercises: d.exercises.filter((ex) => ex.id !== exId) }
          : d
      )
    );
  };

  // Modal handlers
  const openExerciseModal = (dayId) => {
    setModalOpenForDayId(dayId);
    setSelectedLibraryIds([]);
    setSearchQuery("");
    setMuscleFilter("All");
  };

  const toggleLibraryItem = (libId) => {
    setSelectedLibraryIds((prev) =>
      prev.includes(libId) ? prev.filter((id) => id !== libId) : [...prev, libId]
    );
  };

  const confirmAddExercises = () => {
    const chosen = EXERCISE_LIBRARY.filter((item) => selectedLibraryIds.includes(item.id));
    setWorkoutDays((prev) =>
      prev.map((d) =>
        d.id === modalOpenForDayId
          ? {
              ...d,
              exercises: [
                ...d.exercises,
                ...chosen.map((c, idx) => ({
                  id: `ex-${Date.now()}-${idx}`,
                  name: c.name,
                  muscle: c.muscle,
                  sets: 3,
                  reps: "10-12",
                })),
              ],
            }
          : d
      )
    );
    setModalOpenForDayId(null);
  };

  const totalExercises = workoutDays.reduce((acc, d) => acc + d.exercises.length, 0);

  const handleSaveRoutine = () => {
    if (!routineName.trim() || totalExercises === 0) {
      setToast({
        type: "error",
        title: "VALIDATION_ERROR.EXE",
        message: "Routine name is required and must contain at least 1 exercise.",
      });
      return;
    }

    setToast({
      type: "success",
      title: "ROUTINE_SAVED.EXE",
      message: `"${routineName}" has been saved to your Workout Planner.`,
    });

    setTimeout(() => {
      navigate("/planner");
    }, 1500);
  };

  const filteredLibrary = EXERCISE_LIBRARY.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = muscleFilter === "All" || item.muscle === muscleFilter;
    return matchesSearch && matchesMuscle;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFFFFF] via-[#F2F9FD] to-[#E6F4FC] text-[#292B38] font-[family-name:var(--font-dMSans)] pb-16">
      {/* Top Navbar */}
      <header className="w-full h-16 bg-white border-b-2 border-[#292B38] px-6 md:px-12 flex items-center justify-between sticky top-0 z-30">
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <span className="font-[family-name:var(--font-bodoniModa)] font-black text-2xl tracking-tight">
            Zeara
          </span>
          <span className="bg-[#A9DDF4] border-[1.5px] border-[#292B38] px-2 py-0.5 text-[11px] font-bold tracking-wider uppercase shadow-[2px_2px_0_0_#292B38]">
            OS / V. 2.0
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/planner")}
            className="bg-white border-2 border-[#292B38] px-4 py-1.5 text-xs font-bold shadow-[3px_3px_0_0_#292B38] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveRoutine}
            className="bg-[#A9DDF4] border-2 border-[#292B38] px-5 py-1.5 text-xs font-bold shadow-[3px_3px_0_0_#292B38] hover:translate-x-[1px] hover:translate-y-[1px] transition cursor-pointer"
          >
            Save Routine ✓
          </button>
        </div>
      </header>

      <main className="max-w-[1160px] mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="font-[family-name:var(--font-bodoniModa)] font-black text-3xl md:text-4xl">
            Create Custom Routine
          </h1>
          <p className="text-sm text-[#52566B] mt-1">
            Configure your training schedule, split days, and target rep schemes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Routine Metadata */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-[#292B38] shadow-[6px_6px_0_0_#292B38]">
              <div className="h-9 bg-gradient-to-r from-[#A9DDF4] to-[#D4EEFA] border-b-2 border-[#292B38] px-4 flex items-center">
                <span className="font-[family-name:var(--font-spaceGrotesk)] text-xs font-bold uppercase">
                  ROUTINE_CONFIG.SYS
                </span>
              </div>

              <div className="p-5 space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Routine Name *
                  </label>
                  <input
                    type="text"
                    value={routineName}
                    onChange={(e) => setRoutineName(e.target.value)}
                    placeholder="e.g. Push / Pull / Legs"
                    className="w-full border-2 border-[#292B38] px-3 py-2 text-sm focus:outline-none focus:bg-[#F2F9FD]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Description / Goal
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Hypertrophy focus with progressive overload..."
                    className="w-full border-2 border-[#292B38] px-3 py-2 text-sm focus:outline-none focus:bg-[#F2F9FD]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                    Weekly Schedule ({selectedDays.length} training days / week)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS_OF_WEEK.map((day) => {
                      const active = selectedDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDayPill(day)}
                          className={`px-3 py-1.5 text-xs font-bold border-[1.5px] border-[#292B38] cursor-pointer transition ${
                            active
                              ? "bg-[#A9DDF4] shadow-[2px_2px_0_0_#292B38]"
                              : "bg-white text-[#52566B]"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D6E6F2] text-xs text-[#52566B] flex justify-between">
                  <span>Total Split Days: <strong>{workoutDays.length}</strong></span>
                  <span>Total Exercises: <strong>{totalExercises}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Workout Days Builder */}
          <div className="lg:col-span-2 space-y-6">
            {workoutDays.map((day) => (
              <div
                key={day.id}
                className="bg-white border-2 border-[#292B38] shadow-[6px_6px_0_0_#292B38]"
              >
                <div className="h-11 bg-gradient-to-r from-[#A9DDF4] to-[#D4EEFA] border-b-2 border-[#292B38] px-4 flex items-center justify-between gap-4">
                  <input
                    type="text"
                    value={day.title}
                    onChange={(e) => updateDayTitle(day.id, e.target.value)}
                    className="bg-transparent font-[family-name:var(--font-spaceGrotesk)] text-xs md:text-sm font-bold uppercase border-b border-dashed border-[#292B38] focus:outline-none w-full max-w-xs"
                  />
                  <span className="text-xs font-bold shrink-0">
                    {day.exercises.length} Exercises
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  {day.exercises.length === 0 ? (
                    <p className="text-xs text-[#52566B] italic py-4 text-center border border-dashed border-[#292B38] bg-[#F8FCFF]">
                      No exercises added to this day yet.
                    </p>
                  ) : (
                    day.exercises.map((ex, idx) => (
                      <div
                        key={ex.id}
                        className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 p-3 bg-[#F2F9FD] border-[1.5px] border-[#292B38]"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-[family-name:var(--font-spaceGrotesk)] text-xs font-bold text-[#52566B]">
                            0{idx + 1}
                          </span>
                          <div>
                            <p className="text-sm font-bold truncate">{ex.name}</p>
                            <span className="text-[11px] font-bold text-[#52566B] uppercase">
                              {ex.muscle}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <div>
                            <span className="block text-[9px] font-bold uppercase text-[#52566B]">
                              Sets
                            </span>
                            <input
                              type="number"
                              min={1}
                              value={ex.sets}
                              onChange={(e) =>
                                updateExerciseField(day.id, ex.id, "sets", e.target.value)
                              }
                              className="w-14 bg-white border border-[#292B38] px-2 py-1 text-xs font-bold text-center"
                            />
                          </div>
                          <div>
                            <span className="block text-[9px] font-bold uppercase text-[#52566B]">
                              Reps
                            </span>
                            <input
                              type="text"
                              value={ex.reps}
                              onChange={(e) =>
                                updateExerciseField(day.id, ex.id, "reps", e.target.value)
                              }
                              className="w-16 bg-white border border-[#292B38] px-2 py-1 text-xs font-bold text-center"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeExercise(day.id, ex.id)}
                            className="mt-3.5 bg-white border border-[#292B38] px-2 py-1 text-xs font-bold text-red-600 hover:bg-red-50 cursor-pointer"
                            title="Remove Exercise"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))
                  )}

                  <button
                    type="button"
                    onClick={() => openExerciseModal(day.id)}
                    className="w-full py-2.5 bg-white border-2 border-dashed border-[#292B38] text-xs font-bold hover:bg-[#E3F3FC] transition cursor-pointer"
                  >
                    + Add Exercise from Library
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addWorkoutDay}
              className="w-full py-3 bg-white border-2 border-[#292B38] text-sm font-bold shadow-[4px_4px_0_0_#292B38] hover:bg-[#F2F9FD] transition cursor-pointer"
            >
              + Add Workout Day
            </button>
          </div>
        </div>
      </main>

      {/* Exercise Selection Modal */}
      {modalOpenForDayId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#292B38] shadow-[8px_8px_0_0_#292B38] w-full max-w-2xl max-h-[85vh] flex flex-col">
            <div className="h-10 bg-gradient-to-r from-[#A9DDF4] to-[#D4EEFA] border-b-2 border-[#292B38] px-4 flex items-center justify-between shrink-0">
              <span className="font-[family-name:var(--font-spaceGrotesk)] text-xs font-bold uppercase">
                EXERCISE_LIBRARY.DB
              </span>
              <button
                onClick={() => setModalOpenForDayId(null)}
                className="w-6 h-6 bg-white border border-[#292B38] text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 border-b border-[#D6E6F2] space-y-3 shrink-0">
              <input
                type="text"
                placeholder="Search exercise name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-2 border-[#292B38] px-3 py-2 text-sm focus:outline-none"
              />
              <div className="flex flex-wrap gap-1.5">
                {["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Core"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMuscleFilter(m)}
                    className={`px-2.5 py-1 text-xs font-bold border border-[#292B38] cursor-pointer ${
                      muscleFilter === m ? "bg-[#A9DDF4]" : "bg-white"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              {filteredLibrary.map((item) => {
                const checked = selectedLibraryIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleLibraryItem(item.id)}
                    className={`p-3 border-[1.5px] border-[#292B38] flex items-center justify-between cursor-pointer transition ${
                      checked ? "bg-[#E3F3FC]" : "bg-white hover:bg-[#F8FCFF]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 border-2 border-[#292B38] flex items-center justify-center text-xs font-bold ${
                          checked ? "bg-[#A9DDF4]" : "bg-white"
                        }`}
                      >
                        {checked ? "✓" : ""}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-[11px] text-[#52566B]">
                          {item.muscle} • {item.equipment} • {item.type}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-[#F2F9FD] border-t-2 border-[#292B38] flex items-center justify-between shrink-0">
              <span className="text-xs font-bold">
                {selectedLibraryIds.length} exercises selected
              </span>
              <button
                type="button"
                disabled={selectedLibraryIds.length === 0}
                onClick={confirmAddExercises}
                className="bg-[#A9DDF4] disabled:opacity-50 border-2 border-[#292B38] px-4 py-2 text-xs font-bold shadow-[3px_3px_0_0_#292B38] cursor-pointer"
              >
                Add Selected Exercises →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Retro System Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-white border-2 border-[#292B38] shadow-[6px_6px_0_0_#292B38]">
          <div
            className={`h-8 border-b-2 border-[#292B38] px-3 flex items-center justify-between ${
              toast.type === "error" ? "bg-[#FFC2C2]" : "bg-[#B8F2C8]"
            }`}
          >
            <span className="font-[family-name:var(--font-spaceGrotesk)] text-[11px] font-bold">
              {toast.title}
            </span>
            <button
              onClick={() => setToast(null)}
              className="text-xs font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="p-3.5 text-xs text-[#292B38] font-medium">
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}