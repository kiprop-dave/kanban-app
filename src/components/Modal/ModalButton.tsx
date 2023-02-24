import useThemeContext from "../../hooks/useThemeContext";

interface ModalButtonProps {
  text: string;
  action: (e: React.SyntheticEvent, ...args: any[]) => void;
  type: "button" | "submit";
  actionType: "add" | "create" | "delete";
}

type ButtonStyle = {
  backgroundColor: string;
  color: string;
};

function ModalButton({
  text,
  actionType,
  action,
  type,
}: ModalButtonProps): JSX.Element {
  const { isLightTheme } = useThemeContext();

  let buttonStyle: ButtonStyle;

  if (isLightTheme) {
    switch (actionType) {
      case "add":
        buttonStyle = {
          color: "#635FC7",
          backgroundColor: "#F0eFFA",
        };
        break;
      case "create":
        buttonStyle = {
          color: "#ffffff",
          backgroundColor: "#635FC7",
        };
        break;
      case "delete":
        buttonStyle = {
          color: "#ffffff",
          backgroundColor: "#ea5555",
        };
        break;
    }
  } else {
    switch (actionType) {
      case "add":
        buttonStyle = {
          color: "#635FC7",
          backgroundColor: "#ffffff",
        };
        break;
      case "create":
        buttonStyle = {
          color: "#ffffff",
          backgroundColor: "#635FC7",
        };
        break;
      case "delete":
        buttonStyle = {
          color: "#ffffff",
          backgroundColor: "#ea5555",
        };
        break;
    }
  }

  return (
    <>
      <button type={type} onClick={(e) => action(e)} style={buttonStyle}>
        {text}
      </button>
    </>
  );
}

export default ModalButton;
