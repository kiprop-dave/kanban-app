import useAppContext from "../../hooks/useAppContext";
import S from "./SideBar.module.css";

const SideBar = () => {
  const { boards, switchActiveBoard, createBoard } = useAppContext();

  const boardElements = boards.map((board) => (
    <li
      key={board.id}
      onClick={() => switchActiveBoard(board.id)}
      className={S.board}
    >
      {board.name}
    </li>
  ));
};

export default SideBar;
