import classes from "./Tasks.module.css";
import TaskItem from "./TaskItem";
import { useContext } from "react";
import taskContext from "../store/task-context";

const Tasks = (props) => {
  const taskCtx = useContext(taskContext);
  const tasks = taskCtx.tasks;
  const unCompletedTasks = tasks
    .filter((task) => task.isCompleted === false)
    .reverse();
  return (
    <div className={classes.container}>
      <ul>
        {taskCtx.isLoading
          ? "Loading"
          : unCompletedTasks.map((task) => {
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
export default Tasks;
