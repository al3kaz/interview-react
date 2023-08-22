import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './index.css';

const NodeLabel = ({ label }) => <span>{label}</span>;

const TreeNode = ({ node, idx }) => (
  <li>
    <NodeLabel label={`${idx} ${node.label}`} />
    {node.children && (
      <ul>
        {node.children.map((child, childIndex) => {
          const currentChildIndex = `${idx}.${childIndex + 1}`;

          return (
            <li key={child.key}>
              <NodeLabel label={`${currentChildIndex} ${child.label}`} />
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
      const currentIndex = parentIndex ? `${parentIndex}.${idx + 1}` : idx + 1;

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
