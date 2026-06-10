import Link from "next/link";

export default function SignupSuccessPage() {
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

      <Link
        href="/dashboard"
        className="mt-10 flex h-12 w-[180px] items-center justify-center rounded-xl bg-[#2E7D32] font-semibold text-white transition hover:bg-[#25682A]"
      >
        Enter the library
      </Link>
    </div>
  );
}