import StepsChart from "@/app/StepsChart";

import { fetchRecommendations, fetchUserStats } from "@/app/api";


const FitnessDashboard: React.FC = async () => {
  const recommendations = await fetchRecommendations();
  const userStats = await fetchUserStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">
          FunWithActivity
        </h1>
        <p className="mt-2 text-lg text-gray-600">Your personalized health overview</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Health Metrics Section */}
        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200 lg:col-span-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Health Metrics</h2>
          {userStats ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                <span className="text-lg font-medium text-blue-700">Weight:</span>
                <span className="text-xl font-bold text-blue-900">{userStats.weight} kg</span>
              </div>
              <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                <span className="text-lg font-medium text-blue-700">Height:</span>
                <span className="text-xl font-bold text-blue-900">{userStats.height} cm</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">No health information available.</p>
          )}
        </section>

        {/* Steps Chart Section */}
        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200 lg:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Daily Steps Progress</h2>
          <div className="h-80 w-full">
            <StepsChart />
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200 lg:col-span-3">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Health Recommendations</h2>
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-green-800 mb-1">{rec.title}</h3>
                  <p className="text-gray-700 text-sm">{rec.details}</p>
                  <p className="text-xs text-gray-500 mt-2">Source: {rec.source} | Priority: {rec.priority}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">No recommendations available at this time.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default FitnessDashboard;
