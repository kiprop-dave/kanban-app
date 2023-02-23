import { useState } from "react";
import useAppContext from "./hooks/useAppContext";
import S from "./App.module.css";
import BoardModal from "./components/Modal/BoardModal";
import SideBar from "./components/SideBar/SideBar";
import Header from "./components/Header/Header";
import Kanban from "./components/Kanban/Kanban";

function App() {
  const { boardModal } = useAppContext();
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
      {boardModal && <BoardModal />}
    </div>
  );
}

export default App;
