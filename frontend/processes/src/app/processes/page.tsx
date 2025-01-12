"use client";

import { Task } from "@/utils/types/task";
import { useState, useEffect } from "react";

const camundaApi = `http://localhost:8081/engine-rest/task/`;

async function fetchTasks(): Promise<Task[]> {
  try {
    const response = await fetch(camundaApi);
    if (!response.ok) {
      throw new Error("Failed to fetch camunda task list");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading tasks...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Task List</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Assignee</th>
                <th className="py-3 px-6 text-left">Created</th>
                <th className="py-3 px-6 text-left">Priority</th>
                <th className="py-3 px-6 text-left">Process Definition ID</th>
                <th className="py-3 px-6 text-left">State</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6">{task.id}</td>
                    <td className="py-3 px-6">{task.name || "N/A"}</td>
                    <td className="py-3 px-6">{task.assignee || "Unassigned"}</td>
                    <td className="py-3 px-6">
                      {new Date(task.created).toLocaleString()}
                    </td>
                    <td className="py-3 px-6">{task.priority}</td>
                    <td className="py-3 px-6">{task.processDefinitionId}</td>
                    <td className="py-3 px-6">{task.taskState}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-3 px-6 text-gray-500"
                  >
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
    