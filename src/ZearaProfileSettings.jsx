import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_PROFILE = {
  fullName: "Alex Morgan",
  email: "alex.morgan@example.com",
  avatar: "/AlexMorganAvatar.png",
  heightMetric: "178",
  weightMetric: "74.5",
  fitnessGoal: "Hypertrophy & Strength",
  restTimer: "90 seconds",
  unitSystem: "metric", // "metric" | "imperial"
  googleFitConnected: true,
  appleHealthConnected: false,
};

const FITNESS_GOALS = [
  "Hypertrophy & Strength",
  "Fat Loss & Conditioning",
  "Athletic Performance",
  "General Health & Mobility",
];

const REST_TIMERS = [
  "30 seconds",
  "60 seconds",
  "90 seconds",
  "120 seconds",
  "180 seconds",
];

export default function ZearaProfileSettings() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [savedData, setSavedData] = useState(() => {
    try {
      const stored = localStorage.getItem("zeara_user_profile");
      return stored ? { ...INITIAL_PROFILE, ...JSON.parse(stored) } : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  const [formData, setFormData] = useState(savedData);
  const [toastMessage, setToastMessage] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const isDirty = JSON.stringify(formData) !== JSON.stringify(savedData);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Konversi tampilan Height & Weight berdasarkan Unit System
  const displayedHeight =
    formData.unitSystem === "metric"
      ? formData.heightMetric
      : formData.heightMetric
      ? (parseFloat(formData.heightMetric) / 2.54).toFixed(1)
      : "";

  const displayedWeight =
    formData.unitSystem === "metric"
      ? formData.weightMetric
      : formData.weightMetric
      ? (parseFloat(formData.weightMetric) * 2.20462).toFixed(1)
      : "";

  const handleHeightChange = (val) => {
    if (formData.unitSystem === "metric") {
      setFormData({ ...formData, heightMetric: val });
    } else {
      const cmVal = val ? (parseFloat(val) * 2.54).toFixed(0) : "";
      setFormData({ ...formData, heightMetric: cmVal });
    }
  };

  const handleWeightChange = (val) => {
    if (formData.unitSystem === "metric") {
      setFormData({ ...formData, weightMetric: val });
    } else {
      const kgVal = val ? (parseFloat(val) / 2.20462).toFixed(1) : "";
      setFormData({ ...formData, weightMetric: kgVal });
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      triggerToast("File size exceeds 5 MB limit.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, avatar: reader.result }));
      triggerToast("Photo updated. Click Save Changes to apply.");
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = () => {
    setSavedData(formData);
    try {
      localStorage.setItem("zeara_user_profile", JSON.stringify(formData));
    } catch {
      // ignore storage quota errors
    }
    triggerToast("Profile & settings saved.");
  };

  const handleCancelChanges = () => {
    setFormData(savedData);
    triggerToast("Changes discarded.");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwords.current || !passwords.next) {
      triggerToast("Please fill in all password fields.");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      triggerToast("New passwords do not match.");
      return;
    }
    setPasswords({ current: "", next: "", confirm: "" });
    setShowPasswordModal(false);
    triggerToast("Password updated successfully.");
  };

  return (
    <div className="bg-[#F8F7FA] min-w-screen min-h-screen overflow-x-auto relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-lg border-2 border-[#292B38] bg-[#292B38] px-4 py-2.5 shadow-[4px_4px_0_0_#A9DDF4]">
          <span className="h-2 w-2 rounded-full bg-[#A9DDF4]" />
          <p className="font-dMSans text-xs font-bold text-white">
            {toastMessage}
          </p>
        </div>
      )}

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

        {/* Progress Analytics */}
        <button
          onClick={() => navigate("/analytics")}
          className="w-52 h-11 absolute left-[17px] top-[408px] flex items-center pl-3.5 rounded-xl hover:bg-[#F8F7FA] cursor-pointer text-left"
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
          <span className="text-[#292B38] font-dMSans text-[13px]">
            Progress Analytics
          </span>
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

        {/* Active Profile Footer Card */}
        <div className="rounded-[9px] border-2 border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] w-52 h-[72px] absolute left-[17px] top-[952px] flex items-center px-3">
          <div className="rounded-md bg-[#F5B9D7] w-[38px] h-[38px] flex items-center justify-center border border-[#292B38] overflow-hidden shrink-0">
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
          <div className="ml-3 truncate">
            <p className="text-[#292B38] font-dMSans text-[13px] font-bold leading-tight truncate">
              {savedData.fullName}
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
            className="w-4 h-4 ml-auto shrink-0"
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

      {/* Top Header */}
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
              zeara://my-space/settings
            </p>
          </div>
        </div>

        <p className="text-[#7B7D90] font-dMSans text-[10px] font-bold absolute right-0 top-1">
          YOUR SPACE, YOUR PACE.
        </p>

        <h1 className="text-[#292B38] font-spaceGrotesk text-[34px] font-medium absolute left-0 top-7">
          Profile &amp; Settings
        </h1>
        <p className="text-[#7B7D90] font-dMSans text-[13px] absolute left-0 top-[77px]">
          Manage your profile, physical metrics, and preferences.
        </p>

        {/* Cancel & Save Changes Buttons */}
        <button
          onClick={handleCancelChanges}
          disabled={!isDirty}
          className={`text-nowrap inline-flex justify-center items-center rounded-[21px] border-2 border-[#292B38] bg-[#FFF] w-[98px] h-[42px] absolute left-[837px] top-[55px] font-dMSans text-[13px] font-bold transition-opacity ${
            isDirty
              ? "cursor-pointer hover:bg-[#F8F7FA] text-[#292B38]"
              : "opacity-50 cursor-not-allowed text-[#7B7D90]"
          }`}
        >
          Cancel
        </button>

        <button
          onClick={handleSaveChanges}
          className="cursor-pointer text-nowrap inline-flex justify-center items-center rounded-[21px] border-2 border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] w-[179px] h-[42px] absolute left-[951px] top-[55px] font-dMSans text-[13px] font-bold text-[#292B38] transition-all"
        >
          Save Changes ✓
        </button>
      </div>

      {/* Decorative Pixel Star Badge */}
      <div className="w-[34px] h-[34px] absolute left-[258px] top-[159px] z-20 pointer-events-none">
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

      {/* Left Window: 01 / USER_PROFILE.EXE */}
      <div className="rounded-[13px] border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] w-[466px] h-[792px] absolute left-[274px] top-[172px] overflow-hidden">
        {/* Titlebar */}
        <div className="bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] w-full h-[38px] border-b-2 border-[#292B38] flex items-center px-4 justify-between">
          <p className="text-[#292B38] font-dMSans text-[11px] font-bold">
            01 / USER_PROFILE.EXE
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

        <p className="text-[#292B38] font-spaceGrotesk text-xl font-medium absolute left-6 top-[62px]">
          Make yourself at home.
        </p>

        {/* Avatar & Upload */}
        <div className="rounded-[15px] border-2 border-[#292B38] shadow-[4px_4px_0_0_#292B38] w-24 h-24 absolute left-6 top-[108px] overflow-hidden bg-[#F5B9D7] flex items-center justify-center">
          <img
            src={formData.avatar}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="w-full h-full object-cover"
            alt={formData.fullName}
          />
        </div>

        <p className="text-[#292B38] font-spaceGrotesk text-xl font-medium absolute left-36 top-[110px] truncate max-w-[290px]">
          {formData.fullName || "Zeara Athlete"}
        </p>
        <p className="text-[#7B7D90] font-dMSans text-xs absolute left-36 top-[137px]">
          Personal account
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={handlePhotoUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer text-nowrap inline-flex justify-center items-center rounded-[17px] border-2 border-[#292B38] bg-[#FFF] hover:bg-[#F8F7FA] w-[133px] h-[34px] absolute left-36 top-[164px] font-dMSans text-[13px] font-bold text-[#292B38]"
        >
          Change Photo
        </button>

        <p className="text-[#7B7D90] font-dMSans text-[10px] absolute left-6 top-[218px]">
          JPG or PNG · Max 5 MB
        </p>

        {/* Full Name Input */}
        <label className="text-[#292B38] font-dMSans text-xs font-bold absolute left-6 top-[251px]">
          Full Name
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          className="rounded-md border-[1.5px] border-[#292B38] bg-[#FFF] focus:outline-none focus:ring-2 focus:ring-[#A9DDF4] w-[418px] h-12 px-3.5 text-[#292B38] font-dMSans text-sm absolute left-6 top-[275px]"
        />

        {/* Email Input */}
        <label className="text-[#292B38] font-dMSans text-xs font-bold absolute left-6 top-[343px]">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="rounded-md border-[1.5px] border-[#292B38] bg-[#FFF] focus:outline-none focus:ring-2 focus:ring-[#A9DDF4] w-[418px] h-12 px-3.5 text-[#292B38] font-dMSans text-sm absolute left-6 top-[367px]"
        />

        <div className="bg-[#D0D1DD] w-[418px] h-px absolute left-6 top-[440px]" />

        {/* Physical Metrics Section */}
        <p className="text-[#292B38] font-spaceGrotesk text-xl font-medium absolute left-6 top-[463px]">
          Physical Metrics
        </p>
        <p className="text-[#7B7D90] font-dMSans text-xs absolute left-6 top-[492px]">
          A starting point for your next chapter.
        </p>

        {/* Height Input */}
        <label className="text-[#292B38] font-dMSans text-xs font-bold absolute left-6 top-[531px]">
          Height
        </label>
        <div className="rounded-md border-[1.5px] border-[#292B38] bg-[#FFF] focus-within:ring-2 focus-within:ring-[#A9DDF4] w-[199px] h-12 absolute left-6 top-[555px] flex items-center px-3.5">
          <input
            type="number"
            step="0.1"
            value={displayedHeight}
            onChange={(e) => handleHeightChange(e.target.value)}
            className="w-full bg-transparent text-[#292B38] font-spaceGrotesk text-sm font-medium focus:outline-none"
          />
          <span className="text-[#7B7D90] font-dMSans text-xs font-medium ml-2">
            {formData.unitSystem === "metric" ? "cm" : "in"}
          </span>
        </div>

        {/* Weight Input */}
        <label className="text-[#292B38] font-dMSans text-xs font-bold absolute left-[243px] top-[531px]">
          Weight
        </label>
        <div className="rounded-md border-[1.5px] border-[#292B38] bg-[#FFF] focus-within:ring-2 focus-within:ring-[#A9DDF4] w-[199px] h-12 absolute left-[243px] top-[555px] flex items-center px-3.5">
          <input
            type="number"
            step="0.1"
            value={displayedWeight}
            onChange={(e) => handleWeightChange(e.target.value)}
            className="w-full bg-transparent text-[#292B38] font-spaceGrotesk text-sm font-medium focus:outline-none"
          />
          <span className="text-[#7B7D90] font-dMSans text-xs font-medium ml-2">
            {formData.unitSystem === "metric" ? "kg" : "lbs"}
          </span>
        </div>

        {/* Fitness Goal Dropdown */}
        <label className="text-[#292B38] font-dMSans text-xs font-bold absolute left-6 top-[627px]">
          Fitness Goal
        </label>
        <div className="w-[418px] h-12 absolute left-6 top-[651px]">
          <select
            value={formData.fitnessGoal}
            onChange={(e) =>
              setFormData({ ...formData, fitnessGoal: e.target.value })
            }
            className="w-full h-full appearance-none rounded-md border-[1.5px] border-[#292B38] bg-[#FFF] px-3.5 pr-10 text-[#292B38] font-dMSans text-sm focus:outline-none focus:ring-2 focus:ring-[#A9DDF4] cursor-pointer"
          >
            {FITNESS_GOALS.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="w-4 h-4 absolute right-3.5 top-4 pointer-events-none"
          >
            <path
              d="M4 6L8 10L12 6"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
        </div>

        <div className="flex items-center px-3.5 rounded-md bg-[#F8F7FA] w-[418px] h-10 absolute left-6 top-[727px]">
          <p className="text-[#7B7D90] font-dMSans text-[11px]">
            Only you can see your physical metrics.
          </p>
        </div>
      </div>

      {/* Right Window: 02 / APP_PREFERENCES.EXE */}
      <div className="rounded-[13px] border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] w-[644px] h-[792px] absolute left-[764px] top-[172px] overflow-hidden">
        {/* Titlebar */}
        <div className="bg-gradient-to-b from-[#F5B9D7] via-white to-[#F5B9D7] w-full h-[38px] border-b-2 border-[#292B38] flex items-center px-4 justify-between">
          <p className="text-[#292B38] font-dMSans text-[11px] font-bold">
            02 / APP_PREFERENCES.EXE
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

        <p className="text-[#292B38] font-spaceGrotesk text-xl font-medium absolute left-6 top-[62px]">
          Training Preferences
        </p>
        <p className="text-[#7B7D90] font-dMSans text-xs absolute left-6 top-[92px]">
          Small settings. A routine that feels like you.
        </p>

        {/* Default Rest Timer */}
        <p className="text-[#292B38] font-dMSans text-sm font-bold absolute left-6 top-[145px]">
          Default Rest Timer
        </p>
        <p className="text-[#7B7D90] font-dMSans text-xs absolute left-6 top-[170px]">
          A little breathing room between sets.
        </p>

        <div className="rounded-md border-[1.5px] border-[#292B38] bg-[#FFF] w-[279px] h-12 absolute left-[341px] top-[139px] flex items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="w-5 h-5 ml-3.5 shrink-0 pointer-events-none"
          >
            <path
              d="M7.27308 1.81818H10.0004M10.0004 1.81818H12.7276M10.0004 1.81818V4.54545M14.5458 4.54545L16.364 2.72727M10.0004 8.18182V12.7273L12.7276 13.6364M10.0004 5.45455C9.16467 5.45455 8.33717 5.61915 7.5651 5.93895C6.79302 6.25875 6.0915 6.72749 5.50058 7.31841C4.90967 7.90933 4.44092 8.61085 4.12112 9.38292C3.80132 10.155 3.63672 10.9825 3.63672 11.8182C3.63672 12.6539 3.80132 13.4814 4.12112 14.2534C4.44092 15.0255 4.90967 15.727 5.50058 16.318C6.0915 16.9089 6.79302 17.3776 7.5651 17.6974C8.33717 18.0172 9.16467 18.1818 10.0004 18.1818C10.836 18.1818 11.6635 18.0172 12.4356 17.6974C13.2077 17.3776 13.9092 16.9089 14.5001 16.318C15.091 15.727 15.5598 15.0255 15.8796 14.2534C16.1994 13.4814 16.364 12.6539 16.364 11.8182C16.364 10.9825 16.1994 10.155 15.8796 9.38292C15.5598 8.61085 15.091 7.90933 14.5001 7.31841C13.9092 6.72749 13.2077 6.25875 12.4356 5.93895C11.6635 5.61915 10.836 5.45455 10.0004 5.45455Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              stroke="#292B38"
            />
          </svg>
          <select
            value={formData.restTimer}
            onChange={(e) =>
              setFormData({ ...formData, restTimer: e.target.value })
            }
            className="w-full h-full appearance-none bg-transparent pl-3 pr-8 text-[#292B38] font-dMSans text-sm focus:outline-none cursor-pointer"
          >
            {REST_TIMERS.map((timer) => (
              <option key={timer} value={timer}>
                {timer}
              </option>
            ))}
          </select>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="w-4 h-4 absolute right-3.5 top-4 pointer-events-none"
          >
            <path
              d="M4 6L8 10L12 6"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292B38"
            />
          </svg>
        </div>

        <div className="bg-[#D0D1DD] w-[596px] h-px absolute left-6 top-[216px]" />

        {/* Unit System Toggle */}
        <p className="text-[#292B38] font-dMSans text-sm font-bold absolute left-6 top-[243px]">
          Unit System
        </p>
        <p className="text-[#7B7D90] font-dMSans text-xs absolute left-6 top-[269px]">
          Choose how your weights and measurements appear.
        </p>

        <div className="grid grid-cols-2 p-1 rounded-3xl border-[1.5px] border-[#D0D1DD] bg-[#F8F7FA] w-[596px] h-12 absolute left-6 top-[302px]">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, unitSystem: "metric" })}
            className={`cursor-pointer rounded-[20px] font-dMSans text-[13px] transition-all flex items-center justify-center ${
              formData.unitSystem === "metric"
                ? "border-[1.5px] border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] font-bold text-[#292B38]"
                : "font-medium text-[#7B7D90] hover:text-[#292B38]"
            }`}
          >
            Metric (kg/cm)
          </button>
          <button
            type="button"
            onClick={() =>
              setFormData({ ...formData, unitSystem: "imperial" })
            }
            className={`cursor-pointer rounded-[20px] font-dMSans text-[13px] transition-all flex items-center justify-center ${
              formData.unitSystem === "imperial"
                ? "border-[1.5px] border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] font-bold text-[#292B38]"
                : "font-medium text-[#7B7D90] hover:text-[#292B38]"
            }`}
          >
            Imperial (lbs/in)
          </button>
        </div>

        {/* Sub-window: 03 / CONNECTED_APPS.EXE */}
        <div className="rounded-[13px] border-2 border-[#292B38] bg-[#FFF] shadow-[4px_4px_0_0_#292B38] w-[596px] h-[230px] absolute left-6 top-[389px] overflow-hidden">
          <div className="bg-gradient-to-b from-[#E9DDF4] via-white to-[#E9DDF4] w-full h-[38px] border-b-2 border-[#292B38] flex items-center px-4 justify-between">
            <p className="text-[#292B38] font-dMSans text-[11px] font-bold">
              03 / CONNECTED_APPS.EXE
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

          {/* Google Fit Row */}
          <div className="flex items-center justify-between px-[18px] h-[86px] mt-1">
            <div className="flex items-center gap-3.5">
              <div className="flex p-2 justify-center items-center rounded-[10px] border border-[#D0D1DD] bg-[#FFF] w-[42px] h-[42px]">
                <div className="w-[26px] h-[26px] relative">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    className="w-[9px] h-[9px] absolute left-1 top-[13px]"
                  >
                    <path
                      d="M10.8214 10.8214L2 2"
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="#4285F4"
                    />
                  </svg>
                  <svg
                    width="15"
                    height="13"
                    viewBox="0 0 15 13"
                    fill="none"
                    className="w-[11px] h-2 absolute left-0.5 top-1"
                  >
                    <path
                      d="M3.85715 10.3571L2.92858 9.42858C2.25801 8.53449 1.93246 7.42853 2.01169 6.31374C2.09091 5.19894 2.5696 4.15013 3.35987 3.35987C4.15013 2.5696 5.19894 2.09091 6.31374 2.01169C7.42853 1.93246 8.53449 2.25801 9.42858 2.92858L12.6786 6.27144"
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="#34A853"
                    />
                  </svg>
                  <svg
                    width="15"
                    height="13"
                    viewBox="0 0 15 13"
                    fill="none"
                    className="w-[11px] h-2 absolute left-[13px] top-1"
                  >
                    <path
                      d="M2 6.27144L5.25 2.92858C6.14408 2.25801 7.25005 1.93246 8.36484 2.01169C9.47964 2.09091 10.5284 2.5696 11.3187 3.35987C12.109 4.15013 12.5877 5.19894 12.6669 6.31374C12.7461 7.42853 12.4206 8.53449 11.75 9.42858L10.8214 10.3571"
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="#FBBC04"
                    />
                  </svg>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    className="w-[9px] h-[9px] absolute left-[13px] top-[13px]"
                  >
                    <path
                      d="M10.8214 2L2 10.8214"
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="#EA4335"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-[#292B38] font-dMSans text-sm font-bold">
                  Google Fit
                </p>
                <p className="text-[#7B7D90] font-dMSans text-[11px]">
                  Activity and workout sync
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`font-dMSans text-[11px] font-medium ${
                  formData.googleFitConnected
                    ? "text-[#292B38]"
                    : "text-[#7B7D90]"
                }`}
              >
                {formData.googleFitConnected ? "Connected" : "Connect"}
              </span>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    googleFitConnected: !formData.googleFitConnected,
                  })
                }
                className={`w-12 h-[27px] rounded-[14px] border-[1.5px] border-[#292B38] relative transition-colors cursor-pointer ${
                  formData.googleFitConnected ? "bg-[#A9DDF4]" : "bg-[#E8E7ED]"
                }`}
              >
                <span
                  className={`w-[19px] h-[19px] rounded-full bg-white border border-[#292B38] absolute top-[2.5px] flex items-center justify-center transition-all ${
                    formData.googleFitConnected ? "left-[24px]" : "left-[3px]"
                  }`}
                >
                  {formData.googleFitConnected && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6L4.7 8.2L9.5 3.5"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#292B38"
                      />
                    </svg>
                  )}
                </span>
              </button>
            </div>
          </div>

          <div className="bg-[#D0D1DD] w-[560px] h-px mx-auto" />

          {/* Apple Health Row */}
          <div className="flex items-center justify-between px-[18px] h-[86px]">
            <div className="flex items-center gap-3.5">
              <div className="flex p-2 justify-center items-center rounded-[10px] border border-[#D0D1DD] bg-[#FFF] w-[42px] h-[42px]">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path
                    d="M13 22.2857L4.17859 13.5571C-2.7857 6.03572 7.24287 -0.928567 13 6.5C18.7572 -0.928567 28.7857 6.03572 21.8214 13.5571L13 22.2857Z"
                    fill="#F36B8A"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[#292B38] font-dMSans text-sm font-bold">
                  Apple Health
                </p>
                <p className="text-[#7B7D90] font-dMSans text-[11px]">
                  Bring your health data together
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`font-dMSans text-[11px] font-medium ${
                  formData.appleHealthConnected
                    ? "text-[#292B38]"
                    : "text-[#7B7D90]"
                }`}
              >
                {formData.appleHealthConnected ? "Connected" : "Connect"}
              </span>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    appleHealthConnected: !formData.appleHealthConnected,
                  })
                }
                className={`w-12 h-[27px] rounded-[14px] border-[1.5px] border-[#292B38] relative transition-colors cursor-pointer ${
                  formData.appleHealthConnected
                    ? "bg-[#A9DDF4]"
                    : "bg-[#E8E7ED]"
                }`}
              >
                <span
                  className={`w-[19px] h-[19px] rounded-full bg-white border border-[#292B38] absolute top-[2.5px] flex items-center justify-center transition-all ${
                    formData.appleHealthConnected
                      ? "left-[24px]"
                      : "left-[3px]"
                  }`}
                >
                  {formData.appleHealthConnected && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6L4.7 8.2L9.5 3.5"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="#292B38"
                      />
                    </svg>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#D0D1DD] w-[596px] h-px absolute left-6 top-[660px]" />

        {/* Account & Security */}
        <p className="text-[#292B38] font-spaceGrotesk text-base font-medium absolute left-6 top-[680px]">
          Account &amp; security
        </p>

        <button
          type="button"
          onClick={() => setShowPasswordModal(true)}
          className="cursor-pointer inline-flex items-center justify-center rounded-[20px] border-[1.5px] border-[#292B38] bg-[#FFF] hover:bg-[#F8F7FA] w-[186px] h-10 absolute left-6 top-[720px] font-dMSans text-[13px] font-bold text-[#292B38]"
        >
          Change Password
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="cursor-pointer text-nowrap inline-flex justify-center items-center rounded-[19px] border-[1.5px] border-[#292B38] bg-[#F5B9D7] hover:brightness-95 w-[95px] h-[38px] absolute left-[525px] top-[721px] font-dMSans text-[13px] font-bold text-[#292B38]"
        >
          Log Out
        </button>
      </div>

      {/* Bottom Footer */}
      <p className="text-[#7B7D90] font-dMSans text-[9px] font-bold absolute left-[274px] top-[1035px]">
        A LITTLE PROGRESS, EVERY DAY.
      </p>
      <p className="text-[#7B7D90] font-dMSans text-[9px] absolute left-[1183px] top-[1035px]">
        All systems go · Last synced just now
      </p>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-[#292B38]/40 flex items-center justify-center p-4">
          <div className="w-full max-w-[400px] rounded-[13px] border-2 border-[#292B38] bg-[#FFF] shadow-[6px_6px_0_0_#292B38] overflow-hidden">
            <div className="bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] h-[38px] border-b-2 border-[#292B38] px-4 flex items-center justify-between">
              <p className="font-dMSans text-[11px] font-bold text-[#292B38]">
                SECURITY_UPDATE.EXE
              </p>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="font-dMSans text-xs font-bold text-[#292B38] cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
              <h3 className="font-spaceGrotesk text-lg font-medium text-[#292B38]">
                Update Password
              </h3>
              <div>
                <label className="block font-dMSans text-xs font-bold text-[#292B38] mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords({ ...passwords, current: e.target.value })
                  }
                  className="w-full h-10 rounded-md border-[1.5px] border-[#292B38] px-3 text-sm font-dMSans focus:outline-none focus:ring-2 focus:ring-[#A9DDF4]"
                />
              </div>
              <div>
                <label className="block font-dMSans text-xs font-bold text-[#292B38] mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwords.next}
                  onChange={(e) =>
                    setPasswords({ ...passwords, next: e.target.value })
                  }
                  className="w-full h-10 rounded-md border-[1.5px] border-[#292B38] px-3 text-sm font-dMSans focus:outline-none focus:ring-2 focus:ring-[#A9DDF4]"
                />
              </div>
              <div>
                <label className="block font-dMSans text-xs font-bold text-[#292B38] mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                  className="w-full h-10 rounded-md border-[1.5px] border-[#292B38] px-3 text-sm font-dMSans focus:outline-none focus:ring-2 focus:ring-[#A9DDF4]"
                />
              </div>
              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-[18px] border-[1.5px] border-[#292B38] font-dMSans text-xs font-bold text-[#292B38] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-[18px] border-2 border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[2px_2px_0_0_#292B38] font-dMSans text-xs font-bold text-[#292B38] cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}