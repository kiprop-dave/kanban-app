import S from "./Modal.module.css";
import useAppContext from "../../hooks/useAppContext";
import useThemeContext from "../../hooks/useThemeContext";
import CreateBoard from "./CreateBoard";
import CreateTask from "./CreateTask";
import DeleteModal from "./DeleteModal";
import EditBoard from "./EditBoard";
import TaskDetails from "./TaskDetails";
import EditTask from "./EditTask";

const ModalWrapper = (): JSX.Element => {
  const { activeModal, closeModal } = useAppContext();
  const { theme1 } = useThemeContext();

  const closeModalHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    e.stopPropagation();
    closeModal();
  };

  let modalRendered: JSX.Element;

  switch (activeModal) {
    case "createBoard":
      modalRendered = <CreateBoard />;
      break;
    case "createTask":
      modalRendered = <CreateTask />;
      break;
    case "deleteBoard":
      modalRendered = <DeleteModal target="board" />;
      break;
    case "editBoard":
      modalRendered = <EditBoard target="board" />;
      break;
    case "createColumn":
      modalRendered = <EditBoard target="column" />;
      break;
    case "viewTask":
      modalRendered = <TaskDetails />;
      break;
    case "deleteTask":
      modalRendered = <DeleteModal target="task" />;
      break;
    case "editTask":
      modalRendered = <EditTask />;
      break;
    default:
      modalRendered = <></>;
  }

  return (
    <div className={`${S.modalWrapper}`} onClick={(e) => closeModalHandler(e)}>
      <div className={`${S.container} ${theme1}`}>{modalRendered}</div>
    </div>
  );
};

export default ModalWrapper;
