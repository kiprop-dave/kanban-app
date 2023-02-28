import useThemeContext from "../../hooks/useThemeContext";
import S from "./Modal.module.css";
import { SubTask as subTask } from "../../types/types";
import CheckBox from "./CheckBox";

type SubTaskProps = {
  subTask: subTask;
  index: number;
  action: (index: number) => void;
};

const SubTask = ({ subTask, index, action }: SubTaskProps): JSX.Element => {
  const { theme2, isLightTheme } = useThemeContext();

  const textStyle: React.CSSProperties = {
    textDecoration: subTask.completed ? "line-through" : "none",
  };

  return (
    <>
      <div className={`${S.subTaskContainer} ${theme2}`}>
        <CheckBox
          checked={subTask.completed}
          action={() => action(index)}
          isLightTheme={isLightTheme}
        />
        <p className={`${S.par} util`} style={textStyle}>
          {subTask.description}
        </p>
      </div>
    </>
  );
};

export default SubTask;
