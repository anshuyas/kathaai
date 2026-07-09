"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useSignup } from "@/app/context/SignupContext";

export default function SignupSecurityPage() {
  const { signupData, setSignupData } = useSignup();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  const [touched, setTouched] = useState(false);

  const isPasswordValid = signupData.password.length >= 8;
  const doPasswordsMatch =
    signupData.password === confirmPassword;

  const showMismatchError =
    touched &&
    confirmPassword.length > 0 &&
    !doPasswordsMatch;

  const showLengthError =
    touched &&
    signupData.password.length > 0 &&
    !isPasswordValid;

  return (
    <div className="w-[450px] h-[500px] rounded-3xl border-2 border-[#DDD5C8] bg-[#FAF9F8] p-9 shadow-md">
      {/* Stepper (same as yours) */}
      <div className="mb-6">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-4 right-4 top-1/2 h-[2px] -translate-y-1/2 bg-[#D8D2CA]" />
          <div className="absolute left-4 top-1/2 h-[2px] w-[180px] -translate-y-1/2 bg-[#F28A3B]" />

          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F28A3B] text-sm font-bold text-white"
            >
              {n}
            </div>
          ))}
        </div>

        <div className="mt-3 flex justify-between text-[11px] text-[#7C7166]">
          <span>ROLE</span>
          <span>INFO</span>
          <span>SECURITY</span>
        </div>
      </div>

      <h2 className="mb-8 text-[30px] font-bold text-[#A65200]">
        Secure your journey
      </h2>

      {/* FORM */}
      <div className="space-y-5">
        {/* PASSWORD */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#5C5147]">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={signupData.password}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  password: e.target.value,
                })
              }
              onBlur={() => setTouched(true)}
              placeholder="••••••••"
              className="h-12 w-full rounded-xl border border-[#D9B9A7] bg-[#FFF9F1] px-4 pr-12 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {showLengthError && (
            <p className="text-red-500 text-sm mt-1">
              Password must be at least 8 characters
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#5C5147]">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setTouched(true);
              }}
              placeholder="••••••••"
              className="h-12 w-full rounded-xl border border-[#D9B9A7] bg-[#FFF9F1] px-4 pr-12 outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {showMismatchError && (
            <p className="text-red-500 text-sm mt-1">
              Passwords do not match
            </p>
          )}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-10 flex items-center justify-between">
        <Link
          href="/signup/info"
          className="h-12 w-12 flex items-center justify-center rounded-xl"
        >
          <ArrowLeft size={20} />
        </Link>

        <Link
          href={
            isPasswordValid && doPasswordsMatch
              ? "/signup/success"
              : "#"
          }
          className="flex h-12 w-[190px] items-center justify-center rounded-xl bg-[#A65200] font-semibold text-white transition hover:bg-[#8e4700]">
          Create My Account
        </Link>
      </div>
    </div>
  );
}