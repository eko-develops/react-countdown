import './App.css';
import { Button, Typography, Container, TextField } from '@material-ui/core'
import { useState, useEffect } from 'react'

function App() {

  const [seconds, setSeconds] = useState(""); //set the state of seconds on first render
  const [isRunning, setIsRunning] = useState(false);  //handles if the timer is running or paused
  const [isFinished, setIsFinished] = useState(false);  //set the state if the timer is finished or not
  const [number, setNumber] = useState(""); //set the state for the initial value of the input field

  useEffect( () => {
    console.log('useEffect ran'); //TEST

    if(isRunning){  //as long as isRunning is true, we will continue to call the interval
        if(seconds > 0){  //if the timer is not over yet

          //https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
          //returns an interval ID which uniquely identifies the interval, so you can remove it later by calling clearInterval()
          const intervalId = window.setInterval( () => {

            console.log('a second has passed..', seconds);  //TEST

            //useState setter functions have a hidden callback function that remembers the previous value.
            //if we do not use this syntax, the state will remain the same as the FIRST render of the app.
            setSeconds( seconds => seconds - 1 );

          }, 1000); //for every 1 second, this interval will run

          return () => window.clearInterval(intervalId); //clean up function. runs right before the useEffect. read more below

          //About Clean Up Functions
          // When you return a function inside of the useEffect, when the useEffect runs again, it will call the clean up function.
          // Also runs when the component is about to be unmounted.
    
          //How the Clean Up Function Works in This Project.
          // Initially when the app renders, isRunning will be set to false. When clicking on the start button, isRunning will become true
          // and the useEffect will fire because isRunning is a dependency. From there the callback in setInterval will be called every 1 second.
          // Within that if statement, there is the clean up function that the useEffect hook will remember on next render or when the component is about to be unmounted.
          // On every fire of the useEffect, the clean up function will be called and clear the interval when the component is about to mount and unmounts.
    
          //Why use the clean up function?
          // Using the clean up function will allow us to cut down on lines of code and also decrease the amount of state variables we need. If we did not 
          // use a clean up function, we would need a state variable that contains the return value of setInterval and then clearInterval in an else statement.
          
        } else {  //if the timer is over, we'll 
          setIsRunning(false);
          setIsFinished(true);
          console.log("isRunning set to:", isRunning);  //TEST
          console.log("isFinished set to:", isFinished);  //TEST
          
        }
    }

  },[isRunning, seconds]); //the useEffect will only run on first render and when isRunning changes (pre-release)
                           //updated note: we need to include seconds as a dependency so we can stop the timer at 0


  //This function handles the reset button and reverts the timer back to 'default' settings
  const handleReset = () => { 
    setSeconds(number);
    setIsRunning(false);
    setIsFinished(false);
    console.log("setting seconds to", number);  //TEST
    console.log("setting isRunning to", false)  //TEST
  }
  
  //This function starts the timer
  const handleStart = () => {
    setSeconds(number);
    setIsRunning(true);
    console.log("setting seconds to", number);  //TEST
    console.log("setting isRunning to", true);  //TEST
  }

  //This function is used to set the value entered in the input box
  const handleOnChange = (event) => { //the onChange prop automatically allows us to use the event object
    setNumber(event.target.value);
    console.log("number has been set to", event.target.value);  //TEST
  }

  return (
    <div className="App">
      <Container align="center" className="wrapper">
        <Typography variant="h6" >React Countdown Timer</Typography>
        <Typography variant="h3" className="timer-display" >
          
          {seconds}

          {/* only display the timer is finished text when the timer is actually finished */}
          { isFinished ? <p style={{fontSize:'1rem'}}>Countdown Done!</p> : ""}

        </Typography>

          <TextField
          label="Enter a Number"
          //we'll use the onChange event handler to capture the text/value in the input field and handle it in a  handleOnChange function
          onChange={handleOnChange}
          />

        <div className="button-wrapper">
          {/* Good React buttons only toggle boolean values. think of buttons like switches.
          Toggle between buttons depending if the timer is running or not running */}
          { !isRunning ? 
          <Button variant="contained" className="start-Button" onClick={handleStart}>Play</Button> :
          <Button variant="contained" className="pause-Button" onClick={ () => { setIsRunning(false)} }>Pause</Button>
          }
          <Button variant="text" onClick={handleReset} >Reset</Button>
        </div>
      </Container>
    </div>
  );
}

export default App;
