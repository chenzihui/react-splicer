'use strict';

jest.dontMock('../src/Splicer');

import React from 'react/addons';
import Splicer from '../src/Splicer';

let TestUtils = React.addons.TestUtils;

describe('Splicer', () => {
  let tree, callback;

  beforeEach(() => {
    callback = jest.genMockFunction();

    tree = TestUtils.renderIntoDocument(
      <Splicer callback={callback} />
    );
  });

  it('should provide an element for user input', () => {
    let input = TestUtils.findRenderedDOMComponentWithClass(
      tree, 'splicer__user-input');

    expect(input.getDOMNode().getAttribute('contenteditable')).toBeTruthy();
  });

  it('should fire a callback when enter key is pressed', () => {
    let input = TestUtils.findRenderedDOMComponentWithClass(
      tree, 'splicer__user-input');

    input.getDOMNode().innerHTML = 'Hello, world';
    TestUtils.Simulate.keyUp(input, { which: 13 });

    expect(callback).toBeCalledWith('Hello, world');
  });

  it('should not fire the callback if the input is empty', () => {
    let input = TestUtils.findRenderedDOMComponentWithClass(
      tree, 'splicer__user-input');

    TestUtils.Simulate.keyUp(input, { which: 13 });
    expect(callback).not.toBeCalled();
  });
});
