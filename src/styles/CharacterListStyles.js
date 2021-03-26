import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    prevButton: {
        visibility: props => props.page === 1 ? 'hidden' : 'visible'
    },
    nextButton: {
        visibility: props =>
            !props.nextPageUrl && props.length <= props.page * 10 ?
                'hidden'
                :
                'visible'
    }
});

export default useStyles;
