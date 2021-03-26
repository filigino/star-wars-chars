import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    link: {
        color: 'gold',
        textDecoration: 'none',
        '&:hover': {
            color: 'gold'
        }
    },
    root: {
        backgroundColor: 'gray',
        borderRadius: '0.5em'
    },
    name: {
        fontSize: '1.5rem'
    }
});

export default useStyles;
