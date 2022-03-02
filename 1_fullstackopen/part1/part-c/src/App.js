
/*
const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello  age={age} name={name} />
    </div>
  )
}

export default App;
*/

/*
import React from 'react';


const App = ({counter}) =>{
  return(<div>{counter}</div>);
}

export default App;
*/

/*
import React, {useState} from 'react';

const App = () =>{
  const [counter,setCounter] = useState(0);
  setTimeout(
    () => setCounter(counter+1),
    3000
  );

  console.log('renderinguuuu...',counter);
  return (<div>{counter}</div>);

}

export default App;
*/

/*
import React, {useState} from 'react';

const App = () =>{
  const [counter,setCounter] = useState(0);
  //const handleClick = () =>{
   // console.log('Clicked!');
  //}

  const increaseByOne = () => setCounter(counter+1);
  const setToZero = () => setCounter(0);

  return (
    <div>
        <div>{counter}</div>
        <button onClick={increaseByOne}>plus</button>
        <button onClick={setToZero}>set to zero</button>
    </div>);

}

export default App;

*/


import React, {useState} from 'react';
import Display from './Components/Display';
import Button from './Components/Button';

const App = () =>{
  const [counter,setCounter] = useState(0);
  
  const increaseByOne = () => setCounter(counter+1);
  const decreaseByOne = () => setCounter(counter-1);
  const setToZero = () => setCounter(0);

  return (
    <div>
        <Display counter={counter}/>
        <Button handleClick = {decreaseByOne} text= 'Minus 1'/>
        <Button handleClick = {setToZero} text= 'Set to zero'/>
        <Button handleClick = {increaseByOne} text= 'Plus 1'/>
    </div>);

}


//better practice is to place each components in a Component folder 
//and import it here yea



export default App;