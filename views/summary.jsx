import { map } from 'lodash';
import React, { Component } from 'react';

class Summary extends Component {
  render() {
    const { counts } = this.props;

    const headerRow = ['Rating', '#'];

    const rows = map(counts, (count, rating) => [
      rating,
      count.toFixed(0),
    ]).filter(el => el[1] !== '0');

    return (
      <table
        {...{
          top: 0,
          left: 0,
          width: '100%',
          height: '40%',
          data: [headerRow, ...rows],
        }}
      />
    );
  }
}

export default Summary;
