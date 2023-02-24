import S from "./Modal.module.css";
import CrossSvg from "./CrossSvg";

interface InputProps {
  value: string;
  index: number;
  editValue: (i: number, v: string) => void;
  deleteElem: (i: number) => void;
}

function Input({ value, editValue, index, deleteElem }: InputProps) {
  return (
    <div className={S.inputWrapper}>
      <input
        type="text"
        value={value}
        onChange={(e) => editValue(index, e.target.value)}
      />
      <CrossSvg action={deleteElem} index={index} />
    </div>
  );
}

export default Input;
