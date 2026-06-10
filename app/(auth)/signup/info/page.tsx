"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function SignupInfoPage() {
  return (
    <div className="w-[450px] h-[500px] rounded-3xl border-2 border-[#DDD5C8] bg-[#FAF9F8] p-9 shadow-md">
      {/* Stepper */}
      <div className="mb-6">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-4 right-4 top-1/2 h-[2px] -translate-y-1/2 bg-[#D8D2CA]" />
          <div className="absolute left-4 top-1/2 h-[2px] w-[180px] -translate-y-1/2 bg-[#F28A3B]" />

          <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F28A3B] text-sm font-bold text-white">
            1
          </div>
          <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F28A3B] text-sm font-bold text-white">
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
        Tell us about you
      </h2>

      {/* Form */}
      <form className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#5C5147]">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your fullname"
            className="h-12 w-full rounded-xl border border-[#D9B9A7] bg-[#FFF9F1] px-4 text-[#2D241C] outline-none focus:border-[#A65200]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#5C5147]">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="h-12 w-full rounded-xl border border-[#D9B9A7] bg-[#FFF9F1] px-4 text-[#2D241C] outline-none focus:border-[#A65200]"
          />
        </div>
      </form>

      {/* Actions */}
      <div className="mt-10 flex items-center justify-between">
        <Link
          href="/signup"
          className="flex h-12 w-12 items-center justify-center rounded-xl text-[#F28A3B] hover:bg-[#FFF2E5]"
        >
          <ArrowLeft size={20} />
        </Link>

        <Link
          href="/signup/security"
          className="flex h-12 w-[160px] items-center justify-center gap-2 rounded-xl bg-[#A65200] font-semibold text-white transition hover:bg-[#8e4700]"
        >
          Next Step
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}