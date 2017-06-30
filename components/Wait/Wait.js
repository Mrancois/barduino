import React, { PropTypes } from 'react';
// import s from './Wait.css';


/*
*
* TODO :
* 1 - get user name (from this.props.user)
* 2 - get name drinks user want (from this.props.drink)
* 3 - build python string script for the drink by the type
* 4 - incrStep
*/


class Wait extends React.Component {
  static propTypes = {
    user: PropTypes.string,
    drink: PropTypes.string,
    type: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  componentDidMount() {
    console.log('mount Wait');
    console.log(this.props.drink);
    console.log(this.props.type);
  }
/*
  getUserInformations() {

  }

  getNameDrink() {

  }

  buildPython() {

  }
*/
  render() {
    return (
      <div>
        <p>Step 1 : Wait</p>
        <p>Welcome {this.props.user}</p>
      </div>
    );
  }
}

export default Wait;
