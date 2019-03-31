import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  label: PropTypes.string,
  counts: PropTypes.objectOf(PropTypes.number),
};

const defaultProps = {
  height: '100%',
  top: 0,
  color: null,
  label: '',
  counts: {},
};

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

Summary.propTypes = propTypes;
Summary.defaultProps = defaultProps;

export default Summary;
