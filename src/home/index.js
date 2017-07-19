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

    this.setQRCode = this.setQRCode.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setCocktail = this.setCocktail.bind(this);
    this.setRecipe = this.setRecipe.bind(this);
  }

/*
  componentDidMount() {
    // mount home
  }
*/

  setQRCode(qrcode) {
    this.setState({ qrcode });
  }

  setUser(user) {
    this.setState({ user });
  }

  setCocktail(cocktail) {
    this.setState({ cocktail });
  }

  setRecipe(recipe) {
    this.setState({ recipe });
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
            reset={this.reset}
            incrStep={this.incrStep}
            setQRCode={this.setQRCode}
            setUser={this.setUser}
            setCocktail={this.setCocktail}
          />
          /* <p>QRCODE</p> */
        );
        break;
      case 1:
        componentToRender = (
          <Wait
            cocktail={this.state.cocktail}
            setRecipe={this.setRecipe}
            incrStep={this.incrStep}
          />
        );
        break;
      case 2:
        componentToRender = (
          <Serve
            reset={this.reset}
            cocktail={this.state.cocktail}
            recipe={this.state.recipe}
            incrStep={this.incrStep}
          />
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
        <p>{this.state.step}</p>
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
