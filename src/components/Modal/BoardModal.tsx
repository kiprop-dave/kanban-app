import { useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import { Board, Column } from "../../types/types";
import generateId from "../../utils/generateId";
import S from "./Modal.module.css";
import Input from "./Input";

const BoardModal = () => {
  const { toggleBoardModal, createBoard } = useAppContext();
  const [newBoard, setNewBoard] = useState<Board>({
    name: "",
    id: generateId(),
    columns: [],
  });
  const [columns, setColumns] = useState<string[]>([""]);
  const [err, setErr] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const addColumn = () => {
    setColumns((prev) => [...prev, ""]);
  };

  const editColumn = (index: number, value: string) => {
    setColumns((prev) =>
      prev.map((column, i) => (i === index ? value : column))
    );
  };

  const createNewBoard = (cols: string[]) => {
    if (newBoard.name === "") {
      setErr(true);
      setErrMsg("Required");
      return;
    }
    let colArr: Column[] = cols
      .filter((l) => l != "")
      .map((col) => ({ name: col, tasks: [] }));
    let board: Board = { ...newBoard, columns: colArr };
    createBoard(board);
    toggleBoardModal();
    setNewBoard({ name: "", id: generateId(), columns: [] });
    setColumns([]);
  };

  return (
    <div className={S.modalContainer}>
      <div className={S.modalContent}>
        <div className={S.modalHeader}>Create New Board</div>
        <div className={S.modalBody}>
          <label htmlFor="board-name">Name</label>
          <input
            id="board-name"
            type="text"
            value={newBoard.name}
            onChange={(e) => {
              setErrMsg("");
              setNewBoard((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
          {err && <p className={S.modal__error}>{errMsg}</p>}
          <p>Columns</p>
          <div className={S.modal__columns}>
            {columns.map((column, index) => (
              <Input
                key={index}
                value={column}
                index={index}
                editValue={editColumn}
              />
            ))}
          </div>
          <button onClick={() => addColumn()}>Add Column</button>
          <button onClick={() => createNewBoard(columns)}>Create Board</button>
        </div>
      </div>
    </div>
  );
};

export default BoardModal;
