import React from "react";

const WelcomeSide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-center p-8 text-white">
      <h2 className="text-2xl font-bold mb-3">Welcome to Task Manager</h2>
      <p className="text-sm opacity-90 mb-6">
        Organize tasks, track progress, and collaborate with your team — all in
        one place.
      </p>

      <ul className="space-y-3 text-sm">
        <li className="flex items-start gap-3">
          <span className="inline-flex items-center justify-center bg-white/20 rounded-full h-7 w-7">
            ✓
          </span>
          <span>Create and manage projects</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="inline-flex items-center justify-center bg-white/20 rounded-full h-7 w-7">
            ✓
          </span>
          <span>Assign tasks and set deadlines</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="inline-flex items-center justify-center bg-white/20 rounded-full h-7 w-7">
            ✓
          </span>
          <span>Track progress with dashboards</span>
        </li>
      </ul>

      <div className="mt-6 text-xs opacity-90">
        Demo account:
        <p>alice@example.com / Password@123</p>
        <p>bob@example.com / Password@123</p>
      </div>
    </div>
  );
};

export { WelcomeSide };
