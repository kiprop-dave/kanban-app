import S from "./Header.module.css";
import useThemeContext from "../../hooks/useThemeContext";

type HeaderProps = {};

function Header(): JSX.Element {
  const { isLightTheme } = useThemeContext();
  const theme = isLightTheme ? "lightbg1" : "darkbg1";
  return (
    <header className={`${S.container} ${theme}`}>
      <div className={S.logo}></div>
      <div className={S.boardTitleCont}></div>
      <div className={S.buttons}></div>
    </header>
  );
}

export default Header;
