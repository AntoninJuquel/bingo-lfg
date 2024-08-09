import { Button } from "./ui/button";

export default function GithubButton() {
  return (
    <Button
      className="absolute bottom-2 left-2"
      size="icon"
      variant="link"
      onClick={() =>
        window.open("https://github.com/AntoninJuquel/bingo-lfg", "_blank")
      }
      title="Visit github"
    >
      <img
        src="/bingo-lfg/images/github-mark.png"
        alt="github"
        className="dark:invert"
      />
    </Button>
  );
}
