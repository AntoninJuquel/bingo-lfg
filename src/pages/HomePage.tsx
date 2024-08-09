import BingoListInput from "@/components/BingoListInput";
import BingoSizeInput from "@/components/BingoSizeInput";
import { DarkLightButton } from "@/components/DarkLightButton";
import GithubButton from "@/components/GithubButton";

export default function HomePage() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="w-full p-4 flex flex-1 justify-center items-center">
        <h1 className="text-4xl font-bold text-center text-primary p-4">
          Bingo LFG
        </h1>
        <DarkLightButton />
      </header>
      <main className="w-full h-fit flex justify-center items-center">
        <BingoListInput />
      </main>
      <footer className="w-full p-4 flex flex-1 justify-center items-center">
        <BingoSizeInput />
        <GithubButton />
      </footer>
    </div>
  );
}
