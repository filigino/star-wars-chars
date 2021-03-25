const CharListItem = ({ char }) => {
    return (
        <div
            className="row"
            onClick={() => alert(char.name)}
            style={{ backgroundColor: 'lightgray', borderRadius: '10px', cursor: 'pointer', marginBottom: '5px' }}
        >
            <div className="col-3">
                {char.name}
            </div>
            <div className="col-3">
                {char.birth_year}
            </div>
            <div className="col-3">
                {char.height} cm
            </div>
            <div className="col-3">
                {char.mass} kg
            </div>
        </div>
    );
};

export default CharListItem;
