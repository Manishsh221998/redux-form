import React, { useEffect } from "react";
import Form from "../Form";
import { useDispatch, useSelector } from "react-redux";
import { sign_up } from "../../../redux/authSlice/AuthSlice";
import swAlert from "../../../swAlert/swAlert";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  let navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => {
    console.log("Registartion state", state);
    return state?.auth;
  });
  let dispatch = useDispatch();

  const submitHandler = (data) => {
    console.log("Sign up form data of user:", data);

    let formData = new FormData();
    formData.append("first_name", data.fName);
    formData.append("last_name", data.lName);
    formData.append("email", data.email);
    formData.append("password", data.pwd);
    formData.append("profile_pic", data.img[0]);
    dispatch(sign_up(formData))
      .then((res) => {
        console.log(res);
        if (res.payload.status === 200) {
          swAlert("success", res.payload.message, 1000);
          navigate("/");
        } else {
          swAlert("error", res.payload.message, 1000);
        }
      })
      .catch((err) => console.log("axios err", err));
  };

  return (
    <div>
      {isLoading && <>Loading...</>}
      <br />
      {error && <>Error : {error}</>}
      <Form view={"registration"} submitHandler={submitHandler}></Form>
    </div>
  );
};

export default Registration;
