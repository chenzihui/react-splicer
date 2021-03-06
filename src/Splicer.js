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

    this._insertSelected = this._insertSelected.bind(this);
    this._handleEnterKey = this._handleEnterKey.bind(this);
    this._resetState     = this._resetState.bind(this);

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
          onKeyUp={this._handleKeyUp}></div>

        <SplicerList
          selectedIdx={this.state.selectedIndex}
          data={this.state.selectables}
          insertFn={this._insertSelected} />
      </div>
    );
  }

  _handleKeyDown(evt) {
    if (evt.which === KEYS.ENTER) {
      evt.preventDefault();
    }

    if (evt.which === KEYS.DOWN || evt.which === KEYS.UP) {
      if (this.state.selectables.length !== 0) {
        evt.preventDefault();
      }
    }
  }

  _handleKeyUp(evt) {
    if (evt.which === KEYS.ENTER) {
      return this._handleEnterKey(evt);
    }

    if (evt.which === KEYS.ESC) {
      return this._resetState();
    }

    if (evt.which === KEYS.UP || evt.which === KEYS.DOWN) {
      return this._setSelectedItem(evt.which);
    }

    this._setSearchTerm();
  }

  _handleEnterKey(evt) {
    if (this.state.selectables.length > 0) {
      return this._insertSelected(
        this.state.selectables[this.state.selectedIndex]);
    } else {
      return this._fireCallback(evt.target.textContent);
    }
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
    let result = this.props.transformFn(data),
        sel    = window.getSelection(),
        range  = sel.getRangeAt(0),
        input  = React.findDOMNode(this.refs.userInput),

        nodes, startNode, words, lastWord, wordStart, wordEnd, el, space;

    input.normalize();
    range.collapse(true);
    range.setStart(input, 0);

    nodes = Array.prototype.filter.call(input.childNodes, (node) => {
      return node.nodeType === 3;
    });

    nodes = nodes.reverse();

    Array.prototype.forEach.call(nodes, (node) => {
      if (node.nodeValue.trim()) {
        startNode = node;
      }
    });

    words = range.toString().split(' ');
    lastWord = words[words.length - 1];

    wordStart = range.toString().lastIndexOf(lastWord);
    wordEnd   = wordStart + lastWord.length;

    range.setStart(startNode, wordStart);
    range.setEnd(startNode, wordEnd);
    range.deleteContents();

    if (typeof(result) === 'string') {
      el = document.createTextNode(result);
    } else {
      el = result;
    }

    range.insertNode(el);
    range.setStartAfter(el);

    space = document.createTextNode('\u00a0');
    range.insertNode(space);
    range.setStartAfter(space);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);

    this._resetState();
  }

  _resetState() {
    this.setState({ selectables: [], selectedIndex: 0 });
  }
};

export default Splicer;
