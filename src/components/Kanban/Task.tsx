import S from "./Kanban.module.css";
import useAppContext from "../../hooks/useAppContext";
import useThemeContext from "../../hooks/useThemeContext";
import { Task } from "../../types/types";

type TaskProps = {
  task: Task;
  colId: string;
  action: (colId: string, taskId: string) => void;
  index: number;
};

const BoardTask = ({ task, colId, action, index }: TaskProps): JSX.Element => {
  const { theme1 } = useThemeContext();
  const { dragStart, dragEnd } = useAppContext();
  const { title, id, subTasks } = task;

  const paragraphContent = (): string => {
    let completed = subTasks.filter((subTask) => subTask.completed).length;
    return `${completed} of ${subTasks.length} completed`;
  };

  return (
    <>
      <div
        className={`${S.task} ${theme1}`}
        onClick={() => action(colId, id)}
        draggable
        onDragStart={() => dragStart(task)}
        onDragEnd={() => dragEnd()}
        onDragOver={(e) => e.preventDefault()}
      >
        <h4 className={`${S.taskTitle}`}>{title}</h4>
        <p className={`${S.par} util`}>{paragraphContent()}</p>
      </div>
    </>
  );
};

export default BoardTask;
