import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import useUserStore from "../stores/userStore";
import useHabitStore from "../stores/habitStore"; // ใช้ store สำหรับ habits
import AddHabitModal from "../components/AddHabitModal";
import HabitList from "../components/HabitList";

function Habits() {
  const { user } = useUserStore();
  //  ดึง state และ actions จาก useHabitStore มาใช้งานโดยตรง
  const { habits, fetchHabits, loading } = useHabitStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState(null);

  const handleOpenModal = (habit = null) => {
    setHabitToEdit(habit); // ถ้ามี habit คือแก้, ถ้าเป็น null คือสร้างใหม่
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setHabitToEdit(null); // เคลียร์ state ทุกครั้งที่ปิด
  };

  useEffect(() => {
    // เรียก fetchHabits จาก store เมื่อ component โหลด
    fetchHabits();
  }, [fetchHabits]); // ใส่ fetchHabits ใน dependency array

  console.log("Checking habits data:", habits);

  // ใช้ loading จาก store
  if (loading) {
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
          {/* เพิ่ม onClick เพื่อเปิด Modal */}
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-100"
          >
            <Plus size={20} />
            Add New Habit
          </button>
        </div>

        {/* Habits List */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Today's Habits
          </h2>
          <HabitList habits={habits} onEdit={handleOpenModal} />
        </div>
      </div>

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        habitToEdit={habitToEdit}
      />
    </div>
  );
}

export default Habits;
