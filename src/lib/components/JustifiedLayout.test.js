import React from 'react';
import ReactDOM from 'react-dom';
import JustifiedLayout from './JustifiedLayout';

it('JustifiedLayout component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JustifiedLayout />, div);
});
