"use client";

import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import { useLanguage } from "@/app/context/LanguageContext";
import { translations } from "@/app/lib/translations";

interface SubjectPerformance {
  category: string;
  count: number;
}

interface RecentStory {
  title: string;
  genre: string;
  score: number;
}

interface Skills {
  reading: number;
  vocabulary: number;
  criticalThinking: number;
  creativity: number;
  listening: number;
}

interface WeeklyReportData {
  studentName: string;
  totalStories: number;
  subjectPerformance: SubjectPerformance[];
  recentStories: RecentStory[];
  skills: Skills;
  recommendations: string[];
  parentNote: string;
}

export default function WeeklyReport() {
  const { language } = useLanguage();
  const t = translations[language];
  const [report, setReport] =
    useState<WeeklyReportData | null>(null);

  const [loading, setLoading] = useState(true);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const payload = JSON.parse(
          atob(token.split(".")[1])
        );

        const res = await fetch(
          `http://localhost:5000/api/weekly-report/weekly/${payload.id}`
        );

        const data = await res.json();

        if (data.success) {
          setReport(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF8EE]">
        <h2 className="text-3xl font-bold">
{t.loadingWeeklyReport}
        </h2>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF8EE]">
        <h2 className="text-3xl font-bold">
          {t.noReportFound}
        </h2>
      </div>
    );
  }

  const maxCategory =
    Math.max(
      ...report.subjectPerformance.map(
        (s) => s.count
      )
    ) || 1;

    const DONUT_COLORS = ["#F28A3B", "#4CAF50", "#3B82F6", "#EF7F8F", "#9A4D00", "#B983FF", "#2E8B57", "#F5C97A"];

    const today = new Date();
const weekAgo = new Date();
weekAgo.setDate(today.getDate() - 6); // 7 days total, inclusive of today

const formatDate = (date: Date) =>
  date.toLocaleDateString(language === "np" ? "ne-NP" : "en-US", { month: "short", day: "numeric", year: "numeric" });

const dateRangeText = `${formatDate(weekAgo)} – ${formatDate(today)}`;

const downloadPDF = async () => {
  if (!reportRef.current) return;

  const dataUrl = await toPng(reportRef.current, {
    backgroundColor: "#FFF8EE",
    pixelRatio: 2,
  });

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const img = new Image();
  img.src = dataUrl;
  await new Promise((resolve) => (img.onload = resolve));

  const imgWidth = pageWidth;
  const imgHeight = (img.height * imgWidth) / img.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`${report?.studentName || "student"}-weekly-report.pdf`);
};

return (
  <main className="min-h-screen bg-[#FFF8EE] p-10">
    <div className="mx-auto max-w-7xl">

      <div className="mb-4 flex justify-end">
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 rounded-xl bg-[#B35A00] px-5 py-3 text-white shadow hover:bg-[#8C4500]"
        >
          <Download size={18} />
          {t.downloadPdf}
        </button>
      </div>

      <div ref={reportRef}>

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-black">{t.weeklyReportTitle}</h1>
          <p className="mt-3 text-xl text-[#666]">{t.studentProgressSummary}</p>
          <p className="mt-2 text-lg font-semibold text-[#A65200]">{dateRangeText}</p>
        </div>

        {/* Student Card — standalone */}
        <div className="overflow-hidden rounded-3xl bg-white shadow">
          <div className="bg-gradient-to-r from-[#F28A3B] to-[#F5C97A] p-8">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow-md">
                👧
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{report.studentName}</h2>
                <p className="text-white/80">{t.student}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center gap-4 rounded-2xl bg-[#FFF3E0] p-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F28A3B] text-white">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-[#9A8A78]">
                  {t.storiesReadLabel}
                </p>
                <h2 className="text-4xl font-black text-[#A65200]">
                  {report.totalStories}
                </h2>
              </div>
            </div>
          </div>
        </div>

      {/* Subject Performance + Skills Development — side by side */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">

        <div className="rounded-3xl bg-white p-8 shadow">
          <h2 className="mb-8 text-3xl font-black">{t.subjectWisePerformance}</h2>

          <div className="flex flex-col items-center gap-8 sm:flex-row">

            {/* Donut chart */}
            <div className="h-[260px] w-full sm:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={report.subjectPerformance}
                    dataKey="count"
                    nameKey="category"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                  >
                    {report.subjectPerformance.map((_, index) => (
                      <Cell
                        key={index}
                        fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Color legend */}
            <div className="w-full space-y-4 sm:w-1/2">
              {report.subjectPerformance.map((subject, index) => (
                <div key={subject.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: DONUT_COLORS[index % DONUT_COLORS.length] }}
                    />
                    <span className="font-semibold">{subject.category}</span>
                  </div>
                  <span className="text-[#777]">{subject.count}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow">
          <h2 className="mb-8 text-3xl font-black"> {t.skillsDevelopment}</h2>

          <div className="space-y-6">
            {[
               [t.reading, report.skills.reading],
              [t.vocabulary, report.skills.vocabulary],
              [t.criticalThinking, report.skills.criticalThinking],
              [t.creativity, report.skills.creativity],
              [t.listening, report.skills.listening],
            ].map(([name, value]) => (
              <div key={name as string}>
                <div className="mb-2 flex justify-between">
                  <span className="font-semibold">{name}</span>
                  <span>{value}%</span>
                </div>
                <div className="h-4 rounded-full bg-[#EEE]">
                  <div
                    className="h-4 rounded-full bg-[#F28A3B]"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recently Read Stories + Recommendations — side by side */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">

        <div className="rounded-3xl bg-white p-8 shadow">
          <h2 className="mb-8 text-3xl font-black">{t.recentlyReadStories}</h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">{t.storyCol}</th>
                <th className="text-left">{t.genreCol}</th>
                <th className="text-left">{t.quizScoreCol}</th>
              </tr>
            </thead>
            <tbody>
              {report.recentStories.map((story, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4">{story.title}</td>
                  <td>{story.genre}</td>
                  <td>{story.score}/10</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow">
          <h2 className="mb-6 text-3xl font-black">{t.personalizedRecommendations}</h2>

          <ul className="space-y-4">
            {report.recommendations.map((recommendation, index) => (
              <li
                key={index}
                className="flex items-start gap-3 rounded-2xl bg-[#FFF3E0] p-4"
              >
                <span className="text-2xl">💡</span>
                <p className="text-lg leading-7">{recommendation}</p>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Parent Note — full width, last */}
      <div className="mt-10 rounded-3xl bg-white p-8 shadow">
        <h2 className="mb-6 text-3xl font-black">{t.parentNoteTitle}</h2>

        <div className="rounded-2xl bg-[#EAF8EA] p-6">
          <p className="text-lg leading-8 text-[#444]">{report.parentNote}</p>
        </div>
      </div>
      </div>
      </div>

  </main>
);
}