import { TASK_ENDPOINTS } from "../constants";
import axiosInstance from "../helpers/axios.instance";
import type {
  ITaskPayload,
  ITaskResponse,
  ITaskStatsResponse,
  TypeTaskStatus,
} from "../interface";

export const fetchTasks = async ({
  queryKey,
}: any): Promise<{
  data: ITaskResponse[];
  totalCount: number;
}> => {
  const [_key, { keyword, sortField, sortDirection, page, pageSize }] =
    queryKey;

  const res = await axiosInstance.get(TASK_ENDPOINTS, {
    params: { keyword, sortField, sortDirection, page, pageSize },
  });

  return res.data;
};

export const createTask = async (data: ITaskPayload) => {
  const res = await axiosInstance.post(TASK_ENDPOINTS, data);
  return res.data;
};

export const updateTask = async (id: string, data: ITaskPayload) => {
  const res = await axiosInstance.put(`${TASK_ENDPOINTS}/${id}`, data);
  return res.data;
};

export const updateTaskStatus = async (id: string, status: TypeTaskStatus) => {
  const res = await axiosInstance.patch(`${TASK_ENDPOINTS}/status/${id}`, {
    status,
  });
  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await axiosInstance.delete(`${TASK_ENDPOINTS}/${id}`);
  return res.data;
};

export const fetchTaskStats = async (): Promise<{
  data: ITaskStatsResponse;
}> => {
  const res = await axiosInstance.get(`${TASK_ENDPOINTS}/stats`);
  return res.data;
};
