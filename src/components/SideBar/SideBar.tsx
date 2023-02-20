import useAppContext from "../../hooks/useAppContext";
import S from "./SideBar.module.css";

const SideBar = () => {
  const { boards, switchActiveBoard, toggleBoardModal } = useAppContext();

  const boardElements = boards.map((board) => (
    <li
      key={board.id}
      onClick={() => switchActiveBoard(board.id)}
      className={S.board}
    >
      {board.name}
    </li>
  ));

  return (
    <>
      <h3>ALL BOARDS ({boards.length})</h3>
      <ul className={S.boardList}>{boardElements}</ul>
      <button onClick={() => toggleBoardModal()} className={S.createBoard}>
        Create Board
      </button>
    </>
  );
};

export default SideBar;
