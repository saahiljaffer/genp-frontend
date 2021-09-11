import Button from "./Button";

export default function MenuBar({
  fetchPdf,
  onToggleClick,
  CSS,
}: {
  fetchPdf: () => void;
  onToggleClick: () => void;
  CSS: boolean;
}) {
  return (
    <div className="flex place-content-center">
      <Button onClick={onToggleClick}>{CSS ? "HTML" : "CSS"}</Button>
      <Button onClick={fetchPdf}>Generate</Button>
    </div>
  );
}
