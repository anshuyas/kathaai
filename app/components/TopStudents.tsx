"use client";

const students = [
  {
    name: "Aarav",
    stories: 18,
    quizzes: 15,
  },
  {
    name: "Sita",
    stories: 16,
    quizzes: 14,
  },
  {
    name: "Ram",
    stories: 15,
    quizzes: 13,
  },
];

export default function TopStudents() {
  return (
    <div className="rounded-[32px] bg-[#F9F3E8] p-8 shadow-sm">

      <h2 className="mb-8 text-3xl font-black">
        Top Students
      </h2>

      <div className="space-y-5">

        {students.map((student, index) => (

          <div
            key={index}
            className="flex items-center justify-between rounded-2xl bg-white p-5"
          >

            <div>

              <h3 className="font-bold">
                {student.name}
              </h3>

              <p className="text-sm text-gray-500">
                {student.stories} stories read
              </p>

            </div>

            <div className="rounded-full bg-[#FFE7C6] px-4 py-2 font-bold">
              ⭐ {student.quizzes}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}