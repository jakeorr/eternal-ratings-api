/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
};

const defaultProps = {};

class Pagination extends Component {
  render() {
    const {
      props: { offset, limit, count, onNextClick, onPreviousClick },
    } = this;

    const nextEnabled = count > (offset + 1) * limit;
    const previousEnabled = offset !== 0;

    const stylesheet = {
      pagination: {
        top: '90%',
        left: 0,
        height: '10%',
      },
      pageNumber: {
        top: '50%',
        left: '50%',
        style: {
          fg: 'grey',
        },
      },
      next: {
        right: 0,
        width: '25%',
        border: { type: 'line' },
        style: {
          fg: nextEnabled ? 'white' : 'grey',
          border: { fg: nextEnabled ? 'white' : 'grey' },
        },
      },
      previous: {
        left: 0,
        width: '25%',
        border: { type: 'line' },
        style: {
          fg: previousEnabled ? 'white' : 'grey',
          border: { fg: previousEnabled ? 'white' : 'grey' },
        },
      },
    };

    const inputProps = { clickable: true, mouse: true };

    return (
      <box {...{ class: stylesheet.pagination }}>
        <text {...{ class: stylesheet.pageNumber }}>{offset + 1}</text>
        <button
          {...{
            onClick: nextEnabled ? onNextClick : () => {},
            class: stylesheet.next,
            ...inputProps,
          }}
        >
          ›
        </button>
        <button
          {...{
            onClick: previousEnabled ? onPreviousClick : () => {},
            class: stylesheet.previous,
            ...inputProps,
          }}
        >
          ‹
        </button>
      </box>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
