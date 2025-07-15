import { useEffect, useState } from "react";
import useUserManagementStore from "../stores/userManagementStore";
import { toast } from "react-toastify";
import { Pencil, Trash } from "lucide-react";
import EditUserModal from "../components/EditUserModal"; // import Modal

function User() {
  const {
    users,
    loading,
    error,
    fetchUsers,
    searchUsers,
    updateUser,
    deleteUser,
  } = useUserManagementStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      fetchUsers();
    } else {
      searchUsers(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    fetchUsers();
  };

  // --- ฟังก์ชันสำหรับจัดการ Modal และการ Edit/Delete ---
  const handleOpenEditModal = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setUserToEdit(null);
    setIsModalOpen(false);
  };

  const handleEditSubmit = async (data) => {
    try {
      await updateUser(userToEdit.id, data);
      toast.success("User updated successfully!");
      handleCloseModal();
    } catch (err) {
      toast.error("Failed to update user.");
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        toast.success("User deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete user.");
      }
    }
  };

  return (
    <div className="w-full p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
      </div>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by email..."
          className="input input-bordered w-full md:w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          className="btn btn-ghost"
        >
          Clear
        </button>
      </form>

      {loading ? (
        <div className="text-center p-4">
          <span className="loading loading-lg loading-spinner text-primary"></span>
        </div>
      ) : error ? (
        <div role="alert" className="alert alert-error text-white">
          <span>Error: {error}</span>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.id}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "ADMIN"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {new Date(user.createdAt).toLocaleDateString("en-CA")}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleOpenEditModal(user)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="btn btn-ghost btn-sm text-red-500"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EditUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleEditSubmit}
        userToEdit={userToEdit}
      />
    </div>
  );
}

export default User;
