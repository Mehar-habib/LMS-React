import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useGetPurchasedCoursesQuery } from "../../features/api/purchaseApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

const Dashboard = () => {
  const { data, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) return <DashboardSkeleton />;
  if (isError) return <ErrorState />;

  const { purchasedCourses } = data || [];

  const courseData = purchasedCourses.map((course) => ({
    name:
      course.courseId.courseTitle.length > 15
        ? course.courseId.courseTitle.substring(0, 15) + "..."
        : course.courseId.courseTitle,
    fullName: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
  }));

  const totalRevenue = purchasedCourses.reduce(
    (acc, item) => acc + (item.amount || 0),
    0
  );
  const totalSales = purchasedCourses.length;
  const averageRevenue =
    totalSales > 0 ? (totalRevenue / totalSales).toFixed(2) : 0;

  const courseDistribution = purchasedCourses.reduce((acc, course) => {
    const existing = acc.find(
      (item) => item.name === course.courseId.courseTitle
    );
    if (existing) existing.value += 1;
    else acc.push({ name: course.courseId.courseTitle, value: 1 });
    return acc;
  }, []);

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-md">
          <p className="font-semibold text-gray-900">
            {payload[0].payload.fullName}
          </p>
          <p className="text-sm text-gray-600">
            Price:{" "}
            <span className="font-semibold text-green-600">
              ${payload[0].value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Analytics and insights for your courses
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Sales"
          value={totalSales}
          icon="📈"
          color="blue"
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon="💰"
          color="green"
        />
        <StatCard
          title="Average Sale"
          value={`$${averageRevenue}`}
          icon="📊"
          color="purple"
        />
        <StatCard
          title="Courses Sold"
          value={courseDistribution.length}
          icon="🎓"
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Course Prices */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
            <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
              <span className="mr-2">💹</span>Course Prices Analytics
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Price distribution across courses
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", r: 4 }}
                  activeDot={{ r: 6, fill: "#1D4ED8" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales Distribution */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
              <span className="mr-2">🥧</span>Sales Distribution
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">Course sales breakdown</p>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseDistribution.slice(0, 6)}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {courseDistribution.slice(0, 6).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} sales`, "Sales"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  };
  return (
    <Card className="shadow-lg border-0 overflow-hidden group hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div
          className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <span className="text-white text-lg">{icon}</span>
        </div>
      </CardContent>
    </Card>
  );
};

// Loading Skeleton
const DashboardSkeleton = () => (
  <div className="min-h-screen bg-gray-50 p-6 space-y-6">
    <Skeleton className="h-8 w-64 mb-2" />
    <Skeleton className="h-4 w-96 mb-6" />
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="shadow-lg border-0 p-6">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-8 w-20 mb-2" />
          <Skeleton className="h-3 w-24" />
        </Card>
      ))}
    </div>
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i} className="shadow-lg border-0 p-6">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-64 w-full" />
        </Card>
      ))}
    </div>
  </div>
);

// Error State
const ErrorState = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <Card className="shadow-lg border-0 max-w-md text-center">
      <CardContent className="p-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-red-600 text-2xl">⚠️</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Failed to Load Data
        </h3>
        <p className="text-gray-600 mb-4">
          We couldn't retrieve dashboard data. Please check your connection and
          try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </CardContent>
    </Card>
  </div>
);

export default Dashboard;
