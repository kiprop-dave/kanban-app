import S from "./Kanban.module.css";
import useAppContext from "../../hooks/useAppContext";

const NewColumn = (): JSX.Element => {
  const { openModal } = useAppContext();
  return (
    <>
      <div
        className={`${S.columnContainer}`}
        role="button"
        onClick={() => openModal("createColumn")}
      >
        <div className={S.columnHeader}></div>
        <div className={`${S.tasksContainer} ${S.newColumn}`}>
          <h2>+ New Column</h2>
        </div>
      </div>
    </>
  );
};

export default NewColumn;
