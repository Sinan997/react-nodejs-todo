import classes from "./AddTask.module.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import taskContext from "../store/task-context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = (props) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const authCtx = useContext(AuthContext);
  const taskCtx = useContext(taskContext);
  const history = useHistory();

  const toastOptions = {
    position: "bottom-right",
    autoClose: "800",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (enteredInput.length === 0 && isFocused) {
      setIsInputValid(false);
    }
  }, [enteredInput, isFocused]);

  const inputChangeHandler = (e) => {
    setEnteredInput(e.target.value);
    if (e.target.value.length > 0) {
      setIsInputValid(true);
    }
  };

  const focusHandler = (e) => {
    setIsFocused(true);
  };

  const addTaskHandler = (e) => {
    e.preventDefault();

    if (!authCtx.isLoggedIn) {
      history.push("/auth");
    }

    if (enteredInput.length === 0) {
      toast.error("Task cant be empty", toastOptions);
    }

    if (enteredInput.length !== 0) {
      taskCtx.addTask(enteredInput);
      setEnteredInput("");
      setIsFocused(false);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <h1>Start adding Task to organize your plans</h1>

        <form onSubmit={addTaskHandler} className={classes.form}>
          {authCtx.isLoggedIn && <label htmlFor="newtask">New Task</label>}
          {authCtx.isLoggedIn && (
            <input
              onFocus={focusHandler}
              className={isInputValid ? classes.input : classes.invalidInput}
              onChange={inputChangeHandler}
              value={enteredInput}
              id="newtask"
              placeholder="Add Task..."
            />
          )}
          <button type="submit">
            {authCtx.isLoggedIn ? "Add Task" : "click here to login"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddTask;
