/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
/*
 //Bad practice to make repeated calls to ReactDOM.render 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let counter = 1;
const refresh = () =>{
  ReactDOM.render(
    <App counter={counter}/>,
    document.getElementById('root')
  );
}


setInterval(() =>{
  refresh();
  counter+=1;
},1000) //what to do(in this case an arrow fn)/ how long is the delay

*/

import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App/>,document.getElementById('root'));