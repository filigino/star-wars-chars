import { useEffect, useReducer, useState } from 'react';
import { useLocation } from 'react-router-dom';
import reducer from 'reducers/CharacterReducer';
import apiUrl from 'apiUrl';
import CharacterListItem from 'components/CharacterListItem';
import useStyles from 'styles/CharacterListStyles';

const CharacterList = () => {
    const location = useLocation();

    const [state, dispatch] = useReducer(reducer, { characters: [] });

    const [page, setPage] = useState(location.state || 1);
    const [offset, setOffset] = useState((location.state || 1) - 1);
    const [isLoading, setIsLoading] = useState(true);

    const classes = useStyles({
        length: state.characters.length, page
    });

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`${apiUrl}people/${page === 1 ? '' : `?page=${page}`}`);
            const data = await res.json();
            dispatch({
                type: 'ADD_NEXT',
                characters: data.results
            });
            setIsLoading(false);
        };
        load();
    }, []);

    const addCharacters = async (next = true) => {
        setIsLoading(true);
        const res = await fetch(`${apiUrl}people/?page=${page + (next ? 1 : -1)}`);
        const data = await res.json();
        dispatch({
            type: next ? 'ADD_NEXT' : 'ADD_PREVIOUS',
            characters: data.results
        });
        setIsLoading(false);
    };

    const turnPage = async (next = true) => {
        // if no characters past current page
        if (next && state.characters.length <= page * 10) {
            await addCharacters();
        } else if (!next && page - offset - 1 === 0) {
            await addCharacters(false);
            setOffset(offset - 1);
        }
        const inc = next ? 1 : -1;
        setPage(page + inc);
    };

    const handlePreviousClick = () => {
        if (!isLoading)
            turnPage(false);
    };

    const handleNextClick = () => {
        if (!isLoading)
            turnPage();
    };

    const renderCharacters = state.characters.slice(
        (page - offset - 1) * 10, (page - offset - 1) * 10 + 10
    ).map(character =>
        <CharacterListItem key={character.url} character={character} />
    );

    return (
        <div className="container">
            {
                isLoading ?
                    <div>Loading</div>
                    :
                    renderCharacters
            }
            <div className="row justify-content-between">
                <div className="col-auto">
                    <button
                        className={classes.previousButton}
                        onClick={handlePreviousClick}
                    >
                        Previous
                    </button>
                </div>
                <div className="col-auto">
                    {page}
                </div>
                <div className="col-auto">
                    <button
                        className={classes.nextButton}
                        onClick={handleNextClick}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CharacterList;
