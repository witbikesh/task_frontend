import React from "react";
import { Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Stat {
  title: string;
  value: number;
  color: string;
  icon: React.ReactNode;
  description: string;
}

interface DashboardStatsProps {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  total,
  completed,
  inProgress,
  pending,
}) => {
  const stats: Stat[] = [
    {
      title: "Total Tasks",
      value: total,
      color: "blue",
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      description: "All active tasks",
    },
    {
      title: "Completed",
      value: completed,
      color: "green",
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      description: "Tasks finished",
    },
    {
      title: "In Progress",
      value: inProgress,
      color: "blue",
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      description: "Currently working",
    },
    {
      title: "Pending",
      value: pending,
      color: "yellow",
      icon: <AlertCircle className="w-8 h-8 text-yellow-600" />,
      description: "Awaiting action",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((s) => (
        <div
          key={s.title}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{s.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{s.value}</p>
            </div>
            <div className={`bg-${s.color}-50 p-3 rounded-lg`}>{s.icon}</div>
          </div>
          <p className="text-sm text-gray-500 mt-4">{s.description}</p>
        </div>
      ))}
    </div>
  );
};
