import { Profiler } from 'react';
import globalJsdom from 'global-jsdom';
import chalk from 'chalk';
import shuffle from 'lodash/shuffle';

import { render, cleanup as cleanupTestingLib } from '@testing-library/react';

import htmlTemplate from './htmlTemplate';

import { max, min, avg, removeMax, removeMin, round, percentDiff } from './utils';

class BenchmarkWithProfiler {
  constructor(options = {}) {
    const { sampleSize = 100, title } = options;

    const sampleSizeOffset = Math.ceil(sampleSize * 0.02);

    this.options = {
      sampleSize: sampleSize + sampleSizeOffset,
      sampleSizeOffset,
      title,
    };
    this.setup();
    this.tests = {};
  }

  get results() {
    return this.testIds.map((id) => ({
      ...this.tests[id].result,
      id,
    }));
  }

  printResults = () => {
    if (this.options.title) {
      console.log(chalk.green(`# ${this.options.title}`));
    }

    this.testIds.forEach((id) => {
      const { result } = this.tests[id];

      console.log(
        chalk.yellow(`${id}`) +
          ` - render time: ${round(result.avgActualDuration, 2)}s` +
          ` ±${round(result.diffActualDuration * 100, 2)}%`
      );
    });
  };

  setup = () => {
    this.cleanupJsdom = globalJsdom(htmlTemplate);
  };

  cleanup = async () => {
    cleanupTestingLib();
    this.cleanupJsdom();

    // const isCleanupDone = () => Boolean(window) && Boolean(document);
  };

  add = (id, node, renderAction) => {
    this.tests[id] = {
      id,
      node,
      renderAction,
      result: {
        actualDurations: [],
      },
    };
  };

  renderByTestId = (id) => {
    this.setup();

    const testingLibRenderResult = render(
      <Profiler id={id} onRender={this.handleProfilerRender}>
        {this.tests[id].node}
      </Profiler>
    );
    if (this.tests[id].renderAction) {
      this.tests[id].renderAction(testingLibRenderResult);
    }

    this.cleanup();
  };

  generateStat = () => {
    this.testIds.forEach((id) => {
      const { result } = this.tests[id];
      removeMax(result.actualDurations, this.options.sampleSizeOffset);
      removeMin(result.actualDurations, this.options.sampleSizeOffset);

      result.avgActualDuration = avg(result.actualDurations);
      result.maxActualDuration = max(result.actualDurations);
      result.minActualDuration = min(result.actualDurations);
      result.diffActualDuration = Math.max(
        percentDiff(result.avgActualDuration, result.maxActualDuration),
        -1 * percentDiff(result.avgActualDuration, result.minActualDuration)
      );
    });
  };

  run = () => {
    this.testIds = Object.keys(this.tests);

    let shuffledIds = shuffle(this.testIds); // change execution order each time

    for (let i = 0; i < this.options.sampleSize; i++) {
      shuffledIds.forEach((id) => {
        this.renderByTestId(id);
      });
      shuffledIds = shuffle(this.testIds);
    }

    this.generateStat();
  };

  handleProfilerRender = (
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) => {
    this.tests[id].result.actualDurations.push(actualDuration);
  };
}

export default BenchmarkWithProfiler;
