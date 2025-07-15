import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useCategoryManagementStore from "../stores/categoryManagementStore";
import AddEditCategoryModal from "../components/AddEditCategoryModal";
import { Plus, Trash, Pencil } from "lucide-react";

function Category() {
  const {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategoryManagementStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleOpenModal = (category = null) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCategoryToEdit(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (data) => {
    try {
      if (categoryToEdit) {
        await updateCategory(categoryToEdit.id, data);
        toast.success("Category updated successfully!");
      } else {
        await addCategory(data);
        toast.success("Category added successfully!");
      }
      handleCloseModal();
    } catch (err) {
      toast.error(`Failed to ${categoryToEdit ? "update" : "add"} category.`);
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(categoryId);
        toast.success("Category deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete category.");
      }
    }
  };

  return (
    <div className="w-full p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Categories</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={20} />
          Add New Category
        </button>
      </div>

      {loading && (
        <div className="text-center p-4">
          <span className="loading loading-lg loading-spinner text-primary"></span>
        </div>
      )}
      {error && (
        <div role="alert" className="alert alert-error text-white">
          <span>Error: {error}</span>
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {cat.id}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {cat.title}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleOpenModal(cat)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="btn btn-ghost btn-sm text-red-500"
                      onClick={() => handleDelete(cat.id)}
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

      <AddEditCategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        categoryToEdit={categoryToEdit}
      />
    </div>
  );
}

export default Category;
