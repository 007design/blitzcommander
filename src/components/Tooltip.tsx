export default function Tooltip(props: any) {
  let styles = {};
  
  if (props.el) {
    styles = {
      top: props.el.top - 6,
      left: props.el.left + (props.el.width/2),
      translate: '-50% -100%'
    };
  }

  return (
    <div id="tooltip_container" className={props.show ? 'show' : ''}>
      <div id="tooltip_overlay" onClick={props.hide} />
      <div id="tooltip" style={styles}>
        <div id="tooltip_content">
          <button className="close-tooltip" onClick={props.hide} />
          {props.children}
        </div>
      </div>
    </div>
  )
}