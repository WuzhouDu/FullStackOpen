const PersonForm = ({handleAddName, newName, handleTypingName, newPhone, handleTypingPhone}) => (
    <form onSubmit={handleAddName} name='phoneBook'>
        <div>
            name: <input value={newName} onChange={handleTypingName} />
        </div>
        <div>number: <input value={newPhone} onChange={handleTypingPhone} /></div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
);

export default PersonForm;