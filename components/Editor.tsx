'use client';

import React from 'react';
import {useAutosave} from "react-autosave";
import {updateEntry} from "@/utils/api";

const Editor = ({ entry }) => {
  const [value, setValue] = React.useState(entry.content);
  const [isSaving, setIsSaving] = React.useState(false)

  useAutosave({
    data: value,
    onSave: async (prevValue) => {
      setIsSaving(true)
      const updated = await updateEntry(entry.id, prevValue)
      setIsSaving(false)
    }
  })

  return (
    <div className="w-full h-full">
      {isSaving && (<div>Saving...</div>)}
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Editor;
