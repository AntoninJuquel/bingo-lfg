import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ShuffleIcon } from "lucide-react";
import { maxSize, minSize, useBingoActions, useBingoState } from "@/lib/bingoStore";

function generateRandomId() {
  return Math.random().toString(36).substring(2, 15);
}

export default function BingoSizeInput() {
  const { width, height, listName } = useBingoState();
  const { setWidth, setHeight, shuffleSize } = useBingoActions();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value, 10);
    if (e.target.name === "width") {
      setWidth(value);
    } else {
      setHeight(value);
    }
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <Button size="icon" variant="default" onClick={shuffleSize}>
        <ShuffleIcon className="w-4 h-4" />
      </Button>
      <Input
        name="width"
        type="number"
        value={width}
        onChange={handleChange}
        className="w-10 text-center"
        min={minSize}
        max={maxSize}
      />
      <span>x</span>
      <Input
        name="height"
        type="number"
        value={height}
        onChange={handleChange}
        className="w-10 text-center"
        min={minSize}
        max={maxSize}
      />

      <Button asChild>
        <Link
          to={`/bingo/${generateRandomId()}?width=${width}&height=${height}&list=${listName}`}
        >
          Create
        </Link>
      </Button>
    </div>
  );
}
