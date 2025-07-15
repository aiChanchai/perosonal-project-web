import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { toast } from "react-toastify";
import {
  getHabitById,
  getHabitEntries,
  createHabitEntry,
  deleteTodayHabitEntry, // 1. Import API ใหม่
} from "../api/habitsApi";
import { ArrowLeft, CheckCircle, RotateCcw } from "lucide-react"; // เปลี่ยน Icon

function Progress() {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [habitRes, entriesRes] = await Promise.all([
        getHabitById(id),
        getHabitEntries(id),
      ]);
      setHabit(habitRes.data);
      setEntries(entriesRes.data);
    } catch (error) {
      toast.error("Could not load habit details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // 2. ตรวจสอบว่าวันนี้ทำไปแล้วหรือยัง
  const isDoneToday = entries.some(
    (entry) => new Date(entry.date).toDateString() === new Date().toDateString()
  );

  // 3. รวมฟังก์ชัน Mark as Done และ Undo ไว้ด้วยกัน
  const handleToggleDone = async () => {
    try {
      if (isDoneToday) {
        // --- ถ้าทำไปแล้ว ให้ทำการ Undo ---
        await deleteTodayHabitEntry(id);
        toast.info("Mark for today has been removed.");
      } else {
        // --- ถ้ายังไม่ได้ทำ ให้ Mark as Done ---
        await createHabitEntry(id);
        toast.success(`YOU MADE IT!! 🔥🔥`);
      }
      fetchData(); // ดึงข้อมูลใหม่เพื่ออัปเดต UI
    } catch (error) {
      toast.error("Oops! Something went wrong.");
    }
  };

  const getWeekProgress = () => {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(
        today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
      )
    );
    startOfWeek.setHours(0, 0, 0, 0);

    const completedThisWeek = entries.filter(
      (entry) => new Date(entry.date) >= startOfWeek && entry.status === true
    );
    return completedThisWeek.length;
  };

  if (loading) return <div className="p-8 text-center">Loading habit...</div>;
  if (!habit) return <div className="p-8 text-center">Habit not found.</div>;

  return (
    <div className="w-full min-h-screen p-4 sm:p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/habits"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to all habits
        </Link>
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900">{habit.title}</h1>
          <p className="text-gray-600 mt-2">{habit.description}</p>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-semibold">Weekly Progress</h3>
              <p className="font-bold text-indigo-600">
                {getWeekProgress()} / {habit.weeklyGoal} days
              </p>
            </div>
            <progress
              className="progress progress-primary w-full"
              value={getWeekProgress()}
              max={habit.weeklyGoal}
            ></progress>
          </div>
          <div className="mt-8 border-t pt-6">
            {/* 4. ปุ่มอัจฉริยะที่เปลี่ยนตัวเองได้ */}
            <button
              onClick={handleToggleDone}
              className={`w-full btn btn-lg transition-all ${
                isDoneToday
                  ? "btn-outline btn-warning" // สไตล์ของปุ่ม Undo
                  : "btn-success text-white" // สไตล์ของปุ่ม Mark as Done
              }`}
            >
              {isDoneToday ? (
                <>
                  <RotateCcw size={22} /> Undo Today's Mark
                </>
              ) : (
                <>
                  <CheckCircle size={22} /> Mark as Done for Today
                </>
              )}
            </button>
          </div>
        </div>
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h3 className="text-lg font-semibold mb-4">Completion History</h3>
          <ul className="space-y-2">
            {entries.length > 0 ? (
              entries.map((entry) => (
                <li
                  key={entry.id}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                >
                  <span>
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <CheckCircle className="text-green-500" />
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No entries yet. Mark a day as done to start!
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Progress;
