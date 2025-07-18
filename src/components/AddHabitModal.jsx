import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { habitSchema } from "../utils/validators";
import useHabitStore from "../stores/habitStore";
import { useEffect } from "react";
import useCategoryStore from "../stores/categoryStore";

function AddHabitModal({ isOpen, onClose, habitToEdit }) {
  const isEditMode = !!habitToEdit; //เช็คว่าเป็น edit ?

  const addHabit = useHabitStore((state) => state.addHabit);
  const updateHabit = useHabitStore((state) => state.updateHabit);

  const { categories, fetchCategories } = useCategoryStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(habitSchema),
  });

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, fetchCategories]);

  //เมื่อ habitToEdit เปลี่ยน ตอนเปิด modal cdhw- ให้ pre-fill ฟอร์ม
  useEffect(() => {
    if (isEditMode && habitToEdit) {
      reset({
        title: habitToEdit.title,
        description: habitToEdit.description,
        weeklyGoal: habitToEdit.weeklyGoal,
        // ตั้งค่า categoryId ที่เลือกไว้
        categoryId: habitToEdit.categoryId || "",
      });
    } else {
      reset({ title: "", description: "", weeklyGoal: "", categoryId: "" });
    }
  }, [habitToEdit, isEditMode, reset]);

  const onSubmit = async (data) => {
    try {
      // แปลง categoryId ที่เป็น string ว่างให้เป็น null ก่อนส่ง
      const submissionData = {
        ...data,
        categoryId: data.categoryId ? parseInt(data.categoryId, 10) : null,
      };

      if (isEditMode) {
        await updateHabit(habitToEdit.id, submissionData);
        toast.success("Habit updated successfully!");
      } else {
        await addHabit(submissionData);
        toast.success("Habit added successfully!");
      }
      onClose();
    } catch (error) {
      console.error("Failed to submit habit:", error);
      toast.error(`Failed to ${isEditMode ? "update" : "add"} habit.`);
    }
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center 
        transition-opacity duration-300 ease-in-out
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      {/* ฉากหลัง (Backdrop) */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      ></div>

      <div
        className={`
          w-full max-w-md p-6 bg-white rounded-2xl shadow-xl
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        <h2 className="text-2xl font-bold mb-4">
          {" "}
          {isEditMode ? "Edit Habit" : "Add a New Habit"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-sm text-red-600 mt-1">{errors.title?.message}</p>
          </div>

          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              {...register("categoryId")}
              className="select select-bordered w-full"
            >
              <option value="">-- No Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="weeklyGoal"
              className="block text-sm font-medium text-gray-700"
            >
              Weekly Goal (days per week)
            </label>
            <input
              type="number"
              id="weeklyGoal"
              {...register("weeklyGoal")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-sm text-red-600 mt-1">
              {errors.weeklyGoal?.message}
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              rows="3"
              {...register("description")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
            >
              {isSubmitting ? "Adding..." : "Add Habit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddHabitModal;
