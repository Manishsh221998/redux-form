import React from "react";
import Form from "../Form";
import { useDispatch, useSelector } from "react-redux";
import { sign_in } from "../../../redux/authSlice/AuthSlice";
import swAlert from "../../../swAlert/swAlert";
import { useNavigate } from "react-router-dom";
import "./login.css"
const Login = () => {
  let navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.auth);
  let dispatch = useDispatch();

  const submitHandler = (data) => {
    console.log("Login form data of user:", data);

    let formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.pwd);

    dispatch(sign_in(formData))
    .then((res) => {
      console.log(res)
      if (res.payload.status === 200) {
        swAlert("success", res.payload.message, 1000);
        window.sessionStorage.setItem("token",res.payload.token)
        navigate("/profile");
      } else {
        swAlert("success", res.payload.message, 1000);
      }

    });
  };
  return (
    <div className="login">
       {isLoading && <>Loading...</>}
      <br />
      {error && <>Error : {error}</>}

      <Form view={"login"} submitHandler={submitHandler}></Form>
    </div>
  );
};

export default Login;
