import EyeSvg from "../EyeSvg";
import S from "./SideBar.module.css";
type Props = {
  showSideBar: () => void;
};

const ShowSideBar = ({ showSideBar }: Props): JSX.Element => {
  return (
    <>
      <button className={S.showSideBar} onClick={() => showSideBar()}>
        <EyeSvg />
      </button>
    </>
  );
};

export default ShowSideBar;
