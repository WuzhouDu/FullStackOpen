const Filter = ({searchName, handleChange}) => (
    <form >filter shown with
        <input value={searchName} onChange={handleChange}>
        </input>
    </form>
);

export default Filter;