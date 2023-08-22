import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      </ul>
    )}
  </li>
);

const Tree = ({ nodes, parentIndex = '' }) => (
  <ul>
    {nodes.map((node, idx) => {
      const currentIndex = parentIndex ? `${parentIndex}.${idx + 1}` : `${idx + 1}`;

      return (
        <TreeNode
          key={currentIndex}
          node={node}
          idx={currentIndex}
        />
      );
    })}
  </ul>
);

export default Tree;
