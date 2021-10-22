import Benchmark from 'benchmark';
import React from 'react';
import ReactDom from 'react-dom';
import chalk from 'chalk';

import globalJsdom from 'global-jsdom';

import htmlTemplate from '../constants/htmlTemplate';
import Title, { TitleWithMemo } from '../components/Title';

export default () => {
  const suite = new Benchmark.Suite();
  const cleanup = globalJsdom(htmlTemplate);

  console.log(chalk.green('Brenchmark with memo vs without memo, re-render with different props'));

  suite
    .add('without React.memo', () => {
      ReactDom.render(
        <Title title={`${Math.random()}`} description={`${Math.random()}`} />,
        document.getElementById('root1')
      );
    })
    .add('with React.memo', () => {
      ReactDom.render(
        <TitleWithMemo title={`${Math.random()}`} description={`${Math.random()}`} />,
        document.getElementById('root2')
      );
    })
    .on('cycle', function (event) {
      console.log(String(event.target));
    })
    .on('complete', function () {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
      cleanup();
    })
    .run({ async: false });
};
