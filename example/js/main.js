'use strict';

import React from 'react';
import Splicer from '../../src/Splicer';

let transformFn = function(text) {
  return `:${text}:`;
};

class App extends React.Component {
  constructor() {
    this.state = { result: null };
    this._callback = this._callback.bind(this);
  }

  render() {
    let data = ['Apple', 'Orange', 'Banana', 'Pineapple'],
        result = this.state.result;

    return (
      <div className="container">
        <Splicer
          charCount={2}
          data={data}
          transformFn={transformFn}
          callback={this._callback} />

        <div className="result">The result of the callback is:&nbsp;
          <span className="content">{result}</span>
        </div>
      </div>
    );
  }

  _callback(text) {
    return this.setState({ result: text });
  }
};

React.render(<App />, document.body);
