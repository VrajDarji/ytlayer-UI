import React from "react";
import { SignUp } from "@clerk/nextjs";
const page = () => {
  return <SignUp redirectUrl={"/"} />;
};

export default page;
