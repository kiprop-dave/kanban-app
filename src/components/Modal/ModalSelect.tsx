import { useState } from "react";
import S from "./Modal.module.css";
import { SelectColumn } from "../../types/types";
import useThemeContext from "../../hooks/useThemeContext";

interface SelectProps {
  options: SelectColumn[] | string[];
  selected: SelectColumn | string;
  setSelected: (s: string) => void;
}

function ModalSelect({ options, selected, setSelected }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme2 } = useThemeContext();

  const selectItem = (id: string | SelectColumn) => {
    if (typeof id === "object") id = id.id;
    setSelected(id);
    setIsOpen(false);
  };

  const dropDownItems = options.map((option, i) => (
    <ul key={i} onClick={() => selectItem(option)} className={S.dropItem}>
      {typeof option === "object" ? option.name : option}
    </ul>
  ));

  return (
    <>
      <div className={S.select} onClick={() => setIsOpen((p) => !p)}>
        <span>{typeof selected === "object" ? selected.name : selected}</span>
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
