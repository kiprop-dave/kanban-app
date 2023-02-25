import S from "./Kanban.module.css";
import generateRGB from "../../utils/generateRGB";
import { Column } from "../../types/types";

type ColumnProps = {
  column: Column;
};

const BoardColumn = ({ column }: ColumnProps): JSX.Element => {
  const { name, tasks } = column;

  return (
    <>
      <div className={`${S.columnContainer}`}>
        <div className={`${S.columnHeader}`}>
          <span className={`${S.icon}`}></span>
          <h3 className={`${S.columnTitle}`}>{name.toUpperCase()}</h3>
        </div>
      </div>
    </>
  );
};

export default BoardColumn;
