import { useState } from "react";

interface InputProps {
  value: string;
  index: number;
  editValue: (i: number, v: string) => void;
}

function Input({ value, editValue, index }: InputProps) {
  //   const [value, setValue] = useState<string>("");

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => editValue(index, e.target.value)}
    />
  );
}

export default Input;
