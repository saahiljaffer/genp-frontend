export default function Button(props: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className="m-2 font-sans font-medium py-2 px-4 border rounded bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-700"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
