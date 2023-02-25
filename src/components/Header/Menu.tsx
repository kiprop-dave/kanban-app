import S from "./Header.module.css";

type MenuProps = {
  theme: string;
  name: string;
  deleteModal: () => void;
  editModal: () => void;
};

const MenuPopUp = ({
  theme,
  name,
  deleteModal,
  editModal,
}: MenuProps): JSX.Element => {
  return (
    <>
      <div className={`${S.menuContainer} ${theme}`}>
        <button
          className={`${S.menuButtons} ${S.editBtn}`}
          onClick={() => editModal()}
        >
          Edit {name}
        </button>
        <button
          className={`${S.menuButtons} ${S.deleteBtn}`}
          onClick={() => deleteModal()}
        >
          Delete {name}
        </button>
      </div>
    </>
  );
};

export default MenuPopUp;
