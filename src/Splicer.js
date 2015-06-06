'use strict';

import React from 'react';
import { debounce } from './helpers';

const ENTER_KEY = 13;

class Splicer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: null };

    this._handleKeyUp = debounce(this._handleKeyUp, 100).bind(this);
  }

  render() {
    return (
      <div className="splicer">
        <div
          ref="userInput"
          className="splicer__user-input"
          contentEditable="true"
          onKeyUp={this._handleKeyUp}></div>
      </div>
    );
  }

  _handleKeyUp(evt) {
    if (evt.which === ENTER_KEY) {
      evt.preventDefault();
      return this._fireCallback(evt.target.textContent);
    }

    this._setSearchTerm();
  }

  _fireCallback(textContent) {
    if (textContent.trim()) {
      return this.props.callback(textContent);
    }
  }

  _setSearchTerm() {
    let selection = window.getSelection(),
        range     = selection.getRangeAt(0),
        userInput = React.findDOMNode(this.refs.userInput),

        content, searchTerm;

    range.collapse(true);
    range.setStart(userInput, 0);

    content = range.toString().split(' ');
    searchTerm = content[content.length - 1];

    if (searchTerm.length >= this.props.charCount) {
      this.setState({ searchTerm: searchTerm });
    } else {
      this.setState({ searchTerm: null });
    }
  }
};

export default Splicer;
