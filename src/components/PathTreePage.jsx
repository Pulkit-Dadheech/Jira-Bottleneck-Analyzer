import React, { useState } from 'react';
import { useUserData } from '../context/UserDataContext';

// Custom badge for activities with icon
const activityIcons = {
  'Created': 'bx-plus-circle',
  'Assigned': 'bx-user-plus',
  'In Progress': 'bx-loader-circle',
  'Resolved': 'bx-check-circle',
  'QA Review': 'bx-search-alt',
  'Closed': 'bx-lock',
  'Reopened': 'bx-undo',
};
const ActivityBadge = ({ name }) => (
  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full mr-2 mb-1 shadow transition-transform hover:scale-105">
    {activityIcons[name] && <i className={`bx ${activityIcons[name]} text-base`}></i>}
    {name}
  </span>
);

// Recursive tree node with collapse/expand and better visuals
const TreeNode = ({ node, level = 0 }) => {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  return (
    <li className="mb-2">
      <div
        className={`flex items-center gap-2 cursor-pointer select-none px-2 py-1 rounded transition group ${hasChildren ? 'hover:bg-indigo-900/40' : ''}`}
        style={{ marginLeft: level * 8 }}
        onClick={() => hasChildren && setOpen(!open)}
      >
        {hasChildren && (
          <i className={`bx bx-chevron-${open ? 'down' : 'right'} text-lg text-indigo-400 group-hover:text-indigo-200`}></i>
        )}
        <ActivityBadge name={node.name} />
        <span className="text-indigo-300 text-xs font-bold ml-1">x{node.count}</span>
      </div>
      {hasChildren && open && (
        <ul className="ml-2 border-l-2 border-dashed border-indigo-700 pl-3 mt-1">
          {node.children.map((child, idx) => (
            <TreeNode key={idx} node={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

// Accordion panel for each ticket path
const CasePanel = ({ cp }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-indigo-700 rounded-xl mb-4 overflow-hidden shadow-xl bg-gradient-to-br from-gray-900 to-indigo-950">
      <button
        className="w-full flex justify-between items-center p-4 bg-gradient-to-r from-indigo-700 to-purple-800 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-indigo-400"
        onClick={() => setOpen(!open)}
      >
        <span>Case <span className="font-extrabold tracking-widest text-indigo-200">{cp.case_id}</span></span>
        <i className={`bx bx-chevron-${open ? 'up' : 'down'} text-2xl`} />
      </button>
      {open && (
        <div className="p-4 bg-gray-950 text-gray-100 flex flex-wrap gap-2">
          {cp.path.map((activity, idx) => (
            <ActivityBadge key={idx} name={activity} />
          ))}
        </div>
      )}
    </div>
  );
};

const PathTreePage = () => {
  const { userData, loading, error } = useUserData();
  if (loading) return <div className="text-center text-lg text-indigo-300 py-10 animate-pulse">Loading path tree...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  const pathTree = userData?.pathTree || [];
  const casePaths = userData?.casePaths || [];

  // Rendering using TreeNode
  const renderTree = (nodes) => (
    <ul className="ml-2 list-none">
      {nodes.map((node, idx) => (
        <TreeNode key={idx} node={node} />
      ))}
    </ul>
  );

  return (
    <div className="space-y-12 max-w-5xl mx-auto px-2 md:px-0">
      {/* Process Path Tree */}
      <section className="bg-gradient-to-br from-gray-900 to-indigo-950 p-10 rounded-3xl shadow-2xl border border-indigo-800">
        <h2 className="text-4xl font-extrabold mb-8 text-indigo-100 tracking-tight flex items-center gap-3">
          <i className="bx bx-git-branch text-indigo-400 text-3xl"></i> Process Path Tree
        </h2>
        {pathTree.length > 0 ? (
          renderTree(pathTree)
        ) : (
          <p className="text-gray-400">No path tree data available.</p>
        )}
      </section>

      {/* Ticket Paths Accordion */}
      <section className="bg-gradient-to-br from-gray-900 to-indigo-950 p-10 rounded-3xl shadow-2xl border border-indigo-800">
        <h2 className="text-4xl font-extrabold mb-8 text-indigo-100 tracking-tight flex items-center gap-3">
          <i className="bx bx-collection text-indigo-400 text-3xl"></i> Ticket Paths
        </h2>
        {casePaths.length > 0 ? (
          casePaths.map((cp, idx) => <CasePanel key={idx} cp={cp} />)
        ) : (
          <p className="text-gray-400">No ticket path data available.</p>
        )}
      </section>
    </div>
  );
};

export default PathTreePage;
