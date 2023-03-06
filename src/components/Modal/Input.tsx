import S from "./Modal.module.css";
import CrossSvg from "./CrossSvg";

interface InputProps {
  value: string;
  index: number;
  editValue: (i: number, v: string) => void;
  deleteElem: (i: number) => void;
  disabled?: boolean;
}

function Input({ value, editValue, index, deleteElem, disabled }: InputProps) {
  return (
    <div className={S.inputWrapper}>
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => editValue(index, e.target.value)}
        autoFocus
      />
      <span className={S.crossIcon} onClick={() => deleteElem(index)}>
        <CrossSvg />
      </span>
    </div>
  );
}

export default Input;
