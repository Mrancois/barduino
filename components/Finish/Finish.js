import React, { PropTypes } from 'react';
import s from './Finish.css';


/*
*
* TODO :
* 1 - Wait 5s
* 2 - incrStep
* 3 - reset
*/


class Finish extends React.Component {
  static propTypes = {
    reset: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
    };
  }

  componentDidMount() {
    console.log('mount Finish');
    // wait 10 seconds and go back to step 0
    setInterval(() => {
      if (this.state.seconds === 20) {
        // reset
        clearInterval();
        this.props.reset();
      } else {
        this.setState({ seconds: this.state.seconds + 0.5 });
      }
    }, 500);
  }

  render() {
    return (
      <div>
        <p>Step 4 : Finish</p>
        <h2>DONE !</h2>
        <p>You can take your drink !</p>
        <div className={s.progress_bar}>
          <div
            style={{
              width: `${this.state.seconds * 5}%`,
              height: '50px',
              backgroundColor: '#3358aa',
              WebkitTransition: 'width 2s',
              transition: 'width 2s',
            }}
          >
            {this.state.seconds}
          </div>
        </div>
      </div>
    );
  }
}

export default Finish;
