import { Link } from 'react-router-dom';

const CharacterListItem = ({ character }) => {
    const cleanedUrl = character.url.slice(0, character.url.length - 1);
    const _id = cleanedUrl.slice(cleanedUrl.lastIndexOf('/') + 1);
    return (
        <Link
            to={`/character/${_id}`}
            className="row"
            style={{ backgroundColor: 'lightgray', borderRadius: '10px', cursor: 'pointer', marginBottom: '5px' }}
        >
            <div className="col-3">
                {character.name}
            </div>
            <div className="col-3">
                {character.birth_year}
            </div>
            <div className="col-3">
                {character.height} cm
            </div>
            <div className="col-3">
                {character.mass} kg
            </div>
        </Link>
    );
};

export default CharacterListItem;
