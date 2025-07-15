import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

function AddEditCategoryModal({ isOpen, onClose, onSubmit, categoryToEdit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const isEditMode = !!categoryToEdit;

  useEffect(() => {
    if (isOpen) {
      if (isEditMode) {
        reset({ title: categoryToEdit.title });
      } else {
        reset({ title: "" });
      }
    }
  }, [isOpen, isEditMode, categoryToEdit, reset]);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {isEditMode ? "Edit Category" : "Add New Category"}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Category Title</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Health, Work, Study"
              className={`input input-bordered w-full ${
                errors.title ? "input-error" : ""
              }`}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="text-error text-xs mt-1">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditMode ? "Save Changes" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditCategoryModal;
