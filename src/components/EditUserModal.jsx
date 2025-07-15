import { useForm } from "react-hook-form";
import { useEffect } from "react";

function EditUserModal({ isOpen, onClose, onSubmit, userToEdit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (userToEdit) {
      reset({
        name: userToEdit.name,
        email: userToEdit.email,
        role: userToEdit.role,
      });
    }
  }, [userToEdit, reset]);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit User: {userToEdit?.name}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email")}
              className="input input-bordered w-full"
              disabled
            />
          </div>
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <select {...register("role")} className="select select-bordered">
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
