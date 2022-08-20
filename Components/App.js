import React from "react";
import Start from './Start';
import Quiz from './Quiz';
import { nanoid } from 'nanoid';

export default function App() {


    // Using API Data 

    const [questionData, setQuestionData ] = React.useState("");

    React.useEffect(() => { 
        fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(data => setQuestionData(data.results))
    }, [started])


    // State to show the 'Start Quiz' button. It will be changed to true to move to the next section, which is 
    // Quiz questions.
    const [started,setStarted] = React.useState(true);

    // Onclick function to change the state, so that the started state will be changed, and the Quiz section will
    // be rendered. 
    function onStart() {
        setStarted(false); 
        setQuestionData(prevData => {
            let newData = prevData.map(eachObj => {
                return {...eachObj, id: nanoid()}
            })
            return newData;
        }) 
    }

    

    // Changing back to start quiz button once the user clicked playagain button
    function onPlayAgain() {
        setStarted(true)
    }

    return (
        <div className="main">
            { started && <Start handleClick = {onStart} />}
            { !started && <Quiz handleClick = {onPlayAgain} qData = {questionData}/> }
        </div>
    )
}