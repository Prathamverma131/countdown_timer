
function Quote({quote}){

    var quotes = ["Selected Time is more than 100 Days","The countdown is over! What's next on your adventure?","Invalid Time! Select time greater than current date"]

    return <div style={{color:"#AC0CFF",fontWeight:700}}>{quotes[quote]}</div>

}

export default Quote;