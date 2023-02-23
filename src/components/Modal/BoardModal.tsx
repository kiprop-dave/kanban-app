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

  const deleteColumn = (index: number) => {
    if (columns.length === 1) return;
    setColumns((prev) => prev.filter((col, i) => i !== index));
  };

  const columnInputs = columns.map((col, i) => (
    <Input
      key={i}
      value={col}
      index={i}
      editValue={editColumn}
      deleteColumn={deleteColumn}
    />
  ));

  const addColStyle = {
    color: "#635FC7",
    backgroundColor: "#ffffff",
  };

  const createBoardStyle = {
    color: "#ffffff",
    backgroundColor: "#635FC7",
  };

  return (
    <>
      <form
        onSubmit={(e) => createNewBoard(columns, e)}
        className={`${S.newBoard}`}
      >
        <h4 className={S.title}>Create New Board</h4>
        <label htmlFor="board-name">
          Name
          <span className={S.error}>{err && errMsg}</span>
        </label>
        <input
          id="board-name"
          type="text"
          value={newBoard.name}
          onChange={(e) => {
            setErrMsg("");
            setNewBoard((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        <p>Columns</p>
        <div className={S.columnsContainer}>{columnInputs}</div>
        <button onClick={() => addColumn()} style={addColStyle} type="button">
          + Add New Column
        </button>
        <button type="submit" style={createBoardStyle}>
          Create Board
        </button>
      </form>
    </>
  );
};

export default BoardModal;
