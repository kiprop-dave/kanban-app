import { useState } from "react";
import { Task } from "../../types/types";
import S from "./Modal.module.css";
import useAppContext from "../../hooks/useAppContext";
import SubTask from "./SubTask";
import ModalSelect from "./ModalSelect";

const TaskDetails = (): JSX.Element => {
  const { closeModal, activeTask, activeBoard, updateTask } = useAppContext();
  let taskCopy = JSON.parse(JSON.stringify(activeTask)) as Task;
  const columns = activeBoard?.columns.map((col) => col.name) ?? [];
  const [currentTask, setCurrentTask] = useState<Task>(taskCopy);
  const { id, title, description, subTasks } = currentTask;

  const subTask = (): string => {
    let completed = subTasks.filter((subTask) => subTask.completed).length;
    return `Subtasks (${completed} of ${subTasks.length})`;
  };

  const checkSubTask = (index: number) => {
    let updatedTask = {
      ...currentTask,
      subTasks: currentTask.subTasks.map((subTask, i) =>
        i === index ? { ...subTask, completed: !subTask.completed } : subTask
      ),
    };
    setCurrentTask(updatedTask);
    updateTask(updatedTask);
  };

  const changeColumn = (colName: string) => {
    if (colName === currentTask.column) return;
    let updatedTask = {
      ...currentTask,
      column: colName,
    };
    setCurrentTask(updatedTask);
    updateTask(updatedTask, currentTask.column);
  };

  const subTaskElements = subTasks.map((subTask, index) => (
    <SubTask
      key={subTask.id}
      index={index}
      action={checkSubTask}
      subTask={subTask}
    />
  ));

  return (
    <>
      <h4 className={S.title}>{title}</h4>
      <p className={`${S.par} util`}>
        {description.length > 0 ? description : "No description"}
      </p>
      <h5 className={S.subTitle}>{subTask()}</h5>
      <div className={S.subTasksContainer}>{subTaskElements}</div>
      <h5 className={S.subTitle}>Status</h5>
      <ModalSelect
        options={columns}
        setSelected={changeColumn}
        selected={currentTask.column}
      />
    </>
  );
};

export default TaskDetails;
