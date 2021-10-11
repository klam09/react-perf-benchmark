import Title from '../components/Title/Title';
import TitleWithMemo from '../components/Title/TitleWithMemo';

import BenchmarkWithProfiler from '../benchmarkWithProfiler/benchmarkWithProfiler';

export default () => {
  const benchmark = new BenchmarkWithProfiler({ title: 'with React.memo vs without; re-render with same props' });

  benchmark.add('Title', <Title title="title" description="description" />, ({ rerender }) => {
    rerender(<Title title="title" description="description" />);
    rerender(<Title title="title" description="description" />);
    rerender(<Title title="title" description="description" />);
  });
  benchmark.add('TitleWithMemo', <TitleWithMemo title="title" description="description" />, ({ rerender }) => {
    rerender(<TitleWithMemo title="title" description="description" />);
    rerender(<TitleWithMemo title="title" description="description" />);
    rerender(<TitleWithMemo title="title" description="description" />);
  });
  benchmark.run();
  benchmark.printResults();
};
