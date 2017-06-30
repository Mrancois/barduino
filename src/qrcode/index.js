import React, { PropTypes } from 'react';
import QrReader from 'react-qr-reader';

class TestCode extends React.Component {
  static propTypes = {
    theProp: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      result: 'No result',
    };
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    console.log('mount test page');
  }

  handleScan(data) {
    if (data !== null) {
      this.setState({ result: data });
    }
  }

  handleError(err) {
    console.log(this);
    console.error(err);
  }
  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    };
    return (
      <div>
        <p>React Component</p>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
        />
        <p>{this.state.result}</p>
      </div>
    );
  }
}

export default TestCode;
