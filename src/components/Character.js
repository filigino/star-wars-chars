import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import apiUrl from 'apiUrl';
import useStyles from 'styles/CharacterStyles';

const Character = () => {
    const { id } = useParams();
    const PAGE = Math.ceil((id <= 16 ? id : id - 1) / 10);
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {
        name, height, mass, hair_color, skin_color, eye_color, birth_year,
        gender, homeworld, films, species, vehicles, starships
    } = data;

    const classes = useStyles();

    useEffect(() => {
        const load = async () => {
            let res = await fetch(`${apiUrl}people/${id}/`);
            let characterData = await res.json();

            res = await fetch(characterData.homeworld);
            let data = await res.json();
            const homeworld = data.name;

            let urls = []
            for (const url of characterData.films) {
                urls.push(fetch(url));
            }
            res = await Promise.allSettled(urls);
            for (let i = 0; i < urls.length; i++) {
                urls[i] = await res[i].value.json();
            }
            res = await Promise.allSettled(urls);
            const films = [];
            for (const film of res) {
                films.push(film.value.title);
            }

            urls = [];
            for (const url of characterData.species) {
                urls.push(fetch(url));
            }
            res = await Promise.allSettled(urls);
            for (let i = 0; i < urls.length; i++) {
                urls[i] = await res[i].value.json();
            }
            res = await Promise.allSettled(urls);
            const species = [];
            for (const speciesType of res) {
                species.push(speciesType.value.title);
            }

            urls = [];
            for (const url of characterData.vehicles) {
                urls.push(fetch(url));
            }
            res = await Promise.allSettled(urls);
            for (let i = 0; i < urls.length; i++) {
                urls[i] = await res[i].value.json();
            }
            res = await Promise.allSettled(urls);
            const vehicles = [];
            for (const vehicle of res) {
                vehicles.push(vehicle.value.name);
            }

            urls = [];
            for (const url of characterData.starships) {
                urls.push(fetch(url));
            }
            res = await Promise.allSettled(urls);
            for (let i = 0; i < urls.length; i++) {
                urls[i] = await res[i].value.json();
            }
            res = await Promise.allSettled(urls);
            const starships = [];
            for (const starship of res) {
                starships.push(starship.value.name);
            }

            characterData = { ...characterData, homeworld, films, species, vehicles, starships };

            setData(characterData);
            setIsLoading(false);
        };
        load();
    }, [id])

    return (
        <div className={classes.root}>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <Link to={{
                        pathname: '/',
                        state: PAGE
                    }}>
                        Back
                    </Link>
                    {!isLoading &&
                        <div className={classes.name}>
                            {name}
                        </div>
                    }
                    <Link to="" style={{ visibility: 'hidden' }}>
                        Back
                    </Link>
                </div>
                <div className={`d-flex flex-column ${isLoading ? 'align-items-center' : ''}`}>
                    {
                        isLoading ?
                            <Loading />
                            :
                            <div>
                                <div>
                                    Height: {height} cm
                                </div>
                                <div>
                                    Mass: {mass} kg
                                </div>
                                <div>
                                    Hair color: {hair_color}
                                </div>
                                <div>
                                    Skin color: {skin_color}
                                </div>
                                <div>
                                    Eye color: {eye_color}
                                </div>
                                <div>
                                    Birth year: {birth_year}
                                </div>
                                <div>
                                    Gender: {gender}
                                </div>
                                <div>
                                    Homeworld: {homeworld}
                                </div>
                                <div>
                                    Films: {films}
                                </div>
                                <div>
                                    Species: {species}
                                </div>
                                <div>
                                    Vehicles: {vehicles}
                                </div>
                                <div>
                                    Starships: {starships}
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div >
    );
};

export default Character;
