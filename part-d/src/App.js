import React, {useState} from 'react';

/*
const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () =>{
    setAll(allClicks.concat('L'))
    setLeft(left+1)
  }

  const handleRightClick = () =>{
    setAll(allClicks.concat('R')) //does not mutate existing state but return new copy of array
    setLeft(right+1)
  }


  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>
        left
      </button>
      <button onClick={handleRightClick}>
        right
      </button>
      {right}
      <p>{allClicks.join(' ')}</p>
    </div>
  )
}
export default App;
*/


/*
const App = () =>{
  const [clicks,setClicks] = useState({
    left:0,right:0
  })

  const handleLeftClick = () =>{
    const newClicks = { //this is not a function but declare updated state value
        //left: clicks.left+1,
       // right:clicks.right
       ...clicks,//using object spread syntax
       left: clicks.left+1
    }
    setClicks(newClicks); //update the state value
  }

  const handleRightClick = () =>{
    const newClicks = {
      //left: clicks.left,
      //right:clicks.right + 1
      ...clicks, //using object spread syntax, creates new object with copies of default properties
      right: clicks.right + 1
    };
    setClicks(newClicks);
  }


  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>Left</button>
      <button onClick={handleRightClick}>Right</button>
      {clicks.right}
    </div>
  )


}
export default App;
*/

/*
//History Component
const History = ({allClicks}) => {
  if(allClicks.length === 0){
    return (<div>No click history, press either button to start</div>)
  }
  return (
  <div>
    button press history: {allClicks.join(' ')}
  </div>)
}

//Button Component
const Button = ({ handleClick, text }) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () =>{
    setAll(allClicks.concat('L'))
    setLeft(left+1)
  }

  const handleRightClick = () =>{
    setAll(allClicks.concat('R')) //does not mutate existing state but return new copy of array
    setRight(right+1)
  }


  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left'/>
      <Button handleClick={handleRightClick} text='right'/>
      {right}
      <History allClicks={allClicks}/>
    </div>
  )
}

*/

/*
const App = () => {
  const [value, setValue] = useState(10)

 
  /*const hello = (who) =>{
    const handler = () => {
      console.log('Konnichiwa',who)
    }
    return handler
  }*/

  /*
  const hello = (who) => {
    return () => {console.log('Konnichiwa',who)}
  }
  */
 //compact version
 /*
  const hello = (who) => () =>{console.log('Konnichiwa',who)}


  return (
    <div>
      {value}
      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  )
}*/

const App = () => {
  const [value, setValue] = useState(10)
  
 const setToValue = (newVal) =>{
   return () => {
     setValue(newVal)
   }
 }

  return (
    <div>
      {value}
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}


export default App;