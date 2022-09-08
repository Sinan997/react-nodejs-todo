import classes from "./TaskItem.module.css";
import taskContext from "../store/task-context";
import { useContext } from "react";

const TaskItem = (props) => {
  const taskCtx = useContext(taskContext);
  const completeHandler = () => {
    taskCtx.makeTaskCompleted(props.id);
  };

  return (
    <li onClick={completeHandler} className={classes.item}>
      {props.children}
    </li>
  );
};

export default TaskItem;
