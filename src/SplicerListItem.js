'use strict';

import React from 'react';

class SplicerListItem extends React.Component {
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    let classes = this.props.focus ? 'focus' : '';

    return (
      <li className="splicer__list__item">
        <a
          className={classes}
          ref="selectable"
          href="#"
          onClick={this._handleClick}>{this.props.data}</a>
      </li>
    );
  }

  _handleClick(evt) {
    evt.preventDefault();
    this.props.callback(this.props.data);
  }
};

export default SplicerListItem;
