import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    root: {
        backgroundColor: 'black',
        color: 'gold',
        minHeight: '100vh'
    },
    back: {
        backgroundColor: 'gray',
        borderRadius: '0.5em',
        color: 'black',
        '&:hover': {
            color: 'black'
        },
        padding: '0.5em',
        textDecoration: 'none'
    },
    name: {
        fontSize: '1.5rem'
    }
});

export default useStyles;
