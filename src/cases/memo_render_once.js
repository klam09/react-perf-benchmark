import Title from '../components/Title/Title';
import TitleWithMemo from '../components/Title/TitleWithMemo';

import BenchmarkWithProfiler from '../benchmarkWithProfiler/benchmarkWithProfiler';

export default () => {
  const benchmark = new BenchmarkWithProfiler({ title: 'with React.memo vs without; render once' });

  benchmark.add('Title', <Title title="title" description="description" />);
  benchmark.add('TitleWithMemo', <TitleWithMemo title="title" description="description" />);
  benchmark.run();
  benchmark.printResults();
};
