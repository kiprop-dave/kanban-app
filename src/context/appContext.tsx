import { createContext, useState, useEffect, useRef } from "react";
import { Board, ActiveModal, Task } from "../types/types";

interface AppContextProps {
  boards: Board[];
  activeBoard: Board | null;
  switchActiveBoard: (id: string) => void;
  createBoard: (board: Board) => void;
  deleteBoard: (id: string) => void;
  editBoard: (board: Board) => void;
  openModal: (modal: ActiveModal) => void;
  closeModal: () => void;
  modal: boolean;
  activeModal: ActiveModal;
  createTask: (task: Task, boardId: string, colId: string) => void;
  activeTask: Task | null;
  selectActiveTask: (colId: string, taskId: string) => void;
  deleteTask: () => void;
  updateTask: (task: Task, prevCol?: string) => void;
  dragStart: (task: Task) => void;
  dragEnter: (col: string) => void;
  dragEnd: () => void;
}

type ChildrenProps = {
  children: React.ReactNode;
};

const AppContext = createContext<AppContextProps | null>(null);

function AppProvider({ children }: ChildrenProps) {
  const [boards, setBoards] = useState<Board[]>(() => getLocalStorage());
  const [activeBoard, setActiveBoard] = useState<Board | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>("none");
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    if (boards.length > 0) {
      setActiveBoard(boards[0]);
    }
  }, []);

  function getLocalStorage(): Board[] {
    const boards = localStorage.getItem("kanban_boards");
    if (boards) {
      // TODO: Run type check here
      const existingBoards = JSON.parse(boards) as Board[];
      return existingBoards;
    }
    return [];
  }

  useEffect(() => {
    localStorage.setItem("kanban_boards", JSON.stringify(boards));
  }, [boards]);

  const switchActiveBoard = (id: string) => {
    const board = boards.find((board) => board.id === id);
    if (board) {
      setActiveBoard(board);
    }
  };

  const createBoard = (board: Board) => {
    setBoards((boards) => [...boards, board]);
    setActiveBoard(board);
  };

  const editBoard = (board: Board) => {
    let newBoards = boards.map((b) => (b.id === board.id ? board : b));
    setBoards(newBoards);
    setActiveBoard(board);
  };

  const deleteBoard = (id: string) => {
    setBoards((boards) => boards.filter((board) => board.id !== id));
    let newActiveBoard = boards.find((board) => board.id !== id) || null;
    setActiveBoard(newActiveBoard);
  };

  const createTask = (task: Task, boardId: string, colId: string) => {
    let newBoards = boards.map((board) => {
      if (board.id === boardId) {
        let newColumns = board.columns.map((col) => {
          if (col.id === colId) {
            return { ...col, tasks: [...col.tasks, task] };
          }
          return col;
        });
        return { ...board, columns: newColumns };
      }
      return board;
    });
    setBoards(newBoards);
    setActiveBoard(newBoards.find((board) => board.id === boardId) as Board);
  };

  const openModal = (modal: ActiveModal) => {
    setActiveModal(modal);
    setModal(true);
  };

  const closeModal = () => {
    setActiveModal("none");
    setModal(false);
  };

  const selectActiveTask = (colId: string, taskId: string) => {
    const task = activeBoard?.columns
      .find((col) => col.id === colId)
      ?.tasks.find((task) => task.id === taskId);
    if (task) {
      setActiveTask(task);
    }
  };

  const deleteTask = () => {
    if (activeBoard && activeTask) {
      let newBoards = boards.map((board) => {
        if (board.id === activeBoard.id) {
          let newColumns = board.columns.map((col) => {
            if (col.name === activeTask.column) {
              return {
                ...col,
                tasks: col.tasks.filter((task) => task.id !== activeTask.id),
              };
            }
            return col;
          });
          return { ...board, columns: newColumns };
        }
        return board;
      });
      setBoards(newBoards);
      setActiveBoard(
        newBoards.find((board) => board.id === activeBoard.id) as Board
      );
      setActiveTask(null);
    }
  };

  const updateTask = (task: Task, previousCol?: string) => {
    const { column, id } = task;
    let newBoards = boards.map((board) => {
      if (board.id === activeBoard?.id) {
        let newColumns = board.columns.map((col) => {
          if (previousCol && col.name === previousCol) {
            return {
              ...col,
              tasks: col.tasks.filter((t) => t.id !== id),
            };
          }
          if (previousCol && col.name === column) {
            return {
              ...col,
              tasks: [...col.tasks, task],
            };
          }
          if (col.name === column) {
            return {
              ...col,
              tasks: col.tasks.map((t) => (t.id === id ? task : t)),
            };
          }
          return col;
        });
        return { ...board, columns: newColumns };
      }
      return board;
    });
    setBoards(newBoards);
    setActiveBoard(
      newBoards.find((board) => board.id === activeBoard?.id) as Board
    );
  };

  // TODO:Create drag and drop feature
  const dragItem = useRef<Task | null>(null);
  const dragOverItem = useRef<string | null>(null);

  const dragStart = (task: Task) => {
    const _task = JSON.parse(JSON.stringify(task)) as Task;
    dragItem.current = _task;
  };

  const dragEnter = (column: string) => {
    dragOverItem.current = column;
  };

  const dragEnd = () => {
    if (!dragItem.current || !dragOverItem.current) return;
    const drag = dragItem.current;
    const over = dragOverItem.current;
    if (drag.column === over) {
      dragItem.current = null;
      dragOverItem.current = null;
      return;
    } else {
      let newBoards = boards.map((brd) => {
        if (brd.id === activeBoard?.id) {
          let newColumns = brd.columns.map((col) => {
            if (col.name === drag.column) {
              return {
                ...col,
                tasks: col.tasks.filter((tsk) => tsk.id !== drag.id),
              };
            } else if (col.name === over) {
              return { ...col, tasks: [...col.tasks, drag] };
            }
            return col;
          });
          return { ...brd, columns: newColumns };
        }
        return brd;
      });
      drag.column = over;
      setBoards(newBoards);
      setActiveBoard(
        newBoards.find((board) => board.id === activeBoard?.id) as Board
      );
      dragItem.current = null;
      dragOverItem.current = null;
    }
  };

  const values: AppContextProps = {
    boards,
    activeBoard,
    switchActiveBoard,
    createBoard,
    deleteBoard,
    editBoard,
    openModal,
    closeModal,
    modal,
    activeModal,
    createTask,
    activeTask,
    selectActiveTask,
    deleteTask,
    updateTask,
    dragStart,
    dragEnter,
    dragEnd,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
