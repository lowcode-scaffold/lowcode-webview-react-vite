/* eslint-disable @typescript-eslint/no-explicit-any */

import router from '../router';

export const taskHandler: {
  [propName: string]: (data: any) => void;
} = {
  route: (data: { path: string; materialPath: string }) => {
    localStorage.setItem('materialPath', data.materialPath);
    router.navigate(data.path);
  },
};
