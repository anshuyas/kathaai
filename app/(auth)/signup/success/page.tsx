"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/lib/api";
import { useSignup } from "@/app/context/SignupContext";

export default function SignupSuccessPage() {
  const router = useRouter();
  const { signupData } = useSignup();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  // safety redirect if data missing
  useEffect(() => {
    if (!signupData?.email || !signupData?.password) {
      router.push("/signup");
    }
  }, [signupData, router]);

  const handleRegister = async () => {
    if (registered) return; // prevent double click

    setLoading(true);
    setError("");

    try {
      const res = await registerUser(signupData);

      if (!res.success) {
        setError(res.message || "Signup failed");
        return;
      }

      setRegistered(true);

      // optional: store token if backend returns later
      // localStorage.setItem("token", res.token);

      // go to dashboard after success
      router.push("/dashboard");

    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[430px] rounded-3xl border-2 border-[#DDD5C8] bg-[#FAF9F8] p-9 shadow-md flex flex-col items-center justify-center text-center min-h-[420px]">

      <h2 className="text-[40px] font-bold text-[#2E7D32]">
        Welcome Aboard!
      </h2>

      <p className="mt-4 max-w-[280px] text-[#65584C] leading-relaxed">
        Your KathaAI journey starts now.
        <br />
        Get ready for amazing stories.
      </p>

      {error && (
        <p className="mt-4 text-red-500 text-sm">
          {error}
        </p>
      )}

      <button
        onClick={handleRegister}
        disabled={loading || registered}
        className="mt-10 flex h-12 w-[180px] items-center justify-center rounded-xl bg-[#2E7D32] font-semibold text-white transition hover:bg-[#25682A] disabled:opacity-60"
      >
        {loading
          ? "Creating Account..."
          : registered
          ? "Created!"
          : "Enter the library"}
      </button>
    </div>
  );
}