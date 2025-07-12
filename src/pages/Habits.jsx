import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import useUserStore from "../stores/userStore";
import { getHabits } from "../api/habitsApi"; // import API function

// สร้าง Component ย่อยๆ เพื่อความสะอาดของโค้ด
const WeeklySummary = ({ habits }) => {
  // Logic การคำนวณ Summary (ตัวอย่าง)
  const totalHabits = habits.length;
  const completedToday = habits.filter((h) => h.isCompletedToday).length; // สมมติว่ามีข้อมูลนี้จาก backend

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-gray-800">Weekly Summary</h2>
      <div className="mt-4 text-center">
        <div className="inline-block">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-indigo-600"
                strokeWidth="3"
                strokeDasharray="72, 100" // 72% example
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-800">72%</span>
            </div>
          </div>
        </div>
        <p className="mt-2 text-gray-600">Completion Rate</p>
      </div>
    </div>
  );
};

const HabitCard = ({ habit }) => {
  // Logic การแสดงผลวันในสัปดาห์ (ตัวอย่าง)
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-gray-100">
      <h3 className="font-bold text-gray-800">{habit.title}</h3>
      <p className="text-sm text-gray-500 mt-1">{habit.description}</p>
      <div className="flex justify-between items-center mt-4">
        {days.map((day, index) => (
          <button
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              index < 5
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-500" // สมมติว่าทำสำเร็จ 5 วัน
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

function Habits() {
  const { user } = useUserStore();
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setIsLoading(true);
        const response = await getHabits();
        setHabits(response.data);
      } catch (error) {
        toast.error("Failed to load habits.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabits();
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center">Loading your habits...</div>;
  }

  return (
    <div className="w-full min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.name}!
            </h1>
            <p className="text-gray-500">Let's make today productive.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700">
            <Plus size={20} />
            Add New Habit
          </button>
        </div>

        {/* Weekly Summary */}
        <WeeklySummary habits={habits} />

        {/* Habits List */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Today's Habits
          </h2>
          {habits.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {habits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">You haven't added any habits yet.</p>
              <p className="text-gray-500">
                Click "Add New Habit" to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Habits;
