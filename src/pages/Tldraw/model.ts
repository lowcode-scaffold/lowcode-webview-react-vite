import { useState } from 'react';

export const useModel = () => {
  const [scriptRes, setScriptRes] = useState('');
  const [materialPath, setMaterialPath] = useState('');

  return {
    scriptRes,
    setScriptRes,
    materialPath,
    setMaterialPath,
  };
};

export type Model = ReturnType<typeof useModel>;
