export default function DeleteUnitButton (props: any) {
  return (
    <button
      className="delete-button"
      onClick={(e) => props.deleteUnit(props.cgIndex, props.index)}
    >
      {props.children}
    </button>
  );
}
