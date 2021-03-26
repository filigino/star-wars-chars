import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiUrl from 'apiUrl';

const Character = () => {
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`${apiUrl}people/${id}/`);
            const data = await res.json();
            setData(data);
        };
        load();
    }, [])
    return (
        <>
            <Link to={{
                pathname: '/',
                state: 3
            }}>
                Back
            </Link>
            <div>
                {data.name}
            </div>
        </>
    );
};

export default Character;
