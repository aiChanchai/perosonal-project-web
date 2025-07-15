import { Pencil } from "lucide-react";
import { Link } from "react-router";

function HabitCard({ habit, onEdit }) {
  const handleEditClick = (e) => {
    e.preventDefault(); // หยุดการทำงานของ Link
    e.stopPropagation(); // หยุดการส่ง event ไปยัง div แม่
    onEdit(habit);
  };

  return (
    <div className="p-4 bg-white/70 backdrop:blur-sm rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <Link
            to={`/progress/${habit.id}`}
            className="link-hover hover:cursor-pointer"
          >
            <h3 className="font-bold text-gray-800">{habit.title}</h3>
          </Link>
          <button
            onClick={handleEditClick}
            className="text-gray-400 hover:text-indigo-600"
          >
            <Pencil className="hover:cursor-pointer" size={16} />
          </button>
        </div>

        {habit.category && (
          <div className="mt-1 mb-1">
            <span className="py-1 px-2 text-xs font-semibold text-purple-800 bg-yellow-300 rounded-full">
              {habit.category.title}
            </span>
          </div>
        )}

        <p className="text-sm font-semibold">{habit.description}</p>
      </div>
      <p className="text-sm font-semibold text-indigo-600 mt-2">
        Goal:{habit.weeklyGoal}
      </p>
    </div>
  );
}
export default HabitCard;
