import Timer from "./Timer";
import Quote from "./Quote";


function CountDown({flag,day,hour,minute,second,quote}){


    return flag ? <div style={{display:"flex",flexWrap:"wrap",columnGap:20,rowGap:20,justifyContent:"center",marginBottom:"20px"}}>
        <Timer unit="Days" num={day}/>
        <Timer unit="Hours" num={hour}/>
        <Timer unit="Minutes" num={minute}/>
        <Timer unit="Seconds" num={second}/>
        </div> : <Quote quote={quote}/>

}

export default CountDown;