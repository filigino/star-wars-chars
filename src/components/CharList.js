import CharListItem from 'components/CharListItem';

const CharList = ({ chars, nextPageUrl, page, isLoading, renderPrevious, renderNext }) => {
    const renderChars = chars.slice((page - 1) * 10, (page - 1) * 10 + 10).map(char => <CharListItem key={char.url} char={char} />);

    const handlePreviousClick = () => {
        if (!isLoading)
            renderPrevious();
    };

    const handleNextClick = () => {
        if (!isLoading)
            renderNext();
    };

    return (
        <div>
            {
                isLoading ?
                    <div>Loading</div>
                    :
                    renderChars
            }
            <div className="row justify-content-between">
                <div className="col-auto">
                    <button onClick={handlePreviousClick} style={{ display: page === 1 ? 'none' : '' }}>
                        Previous
                    </button>
                </div>
                <div className="col-auto">
                    {page}
                </div>
                <div className="col-auto">
                    <button onClick={handleNextClick} style={{ display: !nextPageUrl && chars.length <= page * 10 ? 'none' : '' }}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CharList;
