import { Task } from "@/utils/types/task";
import {
  // Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

interface TaskTableProps {
  tasks: Task[];
  // onTaskClick: (task: Task) => void;
}

export default function TaskTable({ tasks }: TaskTableProps) {
  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <TableHead sx={{ backgroundColor: 'black' }}>
          <TableRow>
            <TableCell align="center" sx={{ color: 'white' }}>ID</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>Name</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>Process Instance ID</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="border-b hover:bg-gray-50">
              <TableCell align="center">{task.id}</TableCell>
              <TableCell align="center" className="capitalize">
                {task.name || "-"}
              </TableCell>
              <TableCell align="center" className="capitalize">
                {task.processInstanceId || "-"}
              </TableCell>
              <TableCell
                align="center"
                className="flex justify-center space-x-2"
              >
                {/* <Button
                  onClick={() => onTaskClick(task)}
                  variant="outlined"
                >
                  View Purchase Request
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
