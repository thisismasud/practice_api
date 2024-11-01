import React from "react";
import loginImg from "../../assets/images/Login_img.svg";
import Header from "../Header";
import Image from "../Image";
import LoginForm from "../LoginForm";

export default function LoginPage() {
  return (
    <div className="md:flex flex-col justify-start container mx-auto h-screen gap-20 p-6">
      {/*============>  Header Component accepts a props (logoName)*/}
      <Header logoName="Discipline" />

      {/* form and image container */}
      <div className="sm:flex sm:flex-col sm:justify-around sm:align-middle sm:px-24 lg:flex lg:flex-row lg:w-full lg:mt-[-1rem]">
        {/* image holder div */}
        <div className="lg:w-6/12">
          {/*============> Image Component accepts props (imgSrc) */}
          <Image imgSrc={loginImg} className="xl:w-11/12" />
        </div>

        {/* form section starts */}
        <div className="flex flex-col justify-center gap-1 md:flex md:flex-col md:justify-start lg:w-6/12">
          <h1 className="text-center pt-6 md:pt-0 text-3xl md:text-5xl">
            Login to your account.
          </h1>
          <p className="text-center mb-4 lg:mb-8">
            Login and Discpiline Yourself.
          </p>
          {/*============> Login Form Component*/}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
