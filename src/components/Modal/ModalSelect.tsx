import { useState } from "react";
import S from "./Modal.module.css";
import { SelectColumn } from "../../types/types";

interface SelectProps {
  options: SelectColumn[];
  selected: SelectColumn;
  setSelected: (s: string) => void;
}

function ModalSelect({ options, selected, setSelected }: SelectProps) {
  return (
    <select className={S.select} onChange={(e) => setSelected(e.target.value)}>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default ModalSelect;
