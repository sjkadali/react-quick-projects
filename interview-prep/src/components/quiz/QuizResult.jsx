import React from "react"

const QuizResult = (props) => {
    return (    
      <div className='score-section'>
           Score:{" " +props.score +  "/" + props.totalScore}
           <button className="btn-try-again" onClick={props.tryAgain}>Try Again</button>
      </div>
    )
  }
  
  export default QuizResult