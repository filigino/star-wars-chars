import { useEffect, useState } from 'react';
import CharList from 'components/CharList';
import apiUrl from 'apiUrl';

const StarWarsChars = () => {
    const [chars, setChars] = useState([]);
    useEffect(() => {
        const fetchChars = async () => {
            fetch(`${apiUrl}1`)
                .then(res => res.json())
                .then(data => setChars(data.results));
        };
        fetchChars();
    }, [])
    return (
        <div className="container">
            <CharList chars={chars} />
        </div>
    );
};

export default StarWarsChars;
