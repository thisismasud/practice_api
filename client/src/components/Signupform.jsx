import React from "react";
import Button from "./Button";
import Form from "./Form";
import Input from "./Input";

export default function Signupform() {
  return (
    <div className="flex flex-col justify-center gap-1 md:flex md:flex-col md:justify-start lg:w-6/12">
      <h1 className="text-center pt-6 md:pt-0 text-3xl md:text-5xl">
        Sign Up.
      </h1>
      <p className="text-center mb-4 lg:mb-5">
        Create a new account and Enter a new world.
      </p>
      <Form className="lg:w-10/12 lg:mx-auto lg:pt-[-3]">
        <Input inputType="text" inputName="Username*" />
        <Input inputType="email" inputName="Email*" />
        <Input inputType="password" inputName="Password*" />
        <Input inputType="password" inputName="Confirm Password*" />
        <Input
          inputType="file"
          inputName="Upload Your Image"
          className="block border-dashed w-full h-20 text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
        <Button buttonType="Submit" buttonValue="Submit" />
        <p className="text-black text-center text-sm mt-3 ">
          Already have an account?
          <a href="./index.html" className="underline font-bold">
            Login
          </a>
        </p>
      </Form>
    </div>
  );
}
