import { useState } from "react";
import useThemeContext from "../hooks/useThemeContext";

type Props = {
  action: (...args: any[]) => any;
};

const DropButton = ({ action }: Props): JSX.Element => {
  const { theme2 } = useThemeContext();
  const [hoverBg, setHoverBg] = useState<string>("");

  return (
    <div
      className={`dropButton ${hoverBg}`}
      onClick={() => action()}
      role="button"
      aria-label="open menu"
      onMouseEnter={() => setHoverBg(theme2)}
      onMouseLeave={() => setHoverBg("")}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default DropButton;
