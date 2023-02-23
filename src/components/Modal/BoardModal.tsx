import { useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import { Board, Column } from "../../types/types";
import generateId from "../../utils/generateId";
import S from "./Modal.module.css";
import Input from "./Input";

const BoardModal = () => {
  const { closeModal, createBoard } = useAppContext();
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

  const createNewBoard = (
    cols: string[],
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (newBoard.name === "") {
      setErr(true);
      setErrMsg("Name Required");
      return;
    }
    let colArr: Column[] = cols
      .filter((l) => l != "")
      .map((col) => ({ name: col.toUpperCase(), tasks: [] }));
    let board: Board = { ...newBoard, columns: colArr };
    createBoard(board);
    closeModal();
    setNewBoard({ name: "", id: generateId(), columns: [] });
    setColumns([]);
  };

  const columnInputs = columns.map((col, i) => (
    <Input key={i} value={col} index={i} editValue={editColumn} />
  ));

  return (
    <>
      <form onSubmit={(e) => createNewBoard(columns, e)}>
        <h4 className={S.title}>Create New Board</h4>
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
        <div className={S.modal__columns}>{columnInputs}</div>
        <button onClick={() => addColumn()}>Add Column</button>
        <button type="submit">Create Board</button>
      </form>
    </>
  );
};

export default BoardModal;
