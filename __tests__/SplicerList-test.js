'use strict';

jest.dontMock('../src/SplicerList');

import React from 'react/addons';
import SplicerList from '../src/SplicerList';
import SplicerListItem from '../src/SplicerListItem';

let TestUtils = React.addons.TestUtils;

describe('Splicer list', () => {
  it('should display a list of items', () => {
    let data = ['Apple', 'Orange', 'Banana', 'Pineapple'];

    let tree = TestUtils.renderIntoDocument(
      <SplicerList data={data} />
    );

    let items = TestUtils.scryRenderedComponentsWithType(tree, SplicerListItem);
    expect(items.length).toEqual(4);
  });

  it('should add a hidden class if there are no items', () => {
    let tree = TestUtils.renderIntoDocument(
      <SplicerList data={[]} />
    );

    let list = TestUtils.findRenderedDOMComponentWithClass(
      tree, 'splicer__list');

    expect(list.getDOMNode().getAttribute('class')).toMatch(/hidden/);
  });
});
