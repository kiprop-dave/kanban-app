import useAppContext from "./hooks/useAppContext";
import S from "./App.module.css";
import BoardModal from "./components/Modal/BoardModal";
import SideBar from "./components/SideBar/SideBar";

function App() {
  const { boardModal } = useAppContext();
  return (
    <div className={S.app}>
      <SideBar />
      {boardModal && <BoardModal />}
    </div>
  );
}

export default App;
