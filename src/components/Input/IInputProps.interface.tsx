import React from "react";

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}
