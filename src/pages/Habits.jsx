import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import useUserStore from "../stores/userStore";
import useHabitStore from "../stores/habitStore";
import useCategoryStore from "../stores/categoryStore";
import AddHabitModal from "../components/AddHabitModal";
import HabitList from "../components/HabitList";

function Habits() {
  const { user } = useUserStore();
  const {
    habits,
    fetchHabits,
    fetchHabitsByCategory,
    loading: habitsLoading,
  } = useHabitStore();
  const {
    categories,
    fetchCategories,
    loading: categoriesLoading,
  } = useCategoryStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleOpenModal = (habit = null) => {
    setHabitToEdit(habit);
    setIsModalOpen(true);
  };

  // ฟังก์ชันนี้จะเคลียร์ State ทั้งหมดที่จำเป็นเมื่อปิด Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setHabitToEdit(null);
  };

  useEffect(() => {
    fetchHabits();
    fetchCategories();
  }, [fetchHabits, fetchCategories]);

  const handleFilter = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId) {
      fetchHabitsByCategory(categoryId);
    } else {
      fetchHabits();
    }
  };

  const habitsWithCategories = habits.map((habit) => {
    const category = categories.find((cat) => cat.id === habit.categoryId);
    return { ...habit, category: category || null };
  });

  const isLoading = habitsLoading || categoriesLoading;

  if (isLoading) {
    return <div className="p-8 text-center">Loading your habits...</div>;
  }

  return (
    <div className="w-full min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.name}!
            </h1>
            <p className="text-gray-500">Let's make today productive.</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-100"
          >
            <Plus size={20} />
            Add New Habit
          </button>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">Filter by Category:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilter(null)}
              className={`btn btn-sm ${
                !activeCategory ? "btn-primary" : "btn-ghost"
              }`}
            >
              All Habits
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilter(cat.id)}
                className={`btn btn-sm ${
                  activeCategory === cat.id ? "btn-primary" : "btn-ghost"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Today's Habits
          </h2>
          <HabitList habits={habitsWithCategories} onEdit={handleOpenModal} />
        </div>
      </div>

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        habitToEdit={habitToEdit}
      />
    </div>
  );
}

export default Habits;
