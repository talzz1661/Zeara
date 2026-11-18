import React, { useState, useEffect } from "react";
import { RequiredFieldsValidationWarning } from "./components/ZearaToasts";

const MUSCLE_OPTIONS = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Quads",
  "Hamstrings",
  "Glutes",
  "Calves",
  "Core",
  "Full Body",
];

const EQUIPMENT_OPTIONS = [
  "Cable",
  "Barbell",
  "Dumbbells",
  "Bodyweight",
  "Machine",
  "Kettlebell",
  "Resistance Band",
];

const TRACKING_TYPES = [
  {
    id: "weighted",
    label: "Weighted",
    helper: "Track load (kg) + reps per set.",
  },
  {
    id: "bodyweight",
    label: "Bodyweight",
    helper: "Track reps (and optional added weight) per set.",
  },
  {
    id: "assisted",
    label: "Assisted",
    helper: "Track assistance weight (kg) + reps per set.",
  },
];

export default function CreateCustomExerciseModal({
  isOpen,
  onClose,
  onSave,
}) {
  const [name, setName] = useState("");
  const [muscle, setMuscle] = useState("Chest");
  const [equipment, setEquipment] = useState("Cable");
  const [trackingType, setTrackingType] = useState("weighted");
  const [notes, setNotes] = useState("");
  const [showValidationToast, setShowValidationToast] = useState(false);

  // Auto-tutup toast peringatan setelah 4 detik
  useEffect(() => {
    if (!showValidationToast) return;
    const timer = setTimeout(() => setShowValidationToast(false), 4000);
    return () => clearTimeout(timer);
  }, [showValidationToast]);

  if (!isOpen) return null;

  const activeTracking =
    TRACKING_TYPES.find((t) => t.id === trackingType) || TRACKING_TYPES[0];

  const handleCloseModal = () => {
    setShowValidationToast(false);
    if (onClose) onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !muscle || !equipment) {
      setShowValidationToast(true);
      return;
    }

    const newExercise = {
      id: Date.now(),
      name: name.trim(),
      muscle,
      equipment,
      trackingType,
      category: `Custom · ${
        trackingType.charAt(0).toUpperCase() + trackingType.slice(1)
      }`,
      notes: notes.trim(),
      isCustom: true,
      theme: "pink",
    };

    setName("");
    setMuscle("Chest");
    setEquipment("Cable");
    setTrackingType("weighted");
    setNotes("");
    setShowValidationToast(false);

    if (onSave) onSave(newExercise);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#292B38]/40 backdrop-blur-[2px] p-4 overflow-y-auto font-dMSans text-[#292B38]"
        onClick={handleCloseModal}
      >
        {/* Modal Window */}
        <form
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[640px] rounded-xl border-2 border-[#292B38] bg-white shadow-[6px_6px_0_0_#292B38] overflow-hidden my-auto"
        >
          {/* Pink Retro Title Bar */}
          <div className="h-11 px-[18px] border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#F5B9D7]/45 to-[#F5B9D7] flex items-center justify-between">
            <span className="text-xs font-bold tracking-wide text-[#292B38]">
              NEW_EXERCISE.EXE
            </span>

            <div className="flex items-center gap-2">
              {/* Decorative Heart Box */}
              <span className="w-[22px] h-[22px] rounded-[3px] border border-[#292B38] bg-white flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M0.875 1.75H5.25V3.5H8.75V1.75H13.125V7.875H11.375V9.625H9.625V11.375H7.875V13.125H6.125V11.375H4.375V9.625H2.625V7.875H0.875V1.75Z"
                    fill="#292B38"
                  />
                </svg>
              </span>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close modal"
                className="cursor-pointer w-6 h-6 rounded-[3px] border-[1.5px] border-[#292B38] bg-white hover:bg-[#F8F7FA] flex items-center justify-center"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M0.75 0.75H3V3H5.25V5.25H6.75V3H9V0.75H11.25V3H9V5.25H6.75V6.75H9V9H11.25V11.25H9V9H6.75V6.75H5.25V9H3V11.25H0.75V9H3V6.75H5.25V5.25H3V3H0.75V0.75Z"
                    fill="#292B38"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-8 space-y-5 bg-white">
            <div>
              <h2 className="font-spaceGrotesk text-[24px] sm:text-[28px] font-bold text-[#292B38] leading-tight">
                Make it your movement.
              </h2>
              <p className="text-[#696B7C] text-sm mt-1">
                Add a custom exercise to your personal library.
              </p>
            </div>

            {/* Exercise Name* */}
            <div>
              <label className="block text-[13px] font-bold text-[#292B38] mb-2">
                Exercise Name*
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (showValidationToast) setShowValidationToast(false);
                }}
                placeholder="e.g., Incline Cable Fly"
                className={`w-full h-12 px-3.5 rounded-md border-[1.5px] ${
                  showValidationToast && !name.trim()
                    ? "border-[#E11D48] bg-[#FFF5F7]"
                    : "border-[#292B38] bg-white"
                } text-sm font-medium text-[#292B38] placeholder:text-[#777987] focus:outline-none focus:ring-2 focus:ring-[#A9DDF4]`}
              />
            </div>

            {/* Primary Muscle Group* & Equipment* */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-[#292B38] mb-2">
                  Primary Muscle Group*
                </label>
                <div className="relative">
                  <select
                    value={muscle}
                    onChange={(e) => setMuscle(e.target.value)}
                    className="cursor-pointer w-full h-12 appearance-none rounded-md border-[1.5px] border-[#292B38] bg-white pl-3.5 pr-10 text-sm font-medium text-[#292B38] focus:outline-none focus:ring-2 focus:ring-[#A9DDF4]"
                  >
                    {MUSCLE_OPTIONS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <path
                      d="M1 4H4V7H7V10H9V7H12V4H15V7H12V10H9V13H7V10H4V7H1V4Z"
                      fill="#292B38"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#292B38] mb-2">
                  Equipment*
                </label>
                <div className="relative">
                  <select
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    className="cursor-pointer w-full h-12 appearance-none rounded-md border-[1.5px] border-[#292B38] bg-white pl-3.5 pr-10 text-sm font-medium text-[#292B38] focus:outline-none focus:ring-2 focus:ring-[#A9DDF4]"
                  >
                    {EQUIPMENT_OPTIONS.map((eq) => (
                      <option key={eq} value={eq}>
                        {eq}
                      </option>
                    ))}
                  </select>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <path
                      d="M1 4H4V7H7V10H9V7H12V4H15V7H12V10H9V13H7V10H4V7H1V4Z"
                      fill="#292B38"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tracking Type */}
            <div>
              <label className="block text-[13px] font-bold text-[#292B38] mb-2">
                Tracking Type
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {TRACKING_TYPES.map((type) => {
                  const isSelected = trackingType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setTrackingType(type.id)}
                      className={`cursor-pointer h-10 px-5 rounded-[21px] text-sm transition-all inline-flex items-center gap-2.5 ${
                        isSelected
                          ? "border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/45 to-[#A9DDF4] font-bold"
                          : "border-[1.5px] border-[#292B38] bg-white hover:bg-[#F8F7FA] font-medium"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M0.75 5.25H3V7.5H5.25V5.25H7.5V3H9.75V0.75H12V5.25H9.75V7.5H7.5V9.75H5.25V12H3V9.75H0.75V5.25Z"
                            fill="#292B38"
                          />
                        </svg>
                      )}
                      {type.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-[#696B7C] text-xs mt-2">
                {activeTracking.helper}
              </p>
            </div>

            {/* Instructions / Form Notes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[13px] font-bold text-[#292B38]">
                  Instructions / Form Notes
                </label>
                <span className="text-[#696B7C] text-[10px] font-bold uppercase tracking-wider">
                  OPTIONAL
                </span>
              </div>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Set the pulleys low and use an incline bench. Keep a soft bend in your elbows..."
                className="w-full p-3.5 rounded-md border-[1.5px] border-[#292B38] bg-white text-sm text-[#292B38] placeholder:text-[#777987] focus:outline-none focus:ring-2 focus:ring-[#A9DDF4]"
              />
            </div>

            <p className="text-[#696B7C] text-[11px]">* Required fields</p>
          </div>

          {/* Footer Actions */}
          <div className="bg-[#F8F7FA] border-t border-[#D1D0DB] px-6 sm:px-8 py-5 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCloseModal}
              className="cursor-pointer w-full sm:w-auto px-8 h-11 rounded-[23px] border-[1.5px] border-[#292B38] bg-white hover:bg-[#F8F7FA] text-sm font-bold text-[#292B38]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer w-full sm:w-[296px] h-11 rounded-3xl border-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/45 to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all text-sm font-bold text-[#292B38] flex items-center justify-center"
            >
              Save Custom Exercise ✓
            </button>
          </div>
        </form>
      </div>

      {/* Validation Error Toast */}
      {showValidationToast && (
        <RequiredFieldsValidationWarning
          onClose={() => setShowValidationToast(false)}
        />
      )}
    </>
  );
}