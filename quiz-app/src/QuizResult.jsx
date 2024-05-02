import React from "react"

const QuizResult = (props) => {
    return (
      <>
      <div className='score-section'>
           Score:{" " +props.score +  "/" + props.totalScore}
      </div>
      <button className="btn-try-again" onClick={props.tryAgain}>Try Again</button>
      </>
    )
  }
  
  export default QuizResult