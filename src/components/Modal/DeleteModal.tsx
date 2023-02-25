import S from "./Modal.module.css";
import useAppContext from "../../hooks/useAppContext";
import ModalButton from "./ModalButton";

type DeleteProps = {
  target: "board" | "task";
};

const DeleteModal = ({ target }: DeleteProps) => {
  const { closeModal, deleteBoard, activeBoard, activeTask, deleteTask } =
    useAppContext();

  const handleDelete = () => {
    if (activeBoard && target === "board") {
      deleteBoard(activeBoard.id);
    }
    closeModal();
  };

  const modalText = (): string => {
    if (target === "board") {
      return `Are you sure you want to delete the '${activeBoard?.name}' board? This action will remove all columns and tasks and cannot be reversed.`;
    }
    return `Are you sure you want to delete the '${activeTask?.title}' task? This action cannot be reversed.`;
  };

  return (
    <>
      <h4 className={S.deleteTitle}>Delete this {target}?</h4>
      <p className={S.deleteText}>{modalText()}</p>
      <div className={S.buttonsContainer}>
        <ModalButton
          text="Delete"
          action={() => handleDelete()}
          type="button"
          actionType="delete"
        />
        <ModalButton
          text="Cancel"
          action={() => closeModal()}
          type="button"
          actionType="add"
        />
      </div>
    </>
  );
};

export default DeleteModal;
