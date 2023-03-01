import S from "./Kanban.module.css";
import useAppContext from "../../hooks/useAppContext";
import useThemeContext from "../../hooks/useThemeContext";
import BoardColumn from "./Column";
import NewColumn from "./NewColumn";

type KanbanProps = {
  showSideBar: boolean;
};

const Kanban = ({ showSideBar }: KanbanProps): JSX.Element => {
  const { theme2 } = useThemeContext();
  const { activeBoard, openModal } = useAppContext();

  const columns = activeBoard?.columns.map((col, i) => (
    <BoardColumn key={i} column={col} />
  ));

  let toggleClass = !showSideBar ? S.hidden : "";

  return (
    <>
      <section className={`${S.container} ${theme2} ${toggleClass}`}>
        {activeBoard ? (
          <>
            {columns}
            <NewColumn />
          </>
        ) : (
          <div className={`${S.noBoard}`}>
            <p className={`${S.noBoardText}`}>
              You have no boards. Create a new board to get started.
            </p>
            <button
              className={`${S.newBoard}`}
              onClick={() => openModal("createBoard")}
            >
              + Create New Board
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Kanban;
