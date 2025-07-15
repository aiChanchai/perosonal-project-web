import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router"; // แก้ไข import
import { toast } from "react-toastify";
import {
  getHabitById,
  getHabitEntries,
  createHabitEntry,
  deleteTodayHabitEntry,
} from "../api/habitsApi";
import { ArrowLeft, CheckCircle, RotateCcw, Trash2 } from "lucide-react";
import useHabitStore from "../stores/habitStore";
import ConfirmationModal from "../components/ConfirmationModal";

function Progress() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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

  const isDoneToday = entries.some(
    (entry) => new Date(entry.date).toDateString() === new Date().toDateString()
  );

  const handleToggleDone = async () => {
    try {
      if (isDoneToday) {
        await deleteTodayHabitEntry(id);
        toast.info("Mark for today has been removed.");
      } else {
        await createHabitEntry(id);
        toast.success(`YOU MADE IT!! 🔥🔥`);
      }
      fetchData();
    } catch (error) {
      toast.error("Oops! Something went wrong.");
    }
  };

  // ฟังก์ชันนี้จะ "เปิด" Modal
  const handleDeleteClick = () => {
    setIsConfirmModalOpen(true);
  };

  // ฟังก์ชันนี้จะถูกเรียกจาก "ใน" Modal เพื่อ "ยืนยัน" การลบ
  const handleConfirmDelete = async () => {
    try {
      await deleteHabit(id);
      toast.success("Habit has been deleted.");
      setIsConfirmModalOpen(false);
      navigate("/habits");
    } catch (error) {
      toast.error("Failed to delete the habit.");
      setIsConfirmModalOpen(false);
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
    <>
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
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                {habit.title}
              </h1>

              <button
                onClick={handleDeleteClick}
                className="btn btn-outline btn-error sm:w-auto"
              >
                <Trash2 size={20} />
              </button>
            </div>
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
            {/* --- ส่วนที่แก้ไข --- */}
            <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row gap-4">
              {/* ปุ่ม Mark as done / Undo */}
              <button
                onClick={handleToggleDone}
                className={`w-full btn btn-lg transition-all ${
                  isDoneToday
                    ? "btn-outline btn-warning"
                    : "btn-success text-white"
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
              {/* ปุ่ม Delete Habit */}
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

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the habit "${habit?.title}"?`}
      />
    </>
  );
}

export default Progress;
