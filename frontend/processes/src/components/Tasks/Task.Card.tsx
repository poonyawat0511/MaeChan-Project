import { Task } from "@/utils/types/task";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

interface TaskCardProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export default function TaskCard({ tasks, onTaskClick }: TaskCardProps) {
  return (
    <Box
      sx={{
        minWidth: 275,
        borderRadius: "5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {tasks.map((task) => (
        <Card
          key={task.id}
          variant="outlined"
          sx={{ mb: 2, borderRadius: "1.5rem", width: "100%"}}
        >
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 12 }}
            >
              Task ID: {task.id}
            </Typography>
            <Typography variant="h6" component="div">
              Title: {task.name}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 ,fontSize:10}}>
              ProcessInstanceId: {task.processInstanceId}
            </Typography>
            <Typography variant="body2">{task.assignee}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => onTaskClick(task)} color="secondary">
              Preview
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
