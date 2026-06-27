export interface Progress {
  labels: string[];
  storiesRead: number[];
  quizzesTaken: number[];
}

export interface Student {
  name: string;
  points: number;
}

export interface Story {
  _id: string;
  title: string;
  heroName: string;
  genre: string;
  createdAt: string;
  published: boolean;
  coverImage?: string;

  scenes: {
    imageUrl?: string;
    text: string;
  }[];
}

export interface DashboardData {
  progress: Progress;

  leaderboard: Student[];

  approvals: {
    pending: Story[];
    approved: Story[];
    rejected: Story[];
  };
}