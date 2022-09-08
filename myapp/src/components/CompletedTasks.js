import React from "react";
import { useContext } from "react";
import taskContext from "../store/task-context";
import classes from "./CompletedTasks.module.css";
import TaskItem from "./TaskItem";

const CompletedTasks = () => {
  const taskCtx = useContext(taskContext);
  const tasks = taskCtx.tasks;
  const CompletedTasks = tasks
    .filter((task) => task.isCompleted === true)
    .reverse();
  return (
    <div className={classes.container}>
      <h1>Your Completed Tasks</h1>
      <ul>
        {taskCtx.isLoading
          ? "Loading"
          : CompletedTasks.map((task) => {
              return (
                <TaskItem id={task._id} key={task._id}>
                  {task.task}
                </TaskItem>
              );
            })}
      </ul>
    </div>
  );
};

export default CompletedTasks;
