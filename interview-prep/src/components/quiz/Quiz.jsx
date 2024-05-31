import React, { useState, useEffect } from "react";
import QuizResult from "./QuizResult";

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [quizStarted, setQuizStarted] = useState(false);
    const [showResult,setShowResult]=useState(false);
  
    // Sample questions
    const questions = [
      {
        question: "What is the capital of Massachussets?",
        options: [
            { optionsText: "Boston", isCorrect: true },
            { optionsText: "Springfield", isCorrect: false },
            { optionsText: "Worcester", isCorrect:  false}
        ]
      },
      {
        question: "What is the capital of NewJersey?",
        options: [
            { optionsText: "JerseyCity", isCorrect: false },
            { optionsText: "Trenton", isCorrect: true },
            { optionsText: "Worcester", isCorrect:  false}
        ]
      },
      {
        question: "What is the capital of Illnois?",
        options: [
            { optionsText: "Chicago", isCorrect: false },
            { optionsText: "Naperville", isCorrect: false },
            { optionsText: "Sprinfield", isCorrect:  true}
        ]
      },
      // Add more questions here...
    ];
  
    useEffect(() => {
      let interval;
      if (quizStarted) {
        interval = setInterval(() => {
          if (timer === 0) {
            clearInterval(interval);
            endQuiz();
          }
          setTimer(prevTimer => prevTimer - 1);
        }, 1000);
      }      
      return () => clearInterval(interval);
    }, [quizStarted, timer]);
  
    const startQuiz = () => {
      setQuizStarted(true);
      setTimer(30);
    };
  
    const endQuiz = () => {       
        setQuizStarted(false);
        setShowResult(true); 
    };

    const resetAll=()=>{
      setShowResult(false);
      setCurrentQuestion(0);
      setScore(0);
      setQuizStarted(true);
      setTimer(30);
  }
  
    const handleAnswerClick = (isCorrect) => {  
      if(isCorrect){
        setScore(score+1);      
    }
      if ((currentQuestion + 1 < questions.length) && timer !== 0 ) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // End of quiz
       endQuiz();
      }
    };
  
    return (
      <div>
        <div className="container">    
        <h2>State Capitals Quiz</h2>  
            {(!quizStarted & !showResult) ? (
            <button className="btn-start" onClick={startQuiz}>Start</button>
            ) :
              (quizStarted & timer !==0) ? (
              <>
                  <p className="timer-text">Time Left: {timer}</p>
                  <div className="question">                
                      <p>Question: <span id="question-number">{currentQuestion + 1 +" "}</span>
                        of {" "+ questions.length}</p>
                      <p id="question-text">{questions[currentQuestion].question}</p>
                  </div>
                  <div className="option-container">
                      {questions[currentQuestion].options.map((option,i) => (                  
                          <button key={i} onClick={() => 
                            handleAnswerClick(option.isCorrect)}>
                              {option.optionsText}
                          </button>       
                      ))}
                  </div>             
                  <button className="btn-end" onClick={endQuiz}>End</button>
              </>          
              ): 

              showResult  ? (
                <QuizResult score={score} totalScore={questions.length} tryAgain={resetAll}/>
              ): ''}          
        </div>        
      </div>
    );
  };
  
export default Quiz;
