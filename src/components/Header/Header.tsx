import { useState } from "react";
import S from "./Header.module.css";
import useThemeContext from "../../hooks/useThemeContext";
import useAppContext from "../../hooks/useAppContext";

type HeaderProps = {};

function Header(): JSX.Element {
  const { theme1 } = useThemeContext();
  const { activeBoard } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`${S.container} ${theme1}`}>
      <div className={S.logo}>
        <img src="/kanban-icon.svg" alt="app-logo" />
        <h1 className={S.appLogo}>kanban</h1>
      </div>
      <div className={S.boardTitleCont}>
        <h2 className={S.boardName}>
          {activeBoard?.name ? activeBoard.name : "No Board Found"}
        </h2>
      </div>
      {activeBoard && (
        <div className={S.buttonsContainer}>
          <button className={S.newTask}>+ Add New Task</button>
          <button
            className={S.menuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={S.hamburger}></span>
            <span className={S.hamburger}></span>
            <span className={S.hamburger}></span>
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
