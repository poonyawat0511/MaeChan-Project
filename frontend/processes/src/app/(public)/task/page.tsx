"use client";
import { Chip, Avatar, Tooltip, Pagination } from "@heroui/react";
import {
  UserIcon,
  XCircleIcon,
  BellAlertIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
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
    return <LoadingScreen message="กำลังโหลดข้อมูล..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-white to-gray-50">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md max-w-md">
          <div className="flex items-center">
            <XCircleIcon className="h-6 w-6 mr-3 text-red-500" />
            <p className="font-medium">{error}</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-sm font-medium flex items-center gap-2"
            >
              <ArrowPathIcon className="h-4 w-4" />
              โหลดข้อมูลใหม่
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="mx-auto w-full max-w-7xl py-6 px-6 rounded-md flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mr-4">
                <ClipboardDocumentListIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                  ภาระงาน
                  {tasks.length > 0 && (
                    <div className="relative ml-3">
                      <div className="absolute -right-1 -top-1">
                        <span className="flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                      </div>
                      <Chip
                        color="danger"
                        variant="flat"
                        radius="full"
                        size="sm"
                        className="font-medium text-xs"
                      >
                        {tasks.length}
                      </Chip>
                    </div>
                  )}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Chip
                    color="secondary"
                    variant="flat"
                    radius="full"
                    size="sm"
                    className="font-medium text-xs bg-violet-100 text-violet-700"
                  >
                    {userRole}
                  </Chip>
                  <p className="text-gray-500 text-sm">
                    ตรวจสอบเอกสารทุกครั้งเพื่อความถูกต้อง
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Tooltip content="รายการที่รอดำเนินการ">
              <button className="p-2 relative bg-white rounded-full shadow-sm border border-gray-100 hover:bg-violet-50 transition-colors">
                <BellAlertIcon className="h-5 w-5 text-violet-600" />
                {tasks.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white" />
                )}
              </button>
            </Tooltip>
            <Tooltip content={`ลงชื่อเข้าใช้ด้วยบทบาท ${userRole}`}>
              <Avatar
                size="md"
                icon={<UserIcon />}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
              />
            </Tooltip>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <SortButton sortOrder={sortOrder} onClick={handleSort} />
            {totalTasks > 0 && (
              <p className="text-sm text-gray-500">
                แสดง {tasks.length} จาก {totalTasks} รายการ
              </p>
            )}
          </div>

          <Tooltip content="ดูประวัติงานที่เสร็จสิ้น">
            <HistoryButton />
          </Tooltip>
        </div>

        <div className="flex justify-between gap-6 flex-grow h-full">
          {/* Task List Panel */}
          <TaskPanelCard
            tasks={tasks}
            springRequests={springRequests}
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
          <div className="flex items-center justify-center mt-4 bg-white py-3 px-4 rounded-lg shadow-sm border border-gray-100">
            <Pagination
              total={Math.ceil(totalTasks / size)}
              page={page + 1}
              onChange={(newPage) => setPage(newPage - 1)}
              showControls
              color="secondary"
              variant="bordered"
              classNames={{
                cursor: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium"
              }}
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
