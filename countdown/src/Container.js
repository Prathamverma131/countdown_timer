import styles from './Container.module.css';
import { useEffect, useRef, useState } from 'react';
import beep from './beep.mp3.wav';

function Container({setFlag,setDay,setHour,setMinute,setSecond,setQuote}){

    const [selectedDate, setSelectedDate] = useState('');
    const [btn,setBtn] = useState(true);
    const tracker = useRef(null);
    const [timer,setTimer] = useState(null);

    useEffect(()=>{
        if(localStorage.getItem("date")){
        setSelectedDate(localStorage.getItem("date"));}
            setTimer(localStorage.getItem("hour"));
    },[]);

    

    useEffect(()=>{

        if(timer<=0){
            clearInterval(tracker.current);
            if(selectedDate){
            setFlag(0);
            setQuote(1);
            setBtn(true);
            playsound()}
        }else{
            localStorage.setItem("hour",timer);
            let ts = parseInt(Math.floor(timer/1000));
            let min = parseInt(Math.floor(ts/60));
            let hour = parseInt(Math.floor(min/60));
            let day = parseInt(Math.floor(hour/24));
            ts = ts%60;
            min = min%60;
            hour = hour%24;
            setSecond(ts);
            setMinute(min);
            setHour(hour);
            setDay(day);

        }



    },[timer,selectedDate]);

  

    function playsound(){
        const beepS = new Audio(beep);
        beepS.play();
    }

    function start(){
        tracker.current = setInterval(()=>{
            setTimer((prev)=>prev-1000);
        },1000)
    }

    


    function clock(){

        if(selectedDate&&timer){
            
            if(btn){
                start();
            }else{
                clearInterval(tracker.current);
            }
            setBtn(!btn);

    }
}

    function getTargetDate(date){

        var res = [];
        
        var d = date.split("T");
        var year = d[0].split("-");
        var time = d[1].split(":");
        time = time.map((item)=>parseInt(item));
        year = year.map((item)=>parseInt(item));
        res = [...year,...time];
        return res;
    }
    function getCurrentDate(){

        var res = [];
        const currentDate = new Date();
        const currentSecond = currentDate.getSeconds();
    const currentMinute = currentDate.getMinutes();
    const currentHour = currentDate.getHours();
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    res = [currentYear,currentMonth+1,currentDay,currentHour,currentMinute,currentSecond];
    return res; 
    }



    function validateTime(target,current){

        var a = target[0]*12*30 + target[1]*30 + target[2];
        var b = current[0]*12*30 + current[1]*30 + current[2];
        

        if(a-b===0){

            if(target[3]>current[3]){
                return true;
            }else if(target[3]===current[3]&&target[4]>current[4]){
                return true;
            }else{
                return false;
            }  
        }

        if(a-b>=1&&a-b<100){
            
            return true;
        }

        if(a-b<0){
            
            return -1;
        }

        return false;
    }

    function setTime(target,current){
        var a = target[0]*12*30 + target[1]*30 + target[2];
        var b = current[0]*12*30 + current[1]*30 + current[2];
        let days = a-b;
        let hours = target[3] - current[3];
        let minutes = target[4] - current[4];
        if(hours<0){
            hours = 12+hours;
            days--;
        }
        if(minutes<0){
            minutes = 60 + minutes;
            hours--;
        }
        const seconds = 0;
        setDay(days);
        setHour(hours);
        setMinute(minutes);
        setSecond(seconds);
        
        var ts = (days*24*60*60*1000)+ (hours*60*60*1000) + (minutes*60*1000) + (seconds*1000);
        setTimer(ts);
        localStorage.setItem("hour",ts);
       
    }


  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    localStorage.setItem("date",event.target.value);
    
    const target = getTargetDate(event.target.value);
    const current = getCurrentDate();

    if(validateTime(target,current)===-1){
      
        setFlag(0);
        setQuote(2);
    }
    else if(validateTime(target,current)){
        setFlag(1);
        setTime(target,current);
    }
    else{
        setFlag(0);
        setQuote(0);
    }
    
  };

    return <div className={styles.flex}>
        <div className={styles.container}>Countdown <span style={{color:"#AE00FF"}}>Timer</span> </div>
        <input type="datetime-local" className={styles.time} value={selectedDate} onChange={handleDateChange}/>
        <button className={styles.btn} onClick={()=>clock()} >{btn?"Start Timer":"Stop timer"} </button>
    </div>

}

export default Container;