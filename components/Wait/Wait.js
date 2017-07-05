import React, { PropTypes } from 'react';
// import s from './Wait.css';
import config from '../../config/config.json';

/*
*
* TODO :
*
*/


class Wait extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    cocktail: PropTypes.object,
    setRecipe: PropTypes.func,
    incrStep: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      seconds: 0,
    };
  }

  componentDidMount() {
    console.log('mount Wait');

    console.log(this.props.cocktail);
    console.log(this.props.user);
    console.log(config);

    this.buildPython();
  }
/*
  getUserInformations() {

  }

  getNameDrink() {

  }
*/
  buildPython() {
    const cocktail = this.props.cocktail;
    console.log(config.drinks);

    console.log(cocktail.drinks[0]);
    console.log(cocktail.drinks[1]);
    const drink1 = [];
    const drink2 = [];

    const gpio1 = config.drinks[cocktail.drinks[0].name.toLowerCase()];
    const second1 = (cocktail.drinks[0].type.toLowerCase() === 'soft') ? '20' : '5';
    const type1 = cocktail.drinks[0].type.toLowerCase();

    const gpio2 = config.drinks[cocktail.drinks[1].name.toLowerCase()];
    const second2 = (cocktail.drinks[1].type.toLowerCase() === 'soft') ? '20' : '5';
    const type2 = cocktail.drinks[1].type.toLowerCase();


    if (gpio1 && second1 && gpio2 && second2) {
      drink1.push(gpio1, second1, type1);
      drink2.push(gpio2, second2, type2);

      const serve = {};
      serve.drink1 = drink1;
      serve.drink2 = drink2;

      this.props.setRecipe(serve);
      this.props.incrStep();
    } else {
      // DISPLAY MESSAGE
      console.log('NOT OK');
    }
  }

  render() {
    return (
      <div>
        <p>Step 1 : Wait</p>
        <p>Hello {this.props.user.user.username}, wait to get your {this.props.cocktail.name}</p>
      </div>
    );
  }
}

export default Wait;
