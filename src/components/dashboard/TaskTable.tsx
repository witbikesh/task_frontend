import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  TASK_PRIORITY,
  TASK_STATUS,
  type ITaskResponse,
  type TypeTaskPriority,
  type TypeTaskStatus,
} from "../../interface";
import { TaskActions } from "./TaskActions";
import { TaskModal } from "./modals/TaskModal";
import { DeleteModal } from "./modals/TaskDeleteModal";
import { useTaskContext } from "../../context/TaskContext";

interface TasksTableProps {
  tasks: ITaskResponse[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  onSort: (field: string) => void;
  totalCount: number;
}

export const TasksTable: React.FC<TasksTableProps> = ({
  tasks,
  currentPage,
  itemsPerPage,
  onPageChange,
  sortField,
  sortDirection,
  onSort,
  totalCount,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ITaskResponse | null>(null);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const { handleTaskUpdate, handleTaskDelete, handleTaskStatusUpdate } =
    useTaskContext();

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field)
      return <ChevronUp className="w-4 h-4 text-gray-300" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-blue-600" />
    );
  };

  const getStatusColor = (status: TypeTaskStatus) => {
    switch (status) {
      case TASK_STATUS.COMPLETED:
        return "bg-green-100 text-green-800";
      case TASK_STATUS.IN_PROGRESS:
        return "bg-blue-100 text-blue-800";
      case TASK_STATUS.PENDING:
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: TypeTaskPriority) => {
    switch (priority) {
      case TASK_PRIORITY.HIGH:
        return "text-red-600";
      case TASK_PRIORITY.MEDIUM:
        return "text-orange-600";
      case TASK_PRIORITY.LOW:
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-visible">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "title",
                  "description",
                  "status",
                  "priority",
                  "endDate",
                  "actions",
                ].map((field) => (
                  <th
                    key={field}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      field !== "actions"
                        ? "cursor-pointer hover:bg-gray-100 transition-colors"
                        : ""
                    }`}
                    onClick={
                      field !== "actions" ? () => onSort(field) : undefined
                    }
                  >
                    <div className="flex items-center gap-2">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                      {field !== "actions" && <SortIcon field={field} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>

                  <td
                    className="px-6 py-4 max-w-[200px] truncate"
                    title={task.description}
                  >
                    {task.description}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status.replace("-", " ")}
                    </span>
                  </td>

                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(task.endDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <TaskActions
                      task={task}
                      onEdit={() => {
                        setIsEditModalOpen(true);
                        setSelectedTask(task);
                      }}
                      onDelete={() => {
                        setIsDeleteModalOpen(true);
                        setSelectedTask(task);
                      }}
                      onStatusChange={() => {
                        let statusToUpdate: TypeTaskStatus | null = null;
                        if (task.status === TASK_STATUS.PENDING)
                          statusToUpdate = TASK_STATUS.IN_PROGRESS;
                        else if (task.status === TASK_STATUS.IN_PROGRESS)
                          statusToUpdate = TASK_STATUS.COMPLETED;

                        if (statusToUpdate)
                          handleTaskStatusUpdate(task.id, statusToUpdate);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => onPageChange(i + 1)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={async (values) => {
          if (!selectedTask) return;
          await handleTaskUpdate(selectedTask.id, values);
          setIsEditModalOpen(false);
        }}
        mode="update"
        initialTask={selectedTask}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          handleTaskDelete(selectedTask?.id!);
          setIsDeleteModalOpen(false);
        }}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </>
  );
};
