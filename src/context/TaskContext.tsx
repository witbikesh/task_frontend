import React, { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ITaskPayload,
  ITaskQuery,
  ITaskResponse,
  ITaskStatsResponse,
  TypeTaskStatus,
} from "../interface";
import {
  createTask,
  deleteTask,
  fetchTasks,
  fetchTaskStats,
  updateTask,
  updateTaskStatus,
} from "../services/task.service";
import { showError, showSuccess } from "../helpers/toast";

interface TaskContextType {
  data?: { data: ITaskResponse[]; totalCount: number };
  taskStats?: { data: ITaskStatsResponse };
  isLoading: boolean;
  isError: boolean;
  refetchTasks: () => void;
  handleTaskCreate: (payload: ITaskPayload) => Promise<boolean>;
  handleTaskUpdate: (id: string, payload: ITaskPayload) => Promise<boolean>;
  handleTaskDelete: (id: string) => Promise<boolean>;
  handleTaskStatusUpdate: (
    id: string,
    status: TypeTaskStatus
  ) => Promise<boolean>;

  setQueryParams: (params: Partial<ITaskQuery>) => void;
  queryParams: ITaskQuery;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const [queryParams, setQueryParamsState] = React.useState<ITaskQuery>({
    keyword: "",
    sortField: "title",
    sortDirection: "asc",
    page: 1,
    pageSize: 5,
  });

  const setQueryParams = (newParams: Partial<ITaskQuery>) =>
    setQueryParamsState((prev) => ({ ...prev, ...newParams }));

  const { data, isLoading, isError, refetch } = useQuery<{
    data: ITaskResponse[];
    totalCount: number;
  }>({
    queryKey: ["tasks", queryParams],
    queryFn: fetchTasks,
  });

  const refetchTasks = () => refetch();

  const { data: taskStats } = useQuery<{
    data: ITaskStatsResponse;
  }>({
    queryKey: ["taskStats"],
    queryFn: fetchTaskStats,
  });

  const handleTaskCreate = async (payload: ITaskPayload) => {
    try {
      const result = await createTask(payload);

      showSuccess(result?.data?.message || "Task created successfully!");

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["taskStats"] });

      return true;
    } catch (error: any) {
      showError(
        error?.response?.data?.message ||
          "Something went wrong while creating task"
      );
      return false;
    }
  };

  const handleTaskUpdate = async (id: string, payload: ITaskPayload) => {
    try {
      const result = await updateTask(id, payload);

      showSuccess(result?.data?.message || "Task updated successfully!");

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["taskStats"] });

      return true;
    } catch (error: any) {
      showError(
        error?.response?.data?.message ||
          "Something went wrong while updating task"
      );
      return false;
    }
  };

  const handleTaskDelete = async (id: string) => {
    try {
      const result = await deleteTask(id);

      showSuccess(result?.data?.message || "Task deleted successfully!");

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["taskStats"] });

      return true;
    } catch (error: any) {
      showError(
        error?.response?.data?.message ||
          "Something went wrong while deleting task"
      );
      return false;
    }
  };

  const handleTaskStatusUpdate = async (id: string, status: TypeTaskStatus) => {
    try {
      const result = await updateTaskStatus(id, status);

      showSuccess(result?.data?.message || "Task status updated successfully!");

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["taskStats"] });

      return true;
    } catch (error: any) {
      showError(
        error?.response?.data?.message ||
          "Something went wrong while updating task"
      );
      return false;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        data,
        taskStats,
        isLoading,
        isError,
        refetchTasks,
        handleTaskCreate,
        handleTaskUpdate,
        handleTaskDelete,
        handleTaskStatusUpdate,
        queryParams,
        setQueryParams,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
