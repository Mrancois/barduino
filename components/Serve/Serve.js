import React, { PropTypes } from 'react';
import PythonShell from 'python-shell';
// import s from './Wait.css';


/*
*
* TODO :
* 1 - Config runMotor()
* 2 - Call at the good moment runMotor() (SHOULD be call 2 times)
* 3 - Check results
* 4 - incrStep
*
*/


class Serve extends React.Component {
  static propTypes = {
    theProp: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  componentDidMount() {
    console.log('mount Serve');
    this.runMotor();
  }

  runMotor(gpio, seconds) {
    console.log(this); // useless for remove warning
    // DOC: https://www.npmjs.com/package/python-shell

    console.log(gpio);
    console.log(seconds);

    const options = {
      mode: 'text',
      scriptPath: 'path/to/my/scripts', // put path script here
      args: [gpio, seconds],
    };

    PythonShell.run('my_script.py', options, (err, results) => {
      if (results && !err) {
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
      } else {
        this.setState({ message: 'Error while executing python script' });
      }
    });
  }

  render() {
    return (
      <div>
        <p>Step 3 : Serve</p>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default Serve;
