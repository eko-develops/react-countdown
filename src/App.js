import './App.css';
import { Button, Typography, Container } from '@material-ui/core'
import { useState, useEffect } from 'react'

function App() {

  const [seconds, setSeconds] = useState(20); //set the state of seconds on first render
  const [isRunning, setIsRunning] = useState(false);  //handles if the timer is running or paused

  useEffect( () => {
    console.log('useEffect ran');
    if(isRunning){  //as long as isRunning is true, we will continue to call the interval
      const intervalId = setInterval( () => {
        console.log('a second has passed..');
        setSeconds( second => second - 1 ); //useState setter functions have a hidden callback function that remembers the previous value
      }, 1000); //for every 1 second, this interval will run
      return () => clearInterval(intervalId); //clean up function. runs right before the useEffect 

      //About Clean Up Functions
      // When you return a function inside of the useEffect, when the useEffect runs again, it will call the clean up function.
      // Also runs when the component is about to be unmounted.

      //How the Clean Up Function Works in This Project.
      // Initially when the app renders, isRunning will be set to false. When clicking on the start button, isRunning will become true
      // and the useEffect will fire because isRunning is a dependency. From there the callback in setInterval will be called every 1 second.
      // Within that if statement, there is the clean up function that the useEffect hook will remember on next render or when the component is about to be unmounted.
      // On every fire of the useEffect, the clean up function will be called and clear the interval. Using

      //Why use the clean up function?
      // Using the clean up function will allow us to cut down on lines of code and also decrease the amount of state variables we need. If we did not 
      // use a clean up function, we would need a state variable that contains the return value of setInterval and then clearInterval in an else statement.

    }
  },[isRunning]); //the useEffect will only run on first render and when isRunning changes


  //This function handles the reset button
  const handleReset = () => { 
    setSeconds(20);
    setIsRunning(false);
    console.log('reset completed');
  }

  return (
    <div className="App">
      <Container align="center" className="wrapper">
        <Typography variant="h6" >React Countdown Timer</Typography>
        <Typography className="timer-display">
          {seconds}
          </Typography>
        <div className="button-wrapper">

          {/* Good React buttons only toggle boolean values. think of buttons like switches */}
          { !isRunning ? 
          <Button variant="contained" className="start-Button" onClick={ () => { setIsRunning(true)} }>Play</Button> :
          <Button variant="contained" className="pause-Button" onClick={ () => { setIsRunning(false)} }>Pause</Button>
          }
          <Button variant="text" onClick={handleReset} >Reset</Button>

        </div>
      </Container>
    </div>
  );
}

export default App;
