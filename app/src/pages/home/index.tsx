import { Box, Button, Text, useColorMode } from '@chakra-ui/react';
import { FC } from 'react';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';

const Homepage: FC = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	const themeIconSize = ['1.3rem', '1.6rem', '2rem'];

	return (
		<Box
			display={'flex'}
			justifyContent={'center'}
			alignItems={'center'}
			fontFamily={'Krona One'}
			w={'100dvw'}
			h={'100dvh'}
			bg={colorMode === 'light' ? 'white' : 'black'}
		>
			<Box pos={'absolute'} top={[2, 5, 10]} right={[2, 5, 10]}>
				<Button onClick={toggleColorMode}>
					<Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
						<Text fontSize={['0.7rem', '0.85rem', '1rem']}>
							{colorMode === 'light' ? '#000000' : '#FFFFFF'}
						</Text>
						{colorMode === 'light' ? (
							<Box h={themeIconSize}>
								<MdOutlineDarkMode />
							</Box>
						) : (
							<Box h={themeIconSize}>
								<MdOutlineLightMode />
							</Box>
						)}
					</Box>
				</Button>
			</Box>
			<Box
				h={'50dvh'}
				w={'100%'}
				display={'flex'}
				flexDir={'column'}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Text textAlign={'center'} fontSize={['2.5rem', '3.5rem', '5rem']}>
					HexGuess
				</Text>
				<Box
					display={'flex'}
					flexDir={'column'}
					justifyContent={'space-between'}
					gap={'2rem'}
					w={['60%', '40%', '30%']}
				>
					<Button h={'3rem'}>
						<Text>Create game</Text>
					</Button>
					<Button h={'3rem'}>
						<Text>Join game</Text>
					</Button>

					<Box>
						<Text textAlign={'center'} fontSize={['0.7rem']}>
							How to play
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export { Homepage };
