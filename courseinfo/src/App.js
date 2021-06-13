/*
const App = () => {
  const course = 'Half Stack Application Development';
  const part = ['Fundamentals of React','Using props to pass data','State of a component'];
  const exercises = [10,7,14];

  return (
    <div>
      <Header course = {course}/>
      <Content part = {part} exercises = {exercises}/>
      <Total sum = {exercises.reduce((a,b)=>a+b,0)}/>
    </div>
  );
}


const Header = (props) =>{
  return(
  <div>
    <h1>{props.course}</h1>
  </div>
  );
}

const Content = (props) =>{
  let items = []
  for (var x = 0; x<3; x++){
    items.push(<p>{props.part[x]} {props.exercises[x]}</p>)
  }

  return(
    <div>
      {items}
    </div>
  );
}

const Total = (props) =>{
  return(
    <div>
      <p>Number of exercises {props.sum}</p>
    </div>
  );
}

export default App;
*/


/* //EXERCISE 1.1 - 1.2
const App = () => {
  const course = 'Half Stack Application Development';
  const part1 ='Fundamentals of React' ;
  const part2 = 'Using props to pass data';
  const part3 = 'State of a component';
  const exercise1 = 10;
  const exercise2 = 7;
  const exercise3 = 14;



  return (
    <div>
      <Header course = {course}/>
      <Content part1 = {part1} part2 = {part2} part3 = {part3} exercise1 = {exercise1} exercise2 = {exercise2} exercise3 = {exercise3}/>
      <Total sum = {exercise1 + exercise2 + exercise3}/>
    </div>
  );
}


const Header = (props) =>{
  return(
  <div>
    <h1>{props.course}</h1>
  </div>
  );
}


const Content = (props) =>{
  return(
    <div>
      <Part part={props.part1} exercise={props.exercise1}/>
      <Part part={props.part2} exercise={props.exercise2}/>
      <Part part={props.part3} exercise={props.exercise3}/>
    </div>
  );
}

const Part = (props) =>{
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  );
}



const Total = (props) =>{
  return(
    <div>
      <p>Number of exercises {props.sum}</p>
    </div>
  );
}

export default App;
*/


//EXERCISE 1.3 - 1.5
const App = () => {
  const course = { 
    name:'Half Stack Application Development',
    parts:[
      {
        name:'Fundamentals of React',
        exercises: 10
      },
      {
        name:'Using props to pass data',
        exercises:7
      },
      {
        name:'State of a component',
        exercises:14
      }
    ]
  }
  



  return (
    <div>
      <Header course = {course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  );
}


const Header = (props) =>{
  return(
  <div>
    <h1>{props.course.name}</h1>
  </div>
  );
}


const Content = (props) =>{
  //console.log(props.parts);
  return(
    <div>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]} />
    </div>
  );
}

const Part = (props) =>{
  //console.log(props.part);
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  );
}

const Total = (props) =>{
  console.log(props.parts[0].exercises)

  return(
    <div>
      <p>Number of exercises {props.parts[0].exercises + 
        props.parts[1].exercises +
        props.parts[2].exercises
      }</p>
    </div>
  );
}

export default App;