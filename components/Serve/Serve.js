/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */

import React, { PropTypes } from 'react';
import PythonShell from 'python-shell';

import config from '../../config/config.json';
// import s from './Wait.css';
/*
*
* TODO :
*
*/


class Serve extends React.Component {
  static propTypes = {
    reset: PropTypes.func,
    cocktail: PropTypes.object,
    recipe: PropTypes.object,
    incrStep: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      step: 0,
    };
  }

  componentDidMount() {
    console.log('mount Serve');
    console.log(config);
    console.log(this.props.cocktail);
    console.log(this.props.recipe);
    // this.runMotor();

    // run drink 1
    /*
    const recipe = this.props.recipe;
    this.runMotor(recipe.drink1[0], recipe.drink1[1]);
    // run drink 2
    this.runMotor(recipe.drink2[0], recipe.drink2[1]);
    */
    const options = {
      mode: 'text',
      scriptPath: '/home/pi/Documents/BarDuino/py',
      pythonPath: '/usr/bin/python',
      args: ['17', '2'],
    };

    PythonShell.run('test4.py', options, (err, results) => {
      if (err) throw err;
      // results is an array consisting of messages collected during execution
      console.log('results: %j', results);
    });
    // this.runAirPump();
  }

  componentWillUnmount() {
    this.incrStep();
  }


  pythonScript(gpio, seconds, type) {
    return new Promise((resolve, reject) => {
      const options = {
        mode: 'text',
        scriptPath: '/home/pi/Documents/BarDuino/py/',
        pythonPath: '/usr/bin/python',
        args: [gpio, seconds],
      };

      const script = (type === 'hard') ? 'test4.py' : 'test4.py';

      PythonShell.run(script, options, (err, results) => {
        if (results && !err) {
          // results is an array consisting of messages collected during execution
          console.log('results: %j', results);
          (this.state.step === 2) ?
            this.props.incrStep() :
            this.setState({ step: this.state.step + 1 });
          resolve(results);
        } else {
          this.props.reset();
          this.setState({ message: 'Error while executing python script' });
          reject(err);
        }
      });
    });
  }


  runAirPump() {
    const recipe = this.props.recipe;
    this.pythonScript(recipe.drink1[0], recipe.drink1[1], recipe.drink1[2])
      .then((result) => {
        // here after air pump 1
        console.log(result);
        this.pythonScript(recipe.drink2[0], recipe.drink2[1], recipe.drink2[2])
          .then((result2) => {
            // here after air pump 2
            console.log(result2);
          });
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
