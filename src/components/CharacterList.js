import { useEffect, useReducer, useState } from 'react';
import { useLocation } from 'react-router-dom';
import reducer from 'reducers/CharacterReducer';
import CharacterListItem from 'components/CharacterListItem';
import Loading from 'components/Loading';
import apiUrl from 'apiUrl';
import useStyles from 'styles/CharacterListStyles';
import logo from 'logo.svg';

const CharacterList = () => {
    const location = useLocation();

    const [state, dispatch] = useReducer(reducer, { characters: [] });

    // if this component is loaded from Back button of Character page,
    // corresponding page is stored in location object
    const INITIAL_PAGE = location.state || 1;
    const [page, setPage] = useState(INITIAL_PAGE);
    // for rendering correct page of characters
    const [offset, setOffset] = useState(INITIAL_PAGE);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const classes = useStyles({
        isFirstPage: page === 1,
        isLastPage: page === Math.ceil(count / 10)
    });

    useEffect(() => {
        const load = async () => {
            const res = await fetch(
                `${apiUrl}people/${INITIAL_PAGE === 1 ?
                    ''
                    :
                    `?page=${INITIAL_PAGE}`}`
            );
            const data = await res.json();
            dispatch({
                type: 'ADD_NEXT',
                characters: data.results
            });
            setCount(data.count);
            setIsLoading(false);
        };
        load();
    }, [INITIAL_PAGE]);

    const addCharacters = async (next = true) => {
        setIsLoading(true);
        const res = await fetch(
            `${apiUrl}people/?page=${page + (next ? 1 : -1)}`
        );
        const data = await res.json();
        dispatch({
            type: next ? 'ADD_NEXT' : 'ADD_PREVIOUS',
            characters: data.results
        });
        setIsLoading(false);
    };

    const turnPage = (next = true) => {
        const inc = next ? 1 : -1;
        setPage(page + inc);
        // if no characters past current page
        if (next && !state.characters[(page - offset) * 10 + 10]) {
            addCharacters();
        }
        // if no characters before current page
        else if (!next && page - offset === 0) {
            addCharacters(false);
            setOffset(offset - 1);
        }
    };

    const handlePreviousClick = () => {
        if (!isLoading)
            turnPage(false);
    };

    const handleNextClick = () => {
        if (!isLoading)
            turnPage();
    };

    // only render characters from current page
    const characters = state.characters.slice(
        (page - offset) * 10, (page - offset) * 10 + 10
    ).map(character =>
        <CharacterListItem key={character.url} character={character} />
    );

    return (
        <div className={classes.root}>
            <div className="container">
                <div className="d-flex flex-column justify-content-center align-items-center mb-3">
                    <img className={classes.logo} src={logo} alt="" />
                    <div className={classes.title}>Character List</div>
                </div>
                <div className={`d-flex flex-column justify-content-between mb-3 ${classes.list}`}>
                    {
                        isLoading ?
                            <Loading />
                            :
                            characters
                    }
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        className={`${classes.button} ${classes.previousButton}`}
                        onClick={handlePreviousClick}
                    >
                        {'<-'}
                    </button>
                    <div className={classes.title}>
                        {page}
                    </div>
                    <button
                        className={`${classes.button} ${classes.nextButton}`}
                        onClick={handleNextClick}
                    >
                        {'->'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CharacterList;
