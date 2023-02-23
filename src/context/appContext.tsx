import { createContext, useState, useEffect } from "react";
import { Board, ActiveModal } from "../types/types";

interface AppContextProps {
  boards: Board[];
  activeBoard: Board | null;
  switchActiveBoard: (id: string) => void;
  createBoard: (board: Board) => void;
  deleteBoard: (id: string) => void;
  openModal: (modal: ActiveModal) => void;
  closeModal: () => void;
  modal: boolean;
  activeModal: ActiveModal;
}

type ChildrenProps = {
  children: React.ReactNode;
};

const AppContext = createContext<AppContextProps | null>(null);

function AppProvider({ children }: ChildrenProps) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [activeBoard, setActiveBoard] = useState<Board | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>("none");

  useEffect(() => {
    if (boards.length > 0) {
      setActiveBoard(boards[0]);
    }
  }, []);

  useEffect(() => {
    const boards = localStorage.getItem("kanban_boards");
    if (boards) {
      setBoards(JSON.parse(boards));
    }
  }, []);

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

  const deleteBoard = (id: string) => {
    setBoards((boards) => boards.filter((board) => board.id !== id));
  };

  const openModal = (modal: ActiveModal) => {
    setActiveModal(modal);
    setModal(true);
  };

  const closeModal = () => {
    setActiveModal("none");
    setModal(false);
  };

  const values: AppContextProps = {
    boards,
    activeBoard,
    switchActiveBoard,
    createBoard,
    deleteBoard,
    openModal,
    closeModal,
    modal,
    activeModal,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
