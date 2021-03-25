const CharListItem = ({ char }) => {
    return (
        <div onClick={() => alert(char.name)}>
            <div>{char.name}</div>
            <div>{char.birth_year}</div>
            <div>{char.height}</div>
            <div>{char.mass}</div>
        </div>
    );
};

export default CharListItem;
