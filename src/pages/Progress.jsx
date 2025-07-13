import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { toast } from "react-toastify";
import { getHabitById } from "../api/habitsApi";
import { ArrowLeft, CheckCircle } from "lucide-react";

function Progress() {
  const { id } = useParams(); // ดึง id จาก URL
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        setLoading(true);
        const response = await getHabitById(id);
        setHabit(response.data);
      } catch (error) {
        toast.error("Could not load habit details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHabit();
  }, [id]); // ให้ re-fetch ทุกครั้งที่ id เปลี่ยน

  const handleMarkAsDone = () => {
    // TODO: เชื่อมต่อ API สำหรับบันทึกความสำเร็จ
    toast.success(`Great job on completing "${habit.title}" today!`);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading habit...</div>;
  }

  if (!habit) {
    return <div className="p-8 text-center">Habit not found.</div>;
  }

  return (
    <div className="w-full min-h-screen p-4 sm:p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link
          to="/habits"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to all habits
        </Link>

        {/* Habit Details Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900">{habit.title}</h1>
          <p className="text-gray-600 mt-2">{habit.description}</p>
          <div className="mt-4 py-2 px-4 bg-indigo-50 text-indigo-700 rounded-lg inline-block">
            <p className="font-semibold">
              Weekly Goal: {habit.weeklyGoal} days
            </p>
          </div>

          <div className="mt-8 border-t pt-6">
            <button
              onClick={handleMarkAsDone}
              className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition-all transform hover:scale-105"
            >
              <CheckCircle size={22} />
              Mark as Done for Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
