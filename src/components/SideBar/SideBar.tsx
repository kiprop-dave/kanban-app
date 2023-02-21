import useAppContext from "../../hooks/useAppContext";
import useThemeContext from "../../hooks/useThemeContext";
import BoardName from "./BoardName";
import S from "./SideBar.module.css";

const SideBar = () => {
  const { boards, switchActiveBoard, toggleBoardModal } = useAppContext();
  const { theme1 } = useThemeContext();

  const boardElements = boards.map((board) => (
    <BoardName
      key={board.id}
      name={board.name}
      switchActiveBoard={switchActiveBoard}
      id={board.id}
    />
  ));

  return (
    <>
      <nav className={theme1}>
        <h4 className={S.title}>ALL BOARDS ({boards.length})</h4>
        <ul className={S.boardList}>{boardElements}</ul>
        <button onClick={() => toggleBoardModal()} className={S.createBoard}>
          Create Board
        </button>
      </nav>
    </>
  );
};

export default SideBar;
