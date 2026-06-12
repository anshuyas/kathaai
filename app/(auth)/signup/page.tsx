"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap, School, Users } from "lucide-react";
import { useSignup } from "@/app/context/SignupContext";

export default function SignupRolePage() {
  const { signupData, setSignupData } = useSignup();

  return (
    <div className="w-[450px] h-[500px] rounded-3xl border-2 border-[#DDD5C8] bg-[#FAF9F8] p-9 shadow-md">
      
      {/* Stepper */}
      <div className="mb-10">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-4 right-4 top-1/2 h-[2px] -translate-y-1/2 bg-[#D8D2CA]" />
          <div className="absolute left-4 top-1/2 h-[2px] w-[90px] -translate-y-1/2 bg-[#F28A3B]" />

          <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F28A3B] text-sm font-bold text-white">
            1
          </div>

          <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#ECE7DE] text-sm font-bold text-[#7A7065]">
            2
          </div>

          <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#ECE7DE] text-sm font-bold text-[#7A7065]">
            3
          </div>
        </div>

        <div className="mt-3 flex justify-between text-[11px] tracking-wide text-[#7C7166]">
          <span>ROLE</span>
          <span>INFO</span>
          <span>SECURITY</span>
        </div>
      </div>

      {/* Title */}
      <h2 className="mb-8 text-[40px] font-bold text-[#A65200]">
        Choose your role
      </h2>

      {/* Role Cards */}
      <div className="grid grid-cols-3 gap-4">

        {/* STUDENT */}
        <button
          onClick={() =>
            setSignupData({ ...signupData, role: "student" })
          }
          className={`h-[120px] rounded-2xl border flex flex-col items-center justify-center transition ${
            signupData.role === "student"
              ? "border-[#A65200] bg-[#FFF5EB]"
              : "border-[#D9B9A7]"
          }`}
        >
          <GraduationCap size={34} className="mb-3 text-[#A65200]" />
          <span className="font-semibold text-[#2D241C]">Student</span>
        </button>

        {/* PARENT */}
        <button
          onClick={() =>
            setSignupData({ ...signupData, role: "parent" })
          }
          className={`h-[120px] rounded-2xl border flex flex-col items-center justify-center transition ${
            signupData.role === "parent"
              ? "border-[#A65200] bg-[#FFF5EB]"
              : "border-[#D9B9A7]"
          }`}
        >
          <Users size={34} className="mb-3 text-[#A65200]" />
          <span className="font-semibold text-[#2D241C]">Parent</span>
        </button>

        {/* TEACHER */}
        <button
          onClick={() =>
            setSignupData({ ...signupData, role: "teacher" })
          }
          className={`h-[120px] rounded-2xl border flex flex-col items-center justify-center transition ${
            signupData.role === "teacher"
              ? "border-[#A65200] bg-[#FFF5EB]"
              : "border-[#D9B9A7]"
          }`}
        >
          <School size={34} className="mb-3 text-[#A65200]" />
          <span className="font-semibold text-[#2D241C]">Teacher</span>
        </button>

      </div>

      {/* Next Button */}
      <div className="mt-10 flex justify-end">
        <Link
          href="/signup/info"
          className="flex h-12 w-[140px] items-center justify-center gap-2 rounded-xl bg-[#A65200] font-semibold text-white transition hover:bg-[#8e4700]"
        >
          Next Step
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}