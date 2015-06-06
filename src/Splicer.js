'use strict';

import React from 'react';
import SplicerList from './SplicerList';

const KEYS = {
  ENTER: 13,
  ESC: 27,
  DOWN: 40,
  UP: 38
};

class Splicer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectables: [], selectedIndex: 0 };

    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleKeyDown  = this._handleKeyDown.bind(this);
    this._handleKeyUp    = this._handleKeyUp.bind(this);
  }

  render() {
    return (
      <div className="splicer">
        <div
          ref="userInput"
          className="splicer__user-input"
          contentEditable="true"
          onKeyDown={this._handleKeyDown}
          onKeyPress={this._handleKeyPress}
          onKeyUp={this._handleKeyUp}></div>

        <SplicerList
          selectedIdx={this.state.selectedIndex}
          data={this.state.selectables}
          insertFn={this._insertSelected} />
      </div>
    );
  }

  _handleKeyDown(evt) {
    let splicerList = document.querySelector('.splicer__list');

    if (evt.which === KEYS.DOWN || evt.which === KEYS.UP) {
      if (this.state.selectables.length !== 0) {
        evt.preventDefault();
      }
    }
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
      return this.setState({ selectables: [], selectedIndex: 0 });
    }

    if (evt.which === KEYS.UP || evt.which === KEYS.DOWN) {
      this._setSelectedItem(evt.which);
    }

    this._setSearchTerm();
  }

  _fireCallback(textContent) {
    if (textContent.trim()) {
      return this.props.callback(textContent);
    }
  }

  _setSelectedItem(keyCode) {
    let selectedIdx;

    if (keyCode === KEYS.UP) {
      selectedIdx = this.state.selectedIndex === 0
                    ? this.state.selectables.length - 1
                    : this.state.selectedIndex - 1;
    } else if (keyCode === KEYS.DOWN) {
      selectedIdx = this.state.selectedIndex === this.state.selectables.length - 1
                    ? 0
                    : this.state.selectedIndex + 1;
    }

    this.setState({ selectedIndex: selectedIdx });
  }

  _setSearchTerm() {
    let selection = window.getSelection(),
        range     = selection.getRangeAt(0),
        userInput = React.findDOMNode(this.refs.userInput),

        content, searchTerm, selectables;

    range.collapse(true);
    range.setStart(userInput, 0);

    content = range.toString().split(' ');
    searchTerm = content[content.length - 1];

    if (searchTerm.length >= this.props.charCount) {
      selectables = this.props.data.filter((item) => {
        return item.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });

      this.setState({ selectables: selectables });
    } else {
      this.setState({ selectables: [] });
    }
  }

  _insertSelected(data) {
    let result = this.props.transformFn(data);
    console.log(result);
  }
};

export default Splicer;
