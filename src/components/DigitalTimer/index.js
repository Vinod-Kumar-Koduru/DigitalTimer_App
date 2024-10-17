import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timeInmin: 25,
    seconds: 0,
    isTimeRunning: false,
    id: null,
  }

  timerStart = () => {
    const {isTimeRunning, seconds, timeInmin} = this.state
    const startOrpause = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrpauseAlterText = isTimeRunning ? 'pause icon' : 'play icon'
    const runnigEle = isTimeRunning ? 'Running' : 'Paused'
    const strifyMIn = timeInmin > 9 ? timeInmin : `0${timeInmin}`
    const strifysecon = seconds > 9 ? seconds : `0${seconds}`
    return {
      startOrpause,
      startOrpauseAlterText,
      runnigEle,
      strifyMIn,
      strifysecon,
    }
  }

  incrementTimeElapsedInSeconds = () => {
    const {seconds} = this.state
    if (seconds > 59) {
      this.setState({seconds: 0})
    } else {
      this.setState(prev => ({seconds: prev.seconds + 1}))
    }
  }

  startTimerOrPause = () => {
    const {timeInmin, seconds, isTimeRunning, id} = this.state
    if (seconds > 59) {
      this.setState({seconds: 0})
    }
    if (isTimeRunning) {
      clearInterval(id)
    } else {
      const intervel = setInterval(this.incrementTimeElapsedInSeconds, 1000)
      this.setState({id: intervel})
    }
    this.setState(prev => ({isTimeRunning: !prev.isTimeRunning}))
  }

  timerIncre = () => {
    const {timeInmin} = this.state
    return this.setState(pre => ({timeInmin: pre.timeInmin + 1}))
  }

  timerdec = () => {
    const {timeInmin} = this.state
    this.setState(pre => ({timeInmin: (pre.timeInmin -= 1)}))
  }

  restTimer = () => {
    const {id} = this.state
    clearInterval(id)
    this.setState({timeInmin: 25, isTimeRunning: false, seconds: 0})
  }

  render() {
    const {timeInmin, seconds, isTimeRunning, timeElnca, secElnc} = this.state
    const timerEle = this.timerStart()
    const {
      startOrpause,
      startOrpauseAlterText,
      runnigEle,
      strifyMIn,
      strifysecon,
    } = timerEle
    return (
      <>
        <div className="bg-container">
          <h1>Digital Timer</h1>
          <div className="flex-container">
            <div className="timer-bg">
              <div className="card-timer">
                <h1 className="timer">
                  {strifyMIn}:{strifysecon}
                </h1>
                <p className="status-timer">{runnigEle}</p>
              </div>
            </div>
            <div className="start-containe">
              <div className="flex-container">
                <div className="flex-container">
                  <button
                    className="button-ele"
                    onClick={this.startTimerOrPause}
                  >
                    <img
                      src={startOrpause}
                      className="play-button"
                      alt={startOrpauseAlterText}
                    />
                    {isTimeRunning ? 'Pause' : 'Start'}
                  </button>
                </div>
                <div className="flex-container">
                  <button className="button-ele" onClick={this.restTimer}>
                    <div className="flex-container">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                        className="play-button"
                        alt="reset icon"
                      />
                      Reset
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="start-containe">
            <p>Set timer limit</p>
            <div className="flex-container">
              <button className="increment-dec-button" onClick={this.timerdec}>
                -
              </button>
              <p className="numeric-ele">{strifyMIn}</p>
              <button
                className="increment-dec-button"
                onClick={this.timerIncre}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default DigitalTimer
