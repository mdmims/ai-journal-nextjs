'use client';

import React from 'react';
import { useAutosave } from 'react-autosave';
import { updateEntry } from '@/utils/api';

const Editor = ({ entry }) => {
  const [value, setValue] = React.useState(entry.content);
  const [isSaving, setIsSaving] = React.useState(false);
  const [analysis, setAnalysis] = React.useState(entry.analysis)
  
  const { mood, summary, color, subject, negative } = analysis;
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative },
  ];

  useAutosave({
    data: value,
    onSave: async (prevValue) => {
      setIsSaving(true);
      const data = await updateEntry(entry.id, prevValue);
      setAnalysis(data.analysis)
      setIsSaving(false);
    },
  });

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {isSaving && <div>Saving...</div>}
        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                className="flex items-center justify-between px-2 py-4 border-b border-t border-black/10"
                key={item.name}
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
