'use strict';

import React from 'react';
import Splicer from '../../src/Splicer';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Splicer charCount={2} />
      </div>
    );
  }
};

React.render(<App />, document.body);
