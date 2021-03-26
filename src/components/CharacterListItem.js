import { Link } from 'react-router-dom';
import useStyles from 'styles/CharacterListItemStyles';

const CharacterListItem = ({ character }) => {
    const cleanedUrl = character.url.slice(0, character.url.length - 1);
    const _id = cleanedUrl.slice(cleanedUrl.lastIndexOf('/') + 1);
    const { name } = character;
    const birth_year = character.birth_year === 'unknown' ? 'Unknown' : character.birth_year;
    const height = character.height === 'unknown' ? 'Unknown' : `${character.height} cm`;
    const mass = character.mass === 'unknown' ? 'Unknown' : `${character.mass} kg`;

    const classes = useStyles();

    return (
        <Link to={`/character/${_id}`} className={classes.link}>
            <div className={`row align-items-center mb-2 ${classes.root}`}>
                <div className={`col-12 col-md-3 ${classes.name}`}>
                    {name}
                </div>
                <div className="col-12 col-md-3">
                    Birth year: {birth_year}
                </div>
                <div className="col-12 col-md-3">
                    Height: {height}
                </div>
                <div className="col-12 col-md-3">
                    Mass: {mass}
                </div>
            </div>
        </Link>
    );
};

export default CharacterListItem;
