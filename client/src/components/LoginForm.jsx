import React from "react";
import Button from "./Button";
import Form from "./Form";
import Input from "./Input";

export default function LoginForm() {
  return (
    // ============> Form Component accepts (children, ...restparams)
    <Form className="lg:w-10/12 lg:mx-auto">
      {/*============>Input Component Accepts (inputType, inputName, ...rest) */}
      <Input inputType="text" inputName="Username" />
      <Input inputType="password" inputName="Password" />

      {/*============> Button Component Accepts (buttonType, buttonValue, ...rest) */}
      <Button buttonType="Submit" buttonValue="Submit" />

      {/* form ending text */}
      <p className="text-black text-center text-sm mt-5">
        Don't have any account?
        <a href="./Signup.html" className="underline font-bold">
          Create New Account
        </a>
      </p>
    </Form>
  );
}
