import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    root: {
        backgroundColor: 'black',
        color: 'gold',
        fontFamily: 'Verdana, sans-serif',
        minHeight: '100vh'
    },
    logo: {
        height: '25%',
        width: '25%'
    },
    title: {
        fontSize: '1.5rem'
    },
    list: {
        height: '60vh'
    },
    button: {
        backgroundColor: 'gray',
        borderRadius: '0.5em',
        borderWidth: 0
    },
    previousButton: {
        visibility: props => props.isFirstPage ? 'hidden' : 'visible'
    },
    nextButton: {
        visibility: props => props.isLastPage ? 'hidden' : 'visible'
    }
});

export default useStyles;
