import Button from "./Button";

export default function MenuBar({
  fetchPdf,
  onToggleClick,
}: {
  fetchPdf: () => void;
  onToggleClick: () => void;
}) {
  return (
    <div className="flex place-content-center">
      <Button onClick={onToggleClick}>{CSS ? "HTML" : "CSS"}</Button>
      <Button onClick={fetchPdf}>Generate</Button>
    </div>
  );
}
