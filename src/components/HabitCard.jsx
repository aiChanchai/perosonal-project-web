import { Pencil } from "lucide-react";

function HabitCard({ habit, onEdit }) {
  return (
    <div className="p-4 bg-white/70 backdrop:blur-sm rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-800">{habit.title}</h3>
          <button
            onClick={() => onEdit(habit)}
            className="text-gray-400 hover:text-indigo-600"
          >
            <Pencil size={16} />
          </button>
        </div>
        <p className="text-sm font-semibold">{habit.description}</p>
      </div>
      <p className="text-sm font-semibold text-indigo-600 mt-2">
        Goal:{habit.weeklyGoal}
      </p>
    </div>
  );
}
export default HabitCard;
