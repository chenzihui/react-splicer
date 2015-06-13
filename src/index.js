'use strict';

import React from 'react';
import Splicer from 'react-splicer';

/**
 * Function is called when an item from the suggested results is selected.
 * This is where you would want to manipulate the selected text before inserting
 * it into the user input element.
 *
 * Examples could be adding ":" on either side of the selected text or in this
 * case, creating a `span` element containing the text.
 *
 * @param {string}
 */

let transformFn = function(text) {
  let el = document.createElement('span');

  el.innerHTML = text;
  el.setAttribute('class', 'mention');
  el.setAttribute('contenteditable', false);

  return el;
};

class App extends React.Component {
  constructor() {
    this._callback = this._callback.bind(this);
  }

  render() {
    // The data set we are passing to our component.
    let data   = ['John', 'Johnny', 'Steve', 'Alex'];

    // The number of characters that must be typed before searching
    // for suggestions
    let charCount = 2;

    return (
      <div className="demo__container">
        <p className="demo__container__help">Give it a spin.
          Try typing <span className="pill">jo</span></p>

        <Splicer
          charCount={charCount}
          data={data}
          transformFn={transformFn}
          callback={this._callback} />
      </div>
    );
  }

  /**
   * This is the function that gets fired when the ENTER key is pressed.
   * Typically you would use this to do something with the contents of
   * the user input element
   *
   */

  _callback(text) {
    console.log('The callback was fired.');
  }
};

React.render(<App />, document.querySelector('#demo__app'));
