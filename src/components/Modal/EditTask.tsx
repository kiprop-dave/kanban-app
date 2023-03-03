import { useState, useRef } from "react";
import S from "./Modal.module.css";
import generateId from "../../utils/generateId";
import { Task } from "../../types/types";
import useAppContext from "../../hooks/useAppContext";
import Input from "./Input";
import ModalButton from "./ModalButton";
import ModalSelect from "./ModalSelect";

const EditTask = (): JSX.Element => {
  const { activeTask, updateTask, closeModal, activeBoard } = useAppContext();
  const currentTask = JSON.parse(JSON.stringify(activeTask)) as Task;
  const [task, setTask] = useState<Task>(currentTask);
  const [columns, setColumns] = useState<string[]>(
    activeBoard?.columns.map((col) => col.name) ?? []
  );
  const [isErr, setIsErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //   Holds previous column value to be used in updateTask function
  const prevCol = useRef<string>(task.column);

  const editInputs = (val: string, target: "title" | "description") => {
    setTask((prev) => ({ ...prev, [target]: val }));
  };

  const switchColums = (val: string) => {
    setTask((prev) => ({ ...prev, column: val }));
  };

  const addSubTask = () => {
    setTask((prev) => ({
      ...prev,
      subTasks: [
        ...prev.subTasks,
        { description: "", completed: false, id: generateId() },
      ],
    }));
  };

  const editSubTask = (index: number, v: string) => {
    setTask((prev) => ({
      ...prev,
      subTasks: prev.subTasks.map((sub, i) =>
        i === index ? { ...sub, description: v } : sub
      ),
    }));
  };

  const deleteSubTask = (i: number) => {
    setTask((prev) => ({
      ...prev,
      subTasks: prev.subTasks.filter((sub, index) => index !== i),
    }));
  };

  const subTaskInputs = task.subTasks.map((col, i) => (
    <Input
      key={i}
      value={col.description}
      editValue={editSubTask}
      index={i}
      deleteElem={deleteSubTask}
    />
  ));

  const saveChanges = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!task.title.length) {
      setIsErr(true);
      setErrMsg("Title required");
      return;
    }
    if (task.column === prevCol.current) {
      updateTask(task);
      closeModal();
      return;
    }
    updateTask(task, prevCol.current);
    closeModal();
  };

  return (
    <>
      <form onSubmit={(e) => saveChanges(e)}>
        <h4 className={S.title}>Create New Task</h4>
        <label htmlFor="task-title">
          Title
          <span className={S.error}>{isErr && errMsg}</span>
        </label>
        <input
          type="text"
          id="task-title"
          value={task.title}
          onChange={(e) => {
            setErrMsg("");
            editInputs(e.target.value, "title");
          }}
        />
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          value={task.description}
          onChange={(e) => {
            editInputs(e.target.value, "description");
          }}
          className={S.description}
        />
        <label htmlFor="sub-tasks">Subtasks</label>
        <div className={S.columnsContainer}>{subTaskInputs}</div>
        <ModalButton
          text="+ Add Subtask"
          type="button"
          action={addSubTask}
          actionType="add"
        />
        <label htmlFor="status">Status</label>
        <ModalSelect
          options={columns}
          selected={task.column}
          setSelected={switchColums}
        />
        <ModalButton
          text="Save Changes"
          type="submit"
          action={(e) => saveChanges(e)}
          actionType="create"
        />
      </form>
    </>
  );
};

export default EditTask;
