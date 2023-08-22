import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from 'reactstrap';
import { useTreeData } from './useData';

import './index.css';

const makeDots = (text) => {
  return text.replaceAll('.', '').replace(/\d/g, '.');
};

const addDots = ({ label, currentIndex }) => {
  const [first, ...rest] = label.split('');

  return `${currentIndex} ${first}${makeDots(currentIndex)}${rest.join('')}`;
};

const NodeLabel = ({ label, currentIndex }) => {
  return <span>{addDots({ label, currentIndex })}</span>;
};

const createNewNode = ({ value, index, data }) => {
  // const deepLvl = index.split('.')
  const treeLvl = index.replaceAll('.', '').length;

  if (!treeLvl) {
    return [{ label: value }, ...data];
  }

  return data;
};

const InputNewNode = ({ index }) => {
  const { data, setData } = useTreeData();

  return (
    <Input
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setData(() => createNewNode({ data, value: e.target.value, index }));
        }
      }}
      type="text"
    />
  );
};

const TreeNode = ({ node, idx }) => (
  <li>
    <NodeLabel
      label={`${node.label}`}
      currentIndex={idx}
    />

    {node.children && (
      <ul>
        {node.children.map((child, childIndex) => {
          const currentChildIndex = `${idx}.${childIndex + 1}`;

          return (
            <li key={child.key}>
              <NodeLabel
                label={`${child.label}`}
                currentIndex={currentChildIndex}
              />
              {child.children && (
                <Tree
                  nodes={child.children}
                  parentIndex={currentChildIndex}
                />
              )}
            </li>
          );
        })}
        <InputNewNode index={idx} />
      </ul>
    )}
  </li>
);

const Tree = ({ nodes, parentIndex = '', setData }) => (
  <ul>
    {nodes.map((node, idx) => {
      const currentIndex = parentIndex ? `${parentIndex}.${idx + 1}` : `${idx + 1}`;

      return (
        <TreeNode
          key={currentIndex}
          node={node}
          idx={currentIndex}
          setData={setData}
        />
      );
    })}
    <InputNewNode index={parentIndex} />
  </ul>
);

const TreeContainer = () => {
  const { data } = useTreeData();

  return <Tree nodes={data} />;
};

export default TreeContainer;
