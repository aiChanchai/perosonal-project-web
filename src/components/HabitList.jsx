import HabitCard from "./HabitCard";

function HabitList({ habits, onEdit }) {
  // ถ้าไม่มี habits ให้แสดงข้อความ
  if (habits.length === 0) {
    return (
      <div className="py-12 text-center bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">You haven't added any habits yet.</p>
        <p className="text-gray-500">Click "Add New Habit" to get started!</p>
      </div>
    );
  }

  // ถ้ามี habits ให้แสดงรายการ
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} onEdit={onEdit} />
      ))}
    </div>
  );
}
export default HabitList;
