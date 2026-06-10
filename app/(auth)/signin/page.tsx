"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, Rocket } from "lucide-react";

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);

  return (
<main className="min-h-screen bg-[#FFF9EB] flex items-center justify-center">
        
      {/* Main Login Card */}
<div className="absolute inset-[6%] flex overflow-hidden rounded-sm bg-[#FFF9EB] shadow-[0_15px_40px_rgba(0,0,0,0.15)]">  
          {/* Left Panel */}
        <div className="flex w-[50%] flex-col items-center justify-center bg-[#f4d9cb]">
          <Image
            src="/images/logokatha.png"
            alt="KathaAI"
            width={340}
            height={340}
            className="object-contain"
          />

          <p className="mt-8 max-w-[340px] text-center text-[20px] font-medium leading-relaxed text-[#87430d]">
            Transform your ideas into beautiful animated stories in seconds.
          </p>
        </div>

        {/* Right Panel */}
        <div className="flex flex-1 flex-col pt-10 px-25">
          <h1 className="text-[35px] text-center font-bold leading-none text-[#232323]">
            Welcome back, Explorer!
          </h1>

          <p className="mt-4 text-[20px] text-center text-[#645e57]">
            Sign in to continue your story adventure.
          </p>

          {/* Email */}
          <div className="mt-8">
            <label className="mb-1 block text-[18px] font-semibold text-[#5e4c3c]">
              Email or Username
            </label>

            <div className="flex h-[66px] items-center rounded-xl border border-[#d4b9a8] bg-transparent px-4">
              <Mail
                size={20}
                className="mr-4 text-[#8f7b69]"
              />

              <input
                type="text"
                placeholder="Enter your email"
                className="w-full bg-transparent text-[18px] outline-none placeholder:text-[#c7b8a9]"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <label className="text-[18px] font-semibold text-[#5e4c3c]">
                Password
              </label>

              <button className="text-[12px] font-semibold text-[#b65b0d]">
                Forgot Password?
              </button>
            </div>

            <div className="flex h-[66px] items-center rounded-xl border border-[#d4b9a8] px-4">
              <Lock
                size={20}
                className="mr-4 text-[#8f7b69]"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-transparent text-[18px] outline-none placeholder:text-[#c7b8a9]"
                />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer text-[#8f7b69]"
                >
                {showPassword ? (
                    <EyeOff size={22} />
                ) : (
                    <Eye size={22} />
                )}
                </button>
            </div>
          </div>

          {/* Button */}
          <button className="mt-8 flex h-[68px] items-center justify-center gap-3 rounded-xl bg-[#a94e00] text-[20px] font-medium text-white transition hover:bg-[#974700]">
            Start Exploring
            <Rocket size={22} />
          </button>

          {/* Signup */}
          <p className="mt-11 text-center text-[20px] text-[#5c534a]">
            New to KathaAI?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#b65b0d]"
            >
              Create an account
            </Link>
          </p>

          {/* Footer */}
          <p className="mt-10 text-center text-[13px] uppercase tracking-[0.25em] text-[#a89e93]">
            Proudly Crafted in Nepal
          </p>

        </div>
      </div>
    </main>
  );
}