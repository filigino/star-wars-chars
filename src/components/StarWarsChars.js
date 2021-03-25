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

    const addChars = async () => {
        console.log('fetching!'); // remove
        const res = await fetch(state.nextPageUrl);
        const data = await res.json();
        dispatch({
            type: 'ADD_CHARS',
            chars: data.results,
            nextPageUrl: data.next
        });
    };

    useEffect(() => {
        addChars();
    }, []);

    const renderPrevious = async () => {
        setPage(page - 1);
    };

    const renderNext = async () => {
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
                renderPrevious={renderPrevious}
                renderNext={renderNext}
            />
        </div>
    );
};

export default StarWarsChars;
