import { create } from "zustand";

interface BingoState {
  height: number;
  width: number;
  listName: string;
}

interface BingoActions {
  setHeight: (height: number) => void;
  setWidth: (width: number) => void;
  setList: (list: string) => void;
  shuffleSize: () => void;
  shuffleList: () => void;
}

interface BingoStore extends BingoState {
  actions: BingoActions;
}

export const minSize = 2;
export const maxSize = 8;
export const bingoLists: Record<string, string> = {
  general:
    "https://raw.githubusercontent.com/AntoninJuquel/bingo-lfg/main/src/assets/data/general.json",
  "crotas-end":
    "https://raw.githubusercontent.com/AntoninJuquel/bingo-lfg/main/src/assets/data/crotas-end.json",
  "deep-stone-crypt":
    "https://raw.githubusercontent.com/AntoninJuquel/bingo-lfg/main/src/assets/data/deep-stone-crypt.json",
  "garden-of-salvation":
    "https://raw.githubusercontent.com/AntoninJuquel/bingo-lfg/main/src/assets/data/garden-of-salvation.json",
  "kings-fall":
    "https://raw.githubusercontent.com/AntoninJuquel/bingo-lfg/main/src/assets/data/kings-fall.json",
  "last-wish":
    "https://raw.githubusercontent.com/AntoninJuquel/bingo-lfg/main/src/assets/data/last-wish.json",
  "root-of-nightmares":
    "https://raw.githubusercontent.com/AntoninJuquel/bingo-lfg/main/src/assets/data/root-of-nightmares.json",
  "salvations-edge":
    "https://raw.githubusercontent.com/AntoninJuquel/bingo-lfg/main/src/assets/data/salvations-edge.json",
  "vault-of-glass":
    "https://raw.githubusercontent.com/AntoninJuquel/bingo-lfg/main/src/assets/data/vault-of-glass.json",
  "vow-of-the-disciple":
    "https://raw.githubusercontent.com/AntoninJuquel/bingo-lfg/main/src/assets/data/vow-of-the-disciple.json",
};
export const bingoListsNames = Object.keys(bingoLists);
export const defaultState: BingoState = {
  height: 5,
  width: 5,
  listName: bingoListsNames[0],
};

export async function loadList(name: string): Promise<string[]> {
  if (name in bingoLists) {
    const response = await fetch(bingoLists[name]);
    return response.json();
  }

  return [];
}

function clampValue(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

const useBingoStore = create<BingoStore>((set) => ({
  height: defaultState.height,
  width: defaultState.width,
  listName: defaultState.listName,
  actions: {
    setHeight: (height) =>
      set({ height: clampValue(height, minSize, maxSize) }),
    setWidth: (width) => set({ width: clampValue(width, minSize, maxSize) }),
    setList: (newList) =>
      set(({ listName }) => ({
        listName: newList === listName ? defaultState.listName : newList,
      })),
    shuffleSize: () => {
      set({
        height: Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
        width: Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
      });
    },
    shuffleList: () =>
      set({
        listName:
          bingoListsNames[Math.floor(Math.random() * bingoListsNames.length)],
      }),
  },
}));

export const useBingoState = () => useBingoStore((state) => state);

export const useBingoActions = () => useBingoStore((state) => state.actions);
