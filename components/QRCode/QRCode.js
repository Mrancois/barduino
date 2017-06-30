import React, { PropTypes } from 'react';
// import s from './Wait.css';
import QrReader from 'react-qr-reader';

class QRCode extends React.Component {
  static propTypes = {
    incrStep: PropTypes.func,
    setQRCode: PropTypes.func,
    setIDUSer: PropTypes.func,
    setIDDrink: PropTypes.func,
    setTypeDrink: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      result: 'No result',
      message: '',
    };
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    console.log('mount QRCode');
  }

  handleScan(data) {
    console.log(data);
    // ON FIND QRCODE -> CHECK IF ELEMENT EXIST
    const url = `https://script.google.com/macros/s/AKfycbzPs_w9PfbFPGAoYj7agl_M9jeBPZpGA9PzGF6ihOja1-xB1ws/exec?path=queue&queue=one&qrc=${data}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 200) {
          console.log('OK');
          console.log(response);

          // pass qrcode to base component via props
          this.props.setQRCode(response.id);

          // pass uid to base component
          this.props.setIDUSer(response.idUser);

          // pass id drink
          this.props.setIDDrink(response.idDrink);

          // pass type of drink
          this.props.setTypeDrink(response.type);

          // incr step (from base component) to pass to the next component
          this.props.incrStep();
        } else {
          console.log('ERR');
          this.setState({ message: 'Le QRCode n\'est pas reconnu, merci de réessayer' });
        }
      })
      .catch((e) => {
        console.log('ERR');
        this.setState({ message: 'Erreur de réseau' });
        console.log(e);
      });
    // this.setState({ result: data });
  }

  handleError(err) {
    console.log(this);
    console.error(err);
    this.setState({ message: 'Erreur lors du scan du QRCode' });
  }

  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    };
    return (
      <div>
        <p>Step 0 : QRCode</p>
        <p>{this.state.message}</p>
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

export default QRCode;
