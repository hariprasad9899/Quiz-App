import React, {useRef, useState, useEffect} from "react";

export default function Questions(props) {

    // Creating an default array of objects having id, value , and isSel flag, to change the background color of the 
    // option whenever user selects. And also pushing the options for each question.


    const answerState = props.options.map((item,index) => {
        return {
            id: index+1,
            value: item,
            isSel: false,
        }
    })


    // Creating a state for keeping and updating the JSX element, so that, the object array will be updated, whenever
    // user selects some options.
    const [myAnsState, setMyAnsState] = useState(answerState);

    // Mapping the options custom component into an jsx element to display it under the question.
    let JSXSpan = myAnsState.map(eachObj => {
        return ( 
            <InnerSpan 
                key = {eachObj.id} 
                id = {eachObj.id} 
                isSel = {eachObj.isSel} 
                value = {eachObj.value}
                handleSelect = {selectAns}
                isAnswer = {(props.answer  == eachObj.value) ? true: false}
            />
        )
    })

    // Updating the state of the object array whenever user selects the option
    function selectAns(val) {   
        setMyAnsState(prevMyAnsState => {
            let myNewState = prevMyAnsState.map(eachObj => {
                if(eachObj.id === val) {
                    props.handleAnswer(props.id, eachObj.value)
                    return {...eachObj, isSel: !eachObj.isSel}
                } else {
                    return {...eachObj, isSel: false}
                }
            })
            return myNewState;
        })
    }

    function InnerSpan(innerProps) {

        // Style to apply background color, when user selects
        let mystyle;
        
        // The style property is applied, based on the stage. 
        // If the user is in the choosing stage, then the first style condition is applied.

        // If user completes submission, then the second style condition is applied, where the correct answers are 
        // highlighted in green, and the wrong answers are highlighted in red.
        if(!props.replayState) {
            mystyle = {
                backgroundColor: innerProps.isSel ? "#D6DBF5": "white"
            }
        } else {
            mystyle = {
                backgroundColor: innerProps.isAnswer ? "#94D7A2"
                : (innerProps.isSel) ? "#F8BCBC" : "white",
                border: (!innerProps.isAnswer && !innerProps.isSel ) ? "1px solid #a4aac6" : "none",
                color: (!innerProps.isAnswer && !innerProps.isSel ) ? "gray" : "#293264"

            }
        }

        return (
            <span 
                style={mystyle} 
                onClick={() => innerProps.handleSelect(innerProps.id)}
            >{innerProps.value}
            </span>
        )
    }

    return (
        <div className="question">
            <h2>{props.question}</h2>
            <div className="options">
                {JSXSpan}
            </div>
        </div>
    )
}