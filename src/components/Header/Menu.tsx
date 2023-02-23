import S from "./Header.module.css";

type MenuProps = {
  theme: string;
  name: string;
};

const MenuPopUp = ({ theme, name }: MenuProps): JSX.Element => {
  return (
    <>
      <div className={`${S.menuContainer} ${theme}`}>
        <button className={`${S.menuButtons} ${S.editBtn}`}>Edit {name}</button>
        <button className={`${S.menuButtons} ${S.deleteBtn}`}>
          Delete {name}
        </button>
      </div>
    </>
  );
};

export default MenuPopUp;
