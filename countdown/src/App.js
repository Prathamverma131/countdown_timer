import './App.css';
import Container from './Container';
import CountDown from './CountDown';
import { useState } from 'react';

function App() {

  var [flag,setFlag] = useState(1);
  var [quote,setQuote] = useState(0);
  var [day,setDay] = useState(0);
  var [hour,setHour] = useState(0);
  var [minute,setMinute] = useState(0);
  var [second,setSecond] = useState(0);

  return (
    <div className="App">
      <Container setFlag={setFlag} setDay= {setDay} setHour={setHour} setMinute={setMinute} setSecond= {setSecond} setQuote={setQuote}/>
      <CountDown flag = {flag} day={day} hour = {hour} minute={minute} second ={second} quote={quote}/>
    </div>
  );
}

export default App;
