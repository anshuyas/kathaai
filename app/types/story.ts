export type StoryStatus = "generated" | "pending_approval" | "approved" | "rejected";

export interface Scene {
  sceneNo: number;
  text: string;
  visualPrompt: string;
  emotion: string;
  audioNarration: string;
  imageUrl: string;
}

export interface Story {
  _id: string;
  title: string;
  userId: string;
  heroName?: string;
  heroImage?: string;
  heroVoice?: string;
  language: string;        // "English" | "Nepali"
  ageGroup: string;         // "5-9 years" | "10-14 years" | "15-18 years"
  storyLength?: string;
  genre: string;            // "Adventure" | "Fantasy" | "Science" | "Festival" | "Funny" | "Moral" | "Historical" | "Comic"
  learningGoal?: string;
  scenes: Scene[];
  coverImage: string;
  videoUrl?: string;
  status: StoryStatus;
  approvedAt?: string;
  downloadCount: number;
  createdAt: string;
}