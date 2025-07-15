import { Link } from "react-router";
import { ArrowRight, TrendingUp, Check, Goal } from "lucide-react";

function Home() {
  return (
    <div className="bg-white mx-auto text-gray-800 font-sans">
      {/* 1. Hero Section */}
      <section className="container mx-auto px-6 pt-24 pb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          Master Your Habits,
          <br />
          <span className="text-indigo-600">Design Your Life.</span>
        </h1>
        <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600">
          HabitFlow is the simple, beautiful, and effective way to track your
          habits and achieve your goals. Turn your ambitions into daily actions.
        </p>
        <Link
          to="/register"
          className="btn btn-primary btn-lg rounded-full mt-8 px-8 shadow-lg"
        >
          Start for Free
        </Link>
        <div className="mt-16">
          <img
            src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="HabitFlow dashboard on a laptop"
            className="rounded-2xl shadow-2xl mx-auto max-w-4xl"
          />
        </div>
      </section>

      {/* 2. Features Section (Zig-zag layout with new images) */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-6 py-20">
          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <Check className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold">Effortless Tracking</h3>
              </div>
              <p className="mt-4 text-gray-600 text-lg">
                Our clean and simple interface makes it easy to add your habits
                and mark them as complete with a single click. Less time
                tracking, more time doing.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mt-20">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold">Insightful Analytics</h3>
              </div>
              <p className="mt-4 text-gray-600 text-lg">
                Visualize your journey with beautiful charts and statistics.
                Understand your patterns, celebrate your streaks, and stay
                motivated.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mt-20">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <Goal className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold">Set & Conquer Goals</h3>
              </div>
              <p className="mt-4 text-gray-600 text-lg">
                Define weekly goals for each habit to keep yourself accountable.
                Break down your biggest ambitions into achievable daily steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Final CTA Section */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Start Building Your Best Self Today.
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-lg text-gray-600">
            Join thousands of others who are transforming their lives one habit
            at a time.
          </p>
          <Link
            to="/register"
            className="btn btn-primary btn-lg rounded-full mt-8 px-10 shadow-lg"
          >
            Sign Up Now
            <ArrowRight className="inline-block ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
