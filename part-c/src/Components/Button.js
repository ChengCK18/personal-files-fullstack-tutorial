/*
const Button = (props) => {
    return(
      <button onClick={props.handleClick}>{props.text}</button>
    );
}

  export default Button;

  */

//Simplified format
const Button = ({handleClick,text}) => <button onClick={handleClick}>{text}</button>
  

export default Button;