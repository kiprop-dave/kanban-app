import useAppContext from "./hooks/useAppContext";
import S from "./App.module.css";
import BoardModal from "./components/Modal/BoardModal";
import SideBar from "./components/SideBar/SideBar";
import Header from "./components/Header/Header";

function App() {
  const { boardModal } = useAppContext();
  return (
    <div className={S.app}>
      <Header />
    </div>
  );
}

export default App;
