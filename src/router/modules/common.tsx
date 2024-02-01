import { RouteObject } from 'react-router-dom';
import Index from '@/pages/Index';
import Tldraw from '@/pages/Tldraw';
import Chat from '@/pages/Chat';

const Common: RouteObject[] = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/index.html',
    element: <Index />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '/tldraw',
    element: <Tldraw />,
  },
];

export default Common;
