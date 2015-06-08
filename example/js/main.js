'use strict';

import React from 'react';
import Splicer from '../../src/Splicer';

let transformFn = function(text) {
  let el = document.createElement('span');

  el.innerHTML = text;
  el.setAttribute('class', 'mention');
  el.setAttribute('contenteditable', false);

  return el;
};

class App extends React.Component {
  constructor() {
    this.state = { result: null };
    this._callback = this._callback.bind(this);
  }

  render() {
    let data   = ['apple', 'orange', 'banana', 'pineapple'],
        result = this.state.result;

    return (
      <div className="container">
        <h1 className="container__title">How it works?</h1>

        <p>react-splicer is a component for creating Facebook-like mentions in
        user input elements.</p>

        <p>Here, we have provided the component with an array of strings i.e.
        'apple', 'orange', 'banana', 'pineapple' as the dataset to be searched
        when the user provides input.</p>

        <p>We have configured the component such that the search is only conducted
        when there are at least 2 characters entered. Try entering 'ap'.</p>

        <p>Upon selecting an option from the dropdown list, the `transformFn` is called,
        which in this case simply inserts a span containing the selected text element.</p>

        <Splicer
          charCount={2}
          data={data}
          transformFn={transformFn}
          callback={this._callback} />
      </div>
    );
  }

  _callback(text) {
    return this.setState({ result: text });
  }
};

React.render(<App />, document.body);
