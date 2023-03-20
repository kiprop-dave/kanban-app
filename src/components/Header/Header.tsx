import { useState } from "react";
import S from "./Header.module.css";
import useThemeContext from "../../hooks/useThemeContext";
import useAppContext from "../../hooks/useAppContext";
import DropButton from "../DropButton";
import DropMenu from "../DropMenu";

type HeaderProps = {};

function Header(): JSX.Element {
  const { theme1, theme2, isLightTheme } = useThemeContext();
  const { activeBoard, openModal } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let dynamicBorder = {
    bottom: isLightTheme ? S.lightBorder_bottom : S.darkBorder_bottom,
    right: isLightTheme ? S.lightBorder_right : S.darkBorder_right,
  };

  const openDeleteModal = () => {
    openModal("deleteBoard");
  };

  const openEditBoardModal = () => {
    openModal("editBoard");
  };

  return (
    <header className={`${S.container} ${theme1} ${dynamicBorder.bottom}`}>
      <div className={`${S.logo} ${dynamicBorder.right}`}>
        <img src="/kanban-icon.svg" alt="app-logo" />
        <h1 className={S.appLogo}>kanban</h1>
      </div>
      <div className={S.boardTitleCont}>
        <h2 className={S.boardName}>{activeBoard?.name ? activeBoard.name : "No Board Found"}</h2>
      </div>
      {activeBoard && (
        <div className={S.buttonsContainer}>
          <button className={S.newTask} onClick={() => openModal("createTask")}>
            <p className={S.plusText}>+</p>
            <span className={S.newTaskText}>New Task</span>
          </button>
          <div className={S.menuBtn}>
            <DropButton action={() => setIsMenuOpen(!isMenuOpen)} />
            {isMenuOpen && (
              <DropMenu
                theme={theme2}
                name="Board"
                editAction={openEditBoardModal}
                deleteAction={openDeleteModal}
              />
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
