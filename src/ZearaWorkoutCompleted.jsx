import React from "react";
import { useNavigate } from "react-router-dom";

export default function ZearaWorkoutCompleted({
  isOpen = true,
  workoutTitle = "Upper A",
  durationText = "48 min",
  totalVolumeText = "4,150 kg",
  prExerciseName = "BENCH PRESS",
  prDeltaText = "+2.5 kg",
  onClose,
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoHistory = () => {
    if (onClose) onClose();
    navigate("/history");
  };

  const handleGoDashboard = () => {
    if (onClose) onClose();
    navigate("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#292B38]/40 backdrop-blur-[2px] p-4">
      <div className="rounded-xl border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] w-[420px] h-[516px] relative overflow-hidden">
        {/* Titlebar */}
        <div className="bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] w-full h-10 absolute left-0 top-0 overflow-hidden">
          <div className="bg-[#292B38] w-full h-0.5 absolute left-0 top-[38px]" />
          <p className="text-[#292B38] font-dMSans text-xs font-bold absolute left-4 top-3">
            WORKOUT_COMPLETED.EXE
          </p>
          <button
            type="button"
            onClick={handleGoDashboard}
            aria-label="Close summary modal"
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

        {/* Pixel Check Badge */}
        <div className="flex p-2.5 justify-center items-center rounded-md border-2 border-[#292B38] bg-[#A9DDF4] w-12 h-12 absolute left-6 top-16">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M4.6665 14.0001H9.33317V18.6667H13.9998V14.0001H18.6665V9.33341H23.3332V4.66675H18.6665V9.33341H13.9998V14.0001H9.33317V9.33341H4.6665V14.0001Z"
              fill="#292B38"
            />
          </svg>
        </div>

        <p className="text-[#797B8E] font-dMSans text-[10px] font-bold tracking-wider absolute left-[86px] top-[72px]">
          SESSION SAVED
        </p>
        <p className="text-[#292B38] font-spaceGrotesk text-sm font-medium absolute left-[86px] top-[91px]">
          Every set counts.
        </p>

        <h2 className="text-[#292B38] font-spaceGrotesk text-[28px] font-medium leading-tight absolute left-6 top-[137px]">
          Workout complete!
        </h2>
        <p className="text-[#797B8E] font-dMSans text-sm absolute left-6 top-[178px]">
          {workoutTitle} is in the books. Nice work.
        </p>

        {/* Duration & Volume Stat Cards */}
        <div className="rounded-md border-2 border-[#292B38] bg-[#F8F7FA] w-[180px] h-[86px] absolute left-6 top-[218px] overflow-hidden">
          <p className="text-[#797B8E] font-dMSans text-[10px] font-bold absolute left-3.5 top-3.5">
            DURATION
          </p>
          <p className="text-[#292B38] font-spaceGrotesk text-[26px] font-medium leading-tight absolute left-3.5 top-[35px]">
            {durationText}
          </p>
        </div>

        <div className="rounded-md border-2 border-[#292B38] bg-[#F8F7FA] w-[180px] h-[86px] absolute left-[216px] top-[218px] overflow-hidden">
          <p className="text-[#797B8E] font-dMSans text-[10px] font-bold absolute left-3.5 top-3.5">
            TOTAL VOLUME
          </p>
          <p className="text-[#292B38] font-spaceGrotesk text-[26px] font-medium leading-tight absolute left-3.5 top-[35px]">
            {totalVolumeText}
          </p>
        </div>

        {/* New PR Banner */}
        <div className="rounded-md border-2 border-[#292B38] bg-[#E9DDF4] w-[372px] h-[52px] absolute left-6 top-[322px] overflow-hidden">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            className="w-[22px] h-[22px] absolute left-[15px] top-[15px]"
          >
            <path
              d="M11.0002 1.83325L13.7502 7.33325L20.1668 8.24992L15.5835 12.8333L16.5002 19.2499L11.0002 16.4999L5.50016 19.2499L6.41683 12.8333L1.8335 8.24992L8.25016 7.33325L11.0002 1.83325Z"
              strokeWidth="1.8"
              stroke="#292B38"
            />
          </svg>
          <p className="text-[#292B38] font-dMSans text-[10px] font-bold absolute left-[49px] top-3">
            NEW {prExerciseName} PR
          </p>
          <p className="text-[#797B8E] font-dMSans text-[10px] absolute left-[49px] top-[29px]">
            A little stronger than last time.
          </p>
          <div className="flex items-center justify-center rounded border-2 border-[#292B38] bg-[#FFF] px-2.5 h-7 absolute right-3 top-3">
            <span className="text-[#292B38] font-spaceGrotesk text-[13px] font-bold">
              {prDeltaText}
            </span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          type="button"
          onClick={handleGoHistory}
          className="flex items-center justify-center rounded-md border-2 border-[#292B38] bg-[#FFF] hover:bg-[#F8F7FA] active:translate-x-[1px] active:translate-y-[1px] w-[372px] h-11 absolute left-6 top-[392px] cursor-pointer"
        >
          <span className="text-[#292B38] font-dMSans text-[13px] font-bold">
            View Workout History
          </span>
        </button>

        <button
          type="button"
          onClick={handleGoDashboard}
          className="flex items-center justify-center gap-2.5 rounded-md border-2 border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] hover:brightness-95 active:translate-x-[1px] active:translate-y-[1px] w-[372px] h-11 absolute left-6 top-[448px] cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12.6668 8.00008H3.3335M6.66683 11.3334L3.3335 8.00008L6.66683 4.66675"
              strokeWidth="1.8"
              stroke="#292B38"
            />
          </svg>
          <span className="text-[#292B38] font-dMSans text-[13px] font-bold">
            Back to Dashboard
          </span>
        </button>
      </div>
    </div>
  );
}