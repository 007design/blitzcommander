import { useState } from "react";

export default function ModalSave(props: any) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setDone(true);
    setTimeout(() => setDone(false), 3000);
  };
  return (
    <div id="modal_save">
      <div>
        You can copy the URL from your browser's address bar to save a permalink to this army.
        Or just click this button. Note that the URL is long so you might want to use a
        shortener service like <a href="https://tinyurl.com/app/" target="_blank">TinyURL</a> to
        share it on social media.
      </div>
      <button id="permalink_button" className={ done ? 'done' : ''} onClick={copy}>
        { done ? 'Permalink copied!' : 'Copy permalink to clipboard' }
      </button>
    </div>
  )
}