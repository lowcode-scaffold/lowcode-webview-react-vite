import { RouteObject } from 'react-router-dom';
import Index from '@/pages/Index';
import Tldraw from '@/pages/Tldraw';
import Chat from '@/pages/Chat';
import DynamicForm from '@/pages/DynamicForm';

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
  {
    path: '/dynamicForm',
    element: <DynamicForm />,
  },
];

export default Common;
