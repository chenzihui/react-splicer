'use strict';

import React from 'react';

const ENTER_KEY = 13;

class SplicerListItem extends React.Component {
  constructor(props) {
    super(props);

    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  render() {
    return (
      <li className="splicer__list__item">
        <a
          ref="selectable"
          href="#"
          onKeyPress={this._handleKeyPress}>{this.props.data}</a>
      </li>
    );
  }

  _handleKeyPress(evt) {
    evt.preventDefault();

    if (evt.which === ENTER_KEY) {
      this.props.callback(this.props.data);
    }
  }
};

export default SplicerListItem;
