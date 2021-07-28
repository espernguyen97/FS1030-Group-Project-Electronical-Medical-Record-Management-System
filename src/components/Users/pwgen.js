import React, { useState } from "react";
import generator from "generate-password";
import {Button} from 'reactstrap'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';

export default function App() {
  const [length, setLength] = useState(18);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [settings, setSettings] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false
  });
  const handleLength = (e) => {
    setLength(e.target.value);
  };

  const isFalse = (el) => el === false;
  const isTrue = (el) => el === true;
  const handleToggle = (e) => {
    const toggle = e.target.id;
    setSettings({
      ...settings,
      [toggle]: !settings[toggle]
    });
  };
  const handleGeneration = (e) => {
    e.preventDefault();
    if (Object.values(settings).some(isTrue)) {
      const password = generator.generate({
        length,
        uppercase: settings.uppercase,
        lowercase: settings.lowercase,
        numbers: settings.numbers,
        symbols: settings.symbols
      });
      setGeneratedPassword(password);
    } else {
      setGeneratedPassword("");
    }
  };

  return (
    <div className="containerpw">
      <form className="generator-form">
        <h2 className="title"> Password Generator</h2>
        <div className="password-length">
          <p>LENGTH: {length}</p>
        </div>
        <div className="card">
          <p className="range-field">
            <span>4</span>
          <Tooltip title="Select How long you want your password to be with this slider">
            <input
              type="range"
              onChange={handleLength}
              id="lengthRange"
              min="4"
              max="18"
              value={length}
            />
          </Tooltip>
            <span>18</span>
          </p>
        </div>
        <div className="settings">
          <p>Enable at least 1 of the options below then click Generate Password</p>
        </div>

        <div className="card">
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="uppercase"
              onClick={handleToggle}
            />
          <Tooltip title="Enable this option if you would like UPPERCASE letters in your generated password.">
            <InputLabel className="custom-control-label" htmlFor="uppercase">
              Include Uppercase
            </InputLabel>
          </Tooltip>{" "}
          </div>
        </div>

        <div className="card">
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="lowercase"
              onClick={handleToggle}
            />
          <Tooltip title="Enable this option if you would like lowercase letters in your generated password.">
            <InputLabel className="custom-control-label" htmlFor="lowercase">
              Include Lowercase
            </InputLabel>
          </Tooltip>{" "}
          </div>
        </div>

        <div className="card">
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="numbers"
              onClick={handleToggle}
            />
          <Tooltip title="Enable this option if you would like numbers in your generated password.">
            <InputLabel className="custom-control-label" htmlFor="numbers">
              Include Numbers
            </InputLabel>
          </Tooltip>{" "}
          </div>
        </div>

        <div className="card">
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="symbols"
              onClick={handleToggle}
            />
          <Tooltip title="Enable this option if you would like symbols Such as !@#^% in your generated password.">
            <InputLabel className="custom-control-label" htmlFor="symbols">
              Include Symbols
            </InputLabel>
          </Tooltip>{" "}
          </div>
        </div>
        <br/>
        <p style={{fontStyle: "italic"}}>Strong passwords are longer than eight characters, are hard to guess and contain a variety of characters, numbers and special symbols. The best ones can be difficult to remember, especially if you're using a distinct login for every site (which is recommended).</p>
        <div className="card">
          <h3 className="generatedPassword"><LockOpenIcon/>{generatedPassword}</h3>
        </div>
        <br/>
        <center>
          <Tooltip title="Enable at least 1 of the options above then click This button to generate a password">
              <Button color="primary"  onClick={handleGeneration}>
                {Object.values(settings).every(isFalse)
                  ? "SELECT AN OPTION"
                  : "GENERATE PASSWORD"}
              </Button>
          </Tooltip>
        </center>
      </form>
    </div>
  );
}
