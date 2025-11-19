import React from "react";
import {
  TASK_STATUS,
  type ITaskResponse,
  type TypeTaskStatus,
} from "../../interface";

interface TaskActionsProps {
  task: ITaskResponse;
  onEdit: (task: ITaskResponse) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TypeTaskStatus) => void;
}

export const TaskActions: React.FC<TaskActionsProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const toggleStatus = () => {
    let newStatus: TypeTaskStatus;
    if (task.status === TASK_STATUS.PENDING)
      newStatus = TASK_STATUS.IN_PROGRESS;
    else if (task.status === TASK_STATUS.IN_PROGRESS)
      newStatus = TASK_STATUS.COMPLETED;
    else newStatus = TASK_STATUS.PENDING;

    onStatusChange(task.id, newStatus);
  };

  const getStatusButtonText = () => {
    switch (task.status) {
      case TASK_STATUS.PENDING:
        return "Mark In-Progress";
      case TASK_STATUS.IN_PROGRESS:
        return "Mark Done";
      case TASK_STATUS.COMPLETED:
        return "Mark Pending";
      default:
        return "Update Status";
    }
  };

  return (
    <div className="flex gap-2 justify-end">
      {task.status !== TASK_STATUS.COMPLETED && (
        <button
          onClick={toggleStatus}
          className="px-3 py-1 text-xs rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 hover:cursor-pointer"
        >
          {getStatusButtonText()}
        </button>
      )}

      <button
        onClick={() => onEdit(task)}
        className="px-3 py-1 text-xs rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:cursor-pointer"
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(task.id)}
        className="px-3 py-1 text-xs rounded-lg bg-red-100 text-red-700 hover:bg-red-200 hover:cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
};
