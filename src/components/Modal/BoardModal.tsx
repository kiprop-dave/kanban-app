import { useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import { Board, Column } from "../../types/types";
import generateId from "../../utils/generateId";
import S from "./Modal.module.css";
import Input from "./Input";
import ModalButton from "./ModalButton";

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
    e: React.FormEvent<HTMLFormElement> | React.SyntheticEvent
  ) => {
    e.preventDefault();
    if (newBoard.name === "") {
      setErr(true);
      setErrMsg("Name Required");
      return;
    }
    let colArr: Column[] = cols
      .filter((l) => l != "")
      .map((col) => ({ name: col, tasks: [], id: generateId() }));
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
      deleteElem={deleteColumn}
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
        <label htmlFor="test">columns</label>
        <div className={S.columnsContainer}>{columnInputs}</div>
        <ModalButton
          text="+ Add New Column"
          action={() => addColumn()}
          type="button"
          actionType="add"
        />
        <ModalButton
          text="Create Board"
          type="submit"
          action={(e) => createNewBoard(columns, e)}
          actionType="create"
        />
        {/* <button onClick={() => addColumn()} style={addColStyle} type="button">
          + Add New Column
        </button>
        <button type="submit" style={createBoardStyle}>
          Create Board
        </button> */}
      </form>
    </>
  );
};

export default BoardModal;
