import React from "react";

// Toast Sukses (EXERCISE_SAVED.EXE)
export function ExerciseSavedSuccessToast({ exerciseName, onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] w-[376px] max-w-[calc(100vw-2rem)] rounded-[10px] border-2 border-[#292B38] bg-[#EEF8FD] shadow-[4px_4px_0_0_#292B38] overflow-hidden font-dMSans">
      <div className="h-9 px-3.5 border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#A9DDF4]/40 to-[#A9DDF4] flex items-center justify-between">
        <span className="text-[#292B38] text-[11px] font-bold tracking-wide">
          EXERCISE_SAVED.EXE
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="cursor-pointer w-5 h-5 rounded-[3px] border border-[#292B38] bg-white hover:bg-[#F8F7FA] flex items-center justify-center"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M1.25 1.25L8.75 8.75M8.75 1.25L1.25 8.75"
              strokeWidth="2.2"
              stroke="#292B38"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </div>

      <div className="p-4 flex items-start gap-3.5">
        <div className="w-[42px] h-[42px] shrink-0 rounded-[7px] border-[1.5px] border-[#292B38] bg-white flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M1 10H5V14H9V10H13V6H17V2H22V10H17V14H13V18H9V22H5V18H1V10Z"
              fill="#292B38"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[#292B38] text-sm leading-snug">
            Custom exercise{" "}
            <span className="font-bold">
              '{exerciseName || "Incline Cable Fly"}'
            </span>{" "}
            added to your library!
          </p>
          <p className="text-[#292B38] text-[9px] font-bold tracking-wider uppercase mt-3">
            LIBRARY UPDATED
          </p>
        </div>
      </div>
    </div>
  );
}

// Toast Peringatan Validasi (VALIDATION_ERROR.EXE)
export function RequiredFieldsValidationWarning({ onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] w-[376px] max-w-[calc(100vw-2rem)] rounded-[10px] border-2 border-[#292B38] bg-[#FCEBF4] shadow-[4px_4px_0_0_#292B38] overflow-hidden font-dMSans">
      <div className="h-9 px-3.5 border-b-2 border-[#292B38] bg-gradient-to-b from-white via-[#F5B9D7]/40 to-[#F5B9D7] flex items-center justify-between">
        <span className="text-[#292B38] text-[11px] font-bold tracking-wide">
          VALIDATION_ERROR.EXE
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close warning"
          className="cursor-pointer w-5 h-5 rounded-[3px] border border-[#292B38] bg-white hover:bg-[#F8F7FA] flex items-center justify-center"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M1.25 1.25L8.75 8.75M8.75 1.25L1.25 8.75"
              strokeWidth="2.2"
              stroke="#292B38"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </div>

      <div className="p-4 flex items-start gap-3.5">
        <div className="w-[42px] h-[42px] shrink-0 rounded-[7px] border-[1.5px] border-[#292B38] bg-white flex items-center justify-center relative">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M9 0H13V4H16V9H19V14H22V22H0V14H3V9H6V4H9V0Z"
              fill="#292B38"
            />
          </svg>
          <svg
            width="4"
            height="14"
            viewBox="0 0 4 14"
            fill="none"
            className="absolute top-[14px]"
          >
            <path d="M0 0H4V8H0V0ZM0 11H4V14H0V11Z" fill="white" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[#292B38] text-sm leading-snug">
            Please enter an exercise name, muscle group, and equipment before
            saving.
          </p>
          <p className="text-[#292B38] text-[9px] font-bold tracking-wider uppercase mt-3">
            REQUIRED FIELDS MISSING
          </p>
        </div>
      </div>
    </div>
  );
}

export function ZearaToastContainer() {
  return null;
}