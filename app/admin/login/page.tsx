"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("adminToken", data.token);
      router.push("/admin/users");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF9EB]">
      <div className="w-full max-w-md rounded-[28px] border border-[#E3CDBB] bg-white p-10 shadow-xl">
        <h1 className="text-center text-3xl font-black text-[#9A4D00]">
          कथाAI
        </h1>
        <p className="mt-2 text-center text-[#7B7269]">Admin Login</p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#594D43]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@kathaai.com"
              className="h-12 w-full rounded-xl border border-[#E3CDBB] bg-[#FFF9EB] px-4 outline-none focus:border-[#B76800]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#594D43]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="h-12 w-full rounded-xl border border-[#E3CDBB] bg-[#FFF9EB] px-4 outline-none focus:border-[#B76800]"
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-red-600">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-2 h-12 w-full rounded-xl bg-[#A65200] font-semibold text-white transition hover:bg-[#8C4500] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </main>
  );
}