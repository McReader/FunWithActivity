export interface Recommendation {
  id: string;
  userId: string;
  source: string;
  title: string;
  details: string;
  priority: number;
}

export async function fetchRecommendations() {
  const response = await fetch(`${process.env.API_URL}/recommendations`).then((res) => res.json());
  const recommendations: Recommendation[] = response.recommendations ?? [];
  return recommendations.sort((a, b) => b.priority - a.priority);
}

export interface UserStats {
  weight: number; // in kg
  height: number; // in cm
}

export async function fetchUserStats() {
  const response: UserStats = await fetch(`${process.env.API_URL}/user-stats`).then((res) => res.json());
  return response;
}
