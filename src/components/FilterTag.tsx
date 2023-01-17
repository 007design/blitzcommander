export default function ({
  filter,
  deleteTag
}: {
  filter: Filter;
  deleteTag: Function;
}) {
  return (
    <div className="tag">
      {filter.label}: {filter.value}
      <button className="delete-tag" onClick={() => deleteTag()} />
    </div>
  );
}
