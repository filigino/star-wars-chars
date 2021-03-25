import { useEffect, useReducer, useState } from 'react';
import reducer from 'reducers/CharsReducer';
import CharList from 'components/CharList';
import apiUrl from 'apiUrl';

const StarWarsChars = () => {
    const [state, dispatch] = useReducer(reducer, {
        chars: [],
        nextPageUrl: `${apiUrl}people/`
    });

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const addChars = async () => {
        setIsLoading(true);
        console.log('fetching!'); // remove
        const res = await fetch(state.nextPageUrl);
        const data = await res.json();
        dispatch({
            type: 'ADD_CHARS',
            chars: data.results,
            nextPageUrl: data.next
        });
        setIsLoading(false);
    };

    useEffect(() => {
        addChars();
    }, []);

    const renderPrevious = () => {
        setPage(page - 1);
    };

    const renderNext = async () => {
        // if no characters past current page
        if (state.chars.length <= page * 10) {
            await addChars();
        }
        setPage(page + 1);
    };

    return (
        <div className="container">
            <CharList
                {...state}
                page={page}
                isLoading={isLoading}
                renderPrevious={renderPrevious}
                renderNext={renderNext}
            />
        </div>
    );
};

export default StarWarsChars;
