// 4. (แนะนำ) import React เข้ามา
import React from "react";
// 1. import 'Link' จาก react-router
import { Link } from "react-router";

function GuessHeader() {
  return (
    // 2. แก้ไขโครงสร้าง HTML ที่ซ้อนกันผิด
    <header className="flex items-center justify-between h-16 px-6 bg-white shadow-sm">
      {/* Left: Logo */}
      <div>
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          HabitFlow
        </Link>
      </div>

      {/* อาจจะเพิ่มปุ่ม Login/Register ตรงนี้ */}
      <div className="flex gap-2">
        <Link className="btn btn-primary" to="/register">
          Register
        </Link>
        <Link className="btn btn-primary" to="/login">
          Login
        </Link>
      </div>
    </header>
  );
}

export default GuessHeader;
