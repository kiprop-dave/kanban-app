import { useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import S from "./Modal.module.css";
import { Task, SubTask, SelectColumn } from "../../types/types";
import generateId from "../../utils/generateId";
import Input from "./Input";
import ModalButton from "./ModalButton";
import ModalSelect from "./ModalSelect";

const TaskModal = (): JSX.Element => {
  const { activeBoard, closeModal, createTask } = useAppContext();
  const [newTask, setNewTask] = useState<Task>({
    id: generateId(),
    title: "",
    description: "",
    subTasks: [],
    column: activeBoard?.columns[0].name || "",
  });
  const [subTasks, setSubTasks] = useState<string[]>([""]);
  const [isErr, setIsErr] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [columns] = useState<SelectColumn[]>(
    () =>
      activeBoard?.columns.map((col) => ({ id: col.id, name: col.name })) || []
  );
  const [selectedColumn, setSelectedColumn] = useState<SelectColumn>({
    id: activeBoard?.columns[0].id || "",
    name: activeBoard?.columns[0].name || "",
  });

  const addSubTask = () => {
    setSubTasks((prev) => [...prev, ""]);
  };

  const editSubTask = (index: number, value: string) => {
    setSubTasks((prev) =>
      prev.map((subTask, i) => (i === index ? value : subTask))
    );
  };

  const deleteSubTask = (index: number) => {
    if (subTasks.length === 1) return;
    setSubTasks((prev) => prev.filter((subTask, i) => i !== index));
  };

  const selectColumn = (colId: string) => {
    let col = columns.find((col) => col.id === colId);
    setSelectedColumn(col || { id: "", name: "" });
  };

  const createNewTask = (
    subTasks: string[],
    e: React.FormEvent<HTMLFormElement> | React.SyntheticEvent
  ) => {
    e.preventDefault();
    if (newTask.title === "") {
      setIsErr(true);
      setErrMsg("Title Required");
      return;
    }
    let subTaskArr: SubTask[] = subTasks
      .filter((l) => l != "")
      .map((subTask) => ({
        description: subTask,
        completed: false,
        id: generateId(),
      }));
    let task: Task = {
      ...newTask,
      subTasks: subTaskArr,
      column: selectedColumn.name,
    };
    createTask(task, activeBoard?.id || "", selectedColumn.id);
    closeModal();
    setNewTask({
      id: generateId(),
      title: "",
      description: "",
      subTasks: [],
      column: activeBoard?.columns[0].name || "",
    });
    setSubTasks([]);
    setSelectedColumn({ name: "", id: "" });
  };
  const subTaskInputs = subTasks.map((subTask, i) => (
    <Input
      key={i}
      value={subTask}
      index={i}
      editValue={editSubTask}
      deleteElem={deleteSubTask}
    />
  ));

  return (
    <>
      <form onSubmit={(e) => createNewTask(subTasks, e)}>
        <h4 className={S.title}>Create New Task</h4>
        <label htmlFor="task-title">
          Title
          <span className={S.error}>{isErr && errMsg}</span>
        </label>
        <input
          type="text"
          id="task-title"
          value={newTask.title}
          onChange={(e) => {
            setErrMsg("");
            setNewTask((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          value={newTask.description}
          onChange={(e) => {
            setNewTask((prev) => ({ ...prev, description: e.target.value }));
          }}
          className={S.description}
        />
        <label htmlFor="sub-tasks">Subtasks</label>
        <div className={S.columnsContainer}>{subTaskInputs}</div>
        <ModalButton
          text="+ Add Subtask"
          type="button"
          action={() => addSubTask()}
          actionType="add"
        />
        <label htmlFor="status">Status</label>
        <ModalSelect
          options={columns}
          selected={selectedColumn}
          setSelected={selectColumn}
        />
        <ModalButton
          text="Create Task"
          type="submit"
          action={(e) => createNewTask(subTasks, e)}
          actionType="create"
        />
      </form>
    </>
  );
};

export default TaskModal;
