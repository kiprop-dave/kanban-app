import S from "./Modal.module.css";

type CheckBoxProps = {
  checked: boolean;
  action: (...args: any) => void;
  isLightTheme: boolean;
};

const CheckBox = ({
  checked,
  action,
  isLightTheme,
}: CheckBoxProps): JSX.Element => {
  let containerStyle: React.CSSProperties = {
    backgroundColor: checked ? "#635FC7" : isLightTheme ? "#ffff" : "#2B2C37",
  };

  return (
    <>
      <div
        className={`${S.checkContainer}`}
        role="checkbox"
        aria-checked={checked}
        onClick={() => action()}
        style={containerStyle}
      >
        {checked && (
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M17 9L9.99998 16L6.99994 13"
                stroke="#ffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        )}
      </div>
    </>
  );
};

export default CheckBox;
