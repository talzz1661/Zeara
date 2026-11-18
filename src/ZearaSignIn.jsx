import React, { useState } from "react";

export default function ZearaSignIn({
  onSuccess,
  onSwitchToSignUp,
  onForgotPassword,
}) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password) {
      setErrorMsg("Please enter your email address and password.");
      return;
    }
    setErrorMsg("");
    // TODO (Ken): Sambungkan ke state auth / redirect ke Dashboard
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
      <header className="w-full bg-white border-b border-[#CDD2DE] px-6 sm:px-12 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand Logo + Sparkle + Tagline */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2.5">
              <span className="font-bodoniModa text-[48px] sm:text-[56px] font-bold leading-none tracking-tight text-[#292B38]">
                Zeara
              </span>
              {/* Layered Y2K Sparkle Emblem */}
              <div className="relative w-10 h-11 shrink-0">
                <svg
                  width="40"
                  height="44"
                  viewBox="0 0 40 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-10 absolute left-0.5 top-0.5"
                >
                  <path
                    d="M20 2L25 16L38 22L25 27L20 42L15 27L2 22L15 17L20 2Z"
                    fill="#E9DDF4"
                    stroke="#292B38"
                    strokeWidth="2"
                  />
                </svg>
                <svg
                  width="24"
                  height="28"
                  viewBox="0 0 24 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-7 absolute left-2 top-2"
                >
                  <path
                    d="M12 0L13 12L24 14L13 15L12 28L10 16L0 14L10 12L12 0Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <p className="text-[#777987] text-[11px] mt-1">
              Plan. Track. Analyze.
            </p>
          </div>

          {/* Center Retro Address Bar */}
          <div className="flex items-center gap-2 rounded-[7px] border-2 border-[#292B38] bg-[#E9E8F0] shadow-[2px_2px_0_0_#292B38] px-2 py-1.5 w-full max-w-[372px]">
            {/* Pixel Cursor Icon */}
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-5 shrink-0"
            >
              <path d="M2 1L15 13H9L12 19L8 20L5 14L2 18V1Z" fill="#292B38" />
            </svg>
            <div className="flex-1 bg-white border border-[#CDD2DE] px-2.5 py-1 flex items-center">
              <span className="text-[#292B38] text-[11px] font-bold tracking-tight">
                zeara://member-login
              </span>
            </div>
          </div>

          {/* Spacer untuk menyeimbangkan posisi tengah Address Bar di desktop */}
          <div className="hidden lg:block w-[180px]" />
        </div>
      </header>

      {/* 2. MAIN LOGIN WINDOW */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-[960px] rounded-[18px] border-2 border-[#292B38] bg-white shadow-[4px_4px_0_0_#292B38] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT PANEL: 01 / YOUR SPACE, RECONNECTED (5 cols ~ 420px) */}
          <aside className="lg:col-span-5 bg-gradient-to-b from-[#E9DDF4] to-[#A9DDF4] border-b-2 lg:border-b-0 lg:border-r border-[#292B38] flex flex-col justify-between">
            {/* Sub-window Title Bar */}
            <div className="h-[41px] px-5 border-b border-[#292B38] bg-gradient-to-b from-[#E9DDF4] via-white to-[#E9DDF4] flex items-center">
              <span className="text-[#292B38] text-[11px] font-bold tracking-wide">
                01 / YOUR SPACE, RECONNECTED
              </span>
            </div>

            {/* Content Area */}
            <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between relative">
              {/* Top Sparkle Accent */}
              <div className="w-9 h-10 absolute right-7 top-8 pointer-events-none">
                <svg
                  width="36"
                  height="40"
                  viewBox="0 0 36 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-9 absolute left-0.5 top-0.5"
                >
                  <path
                    d="M18 1.81824L22.5 14.5455L34.2001 20.0001L22.5 24.5455L18 38.1819L13.5 24.5455L1.80005 20.0001L13.5 15.4546L18 1.81824Z"
                    fill="#E9DDF4"
                    stroke="#292B38"
                    strokeWidth="2"
                  />
                </svg>
                <svg
                  width="22"
                  height="26"
                  viewBox="0 0 22 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[22px] h-[25px] absolute left-[7px] top-[7px]"
                >
                  <path
                    d="M10.8 0L11.7 10.9091L21.6 12.7273L11.7 13.6364L10.8 25.4545L9 14.5455L0 12.7273L9 10.9091L10.8 0Z"
                    fill="white"
                  />
                </svg>
              </div>

              <div>
                <p className="text-[#292B38] text-[10px] font-bold tracking-wider uppercase">
                  YOUR FITNESS, IN FOCUS
                </p>

                <h1 className="font-spaceGrotesk text-[36px] sm:text-[40px] font-medium leading-[48px] text-[#292B38] mt-4 pr-6">
                  Welcome back to your space.
                </h1>

                <p className="text-[#292B38] text-sm leading-[23px] mt-5 max-w-[330px]">
                  Your routines, workout logs, and personal records are ready.
                </p>

                {/* Feature Checklist */}
                <ul className="mt-7 space-y-3.5">
                  {[
                    "Your routines, ready.",
                    "Your workouts, logged.",
                    "Your progress, all here.",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3.5">
                      <span className="w-[25px] h-[25px] rounded border border-[#292B38] bg-white flex items-center justify-center shrink-0">
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 8H6V12H10V8H14V4H10V8H6V12H2V8Z"
                            fill="#292B38"
                          />
                        </svg>
                      </span>
                      <span className="text-[#292B38] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mini Popup Window: streak_status.exe + Pixel Diamond */}
              <div className="mt-10 relative pt-4">
                {/* Floating Pixel Diamond */}
                <div className="w-10 h-10 absolute -right-2 -top-2 z-10 pointer-events-none">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[38px] h-[38px] absolute left-px top-px"
                  >
                    <path
                      d="M16.1905 0.952393H23.8095V8.57144H27.6191V12.381H31.4286V16.1905H39.0476V23.8095H31.4286V27.6191H27.6191V31.4286H23.8095V39.0476H16.1905V31.4286H12.381V27.6191H8.57144V23.8095H0.952393V16.1905H8.57144V12.381H12.381V8.57144H16.1905V0.952393Z"
                      fill="#F5B9D7"
                      stroke="#292B38"
                      strokeWidth="2"
                    />
                  </svg>
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[11px] h-3 absolute left-2.5 top-[5px]"
                  >
                    <path
                      d="M7.61905 0H11.4286V8.57143H7.61905V12.381H0V8.57143H3.80952V4.76191H7.61905V0Z"
                      fill="white"
                    />
                  </svg>
                </div>

                {/* Retro Dialog Card */}
                <div className="rounded-[5px] border-2 border-[#292B38] bg-[#E9DDF4] shadow-[4px_4px_0_0_#292B38] p-1">
                  <div className="rounded-[3px] border border-[#292B38] bg-gradient-to-b from-[#E9E8F0] via-white to-[#E9E8F0] px-2.5 py-1 flex items-center">
                    <span className="text-[#292B38] text-[10px] font-bold">
                      ✦ streak_status.exe
                    </span>
                  </div>

                  <div className="p-4">
                    <p className="font-spaceGrotesk text-xl font-medium text-[#292B38] leading-snug">
                      Daily Check-In · Ready
                    </p>
                    <p className="text-[#292B38] text-[13px] mt-1">
                      Log in to pick up right where you left off.
                    </p>
                    <button
                      type="button"
                      className="cursor-pointer mt-4 w-full py-2 rounded-2xl border-[1.5px] border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] hover:brightness-105 transition-all text-[#292B38] text-[9px] font-bold tracking-wider uppercase"
                    >
                      KEEP YOUR MOMENTUM
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT PANEL: MEMBER_LOGIN.EXE FORM (7 cols ~ 540px) */}
          <section className="lg:col-span-7 bg-white flex flex-col">
            {/* Baby Blue Retro Title Bar */}
            <div className="h-[41px] px-5 border-b border-[#292B38] bg-gradient-to-b from-[#A9DDF4] via-white to-[#A9DDF4] flex items-center justify-between">
              <span className="text-[#292B38] text-[11px] font-bold tracking-wide">
                MEMBER_LOGIN.EXE
              </span>
              <div className="flex items-center gap-1.5">
                {["−", "□", "×"].map((ctrl) => (
                  <button
                    key={ctrl}
                    type="button"
                    aria-label={`Window control ${ctrl}`}
                    className="cursor-pointer w-[19px] h-[19px] rounded-sm border border-[#292B38] bg-white hover:bg-[#F8F7FA] flex items-center justify-center text-[#292B38] text-[12px] font-medium leading-none"
                  >
                    {ctrl}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Body */}
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 flex-1 flex flex-col justify-center"
            >
              <div className="w-full max-w-[460px] mx-auto">
                <h2 className="font-spaceGrotesk text-3xl font-medium text-[#292B38] leading-tight">
                  Sign in to Zeara
                </h2>
                <p className="text-[#777987] text-sm mt-1">
                  Your next personal best is waiting.
                </p>

                <div className="mt-8 space-y-5">
                  {/* Email Address */}
                  <div>
                    <label className="block text-[#292B38] text-[13px] font-bold leading-[18px] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full h-[46px] px-3.5 rounded-md border-[1.5px] border-[#292B38] bg-white text-[#292B38] placeholder:text-[#777987] text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B9D7]"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-[#292B38] text-[13px] font-bold leading-[18px] mb-2">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        className="w-full h-[46px] pl-3.5 pr-11 rounded-md border-[1.5px] border-[#292B38] bg-white text-[#292B38] placeholder:text-[#777987] text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B9D7]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                        className="cursor-pointer absolute right-3.5 text-[#292B38] hover:opacity-70"
                      >
                        <svg
                          width="19"
                          height="11"
                          viewBox="0 0 19 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.815918 5.08337C4.14925 -0.749959 14.1493 -0.749959 17.4826 5.08337C14.1493 10.9167 4.14925 10.9167 0.815918 5.08337Z"
                            stroke="#292B38"
                            strokeWidth="1.41667"
                          />
                          <circle
                            cx="9.149"
                            cy="5.083"
                            r="2.5"
                            stroke="#292B38"
                            strokeWidth="1.41667"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between gap-4 pt-0.5">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={form.rememberMe}
                        onChange={(e) =>
                          setForm({ ...form, rememberMe: e.target.checked })
                        }
                        className="w-[17px] h-[17px] rounded-sm border-[1.5px] border-[#292B38] accent-[#292B38] cursor-pointer"
                      />
                      <span className="text-[#292B38] text-[13px]">
                        Remember me
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => onForgotPassword && onForgotPassword()}
                      className="cursor-pointer text-[#292B38] text-[13px] font-bold hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {errorMsg && (
                    <p className="text-xs font-semibold text-[#B42318] bg-[#FEE4E2] border border-[#292B38] rounded-md px-3 py-2">
                      {errorMsg}
                    </p>
                  )}

                  {/* Sign In CTA */}
                  <button
                    type="submit"
                    className="cursor-pointer mt-2 w-full h-[50px] rounded-[26px] border-2 border-[#292B38] bg-gradient-to-b from-[#F5B9D7] via-white to-[#F5B9D7] shadow-[4px_4px_0_0_#292B38] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#292B38] transition-all text-[#292B38] font-spaceGrotesk text-base font-bold flex items-center justify-center"
                  >
                    Sign In →
                  </button>
                </div>

                {/* Footer Create Account Link */}
                <p className="text-center text-[#292B38] text-[13px] mt-8">
                  New to Zeara?{" "}
                  <button
                    type="button"
                    onClick={() => onSwitchToSignUp && onSwitchToSignUp()}
                    className="cursor-pointer font-bold underline hover:opacity-75"
                  >
                    Create an account
                  </button>
                </p>
              </div>
            </form>
          </section>
        </div>
      </main>

      {/* 3. BOTTOM STATUS BAR */}
      <footer className="w-full bg-[#F8F7FA] border-t border-[#CDD2DE] px-6 sm:px-12 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[#777987] text-[9px] tracking-wide">
          <span>ZEARA OS / V. 2.0 · SECURE AUTHENTICATION</span>
          <span>A LITTLE PROGRESS, EVERY DAY.</span>
        </div>
      </footer>
    </div>
  );
}