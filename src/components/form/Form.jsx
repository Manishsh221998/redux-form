import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./form.css";
const AuthForm = ({ view, submitHandler }) => {
  const { handleSubmit, formState, register } = useForm();
  const { errors } = formState;
  // console.log("formstate",formState)

  return (
    <section className="d-flex justify-content-center mt-5">
      <Form
        className="border border-1 shadow-sm p-3 rounded-3"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h4 className="mb-4">{view === "login" ? "Login" : "Sign up"}</h4>
        {view === "login" ? null : (
          <>
            <FloatingLabel label="First name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="First name"
                id="fName"
                {...register("fName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "minimum 2 characters" },
                })}
              />
              {<span className="error-msg">{errors?.fName?.message}</span>}
            </FloatingLabel>

            <FloatingLabel label="Last name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Last name"
                id="lName"
                {...register("lName", {
                  required: { value: true, message: "Last name is required" },
                  minLength: {
                    value: 3,
                    message: "minimum 3 characters required",
                  },
                })}
              />
              {<span className="error-msg">{errors?.lName?.message}</span>}
            </FloatingLabel>
          </>
        )}

        <FloatingLabel label="Email address" className="mb-3">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            id="email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {view === "registration" ? (
            <span className="error-msg">{errors?.email?.message}</span>
          ) : null}
        </FloatingLabel>

        <FloatingLabel label="Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            id="pwd"
            {...register("pwd", {
              required: { value: true, message: "Password is required" },
              minLength: { value: 6, message: "minimum length 6 characters" },
              maxLength: { value: 12, message: "maximum lenght 12 characters" },
            })}
          />
          {view === "registration" ? (
            <span className="error-msg">{errors?.pwd?.message}</span>
          ) : null}
        </FloatingLabel>
        {view === "login" ? null : (
          <>
            <Form.Group className="mb-3">
              <Form.Control
                type="file"
                id="img"
                name="img"
                {...register("img")}
              />
            </Form.Group>
          </>
        )}
        <div className="">
          <Button type="submit" className="shadow-sm fw-medium mt-1">
            {view === "login" ? "Login" : "Sign up"}
          </Button>
          {view === "login" ? (
            <Link to="/registration">
              <Button type="submit" variant={"light shadow-sm mt-1 ms-1"}>
                Create account
              </Button>
            </Link>
          ) : (
            <>
              <br />
              <p className="mt-2">
                Already registered?<Link to="/">login</Link>
              </p>
            </>
          )}
        </div>
      </Form>
    </section>
  );
};

export default AuthForm;
