import Benchmark from 'benchmark';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import chalk from 'chalk';

import Title, { TitleWithMemo } from '../components/Title';

export default () => {
  const suite = new Benchmark.Suite();
  const cleanup = globalJsdom(htmlTemplate);

  console.log(chalk.green('Brenchmark with memo vs without memo, first render'));

  suite
    .add('without React.memo', () => {
      ReactDomServer.renderToString(<Title title={`${Math.random()}`} />);
    })
    .add('with React.memo', () => {
      ReactDomServer.renderToString(<TitleWithMemo title={`${Math.random()}`} />);
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
