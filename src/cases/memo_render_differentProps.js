import Title from '../components/Title/Title';
import TitleWithMemo from '../components/Title/TitleWithMemo';

import BenchmarkWithProfiler from '../benchmarkWithProfiler/benchmarkWithProfiler';

export default () => {
  const benchmark = new BenchmarkWithProfiler({ title: 'with React.memo vs without; re-render with different props' });

  benchmark.add('Title', <Title title="title" description="description" />, ({ rerender }) => {
    rerender(<Title title="title" description="description" />);
    rerender(<Title title="title1" description="description1" />);
    rerender(<Title title="title2" description="description2" />);
  });
  benchmark.add('TitleWithMemo', <TitleWithMemo title="title" description="description" />, ({ rerender }) => {
    rerender(<TitleWithMemo title="title" description="description" />);
    rerender(<TitleWithMemo title="title1" description="description1" />);
    rerender(<TitleWithMemo title="title2" description="description2" />);
  });
  benchmark.run();
  benchmark.printResults();
};
