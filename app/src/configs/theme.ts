import { extendTheme } from '@chakra-ui/react';

const config = {
	initialColorMode: 'system',
	useSystemColorMode: false,
};

const theme = extendTheme({ config });

export { theme };
