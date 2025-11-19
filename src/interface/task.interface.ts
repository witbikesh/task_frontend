export const TASK_PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;
export type TypeTaskPriority =
  (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY];

export const TASK_STATUS = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
} as const;

export type TypeTaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export interface ITaskPayload {
  title: string;
  description: string;
  priority: TypeTaskPriority;
  endDate: string;
}

export interface ITaskResponse {
  id: string;
  title: string;
  description: string;
  status: TypeTaskStatus;
  priority: TypeTaskPriority;
  endDate: string;
}

export interface ITaskStatsResponse {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
}

export interface ITaskQuery {
  keyword?: string;
  sortField: string;
  sortDirection: "asc" | "desc";
  page: number;
  pageSize: number;
}
