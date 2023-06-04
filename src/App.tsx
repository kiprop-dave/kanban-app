import { useState } from "react";
import useAppContext from "./hooks/useAppContext";
import S from "./App.module.css";
import ModalWrapper from "./components/Modal/ModalWrapper";
import SideBar from "./components/SideBar/SideBar";
import Header from "./components/Header/Header";
import Kanban from "./components/Kanban/Kanban";
import useThemeContext from "./hooks/useThemeContext";

function App() {
  const { modal } = useAppContext();
  const { isLightTheme, theme1 } = useThemeContext();
  const [showSideBar, setShowSideBar] = useState<boolean>(true);

  const openSideBar = () => {
    setShowSideBar(true);
  };

  const closeSideBar = () => {
    setShowSideBar(false);
  };

  let slideTransition = showSideBar ? S.slideIn : S.slideOut;
  let dynamicBorder = isLightTheme ? S.lightBorder_right : S.darkBorder_right;

  return (
    <div className={S.app}>
      <Header />
      <div className={`${slideTransition} ${S.fixed_side} ${dynamicBorder} ${theme1}`}>
        <div className={S.sidebar_container}>
          <SideBar
            showSideBar={showSideBar}
            openSideBar={openSideBar}
            closeSideBar={closeSideBar}
          />
        </div>
      </div>
      <Kanban showSideBar={showSideBar} />
      {modal && <ModalWrapper />}
    </div>
  );
}

export default App;
