import React, { PropTypes } from 'react';
// import s from './Wait.css';
import QrReader from 'react-qr-reader';
import config from '../../config/config.json';

class QRCode extends React.Component {
  static propTypes = {
    reset: PropTypes.func,
    incrStep: PropTypes.func,
    setQRCode: PropTypes.func,
    setCocktail: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      delay: 2000,
      result: 'No result',
      message: '',
      scanned: '',
    };
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    console.log(config);
  }

  componentDidMount() {
    console.log('mount QRCode');
  }

  requestAPI(url) {
    const xhr = new XMLHttpRequest();
    const method = 'GET';
    xhr.open(method, url, true);
    /*
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log(xhr.responseText);
        const jsonRep = JSON.stringify(xhr.responseText);
        this.props.setQRCode(data);
        this.props.setCocktail(jsonRep.cocktail);
        this.props.incrStep();
      }
    };
    */
    xhr.send(null);

    return xhr;
  }

  requestQRCode(r) {
    console.log('TOTOT ?');
    console.log(this);
    console.log(r);
    console.log('oo');
    console.log(r.responseText);
    if (r.status === 200) {
      console.log('ICI ?');
      console.log(r.responseText);
      const jsonRep = JSON.stringify(r.responseText);
      this.props.setQRCode(this.state.scanned);
      this.props.setCocktail(jsonRep.cocktail);
      this.props.incrStep();
    }
  }

  handleScan(data) {
    console.log(data);
    // ON FIND QRCODE -> CHECK IF ELEMENT EXIST
    if (data != null) {
      console.log(config);
      this.setState({ scanned: data });
      // const url = `https://script.google.com/macros/s/AKfycbzPs_w9PfbFPGAoYj7agl_M9jeBPZpGA9PzGF6ihOja1-xB1ws/exec?path=queue&queue=one&qrc=${data}`;
      const url = `${config.url.api}/validecommande/${data}`; // data should be equal to id of the element in the queue
      console.log(url);

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          console.log('OK ????');
          const jsonRep = JSON.parse(xhr.responseText);
          console.log(jsonRep);
          this.props.setQRCode(data);
          this.props.setCocktail(jsonRep.cocktail);
          this.props.incrStep();
        }
      };

      xhr.open('GET', url, true);
      xhr.send();
      // const xhr = this.requestAPI(url);
      // this.requestQRCode(xhr);
      /*
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        const jsonRep = JSON.stringify(xhr.responseText);
        this.props.setQRCode(data);
        this.props.setCocktail(jsonRep.cocktail);
        this.props.incrStep();
      }
      */
      /*
      fetch(url, {
        method: 'GET',
        headers: new Headers({
          // Authorization: `Basic ${config.token}`,
          // 'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }),
        mode: 'no-cors',
      })
        .then(response => response.json())
        .then((response) => {
          console.log('RESPONSE ?');
          console.log(response);
          if (response) {
            console.log('OK ??');
            this.props.setQRCode(data);
            // pass id drink
            this.props.setCocktail(response.cocktail);
            // incr step (from base component) to pass to the next component
            this.props.incrStep();
          } else {
            this.props.reset();
          }
        });
      */
    } else {
      this.setState({ message: 'Placez votre telephone sous le lecteur !' });
    }
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
        <h1>{this.state.scanned || 'null'}</h1>
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
