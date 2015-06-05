'use strict';

import React from 'react';

const ENTER_KEY = 13;

class Splicer extends React.Component {
  constructor(props) {
    super(props);

    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  render() {
    return (
      <div className="splicer">
        <div
          className="splicer__user-input"
          contentEditable="true"
          onKeyPress={this._handleKeyPress}></div>
      </div>
    );
  }

  _handleKeyPress(evt) {
    if (evt.which === 13) {
    if (evt.which === ENTER_KEY) {
      evt.preventDefault();
      evt.stopPropagation();

      if (evt.target.textContent.trim()) {
        return this.props.callback(evt.target.textContent);
      }
    }
  }
};

export default Splicer;
