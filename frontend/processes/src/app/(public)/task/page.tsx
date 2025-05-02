"use client";
import { Chip, Avatar, Tooltip, Pagination } from "@heroui/react";
import {
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import LoadingScreen from "@/components/loading/loading";
import SortButton from "./_components/buttons/SortButton";
import HistoryButton from "./_components/buttons/HistoryButton";
import ConfirmationModal from "./_components/modals/ConfirmationModal";
import TaskPanelCard from "./_components/cards/TaskPanelCard";
import PdfPreviewPanelCard from "./_components/cards/PdfPreviewPanelCard";
import { useTaskPage } from "./hooks/useTaskPage";

export default function TaskPage() {
  const {
    tasks,
    selectedTask,
    selectedPdfUrl,
    userRole,
    error,
    loading,
    sortOrder,
    isConfirmModalOpen,
    modalAction,
    handleTaskClick,
    handleClosePreview,
    handleApprove,
    handleReject,
    handleSort,
    setConfirmModalOpen,
    page,
    size,
    setPage,
    totalTasks,
    springRequests
  } = useTaskPage();

  if (loading) {
    return <LoadingScreen message="Loading requests..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md max-w-md">
          <div className="flex items-center">
            <XCircleIcon className="h-6 w-6 mr-2" />
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-screen flex flex-col bg-gradient-to-br from-white to-gray-50">
      <div className="mx-auto w-full max-w-7xl py-6 px-6 rounded-md flex flex-col h-full">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              ภาระงาน
              <Chip
                color="secondary"
                variant="flat"
                radius="sm"
                size="sm"
                className="ml-4 font-medium text-xs py-1 capitalize bg-violet-100 text-violet-700"
              >
                {userRole}
              </Chip>
            </h1>
            <p className="text-gray-500 mt-1">
              ตรวจสอบเอกสารทุกครั้งเพื่อความถูกต้อง
            </p>
          </div>

          <Tooltip content={`Logged in as ${userRole}`}>
            <Avatar
              size="md"
              icon={<UserIcon />}
              className="bg-violet-100 text-violet-700"
            />
          </Tooltip>
        </div>

        <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-gray-200">
          <div className="flex items-center">
            <SortButton sortOrder={sortOrder} onClick={handleSort} />
            <Chip className="ml-4" variant="flat" color="primary">
              {tasks.length} งานที่รอดำเนินการ
            </Chip>
          </div>


          <Tooltip content="ดูประวัติงานที่เสร็จสิ้น">
            <HistoryButton />
          </Tooltip>
        </div>

        <div className="flex justify-between gap-6 flex-grow h-full">
          {/* Task List Panel */}
          <TaskPanelCard
            tasks={tasks}
            springRequests={springRequests} // ✅ Pass this here
            onTaskClick={handleTaskClick}
          />


          {/* PDF Preview Panel */}
          <PdfPreviewPanelCard
            selectedTask={selectedTask}
            pdfUrl={selectedPdfUrl}
            onClose={handleClosePreview}
            onApprove={() => selectedTask && handleApprove(selectedTask)}
            onReject={() => selectedTask && handleReject(selectedTask)}
          />

        </div>
        {totalTasks > 0 && (
          <div className="flex items-center mt-2">
            <Pagination
              total={Math.ceil(totalTasks / size)}
              page={page + 1}
              onChange={(newPage) => setPage(newPage - 1)}
              showControls
              color="secondary"
            />
          </div>
        )}
      </div>


      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={modalAction}
      />

    </div>
  );
}
