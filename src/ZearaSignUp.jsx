import React, { useState } from "react";

export default function ZearaSignUp({ onSuccess, onSwitchToSignIn }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.password) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    if (form.password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (!form.agreed) {
      setErrorMsg("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    setErrorMsg("");
    // TODO (Ken): Sambungkan ke state user / redirect ke Dashboard
    if (onSuccess) onSuccess(form);
  };

  return (
    <div
      className="min-h-screen w-full bg-[#F8F7FA] text-[#292B38] font-dMSans flex flex-col justify-between selection:bg-[#E9DDF4]"
      style={{
        backgroundImage: `
          linear-gradient(to right, #D9EAF5 1px, transparent 1px),
          linear-gradient(to bottom, #D9EAF5 1px, transparent 1px)
        `,
        backgroundSize: "28px 28px",
      }}
    >
      {/* 1. MINIMAL RETRO HEADER */}
      <header className="w-full bg-white border-b border-[#D1D1DB] px-6 sm:px-12 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand Logo + Sparkle + Tagline */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2.5">
              <span className="font-bodoniModa text-[44px] sm:text-[52px] font-bold leading-none tracking-tight text-[#292B38]">
                Zeara
              </span>
              {/* Layered Y2K Sparkle Emblem */}
              <div className="relative w-[42px] h-[46px] shrink-0">
                <svg
                  width="42"
                  height="46"
                  viewBox="0 0 42 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-[39px] absolute left-[3px] top-[3px]"
                >
                  <path
                    d="M20.7856 3L25.7856 17L38.7856 22L25.7856 27L20.7856 42L15.7856 28L2.78564 23L15.7856 18L20.7856 3Z"
                    fill="#E9DDF4"
                    stroke="#292B38"
                    strokeWidth="2"
                  />
                </svg>
                <svg
                  width="26"
                  height="28"
                  viewBox="0 0 26 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[26px] h-7 absolute left-2 top-2"
                >
                  <path
                    d="M13 0L15 13L26 15L14 16L12 28L11 16L0 15L11 13L13 0Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <p className="text-[#777987] text-[11px] font-medium mt-1">
              Plan. Track. Analyze.
            </p>
          </div>

          {/* Center Retro Address Bar */}
          <div className="flex items-center gap-2 rounded-[7px] border-[1.5px] border-[#292B38] bg-[#E9E9F1] shadow-[2px_2px_0_0_#292B38] px-2 py-1.5 w-full max-w-[374px]">
            <div className="flex-1 border border-[#D1D1DB] bg-white px-2.5 py-1 flex items-center">
              <span className="text-[#292B38] text-[11px] font-bold tracking-tight">
                zeara://create-account
              </span>
            </div>
            {/* Pixel Cursor Icon */}
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-5 shrink-0"
            >
              <path d="M1 1L14 11L8 12L11 18L8 19L5 13L1 17V1Z" fill="#292B38" />
            </svg>
          </div>

          {/* Spacer untuk menyeimbangkan posisi tengah Address Bar di desktop */}
          <div className="hidden lg:block w-[180px]" />
        </div>
      </header>

      {/* 2. MAIN REGISTRATION WINDOW */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-[960px] rounded-[15px] border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT PANEL: 01 / YOUR NEXT CHAPTER (5 cols ~ 420px) */}
          <aside className="lg:col-span-5 bg-gradient-to-b from-[#E9DDF4] to-[#A9DDF4] border-b-2 lg:border-b-0 lg:border-r-2 border-[#292B38] flex flex-col justify-between">
            {/* Sub-window Title Bar */}
            <div className="h-10 px-5 border-b-2 border-[#292B38] bg-gradient-to-b from-[#E9DDF4] via-white to-[#E9DDF4] flex items-center">
              <span className="text-[#292B38] text-[11px] font-bold tracking-wide">
                01 / YOUR NEXT CHAPTER
              </span>
            </div>

            {/* Content Area */}
            <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between relative">
              {/* Top Sparkle Accent */}
              <svg
                width="38"
                height="42"
                viewBox="0 0 38 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[38px] h-[42px] absolute right-7 top-8 pointer-events-none"
              >
                <path
                  d="M19 2L23 16L36 21L23 25L19 40L15 26L2 21L15 17L19 2Z"
                  fill="white"
                  stroke="#292B38"
                  strokeWidth="2"
                />
              </svg>

              <div>
                <p className="text-[#292B38] text-[10px] font-bold tracking-wider uppercase">
                  YOUR FITNESS, IN FOCUS
                </p>

                <h1 className="font-spaceGrotesk text-[38px] sm:text-[42px] font-medium leading-[48px] text-[#292B38] mt-4 pr-6">
                  Start your fitness journey.
                </h1>

                <p className="text-[#292B38] text-sm leading-[23px] mt-5 max-w-[240px]">
                  A little stronger. A little more you. Make room for progress,
                  every day.
                </p>

                {/* Feature Checklist */}
                <ul className="mt-7 space-y-3.5">
                  {[
                    "Build custom routines",
                    "Log sets & weights fast",
                    "Track PRs & weekly volume",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3.5">
                      <span className="w-[26px] h-[26px] rounded-[5px] border border-[#292B38] bg-white flex items-center justify-center shrink-0">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 9H7V13H11V9H15V5H19V9H15V13H11V17H7V13H3V9Z"
                            fill="#292B38"
                          />
                        </svg>
                      </span>
                      <span className="text-[#292B38] text-sm font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mini Popup Window: daily_reminder.exe + Pixel Heart */}
              <div className="mt-10 relative pt-4">
                {/* Floating Pixel Heart */}
                <div className="w-12 h-11 absolute -right-2 -top-2 z-10 pointer-events-none">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 absolute left-1 top-0.5"
                  >
                    <path
                      d="M0 5H5V0H15V5H25V0H35V5H40V20H35V25H30V30H25V35H20V40H15V35H10V30H5V25H0V5Z"
                      fill="#292B38"
                    />
                  </svg>
                  <svg
                    width="36"
                    height="34"
                    viewBox="0 0 36 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-9 h-[34px] absolute left-1.5 top-1"
                  >
                    <path
                      d="M0 5H5V0H11V5H25V0H31V5H36V16H31V21H26V26H21V31H18V34H15V29H10V24H5V19H0V5Z"
                      fill="#F5B9D7"
                    />
                  </svg>
                  <svg
                    width="5"
                    height="5"
                    viewBox="0 0 5 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[5px] h-[5px] absolute left-[11px] top-2.5"
                  >
                    <path d="M0 0H5V5H0V0Z" fill="white" />
                  </svg>
                </div>

                {/* Retro Dialog Card */}
                <div className="rounded-md border-2 border-[#292B38] bg-[#E9DDF4] shadow-[4px_4px_0_0_#292B38] p-1">
                  <div className="rounded-sm border border-[#292B38] bg-gradient-to-b from-[#D8D8E5] via-white to-[#D8D8E5] px-2.5 py-1 flex items-center">
                    <span className="text-[#292B38] text-[10px] font-bold">
                      ✦ daily_reminder.exe
                    </span>
                  </div>

                  <div className="p-4">
                    <p className="font-spaceGrotesk text-[22px] font-medium text-[#292B38] leading-snug">
                      A little, often.
                    </p>
                    <p className="text-[#292B38] text-[13px] mt-1">
                      Your future self is cheering you on.
                    </p>
                    <button
                      type="button"
                      className="cursor-pointer mt-4 w-full py-2 rounded-2xl border-[1.5px] border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] hover:brightness-105 transition-all text-[#292B38] text-[9px] font-bold tracking-wider uppercase"
                    >
                      KEEP SHOWING UP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT PANEL: NEW_USER_SETUP.EXE FORM (7 cols ~ 540px) */}
          <section className="lg:col-span-7 bg-white flex flex-col">
            {/* Pink Retro Title Bar */}
            <div className="h-10 px-5 border-b-2 border-[#292B38] bg-gradient-to-b from-[#F5B9D7] via-white to-[#F5B9D7] flex items-center justify-between">
              <span className="text-[#292B38] text-[11px] font-bold tracking-wide">
                NEW_USER_SETUP.EXE
              </span>
              <div className="flex items-center gap-1.5">
                {["−", "□", "×"].map((ctrl) => (
                  <button
                    key={ctrl}
                    type="button"
                    aria-label={`Window control ${ctrl}`}
                    className="cursor-pointer w-5 h-5 rounded-[3px] border border-[#292B38] bg-white hover:bg-[#F8F7FA] flex items-center justify-center text-[#292B38] text-[13px] font-medium leading-none"
                  >
                    {ctrl}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 flex-1 flex flex-col">
              <h2 className="font-spaceGrotesk text-[29px] font-medium text-[#292B38] leading-tight">
                Create your account
              </h2>
              <p className="text-[#777987] text-sm mt-1">
                Your next personal best starts here.
              </p>

              <div className="mt-6 space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[#292B38] text-[13px] font-bold mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    className="w-full h-[47px] px-4 rounded-[7px] border-[1.5px] border-[#292B38] bg-white text-[#292B38] placeholder:text-[#777987] text-sm focus:outline-none focus:ring-2 focus:ring-[#A9DDF4]"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[#292B38] text-[13px] font-bold mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full h-[47px] px-4 rounded-[7px] border-[1.5px] border-[#292B38] bg-white text-[#292B38] placeholder:text-[#777987] text-sm focus:outline-none focus:ring-2 focus:ring-[#A9DDF4]"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[#292B38] text-[13px] font-bold mb-1.5">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      className="w-full h-[47px] pl-4 pr-11 rounded-[7px] border-[1.5px] border-[#292B38] bg-white text-[#292B38] placeholder:text-[#777987] text-sm focus:outline-none focus:ring-2 focus:ring-[#A9DDF4]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                      className="cursor-pointer absolute right-3.5 text-[#292B38] hover:opacity-70"
                    >
                      <svg
                        width="20"
                        height="12"
                        viewBox="0 0 20 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 6C3.6 0 15.8 0 18.4 6C15.8 12 3.6 12 1 6Z"
                          stroke="#292B38"
                          strokeWidth="1.4"
                        />
                        <circle
                          cx="9.7"
                          cy="6"
                          r="2.6"
                          stroke="#292B38"
                          strokeWidth="1.4"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-[#777987] text-[11px] leading-[14px] mt-1.5">
                    Must be at least 8 characters with 1 uppercase letter and 1
                    number.
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-[#292B38] text-[13px] font-bold mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={form.confirmPassword}
                      onChange={(e) =>
                        setForm({ ...form, confirmPassword: e.target.value })
                      }
                      className="w-full h-[47px] pl-4 pr-11 rounded-[7px] border-[1.5px] border-[#292B38] bg-white text-[#292B38] placeholder:text-[#777987] text-sm focus:outline-none focus:ring-2 focus:ring-[#A9DDF4]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      aria-label="Toggle confirm password visibility"
                      className="cursor-pointer absolute right-3.5 text-[#292B38] hover:opacity-70"
                    >
                      <svg
                        width="20"
                        height="12"
                        viewBox="0 0 20 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 6C3.6 0 15.8 0 18.4 6C15.8 12 3.6 12 1 6Z"
                          stroke="#292B38"
                          strokeWidth="1.4"
                        />
                        <circle
                          cx="9.7"
                          cy="6"
                          r="2.6"
                          stroke="#292B38"
                          strokeWidth="1.4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.agreed}
                    onChange={(e) =>
                      setForm({ ...form, agreed: e.target.checked })
                    }
                    className="w-[18px] h-[18px] rounded-[3px] border-[1.5px] border-[#292B38] accent-[#292B38] cursor-pointer"
                  />
                  <span className="text-[#292B38] text-xs">
                    I agree to the{" "}
                    <span className="underline">Terms of Service</span> and{" "}
                    <span className="underline">Privacy Policy</span>.
                  </span>
                </label>

                {errorMsg && (
                  <p className="text-xs font-semibold text-[#B42318] bg-[#FEE4E2] border border-[#292B38] rounded-md px-3 py-2">
                    {errorMsg}
                  </p>
                )}

                {/* Create Account CTA */}
                <button
                  type="submit"
                  className="cursor-pointer mt-2 w-full h-[50px] rounded-[25px] border-2 border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] shadow-[4px_4px_0_0_#292B38] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all text-[#292B38] text-[15px] font-bold flex items-center justify-center"
                >
                  Create Account →
                </button>
              </div>

              {/* Footer Sign In Link */}
              <p className="text-center text-[#292B38] text-[13px] mt-6">
                Already a member?{" "}
                <button
                  type="button"
                  onClick={() => onSwitchToSignIn && onSwitchToSignIn()}
                  className="cursor-pointer font-bold underline hover:opacity-75"
                >
                  Sign In
                </button>
              </p>
            </form>
          </section>
        </div>
      </main>

      {/* 3. BOTTOM STATUS BAR */}
      <footer className="w-full bg-[#F8F7FA] border-t border-[#D1D1DB] px-6 sm:px-12 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[#777987] text-[10px] font-medium tracking-wide">
          <span>ZEARA OS / V. 2.0 · SECURE REGISTRATION</span>
          <span>A LITTLE PROGRESS, EVERY DAY.</span>
        </div>
      </footer>
    </div>
  );
}