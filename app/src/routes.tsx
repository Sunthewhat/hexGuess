import { createBrowserRouter } from 'react-router-dom';
import { Homepage } from './pages/home';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Homepage />,
	},
]);

export { router };
