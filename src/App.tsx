import { useState } from "react";
import useAppContext from "./hooks/useAppContext";
import S from "./App.module.css";
import ModalWrapper from "./components/Modal/ModalWrapper";
import SideBar from "./components/SideBar/SideBar";
import Header from "./components/Header/Header";
import Kanban from "./components/Kanban/Kanban";

function App() {
  const { modal } = useAppContext();
  const [showSideBar, setShowSideBar] = useState<boolean>(true);

  const openSideBar = () => {
    setShowSideBar(true);
  };

  const closeSideBar = () => {
    setShowSideBar(false);
  };

  return (
    <div className={S.app}>
      <Header />
      <SideBar
        showSideBar={showSideBar}
        openSideBar={openSideBar}
        closeSideBar={closeSideBar}
      />
      <Kanban showSideBar={showSideBar} />
      {modal && <ModalWrapper />}
    </div>
  );
}

export default App;
