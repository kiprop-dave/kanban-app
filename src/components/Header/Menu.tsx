import S from "./Header.module.css";

type MenuProps = {
  theme: string;
};

const MenuPopUp = ({ theme }: MenuProps): JSX.Element => {
  return (
    <>
      <div className={`${S.menuContainer} ${theme}`}>
        <button className={`${S.menuButtons} ${S.editBtn}`}>Edit Board</button>
        <button className={`${S.menuButtons} ${S.deleteBtn}`}>
          Delete Board
        </button>
      </div>
    </>
  );
};

export default MenuPopUp;
