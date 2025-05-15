import StepsChart from "@/app/StepsChart";

// Define interfaces for data structures
interface HealthInfo {
  weight: number; // in kg
  height: number; // in cm
}



interface Recommendation {
  id: string;
  userId: string;
  source: string;
  title: string;
  details: string;
  priority: number;
}

const healthInfo: HealthInfo = {
  weight: 75.2,
  height: 178,
};

const recommendations: Recommendation[] = [
  {
    "id": "34d8e3c8-ef8c-4f66-8957-a4e3385bc554",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "source": "serviceB",
    "title": "Time to stand up",
    "details": "Sitting lifestyle could affect your future health",
    "priority": 690
  },
  {
    "id": "03910d72-3302-4560-97d8-0d73fdd90667",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "source": "serviceB",
    "title": "Avoid sugar!",
    "details": "Carefully balance your sugar consumption due to high risk of heart complications",
    "priority": 823
  },
  {
    "id": "0f140489-b0fd-4c38-b97f-47cdf37c2fb8",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "source": "serviceB",
    "title": "Drink more still water",
    "details": "Try to consume at least 2 litres of water daily",
    "priority": 528
  },
  {
    "id": "bbde6045-a16c-4301-abea-ba77df1eb4de",
    "userId": "550e8400-a16c-4301-abea-ba77df1eb4de",
    "source": "serviceB",
    "title": "Go for a physical check up",
    "details": "Don't forget to visit your health provider for a check-up",
    "priority": 606
  },
  {
    "id": "4c677384-f532-4537-bd70-d30d6b70fd75",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "source": "serviceB",
    "title": "Avoid sugar!",
    "details": "Carefully balance your sugar consumption due to high risk of heart complications",
    "priority": 833
  },
  {
    "id": "8217937c-1f02-4bee-9b8a-ba7468743708",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "source": "serviceB",
    "title": "Exercise often!",
    "details": "Repeated physical exercise could help avoid future veins troubles",
    "priority": 438
  }
].sort((a, b) => b.priority - a.priority);

const FitnessDashboard: React.FC = () => {
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
          {healthInfo ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                <span className="text-lg font-medium text-blue-700">Weight:</span>
                <span className="text-xl font-bold text-blue-900">{healthInfo.weight} kg</span>
              </div>
              <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                <span className="text-lg font-medium text-blue-700">Height:</span>
                <span className="text-xl font-bold text-blue-900">{healthInfo.height} cm</span>
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
              {recommendations.map((rec) => (
                <div key={rec.id} className="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm">
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
