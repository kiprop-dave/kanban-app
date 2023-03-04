import S from "./Kanban.module.css";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import generateRGB from "../../utils/generateRGB";
import { Column } from "../../types/types";
import BoardTask from "./Task";

type ColumnProps = {
  column: Column;
};

const BoardColumn = ({ column }: ColumnProps): JSX.Element => {
  const [iconBg, setIconBg] = useState<React.CSSProperties>({});
  const { openModal, selectActiveTask, dragEnter } = useAppContext();
  const { name, tasks, id } = column;

  useEffect(() => {
    setIconBg({ backgroundColor: generateRGB() });
  }, []);

  let emptyColumn = tasks.length === 0 ? S.col__empty : "";

  const openTaskModal = (colId: string, taskId: string) => {
    selectActiveTask(colId, taskId);
    openModal("viewTask");
  };

  const taskElements = tasks.map((task, i) => (
    <BoardTask
      key={task.id}
      action={openTaskModal}
      colId={id}
      task={task}
      index={i}
    />
  ));

  return (
    <>
      <div className={`${S.columnContainer}`}>
        <div className={`${S.columnHeader}`}>
          <span className={`${S.icon}`} style={iconBg}></span>
          <h3 className={`${S.columnTitle}`}>{`${name.toUpperCase()} (${
            tasks.length
          })`}</h3>
        </div>
        <div
          className={`${S.tasksContainer} ${emptyColumn}`}
          onDragEnter={() => dragEnter(name)}
          onDragOver={(e) => e.preventDefault()}
        >
          {taskElements}
        </div>
      </div>
    </>
  );
};

export default BoardColumn;
