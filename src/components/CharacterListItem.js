const CharacterListItem = ({ character }) => {
    return (
        <div
            className="row"
            onClick={() => alert(character.name)}
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
        </div>
    );
};

export default CharacterListItem;
