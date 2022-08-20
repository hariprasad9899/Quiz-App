import React from 'react';
import Questions from './Question';
import Test from './Test';

export default function Quiz(props) {
    

    // useState to render the result, once the user filled and submitted the answers.
    const [submitState , setSubmitState] = React.useState(true)

    // Helper function to shuffle the correct answer and wrong answer
    function mixupOptions(options, ans) {
        let random = Math.floor(Math.random() * 4);
        let newArr = [...options]
        newArr.splice(random,0,ans);
        return newArr;
    }

    const [replayState, setReplayState] = React.useState(false);
    // Creating an JSX array which stored the imported custom component function, with some additional props such as
    // question, options, correct answer, key, and id.
    let JSXQuestion = props.qData.map(eachArrObj => {
        return (
            <Questions 
                key = {eachArrObj.id}
                id = {eachArrObj.id}
                question = {eachArrObj.question}
                options = {mixupOptions(eachArrObj.incorrect_answers, eachArrObj.correct_answer)}
                answer = {eachArrObj.correct_answer}
                handleAnswer = {updateAnswer}
                syncedAnswer = {answerState}
                replayState = {replayState}
            />
        )
    })
    
    



    // Creating an array of results  to store the question id, correct answer and the submitted answer by user, which 
    // will be received through props
    const initArr = props.qData.map(item => {
        return {
            id : item.id,
            correct_answer: item.correct_answer,
            submitted_answer: ""
        }
    })

    // Initializing the default array objects into answerState, so that whenver user submits an answer, the respective object
    // identified using the id, can be updated, which then used to calculate the mark obtained.
    const [answerState, setAnswerState] = React.useState(initArr)


    // Function to keep the array of objects updated, whenever user selects  the option.
    function updateAnswer(receivedId,receivedVal) {

        setAnswerState(prevAnswerState => {
            let newState = prevAnswerState.map(eachItem => {
                if(eachItem.id === receivedId) {
                    return {...eachItem, submitted_answer: receivedVal}
                } else {
                    return eachItem
                }
            })
            return newState;
        })

    }
    

    // Initializing the state to update the marks.
    const [mark, setMark] = React.useState(0)

    // Function to calculate the mark, which will be triggered, once user submits the answers.
    function checkAnswer() {
        
        answerState.forEach(eachObj => {
            if(eachObj.correct_answer === eachObj.submitted_answer) {
                setMark(prevMark => prevMark+1)
            }
        })
        // Changing the submit State to false, so that the result section can be rendered.
        setSubmitState(false)
        setReplayState(true)
    }


    // Function to re-render the "Start Quiz", also changing the array of result object into default state.
    function playAgain() {
        setSubmitState(true)
        props.handleClick()
        setAnswerState(initArr)
        setReplayState(false)
    }

    

    return (

        <div className='allQuestions'>
            {JSXQuestion}
            {submitState && <button className='checkAnswer' onClick={checkAnswer}>Check Answer</button>}
            { !submitState && <div className='answer'>
                <h2>You answered {mark} / {props.qData.length} correct answers</h2>
                <button className='checkAnswer' onClick={playAgain}>Play Again</button>
            </div>}
        </div>
    )
}