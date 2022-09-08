import classes from "./Auth.module.css";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toastOptions = {
    position: "bottom-right",
    autoClose: "800",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const authSubmitHandler = async (e) => {
    e.preventDefault();

    if (isLoginPage) {
      if (loginValidation()) {
        const response = await fetch("http://localhost:3030/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const data = await response.json();
        if (response.status === 200) {
          authCtx.login(data.token, data.expiresIn);
          history.replace("/");
        }
        if (response.status === 404) {
          const data = await response.json();
          toast.error(data.message, toastOptions);
        }
        if (response.status === 409) {
          toast.error(data.message, toastOptions);
        }
        if (response.status === 401) {
          toast.error(data.message, toastOptions);
        }
      }
    } else {
      //Registering part
      if (registerValidation()) {
        const response = await fetch("http://localhost:3030/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });
        if (response.status === 409) {
          const data = await response.json();
          console.log(data);
          toast.error(data.message, toastOptions);
        }
        if (response.status === 404) {
          const data = await response.json();
          toast.error(data.message, toastOptions);
        }
        if (response.status === 500) {
          const data = await response.json();
          toast.error(data.message, toastOptions);
        }
        if (response.status === 201) {
          setIsLoginPage(true);
          setEmail("");
          setName("");
          setPassword("");
          history.push("/auth");
        }
      }
    }
  };

  const registerValidation = () => {
    if (name.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    }
    if (email.length === 0) {
      toast.error("Please enter a email", toastOptions);
      return false;
    }
    if (password.length < 6) {
      toast.error("Password should be greater than 6 characters", toastOptions);
      return false;
    }
    return true;
  };

  const loginValidation = () => {
    if (email.length === 0) {
      toast.error("Please enter a email", toastOptions);
      return false;
    }
    if (password.length === 0) {
      toast.error("password cant be empty", toastOptions);
      return false;
    }
    return true;
  };

  const buttonChangeSubmit = (e) => {
    e.preventDefault();
    setIsLoginPage((prevState) => !prevState);
  };
  return (
    <>
      <div className={classes.container}>
        <h1>Login , So we can save your tasks</h1>
        <form onSubmit={buttonChangeSubmit} className={classes.form}>
          <button type="submit">
            Click for {isLoginPage ? "Register" : "Login"}
          </button>
        </form>
        <form onSubmit={authSubmitHandler} className={classes.form}>
          {!isLoginPage && <label>Name</label>}
          {!isLoginPage && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
            />
          )}
          <label>Email</label>
          <input
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit">{isLoginPage ? "Login" : "Register"}</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Auth;
