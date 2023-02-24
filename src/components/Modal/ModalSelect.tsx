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
    // Bug: The value of the select element is not updated when the selected
    // TODO:Read more about the select element
    <select
      className={S.select}
      value={selected.name}
      onChange={(e) => setSelected(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default ModalSelect;
