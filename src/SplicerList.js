'use strict';

import React from 'react';
import SplicerListItem from './SplicerListItem';

class SplicerList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classes = this.props.data.length === 0
                  ? 'splicer__list hidden'
                  : 'splicer__list';

    let items = this.props.data.map((item) => {
      return <SplicerListItem data={item} />;
    });

    return (
      <ul className={classes}>
        {items}
      </ul>
    );
  }
};

export default SplicerList;
