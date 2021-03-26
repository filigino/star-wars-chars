import { useEffect, useReducer, useState } from 'react';
import reducer from 'reducers/CharactersReducer';
import apiUrl from 'apiUrl';
import CharacterListItem from 'components/CharacterListItem';
import useStyles from 'styles/CharacterListStyles';

const CharacterList = () => {
    const [state, dispatch] = useReducer(reducer, {
        characters: [],
        nextPageUrl: `${apiUrl}people/`
    });

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const classes = useStyles({
        length: state.characters.length, nextPageUrl: state.nextPageUrl, page
    });

    useEffect(() => {
        addCharacters();
    }, []);

    const addCharacters = async () => {
        setIsLoading(true);
        const res = await fetch(state.nextPageUrl);
        const data = await res.json();
        dispatch({
            type: 'ADD_CHARACTERS',
            characters: data.results,
            nextPageUrl: data.next
        });
        setIsLoading(false);
    };

    const turnPage = async (prev = false) => {
        // if no characters past current page
        if (!prev && state.characters.length <= page * 10) {
            await addCharacters();
        }
        const inc = prev ? -1 : 1;
        setPage(page + inc);
    };

    const handlePreviousClick = () => {
        if (!isLoading)
            turnPage(true);
    };

    const handleNextClick = () => {
        if (!isLoading)
            turnPage();
    };

    const renderCharacters = state.characters.slice(
        (page - 1) * 10, (page - 1) * 10 + 10
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
                        className={classes.prevButton}
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
