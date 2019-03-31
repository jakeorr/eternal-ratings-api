import React, { Component } from 'react';

class Summary extends Component {
  render() {
    const { height, label, top, counts, color } = this.props;

    const content = Object.keys(counts).reduce((acc, rating) => {
      const count = counts[rating];
      if (!count) return acc;
      const isGood = parseFloat(rating) >= 3;
      return `${acc}${
        isGood ? '{bold}' : '{grey-fg}'
      }${rating}:\t${count}{/}\n`;
    }, '');

    return (
      <box
        {...{
          label,
          top,
          left: 0,
          width: '100%',
          height,
          tags: true,
          content,
          border: { type: 'line' },
          style: { border: { fg: color } },
        }}
      />
    );
  }
}

export default Summary;
