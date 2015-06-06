'use strict';

import React from 'react';
import Splicer from '../../src/Splicer';

let transformFn = function(text) {
  return `:${text}:`;
};

let callback = function() {

};

class App extends React.Component {
  render() {
    let data = ['Apple', 'Orange', 'Banana', 'Pineapple'];

    return (
      <div className="container">
        <Splicer
          charCount={2}
          data={data}
          transformFn={transformFn}
          callback={callback} />
      </div>
    );
  }
};

React.render(<App />, document.body);
