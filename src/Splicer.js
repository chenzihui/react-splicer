'use strict';

import React from 'react';
import SplicerList from './SplicerList';

const KEYS = {
  ENTER: 13,
  ESC: 27
};

class Splicer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: null };

    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
  }

  render() {
    let data;

    if (this.state.searchTerm) {
      data = this.props.data.filter((item) => {
        return item.toLowerCase()
          .indexOf(this.state.searchTerm.toLowerCase()) !== -1;
      });
    } else {
      data = [];
    }

    return (
      <div className="splicer">
        <div
          ref="userInput"
          className="splicer__user-input"
          contentEditable="true"
          onKeyPress={this._handleKeyPress}
          onKeyUp={this._handleKeyUp}></div>

        <SplicerList
          data={data}
          insertFn={this._insertSelected} />
      </div>
    );
  }

  _handleKeyPress(evt) {
    if (evt.which === KEYS.ENTER) {
      evt.preventDefault();
      return this._fireCallback(evt.target.textContent);
    }
  }

  _handleKeyUp(evt) {
    if (evt.which === KEYS.ENTER) {
      return;
    }

    if (evt.which === KEYS.ESC) {
      return this.setState({ searchTerm: null });
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

  _insertSelected(data) {
    let result = this.props.transformFn(data);
    console.log(result);
  }
};

export default Splicer;
