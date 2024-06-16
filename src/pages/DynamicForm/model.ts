import { useState } from 'react';
import { useImmer } from 'use-immer';

export const useModel = () => {
  const [schema, setSchema] = useState<object>({});

  const [scriptModal, setScriptModal] = useImmer<{
    visible: boolean;
    loading: boolean;
    scripts: { method: string; remark: string }[];
    method?: string;
    params: string;
  }>({
    visible: false,
    loading: false,
    scripts: [],
    method: undefined,
    params: '',
  });

  const [updateModelModal, setUpdateModelModal] = useImmer({
    visible: false,
    model: '',
  });

  return {
    schema,
    setSchema,
    scriptModal,
    setScriptModal,
    updateModelModal,
    setUpdateModelModal,
  };
};

export type Model = ReturnType<typeof useModel>;
