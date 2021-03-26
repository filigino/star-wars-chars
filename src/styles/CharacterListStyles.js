import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    previousButton: {
        visibility: props => props.page === 1 ? 'hidden' : 'visible'
    },
    nextButton: {
        // visibility: props =>
        //     props.length <= props.page * 10 ?
        //         'hidden'
        //         :
        //         'visible'
    }
});

export default useStyles;
