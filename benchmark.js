import globalJsdom from 'global-jsdom';

import Benchmark from 'benchmark';
import { render } from '@testing-library/react';

import Title from './src/components/Title/Title';
import TitleWithMemo from './src/components/Title/TitleWithMemo';

globalJsdom('<html><head></head><body></body</html');
const suite = new Benchmark.Suite();

suite
  .add('Title', function () {
    render(<Title title="title" description="description" />);
  })
  .add('TitleWithMemo', function () {
    render(<TitleWithMemo title="title" />);
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });
