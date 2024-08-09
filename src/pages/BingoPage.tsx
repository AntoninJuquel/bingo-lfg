import { Link, useParams, useSearchParams } from "react-router-dom";
import BingoGrid from "@/components/BingoGrid";
import { useEffect, useState } from "react";
import { defaultState, loadList } from "@/lib/bingoStore";
import { DarkLightButton } from "@/components/DarkLightButton";
import { Button } from "@/components/ui/button";
import GithubButton from "@/components/GithubButton";

export default function BingoPage() {
  const { id } = useParams();

  const [searchParams] = useSearchParams();

  const width = parseInt(
    searchParams.get("width") || defaultState.width.toString()
  );
  const height = parseInt(
    searchParams.get("height") || defaultState.height.toString()
  );
  const list = searchParams.get("list") || defaultState.listName;

  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const items = [
        ...new Set<string>([
          ...(await loadList(list)),
          ...(await loadList(defaultState.listName)),
        ]),
      ];

      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }

      setItems(items);

      document.title = `Bingo LFG - ${list.replace(/-/g, " ").toUpperCase()}`;
    })();
  }, [list, width, height]);

  return (
    <div id={id} className="flex flex-col justify-center items-center h-screen w-screen">
      <DarkLightButton />
      <GithubButton />
      <BingoGrid
        height={Number(height)}
        width={Number(width)}
        items={items}
        name={list.replace(/-/g, " ")}
      />
      <Button className="mt-2" asChild>
        <Link to="/">Back</Link>
      </Button>
    </div>
  );
}
