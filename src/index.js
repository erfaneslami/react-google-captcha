import React from "react";
import ReactDOM from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "./styles.css";

const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
const DELAY = 1500;

class App extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      callback: "not fired",
      value: "[empty]",
      load: false,
      expired: "false",
      recaptchaLoaded: false
    };
    this._reCaptchaRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ load: true });
    }, DELAY);
    console.log("didMount - reCaptcha Ref-", this._reCaptchaRef);
  }

  handleChange = value => {
    console.log("onChange prop - Captcha value:", value);
    this.setState({ value });
    if (value === null) this.setState({ expired: "true" });
  };

  asyncScriptOnLoad = () => {
    this.setState({ callback: "called!", recaptchaLoaded: true });
    console.log("scriptLoad - reCaptcha Ref-", this._reCaptchaRef);
  };

  onSubmit = () => {
    this._reCaptchaRef.current.execute();
  };

  onSubmitAsync = () => {
    this._reCaptchaRef.current.executeAsync().then(value => {
      console.log("executeAsync promise - Captcha value:", value);
    });
  };

  render() {
    const { value, callback, load, expired, recaptchaLoaded } =
      this.state || {};
    return (
      <div className="App">
        <h1>
          <a
            href="https://github.com/dozoisch/react-google-recaptcha"
            target="_blank"
          >
            react-google-recaptcha
          </a>
          : 2.1.0
        </h1>
        <h2>
          NOTE: initial load delayed <em>{DELAY / 1000}sec</em> to demonstrate
          callback
        </h2>
        <h3>Recaptcha loaded callback: {callback}</h3>
        <h5>Recaptcha value: {value}</h5>
        <h5>Expired: {expired}</h5>
        {load && (
          <ReCAPTCHA
            style={{ display: "inline-block" }}
            theme="dark"
            size="invisible"
            ref={this._reCaptchaRef}
            sitekey={TEST_SITE_KEY}
            onChange={this.handleChange}
            asyncScriptOnLoad={this.asyncScriptOnLoad}
          />
        )}
        <button onClick={this.onSubmit} disabled={!recaptchaLoaded}>
          Submit (with onChange prop)
        </button>
        <br />
        <br />
        <button onClick={this.onSubmitAsync} disabled={!recaptchaLoaded}>
          Submit (with executeAsync promise)
        </button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
