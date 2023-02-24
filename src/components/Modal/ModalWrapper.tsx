import S from "./Modal.module.css";
import useAppContext from "../../hooks/useAppContext";
import useThemeContext from "../../hooks/useThemeContext";
import BoardModal from "./BoardModal";
import TaskModal from "./TaskModal";

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
      modalRendered = <BoardModal />;
      break;
    case "createTask":
      modalRendered = <TaskModal />;
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
