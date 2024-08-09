import { ShuffleIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  bingoListsNames,
  useBingoActions,
  useBingoState,
} from "@/lib/bingoStore";

export default function BingoListInput() {
  const { listName } = useBingoState();
  const { setList, shuffleList } = useBingoActions();

  function handleListClick(e: React.MouseEvent<HTMLButtonElement>) {
    const url = e.currentTarget.dataset.url!;
    setList(url);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-4 justify-items-center w-fit">
        {bingoListsNames
          .filter((name) => !name.includes("general"))
          .map((name) => (
            <button
              className="relative group border-2 border-transparent data-[selected=true]:border-primary rounded-sm overflow-hidden"
              onClick={handleListClick}
              data-url={name}
              data-selected={name === listName}
              key={name}
            >
              <h2 className="text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-xl font-bold uppercase opacity-0 group-hover:opacity-100 group-data-[selected=true]:opacity-100 z-50">
                {name.replace(/-/g, " ")}
              </h2>
              <img
                src={`./images/${name}.jpg`}
                alt={name}
                className="h-52 group-hover:blur-sm rounded-sm group-data-[selected=true]:blur-sm"
              />
            </button>
          ))}
      </div>
      <div className="flex flex-col items-center justify-center mt-2 gap-2">
        <Button size="icon" variant="default" onClick={shuffleList}>
          <ShuffleIcon className="w-4 h-4" />
        </Button>
        <p className="text-sm text-center">{listName}</p>
      </div>
    </div>
  );
}
