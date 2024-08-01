import { Gitgraph, templateExtend, TemplateName } from '@gitgraph/react';
import { Branches, GraphItem } from '../../types/git';

const customTemplate = templateExtend(TemplateName.Metro, {
  colors: ['#E84BA5', '#4682B4', '#FFA657'],
  branch: {
    lineWidth: 8,
    spacing: 50,
  },
  commit: {
    spacing: 60,
    dot: {
      size: 12,
      strokeColor: '#000000',
      strokeWidth: 3,
    },
    message: {
      displayAuthor: false,
      displayHash: false,
      font: 'normal 14pt Arial',
    },
  },
});

interface GitGraphVisualizerProps {
  graph: GraphItem[];
}

const GitGraphVisualizer: React.FC<GitGraphVisualizerProps> = ({ graph }) => {
  return (
    <Gitgraph options={{ template: customTemplate }} key={graph.length}>
      {(gitgraph) => {
        const branches: Branches = {};
        graph.forEach((item) => {
          if (item.type === 'branch') {
            if (!branches[item.name]) {
              branches[item.name] = item.from
                ? gitgraph.branch({
                    name: item.name,
                    from: branches[item.from],
                  })
                : gitgraph.branch(item.name);
            }
          } else if (item.type === 'commit') {
            branches[item.branch].commit(item.message);
          } else if (item.type === 'merge') {
            branches[item.to].merge(branches[item.from]);
          } else if (item.type === 'tag') {
            branches[item.branch].tag(item.tag);
          }
        });
      }}
    </Gitgraph>
  );
};

export default GitGraphVisualizer;
