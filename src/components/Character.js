import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiUrl from 'apiUrl';

const Character = () => {
    const { id } = useParams();
    const PAGE = Math.ceil((id <= 16 ? id : id - 1) / 10);
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`${apiUrl}people/${id}/`);
            const data = await res.json();
            setData(data);
            setIsLoading(false);
        };
        load();
    }, [id])
    return (
        <>
            <Link to={{
                pathname: '/',
                state: PAGE
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
