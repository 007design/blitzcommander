import { useLayoutEffect, useRef, useState } from "react";

export default function Tooltip(props: any) {
  let [styles, setStyles] = useState<Object>({});
  let [offset, setOffset] = useState<Object>({
    translate: '-50% -100%'
  });

  const tooltip = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {  
    if (props.el) {
      if (!props.show) {
        setStyles({})
        setOffset({
          translate: '-50% -100%'
        })
      } else {
        setStyles({
          top: props.el.top - 6,
          left: props.el.left + (props.el.width/2),
          translate: '-50% -100%'
        });

        const contentRect = tooltip.current?.getBoundingClientRect();
        const leftOffset = props.el.left + (props.el.width/2) - ((contentRect?.width || 310) / 2);
        const rightOffset = props.el.left + (props.el.width/2) + ((contentRect?.width || 330) / 2);
    
        let translateX = '-50%';
        if (leftOffset < 0) {
          translateX = `${leftOffset + 60}px`;
        } else if (rightOffset > window.innerWidth) {
          translateX = `${((rightOffset - window.innerWidth + 160) * -1)}px`;
        }
    
        setOffset({
          translate: `${translateX} -100%`
        });
      }
    }
  }, [props.show]);

  return (
    <div id="tooltip_container" className={props.show ? 'show' : ''}>
      <div id="tooltip" style={styles}>
        <div id="tooltip_content" ref={tooltip} style={offset}>
          <button className="close-tooltip" onClick={props.hide} />
          {props.children}
        </div>
      </div>
    </div>
  )
}