import CharListItem from 'components/CharListItem';

const CharList = ({ chars }) => {
    const renderChars = chars.map(char => <CharListItem key={char.url} char={char} />);

    return (
        <div>
            {renderChars}
        </div>
    );
};

export default CharList;
