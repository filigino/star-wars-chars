import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import apiUrl from 'apiUrl';
import useStyles from 'styles/CharacterStyles';

const Character = () => {
    const { id } = useParams();
    // calculate page based on id
    // offset by 1 after id 16 since id 17 is skipped
    const PAGE = Math.ceil((id <= 16 ? id : id - 1) / 10);
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {
        name, hair_color, skin_color, eye_color, birth_year,
        gender, homeworld, films, species, vehicles, starships
    } = data;

    const height = data.height === 'unknown' ? data.height : `${data.height} cm`
    const mass = data.mass === 'unknown' ? data.mass : `${data.mass} kg`
    const renderList = list => {
        let str = '';
        for (let i = 0; i < list.length - 1; i++) {
            str += `${list[i]}, `
        }
        str += list[list.length - 1];
        return str;
    };

    const classes = useStyles();

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`${apiUrl}people/${id}/`);
            let characterData = await res.json();

            const loadOne = async () => {
                const res = await fetch(characterData.homeworld);
                const data = await res.json();
                return data.name;
            }

            const loadNumerous = async (prop, name) => {
                const urls = []
                for (const url of characterData[prop]) {
                    urls.push(fetch(url));
                }
                let res = await Promise.allSettled(urls);
                for (let i = 0; i < urls.length; i++) {
                    urls[i] = await res[i].value.json();
                }
                res = await Promise.allSettled(urls);
                const result = [];
                for (const element of res) {
                    result.push(element.value[name]);
                }
                return result;
            };

            const homeworld = loadOne();
            const films = loadNumerous('films', 'title');
            const species = loadNumerous('species', 'name');
            const vehicles = loadNumerous('vehicles', 'name');
            const starships = loadNumerous('starships', 'name');

            const data = await Promise.allSettled([homeworld, films, species, vehicles, starships]);

            characterData = {
                ...characterData,
                homeworld: data[0].value,
                films: data[1].value,
                species: data[2].value,
                vehicles: data[3].value,
                starships: data[4].value
            };

            setData(characterData);
            setIsLoading(false);
        };
        load();
    }, [id]);

    return (
        <div className={classes.root}>
            <div className="container">
                <div className="d-flex justify-content-between mb-3">
                    <Link
                        to={{
                            pathname: '/',
                            state: PAGE
                        }}
                        className={classes.back}
                    >
                        {'<-'}
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
                                    Height: {height}
                                </div>
                                <div>
                                    Mass: {mass}
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
                                    Films: {renderList(films)}
                                </div>
                                {species.length > 0 &&
                                    <div>
                                        Species: {renderList(species)}
                                    </div>
                                }
                                {vehicles.length > 0 &&
                                    <div>
                                        Vehicles: {renderList(vehicles)}
                                    </div>
                                }
                                {starships.length > 0 &&
                                    <div>
                                        Starships: {renderList(starships)}
                                    </div>
                                }
                            </div>
                    }
                </div>
            </div>
        </div >
    );
};

export default Character;
