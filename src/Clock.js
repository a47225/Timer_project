import React from "react";



class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            isOn: false,
            timeLeft: "25:00",
            timerType: "Session",
            breakLength: 5,
            sessionLength: 25   
        };
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.startStop = this.startStop.bind(this);
        this.incrementBreak = this.incrementBreak.bind(this);
        this.decrementBreak = this.decrementBreak.bind(this);
        this.incrementSession = this.incrementSession.bind(this);
        this.decrementSession = this.decrementSession.bind(this);
        this.beeping = false;
        this.timer = 0;
    }

    startStop() {
        console.log("startStop");
        if (this.state.isOn) {
            this.stopTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        if (this.beeping) {
            this.audioBeep.pause();
            this.audioBeep.currentTime = 0;
            this.beeping = false;
        }
       this.setState({
              time: this.state.time + 1000,
              isOn: true,
        });
        console.log(this.state.sessionLength, this.state.breakLength)
        this.timer = setInterval(() => {
            this.setState({
                time: this.state.time + 1000
            });
            let timeGoalMinutes = this.state.timerType === "Session" ? this.state.sessionLength : this.state.breakLength;
            let timeGoal = timeGoalMinutes * 1000 * 60;
            let minutes = Math.floor((timeGoal - this.state.time) / 60000);
            let seconds = Math.floor((timeGoal - this.state.time) % 60000 / 1000);
            seconds = seconds < 10 ? "0" + seconds : seconds;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            this.setState({
                timeLeft: minutes + ":" + seconds
            });
            if (minutes === "00" && seconds === "00") {
                this.audioBeep.play();
                this.beeping = true;
                this.setState({
                    timerType: this.state.timerType === "Session" ? "Break" : "Session",
                    time: 0,
                });
            }
        }, 1000);
        
    }


    stopTimer() {
        this.setState({isOn: false});
        clearInterval(this.timer);
    }

    resetTimer() { 
        this.setState({
            time: 0,
            isOn: false,
            timeLeft: "25:00",
            timerType: "Session",
            breakLength: 5,
            sessionLength: 25
        })
        clearInterval(this.timer);
        this.audioBeep.pause();
        this.audioBeep.currentTime = 0;
    }

    incrementBreak() {
        if (this.state.isOn || this.state.breakLength === 60) {
            return;
        }
        this.setState({
            breakLength: this.state.breakLength + 1,
            time: 0
        });
    }

    decrementBreak() {
        if (this.state.isOn || this.state.breakLength === 1) {
            return;
        }
        this.setState({
            breakLength: this.state.breakLength - 1,
            time: 0
        });
    }

    incrementSession() {
        if (this.state.isOn || this.state.sessionLength === 60) {
            return;
        }
        this.setState({
            sessionLength: this.state.sessionLength + 1,
            time: 0,
            timeLeft: this.state.sessionLength<9 ? "0" + (this.state.sessionLength+1) + ":00" : (this.state.sessionLength+1) + ":00"
        });
    }

    decrementSession() {
        if (this.state.isOn || this.state.sessionLength === 1) {
            return;
        }
        this.setState({
            sessionLength: this.state.sessionLength - 1,
            time: 0,
            timeLeft: this.state.sessionLength<=10 ? "0" + (this.state.sessionLength - 1) + ":00" : (this.state.sessionLength - 1) + ":00"
        });
    }

    render() {
        return (
            <div id="timer-container">
                <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
                <div id="length-wrapper">
                    <div id="break-wrapper">
                        <h2 id="break-label">Break Length</h2>
                        <div id="break-length">{this.state.breakLength}</div>
                        <button id="break-increment" onClick={this.incrementBreak}>+</button>
                        <button id="break-decrement" onClick={this.decrementBreak}>-</button>
                    </div>
                    <div id="session-wrapper">
                        <h2 id="session-label">Session Length</h2>
                        <div id="session-length">{this.state.sessionLength}</div>
                        <button id="session-increment" onClick={this.incrementSession}>+</button>
                        <button id="session-decrement" onClick={this.decrementSession}>-</button>
                    </div>
                </div>
                <div id="timer-wrapper">
                    <h2 id="timer-label">{this.state.timerType}</h2>
                    <div id="time-left">{this.state.timeLeft}</div>
                    <button id="start_stop" onClick={this.startStop}>Start/Stop</button>
                    <button id="reset" onClick={this.resetTimer}>Reset</button>
                </div>
            </div>
        );
    }
}

export default Timer;