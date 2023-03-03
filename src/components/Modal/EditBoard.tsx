import { useState, useRef } from "react";
import S from "./Modal.module.css";
import { Board } from "../../types/types";
import generateId from "../../utils/generateId";
import useAppContext from "../../hooks/useAppContext";
import Input from "./Input";
import ModalButton from "./ModalButton";

type EditBoardProps = {
  target: "column" | "board";
};

const EditBoard = ({ target }: EditBoardProps): JSX.Element => {
  const { activeBoard, editBoard, closeModal } = useAppContext();
  const boardCopy = JSON.parse(JSON.stringify(activeBoard)) as Board;
  const [currentBoard, setCurrentBoard] = useState(
    boardCopy || { name: "", id: "", columns: [] }
  );

  const disabled = target === "column" ? true : false;

  const editName = (val: string) => {
    setCurrentBoard((prev) => ({ ...prev, name: val }));
  };

  const editColumn = (index: number, val: string) => {
    setCurrentBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col, i) =>
        i === index ? { ...col, name: val } : col
      ),
    }));
  };

  const deleteColumn = (index: number) => {
    if (target === "column") return; // disable delete column if editing column (not board)
    if (currentBoard.columns.length === 1) return;
    setCurrentBoard((prev) => ({
      ...prev,
      columns: prev.columns.filter((col, i) => i !== index),
    }));
  };

  const addColumn = () => {
    setCurrentBoard((prev) => ({
      ...prev,
      columns: [...prev.columns, { name: "", id: generateId(), tasks: [] }],
    }));
  };

  const saveBoard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editBoard(currentBoard);
    closeModal();
  };

  const colElems = currentBoard.columns.map((col, i) => (
    <Input
      key={i}
      value={col.name}
      index={i}
      editValue={editColumn}
      deleteElem={deleteColumn}
    />
  ));

  return (
    <>
      <form>
        <h4 className={S.title}>Edit Board</h4>
        <label htmlFor="boardName">Name</label>
        <input
          type="text"
          defaultValue={activeBoard?.name}
          onChange={(e) => editName(e.target.value)}
          disabled={disabled}
        />
        <label htmlFor="columns">Columns</label>
        <div className={S.columnsContainer}>{colElems}</div>
        <ModalButton
          text="+ Add Column"
          action={addColumn}
          actionType="add"
          type="button"
        />
        <ModalButton
          text="Save Changes"
          action={saveBoard}
          type="submit"
          actionType="create"
        />
      </form>
    </>
  );
};

export default EditBoard;
