"use client";

import { useState, useCallback, useRef } from "react";
import * as XLSX from "xlsx";
import { Search, Upload, Download, UserPlus, Trash2 } from "lucide-react";

interface User {
  id: string;
  fullName: string;
  department: string;
  role: string;
}

const departments = [
  "แผนกอายุรกรรม",
  "แผนกศัลยกรรม",
  "แผนกกุมารเวช",
  "แผนกสูติศาสตร์และนรีเวช",
  "แผนกฉุกเฉิน",
  "แผนกรังสีวิทยา",
];

const roles = ["ผู้ตรวจสอบ", "ผู้อำนวยการ", "แพทย์", "พยาบาล", "เจ้าหน้าที่"];

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([
    { id: "1", fullName: "Hart Hagerty", department: "แผนกอายุรกรรม", role: "ผู้ตรวจสอบ" },
    { id: "2", fullName: "Brice Swyre", department: "แผนกศัลยกรรม", role: "ผู้อำนวยการ" },
    { id: "3", fullName: "Marjy Ferencz", department: "แผนกกุมารเวช", role: "ผู้ตรวจสอบ" },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleImportFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Transform imported data to match User interface
        const importedUsers: User[] = jsonData.map((row: any, index) => ({
          id: String(users.length + index + 1),
          fullName: row.fullName || row['Full Name'] || '',
          department: row.department || row['Department'] || '',
          role: row.role || row['Role'] || '',
        }));

        setUsers(prev => [...prev, ...importedUsers]);
      } catch (error) {
        console.error('Error importing file:', error);
        alert('Error importing file. Please check the file format.');
      }
    };
    reader.readAsBinaryString(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [users]);

  const handleExportToExcel = useCallback(() => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");
  }, [users]);

  const handleDelete = useCallback((userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setSelectedUsers(prev => {
      const updated = new Set(prev);
      updated.delete(userId);
      return updated;
    });
  }, []);

  const handleToggleSelectAll = useCallback((isSelected: boolean) => {
    setSelectedUsers(isSelected ? new Set(users.map(u => u.id)) : new Set());
  }, [users]);

  const handleDeleteSelected = useCallback(() => {
    setUsers(prev => prev.filter(user => !selectedUsers.has(user.id)));
    setSelectedUsers(new Set());
  }, [selectedUsers]);

  const filteredUsers = users.filter(user =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
          <div className="flex gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".xlsx,.xls,.csv"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Excel/CSV
            </button>
            <button
              onClick={handleExportToExcel}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, department, or role..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500 transition-all"
                    onChange={(e) => handleToggleSelectAll(e.target.checked)}
                    checked={selectedUsers.size === users.length && users.length > 0}
                  />
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Department</th>
                <th className="p-4 text-left text-sm font-medium text-gray-600">Role</th>
                <th className="p-4 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500 transition-all"
                      checked={selectedUsers.has(user.id)}
                      onChange={() =>
                        setSelectedUsers(prev =>
                          prev.has(user.id)
                            ? new Set([...prev].filter(id => id !== user.id))
                            : new Set(prev).add(user.id)
                        )
                      }
                    />
                  </td>
                  <td className="p-4 text-sm text-gray-900">{user.fullName}</td>
                  <td className="p-4 text-sm text-gray-900">{user.department}</td>
                  <td className="p-4 text-sm text-gray-900">{user.role}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedUsers.size > 0 && (
          <div className="mt-4">
            <button
              onClick={handleDeleteSelected}
              className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md shadow-sm text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected ({selectedUsers.size})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}