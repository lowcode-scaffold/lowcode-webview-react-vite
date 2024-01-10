import { RouteObject } from 'react-router-dom';
import App from '../../App';

const Common: RouteObject[] = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/index.html',
    element: <App />,
  },
];

export default Common;
