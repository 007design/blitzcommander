export default function ModalTraits(props: any) {
  const traits = Object.keys(props.tooltips).map((key:string) => (
    {
      key: key,
      value: props.tooltips[key]
    }
  )).filter(({value}:{value:string}) => !/^(?<name>.+) (?<range>\d.*\/.+) Dmg:(?<damage>\d+) (?<traits>.*)(?<mode>[A-Z])$/.test(value))
  .sort((a, b) => a.key.localeCompare(b.key));

  return (
    <div id="modal_traits">
      <div className="modal-scroll">
        {
          traits.map((trait) => (
            <div className="trait-row">
              <h2>{trait.key}</h2>
              {trait.value}
            </div>
          ))
        }
      </div>
    </div>
  )
}