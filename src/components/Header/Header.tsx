import S from "./Header.module.css";
import useThemeContext from "../../hooks/useThemeContext";

type HeaderProps = {};

function Header(): JSX.Element {
  const { theme1 } = useThemeContext();

  return (
    <header className={`${S.container} ${theme1}`}>
      <div className={S.logo}>
        <img src="/kanban-icon.svg" alt="app-logo" />
        <h1 className={S.appLogo}>kanban</h1>
      </div>
      <div className={S.boardTitleCont}></div>
      <div className={S.buttons}></div>
    </header>
  );
}

export default Header;
