import S from "./Kanban.module.css";
import useThemeContext from "../../hooks/useThemeContext";
import { Task } from "../../types/types";

type TaskProps = {
  task: Task;
  colId: string;
  action: (colId: string, taskId: string) => void;
};

const BoardTask = ({ task }: TaskProps): JSX.Element => {
  const { theme1 } = useThemeContext();
  const { title, id, subTasks } = task;

  const paragraphContent = (): string => {
    let completed = subTasks.filter((subTask) => subTask.completed).length;
    return `${completed} of ${subTasks.length} completed`;
  };

  return (
    <>
      <div className={`${S.task} ${theme1}`} draggable>
        <h4 className={`${S.taskTitle}`}>{title}</h4>
        <p className={`${S.par} util`}>{paragraphContent()}</p>
      </div>
    </>
  );
};

export default BoardTask;
