import Image from "next/image";
import Link from "next/link";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen overflow-hidden bg-[#FFF9EB] flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-[#ece4d5] flex items-center justify-between px-12">
        <Link href="/" className="text-[28px] font-bold text-[#3B1700]">
          कथाAI
        </Link>

        <Link
          href="/signin"
          className="text-sm font-semibold text-[#A65200]"
        >
          Sign In
        </Link>
      </header>

      {/* Main Content */}
      <section className="flex-1 flex items-center justify-center relative">
        {/* Background Diamond */}
        <div className="absolute w-[900px] h-[900px] rotate-45 bg-[#fcf7eb] opacity-70" />

        <div className="relative z-10 flex items-center gap-20">
          {/* Left Side */}
          <div className="flex flex-col items-center">
            <Image
              src="/images/logokatha.png"
              alt="KathaAI"
              width={340}
              height={340}
              priority
            />

            <p className="mt-4 max-w-[360px] text-center text-[18px] leading-relaxed text-[#65584C]">
              Step into a world of magic, wisdom,
              <br />
              and Nepali folklore powered by AI.
            </p>
          </div>

          {/* Right Side (dynamic content) */}
          {children}
        </div>
      </section>

      {/* Footer */}
      <footer className="pb-4 text-center text-[11px] uppercase tracking-[0.25em] text-[#B5AA9E]">
        Proudly Crafted in Nepal
      </footer>
    </main>
  );
}