import { useState } from "react";
import { DashboardStats } from "../../components/dashboard/DashboardStats";
import { SearchBar } from "../../components/dashboard/SearchBar";
import { TaskModal } from "../../components/dashboard/modals/TaskModal";
import { TasksTable } from "../../components/dashboard/TaskTable";
import { Button } from "../../components/ui";
import NavBar from "../../components/ui/NavBar";
import { useTaskContext } from "../../context/TaskContext";

export default function TaskDashboard() {
  const [createTaskModalOpen, setCreateTaskModalOpen] =
    useState<boolean>(false);
  const { handleTaskCreate, data, taskStats, queryParams, setQueryParams } =
    useTaskContext();

  const tasks = data?.data || [];
  const totalCount = data?.totalCount || 0;
  const stats = taskStats?.data || {
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  };

  return (
    <>
      <div
        className={`min-h-screen bg-gray-50 ${
          createTaskModalOpen ? "blur-sm" : null
        }`}
      >
        <NavBar />
        <div className="p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Task Dashboard
              </h1>
              <p className="text-gray-600">
                Track and manage your tasks efficiently
              </p>
            </div>
            <Button
              variant="solid"
              fullWidth={false}
              className="px-4 py-2 text-sm"
              onClick={() => setCreateTaskModalOpen(true)}
            >
              Create New Task
            </Button>
          </div>

          {/* Stats */}
          <DashboardStats {...stats} />

          {/* Search */}
          <SearchBar
            value={queryParams?.keyword!}
            onChange={(value) => setQueryParams({ keyword: value, page: 1 })}
          />

          {/* Tasks Table */}
          <TasksTable
            tasks={tasks}
            currentPage={queryParams.page}
            itemsPerPage={queryParams.pageSize}
            totalCount={totalCount}
            onPageChange={(page) => setQueryParams({ page })}
            sortField={queryParams.sortField}
            sortDirection={queryParams.sortDirection}
            onSort={(field) => {
              setQueryParams({
                sortField: field,
                sortDirection:
                  queryParams.sortField === field &&
                  queryParams.sortDirection === "asc"
                    ? "desc"
                    : "asc",
                page: 1,
              });
            }}
          />

          {/* Create Task Modal */}
        </div>
      </div>
      <TaskModal
        isOpen={createTaskModalOpen}
        onClose={() => setCreateTaskModalOpen(false)}
        onSubmit={handleTaskCreate}
      />
    </>
  );
}
