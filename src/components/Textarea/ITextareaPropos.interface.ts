import React from "react";

export interface ITextareaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  children: React.ReactNode;
}
