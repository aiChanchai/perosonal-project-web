import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

function Home() {
  return (
    <div className="bg-white mx-auto text-black font-sans">
      {/* 1. Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter">
          อนาคตของคุณ
        </h1>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-gray-500 mt-2">
          เริ่มต้นวันนี้
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-2xl text-gray-700">
          HabitFlow คือพื้นที่สำหรับสร้างและติดตามนิสัยใหม่ๆ
          เพื่อพาคุณไปสู่เป้าหมายที่ตั้งไว้
          ออกแบบอย่างเรียบง่ายเพื่อให้คุณโฟกัสกับสิ่งที่สำคัญที่สุด
        </p>
        <Link to="/register" className="btn btn-primary rounded-full mt-8 px-8">
          เริ่มต้นใช้งาน
        </Link>
      </section>

      {/* 2. Feature Section 1: Simple Tracking */}
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">
            ติดตามทุกนิสัย <br />
            อย่างง่ายดาย
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            เพียงแค่คลิกเดียวเพื่อบันทึกความสำเร็จในแต่ละวัน
            เราออกแบบให้การใช้งานง่ายที่สุดเพื่อลดแรงต้านในการสร้างนิสัยใหม่
          </p>
          <img
            src="https://images.undraw.co/drawkit/illustrations/daily-schedule-21l6.svg"
            alt="Simple Habit Tracking"
            className="mt-12 w-full max-w-2xl mx-auto"
          />
        </div>
      </section>

      {/* 3. Feature Section 2: Visual Progress */}
      <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">
            เห็นภาพความสำเร็จ <br />
            ที่จับต้องได้
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-400">
            กราฟและสถิติที่สวยงามจะแสดงให้คุณเห็นว่าคุณได้สร้างการเปลี่ยนแปลง
            และเข้าใกล้เป้าหมายไปมากแค่ไหนแล้ว
          </p>
          <img
            src="https://images.undraw.co/drawkit/illustrations/growth-analytics-11y9.svg"
            alt="Visual Progress"
            className="mt-12 w-full max-w-2xl mx-auto"
          />
        </div>
      </section>

      {/* 4. Final CTA Section */}
      <section className="flex flex-col justify-center items-center text-center px-4 py-24 bg-gray-50">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
          HabitFlow
        </h2>
        <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-700">
          เริ่มต้นสร้างตัวตนในเวอร์ชันที่ดีกว่าได้แล้ววันนี้
        </p>
        <div className="flex items-center mt-8">
          <Link
            to="/register"
            className="text-lg md:text-xl text-indigo-600 font-semibold hover:underline"
          >
            สร้างบัญชีของคุณ
            <ArrowRight className="inline-block ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
