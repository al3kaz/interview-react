import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

export const TREE = [
  {
    key: '1',
    label: 'root',
    children: [
      { key: '1.1', label: 'ant' },
      {
        key: '1.2',
        label: 'bear',
        children: [
          { key: '1.2.1', label: 'cat' },
          {
            key: '1.2.2',
            label: 'dog',
            children: [{ key: '1.2.2.1', label: 'elephant' }],
          },
        ],
      },
      { key: '1.3', label: 'frog' },
    ],
  },
];

const NodeLabel = ({ label }) => <span>{label}</span>;

const TreeNode = ({ node }) => (
  <li>
    <NodeLabel label={`${node.key} ${node.label}`} />
    {node.children && (
      <ul>
        {node.children.map((child) => {
          return (
            <li key={child.key}>
              <NodeLabel label={`${child.key} ${child.label}`} />
              {child.children && <Tree nodes={child.children} />}
            </li>
          );
        })}
      </ul>
    )}
  </li>
);

const Tree = ({ nodes }) => (
  <ul>
    {nodes.map((node) => (
      <TreeNode
        key={node.key}
        node={node}
      />
    ))}
  </ul>
);

export default Tree;
