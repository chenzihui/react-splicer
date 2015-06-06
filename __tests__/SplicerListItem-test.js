'use strict';

jest.dontMock('../src/SplicerListItem');

import React from 'react/addons';
import SplicerListItem from '../src/SplicerListItem';

let TestUtils = React.addons.TestUtils;

describe('Splicer list item', () => {
  let tree, data, callback;

  beforeEach(() => {
    data = 'Hello, world';
    callback = jest.genMockFunction();

    tree = TestUtils.renderIntoDocument(
      <SplicerListItem data={data} callback={callback} />
    );
  });

  it('should fire a callback when the enter key is pressed', () => {
    let node = React.findDOMNode(tree.refs.selectable);

    TestUtils.Simulate.click(node);
    expect(callback).toBeCalledWith(data);
  });
});
