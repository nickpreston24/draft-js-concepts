import pallete from "../../pallete.json";

export const PrimaryButton = props => {

  const toggle = props.onToggle || function () { }; // for the strange case where this is null.
  const style = props.style;

  const onToggle = event => {
    event.preventDefault();
    toggle(style)
  };

  let className = "RichEditor-styleButton";

  if (props.active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span className={className} onMouseDown={onToggle}>
      <button onClick={props.onClick}>{props.children || props.label}</button>
      <style jsx>{`
        button{
            border: "2px solid" + ${pallete.primary.teal};
            color:${pallete.primary.blue};
            background-color:${pallete.primary.white};
            display:inline-block;
            padding:0.3em 1.2em;
            margin:0 0.3em 0.3em 0;
            border-radius:2em;
            box-sizing: border-box;
            text-decoration:none;
            font-family:'Roboto',sans-serif;
            font-weight:400;
            text-align:center;
            transition: all 0.2s;
          }          
          button:hover{
            background-color:${pallete.secondary.eggshell};
            border-color: ${pallete.primary.blue}
          }
          @media all and (max-width:30em){
           button{
            display:block;
            margin:0.2em auto;
           }
          } 
      `}</style>
    </span>
  );
};
