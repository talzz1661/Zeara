import React from "react";

export default function ZearaFinishConfirmation({
  isOpen = true,
  completedSets = 12,
  totalSets = 15,
  onKeepTraining,
  onConfirmFinish,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#292B38]/40 backdrop-blur-[2px] p-4">
      <div className="rounded-xl border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] w-[420px] h-[328px] relative overflow-hidden">
        {/* Titlebar */}
        <div className="bg-gradient-to-b from-[#F5B9D7] via-white to-[#F5B9D7] w-full h-10 absolute left-0 top-0 overflow-hidden">
          <div className="bg-[#292B38] w-full h-0.5 absolute left-0 top-[38px]" />
          <p className="text-[#292B38] font-dMSans text-xs font-bold absolute left-4 top-3">
            FINISH_CONFIRM.EXE
          </p>
          <button
            type="button"
            onClick={onKeepTraining}
            aria-label="Close confirmation modal"
            className="flex p-1 justify-center items-center rounded-[3px] border-2 border-[#292B38] bg-[#FFF] hover:bg-[#F8F7FA] w-[22px] h-[22px] absolute right-3.5 top-[9px] cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3.5 3.5L7 7M7 7L10.5 10.5M7 7L10.5 3.5M7 7L3.5 10.5"
                strokeWidth="1.8"
                stroke="#292B38"
              />
            </svg>
          </button>
        </div>

        {/* Flag Icon Box */}
        <div className="flex justify-center items-center rounded-md border-2 border-[#292B38] bg-[#F5B9D7] w-[42px] h-[42px] absolute left-6 top-16">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 22V13M5 13V3H19L16 8L19 13H5Z"
              strokeWidth="1.8"
              stroke="#292B38"
            />
          </svg>
        </div>

        {/* Title & Set Summary */}
        <h2 className="text-[#292B38] font-spaceGrotesk text-[28px] font-medium leading-tight absolute left-6 top-[124px]">
          Finish workout?
        </h2>
        <p className="text-[#292B38] font-dMSans text-[17px] font-bold absolute left-6 top-[165px]">
          {completedSets}/{totalSets} sets done.
        </p>
        <p className="text-[#797B8E] font-dMSans text-sm absolute left-6 top-[198px]">
          Your completed sets will be saved.
        </p>

        {/* Action Buttons */}
        <button
          type="button"
          onClick={onKeepTraining}
          className="flex items-center justify-center rounded-md border-2 border-[#292B38] bg-[#FFF] hover:bg-[#F8F7FA] active:translate-x-[1px] active:translate-y-[1px] w-[174px] h-12 absolute left-6 top-64 cursor-pointer"
        >
          <span className="text-[#292B38] font-dMSans text-[13px] font-bold">
            Keep Training
          </span>
        </button>

        <button
          type="button"
          onClick={onConfirmFinish}
          className="flex items-center justify-center rounded-md border-2 border-[#292B38] bg-gradient-to-b from-[#F5B9D7] via-white to-[#F5B9D7] hover:brightness-95 active:translate-x-[1px] active:translate-y-[1px] w-[186px] h-12 absolute left-[210px] top-64 cursor-pointer"
        >
          <span className="text-[#292B38] font-dMSans text-[13px] font-bold">
            Finish &amp; Save
          </span>
        </button>
      </div>
    </div>
  );
}