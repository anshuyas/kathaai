"use client";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Play,
  Sparkles,
  Mail,
  Globe,
  MessageSquare,
  Building2,
  Mountain,
  Landmark,
  Palette,
  SquarePen,
} from "lucide-react";
import LanguageDropdown from "../components/LanguageDropdown";

export default function LandingPage() {
  const { language } = useLanguage();
const t = translations[language];
  return (
    <main className="bg-[#FFF9EB] min-h-screen text-[#2D2D2D]">
      {/* NAVBAR */}
      <nav className="border-b border-[#ece4d2]">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <h1 className="text-3xl font-black text-[#9A4D00]">कथाAI</h1>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            <Link href="#" className="text-[#B76800]">
              {t.home}
            </Link>

            <Link href="/library">{t.library}</Link>
            <Link href="#">{t.create}</Link>
            <Link href="#">{t.myStories}</Link>
            <Link href="#">{t.dashboard}</Link>
          </div>

          <LanguageDropdown />
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-8 pt-20 pb-28">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="bg-[#B8F0C6] text-[#32804D] px-4 py-2 rounded-full text-xs font-bold tracking-wider">
              NAMASTE!
            </span>

            <h2 className="text-6xl font-black mt-8 leading-tight">
              Magic Stories in
              <br />
              <span className="text-[#B76800]">Every Heart</span>
            </h2>

            <p className="mt-8 text-xl leading-9 text-[#4F4F4F] max-w-xl">
              Discover the wonder of Nepali tales through interactive AI
              storytelling. Let your imagination soar from the peak of Everest
              to the vibrant streets of Kathmandu.
            </p>

            <Link 
            href="/signin"
            className="mt-10 inline-flex items-center justify-center gap-3
             w-64 h-16
             bg-[#A95700] hover:bg-[#8b4700]
             text-white font-semibold rounded-xl shadow-md"
>              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="bg-white p-3 rounded-[28px] shadow-xl">
              <Image
                src="/images/kid.png"
                alt=""
                width={420}
                height={520}
                className="rounded-[24px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STORYTELLING */}
      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="text-center">
          <h2 className="text-5xl font-black">
            The Magic of Storytelling
          </h2>

          <p className="text-[#666] mt-4 text-lg">
            Combining imagination with cutting-edge technology to turn every
            child into a storyteller and every lesson into an adventure.
          </p>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-6 mt-16">
          {/* AI STORYTELLER */}
          <div className="bg-[#F4F4F4] rounded-[30px] p-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FFDCC7] flex items-center justify-center">
                  🎧
                </div>

                <h3 className="text-4xl font-bold mt-6">
                  AI Storyteller
                </h3>

                <p className="text-[#666] mt-4">
                  Type a few words or use your voice. Watch as AI weaves a
                  custom story with characters that look just like you and
                  settings from your own neighborhood.
                </p>

                <ul className="space-y-3 mt-8 text-[#555]">
                  <li>✓ Voice-to-Video generation</li>
                  <li>✓ Personalized protagonists</li>
                </ul>
              </div>

              <div>
                <Image
                  src="/images/ai.png"
                  alt=""
                  width={320}
                  height={320}
                  className="rounded-3xl w-full"
                />
              </div>
            </div>
          </div>

          {/* QUIZ */}
          <div className="bg-[#B7F0B9] rounded-[30px] p-10">
            <SquarePen className="mb-8" />

            <h3 className="text-3xl font-bold">
              Learning & Quizzes
            </h3>

            <p className="mt-4 text-[#4f4f4f]">
              Every story ends with an interactive challenge. Earn points for
              correctly answering questions.
            </p>
          </div>
        </div>

        {/* CATEGORY SECTION */}
        <div className="bg-[#F8D6DB] rounded-[30px] p-10 mt-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl h-44 flex flex-col items-center justify-center">
                <Landmark className="text-pink-600" />
                <p className="font-semibold mt-3">Dashain Tales</p>
              </div>

              <div className="bg-white rounded-2xl h-44 flex flex-col items-center justify-center">
                <Mountain className="text-pink-600" />
                <p className="font-semibold mt-3">Mountain Myths</p>
              </div>

              <div className="bg-white rounded-2xl h-44 flex flex-col items-center justify-center">
                <Building2 className="text-pink-600" />
                <p className="font-semibold mt-3">Tharu Legends</p>
              </div>

              <div className="bg-white rounded-2xl h-44 flex flex-col items-center justify-center">
                <Palette className="text-pink-600" />
                <p className="font-semibold mt-3">Dhaka Arts</p>
              </div>
            </div>

            <div>
              <h3 className="text-5xl font-black">
                Stories for Every Spark
              </h3>

              <p className="mt-6 text-lg text-[#7b4f58] leading-8">
                KathaAI brings the full spectrum of Nepali life to your screen.
                From traditional folklore and mountain myths to modern city
                adventures and school-day fables.
              </p>

              <Link
              href="/signin"
              className="mt-8 inline-flex items-center justify-center gap-3
             w-64 h-16 bg-[#C2185B] text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2">
                Explore Library
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-5xl font-black">
              Start Your First Chapter
            </h2>

            <p className="mt-3 text-[#666]">
              Sample the magic of our most popular stories.
            </p>
          </div>

          <button className="text-[#B76800] font-semibold">
            View All Stories →
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          {/* CARD 1 */}
          <div className="bg-white rounded-[30px] overflow-hidden shadow-sm">
            <Image
              src="/images/kite.png"
              alt=""
              width={600}
              height={320}
              className="w-full h-[260px] object-cover"
            />

            <div className="p-8">
              <h3 className="text-4xl font-bold">
                The Brave Kite
              </h3>

              <p className="text-[#666] mt-4">
                Follow Changa as it navigates the winds of Kathmandu to deliver
                a special message.
              </p>

              <div className="flex justify-between mt-8 items-center">
                <div className="flex gap-2 items-center text-sm">
                  <BookOpen size={16} />
                  Story texts
                </div>

                <button className="w-12 h-12 rounded-full bg-[#A95700] text-white flex items-center justify-center">
                  <Play size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-[30px] overflow-hidden shadow-sm">
            <Image
              src="/images/yeti.png"
              alt=""
              width={600}
              height={320}
              className="w-full h-[260px] object-cover"
            />

            <div className="p-8">
              <h3 className="text-4xl font-bold">
                Yeti's Lost Bell
              </h3>

              <p className="text-[#666] mt-4">
                A gentle giant has lost his favorite bell in a snowstorm.
              </p>

              <div className="flex justify-between mt-8 items-center">
                <div className="flex gap-2 items-center text-sm">
                  <BookOpen size={16} />
                  Interactive Video
                </div>

                <button className="w-12 h-12 rounded-full bg-[#A95700] text-white flex items-center justify-center">
                  <Play size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="bg-[#FF8B3D] rounded-[40px] py-32 flex flex-col items-center text-center">
          <Sparkles size={40} />

          <h2 className="text-6xl text-[#7A3400] font-black mt-8 max-w-3xl">
            Ready to spark a lifetime of curiosity?
          </h2>

          <Link
           href="/signin"
          className="mt-12 inline-flex items-center justify-center gap-3
             w-64 h-16 bg-[#7A3400] text-white px-10 py-5 rounded-full font-semibold">
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-black text-[#A95700] text-2xl">
              कथाAI
            </h3>

            <p className="text-sm text-[#666] mt-4">
              Empowering children to connect with different stories through the
              lens of modern technology.
            </p>

            <div className="flex gap-4 mt-6">
              <Globe />
              <Mail />
              <MessageSquare />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Stories</h4>
            <ul className="space-y-3 text-[#666]">
              <li>Newest Fables</li>
              <li>Popular Tales</li>
              <li>Dashain Specials</li>
              <li>Thar Specials</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-3 text-[#666]">
              <li>For Teachers</li>
              <li>Parent Portal</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-[#666]">
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Support</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E5DDCE] mt-16 pt-8 flex justify-between text-sm text-[#777]">
          <p>© 2026 KathaAI. Made with love for every child.</p>

          <div className="flex gap-6">
            <span>Terms of Service</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </footer>
    </main>
  );
}