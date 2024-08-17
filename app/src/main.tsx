import ReactDOM from 'react-dom/client';

import '@fontsource/krona-one';
import './main.css';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from './configs/theme.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';
import { IconContext } from 'react-icons';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ChakraProvider>
		<IconContext.Provider value={{ size: 'auto' }}>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<RouterProvider router={router} />
		</IconContext.Provider>
	</ChakraProvider>
);
