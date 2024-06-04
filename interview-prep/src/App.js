import './App.css';
import Accordian from './components/accordian'
import Quiz from './components/quiz/Quiz'
import RandomColor from './components/random-color';
import StarRating from './components/star-rating';

function App() {
  return (
    <div className='app'>
   {/*    <Accordian />
      <RandomColor /> */}
      <StarRating starsNumber={10}/>
     
    </div>
  );
}

export default App;
