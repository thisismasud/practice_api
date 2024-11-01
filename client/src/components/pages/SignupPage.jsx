import React from "react";
import signupImg from "../../assets/images/Signup.svg";
import Header from "../Header";
import Image from "../Image";
import Signupform from "./../Signupform";

export default function SignupPage() {
  return (
    <div className="md:flex flex-col justify-start container mx-auto h-screen gap-7 p-7 lg:px-10 lg:gap-4">
      <Header logoName="Discipline" />
      {/* form and image container */}
      <div className="sm:flex sm:flex-col sm:justify-around sm:align-middle sm:px-24 lg:flex lg:flex-row lg:w-full lg:p-5 pb-8 justify-center">
        <div className="lg:w-6/12 flex flex-auto">
          <Image
            imgSrc={signupImg}
            altImage="Signup Image"
            className="lg:w-8/12 m-auto"
          />
        </div>
        <Signupform />
      </div>
    </div>
  );
}
