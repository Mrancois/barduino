/* eslint class-methods-use-this: ["error", { "exceptMethods": ["python1", "python2"] }] */

import React, { PropTypes } from 'react';
import PythonShell from 'python-shell';

import Layout from '../../components/Layout';
import s from './styles.css';

import QRCode from '../../components/QRCode';
import Wait from '../../components/Wait';
import Serve from '../../components/Serve';
import Finish from '../../components/Finish';

class HomePage extends React.Component {

  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any),
  };

  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
      step: 0,
    };
    this.reset = this.reset.bind(this);

    this.python1 = this.python1.bind(this);
    this.python2 = this.python2.bind(this);
    this.incrStep = this.incrStep.bind(this);
    this.decrStep = this.decrStep.bind(this);
  }

/*
  componentDidMount() {
    // mount home
  }
*/

  setQRCode(qrcode) {
    this.setState({ qrcode });
  }

  setIDUSer(iduser) {
    this.setState({ user: iduser });
  }

  setIDDrink(drink) {
    this.setState({ drink });
  }

  setTypeDrink(type) {
    this.setState({ type });
  }

  incrStep() {
    this.setState({ step: this.state.step + 1 });
  }

  decrStep() {
    this.setState({ step: this.state.step - 1 });
  }

  reset() {
    this.setState({
      step: 0,
      qrcode: '',
      user: '',
      type: '',
      drink: '',
    });
  }

  python1() {
    console.log('Python 1');
    PythonShell.run('test4.py 22 5', (err) => {
      if (err) throw err;
      console.log('finished 22');
    });
  }

  python2() {
    const options = {
      mode: 'text',
      pythonPath: 'path/to/python',
      pythonOptions: ['-u'],
      scriptPath: 'path/to/my/scripts',
      args: ['22', '5'],
    };

    PythonShell.run('test4.py', options, (err, results) => {
      if (err) throw err;
      // results is an array consisting of messages collected during execution
      console.log('results: %j', results);
    });
  }

  render() {
    let componentToRender;
    switch (this.state.step) {
      case 0:
        componentToRender = (
          <QRCode
            incrStep={this.incrStep}
            setQRCode={this.setQRCode}
            setIDUSer={this.setIDUSer}
            setIDDrink={this.setIDDrink}
            setTypeDrink={this.setTypeDrink}
          />
          /* <p>QRCODE</p> */
        );
        break;
      case 1:
        componentToRender = (
          <Wait
            user={this.state.user}
            drink={this.state.drink}
            type={this.state.type}
          />
        );
        break;
      case 2:
        componentToRender = (
          <Serve />
        );
        break;
      case 3:
        componentToRender = (
          <Finish
            reset={this.reset}
          />
        );
        break;
      default:

    }
    return (
      <Layout className={s.content}>
        <p>HOME</p>
        {componentToRender}
        {this.state.step}
        <button
          onClick={() => this.python1()}
        >
          Launch - python test4.py 22 3
        </button>
        <button
          onClick={() => this.python2()}
        >
          Launch - python test4.py 17 3
        </button>

        <button
          onClick={() => this.incrStep()}
        >
          Incr step
        </button>
        <button
          onClick={() => this.decrStep()}
        >
          Decr step
        </button>
      </Layout>
    );
  }

}

export default HomePage;
