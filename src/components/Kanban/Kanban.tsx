import S from "./Kanban.module.css";
import useAppContext from "../../hooks/useAppContext";
import useThemeContext from "../../hooks/useThemeContext";

type KanbanProps = {
  showSideBar: boolean;
};

const Kanban = ({ showSideBar }: KanbanProps): JSX.Element => {
  const { theme2 } = useThemeContext();

  let toggleClass = !showSideBar ? S.hidden : "";

  return (
    <>
      <section className={`${S.container} ${theme2} ${toggleClass}`}>
        Test
      </section>
    </>
  );
};

export default Kanban;
