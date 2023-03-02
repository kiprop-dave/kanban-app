type MenuProps = {
  name: string;
  theme: string;
  deleteAction: (...args: any[]) => any;
  editAction: (...args: any[]) => any;
};

const DropMenu = ({
  name,
  theme,
  deleteAction,
  editAction,
}: MenuProps): JSX.Element => {
  return (
    <>
      <div className={`dropMenuContainer ${theme}`}>
        <button className={`menuButtons editBtn`} onClick={() => editAction()}>
          Edit {name}
        </button>
        <button
          className={`menuButtons deleteBtn`}
          onClick={() => deleteAction()}
        >
          Delete {name}
        </button>
      </div>
    </>
  );
};

export default DropMenu;
