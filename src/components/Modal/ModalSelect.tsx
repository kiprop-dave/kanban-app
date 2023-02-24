import { useState } from "react";
import S from "./Modal.module.css";
import { SelectColumn } from "../../types/types";
import useThemeContext from "../../hooks/useThemeContext";

interface SelectProps {
  options: SelectColumn[];
  selected: SelectColumn;
  setSelected: (s: string) => void;
}

function ModalSelect({ options, selected, setSelected }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme2 } = useThemeContext();

  const selectItem = (id: string) => {
    setSelected(id);
    setIsOpen(false);
  };

  const dropDownItems = options.map((option) => (
    <ul
      key={option.id}
      onClick={() => selectItem(option.id)}
      className={S.dropItem}
    >
      {option.name}
    </ul>
  ));

  return (
    <>
      <div className={S.select} onClick={() => setIsOpen((p) => !p)}>
        <span>{selected.name}</span>
      </div>
      <div className={`${S.dropContainer}`}>
        {isOpen && (
          <li className={`${S.selectDropdown} ${theme2}`}>{dropDownItems}</li>
        )}
      </div>
    </>
  );
}

export default ModalSelect;

// <select className={S.select} onChange={(e) => setSelected(e.target.value)}>
// {options.map((option) => (
//  <option key={option.id} value={option.id}>
//    {option.name}
//  </option>
// ))}
// </select>
