import { useEffect } from "react";
import useUserStore from "../stores/userStore";
import useHabitStore from "../stores/habitStore";
import { LogOut, Hash, Mail, User as UserIcon } from "lucide-react";

import { ProfileIcon } from "../icons";

function Profile() {
  const { user, logout } = useUserStore();
  const { habits, fetchHabits } = useHabitStore();

  // ดึงข้อมูล Habit เมื่อหน้าถูกโหลด
  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleLogout = () => {
    logout();
    // หลังจาก logout, ProtectedRoute จะจัดการ redirect ไปหน้า login เอง
  };

  return (
    <div className="w-full bg-gray-50 p-4 sm:p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          My Profile
        </h1>

        {/* Profile Info Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Avatar and Name */}
            <div className="flex flex-col items-center space-y-2 mb-6">
              <ProfileIcon className="w-35" />

              <h2 className="card-title text-2xl">{user?.name}</h2>
            </div>

            {/* Details List */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Hash className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">
                  You have a total of <strong>{habits.length}</strong> habits.
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <div className="card-actions justify-center mt-8">
              <button
                className="btn btn-error btn-outline"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
