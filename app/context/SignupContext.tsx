"use client";

import { createContext, useContext, useState } from "react";

const SignupContext = createContext<any>(null);

export function SignupProvider({ children }: any) {
  const [signupData, setSignupData] = useState({
    role: "student",
    fullName: "",
    email: "",
    password: "",
  });

  return (
    <SignupContext.Provider value={{ signupData, setSignupData }}>
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup() {
  return useContext(SignupContext);
}