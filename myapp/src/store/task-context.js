import React, { useEffect, useState } from "react";
import AuthContext from "./auth-context";
import { useContext } from "react";

const taskContext = React.createContext({
  tasks: [],
  addTask: () => {},
  makeTaskCompleted: () => {},
  isLoading: true,
});

export const TaskContextProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const [holderTasks, setHolderTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("http://localhost:3030/getUserTasks", {
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      });
      const data = await response.json();
      setIsLoading(false);
      setHolderTasks(data.posts);
    };
    if (authCtx.isLoggedIn) {
      getPosts();
    }
  }, [authCtx.token, authCtx.isLoggedIn]);

  const addTaskHandler = async (enteredTask) => {
    setIsLoading(true);

    const response = await fetch("http://localhost:3030/addTask", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: enteredTask,
        isCompleted: false,
      }),
    });

    const data = await response.json();
    setIsLoading(false);
    setHolderTasks(data.posts);
  };

  const makeTaskCompleted = async (id) => {
    setIsLoading(true);
    const response = await fetch("http://localhost:3030/makeTaskCompleted", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId: id,
      }),
    });
    const data = await response.json();
    setIsLoading(false);
    setHolderTasks(data.posts);
  };

  const LoadingHandler = () => {
    setIsLoading((prevState) => !prevState);
  };

  const contextValue = {
    tasks: holderTasks,
    addTask: addTaskHandler,
    makeTaskCompleted: makeTaskCompleted,
    changeLoading: LoadingHandler,
    isLoading: isLoading,
  };

  return (
    <taskContext.Provider value={contextValue}>
      {props.children}
    </taskContext.Provider>
  );
};

export default taskContext;
