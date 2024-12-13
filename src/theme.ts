import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        primary: {
            100: '#E3F2FD',
            200: '#BBDEFB',
            300: '#90CAF9',
            400: '#64B5F6',
            500: '#42A5F5', // Hauptfarbe
            600: '#2196F3',
            700: '#1E88E5',
            800: '#1976D2',
            900: '#0D47A1',
        },
    },
    fonts: {
        heading: 'Roboto, sans-serif',
        body: 'Open Sans, sans-serif',
    },
    styles: {
        global: {
            body: {
                bg: 'gray.50',
                color: 'gray.800',
            },
        },
    },
});

export default theme;
