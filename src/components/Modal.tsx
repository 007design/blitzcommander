export default function Modal(props: any) {
  return (
    <div id="modal" className={props.showModal ? 'show' : ''}>
      <div id="modal_overlay" onClick={props.hide} />
      <div id="modal_content">
        <button className="close-modal delete-button" onClick={props.hide} />
        {props.children}
      </div>
    </div>
  )
}