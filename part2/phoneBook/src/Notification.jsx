const Notification = ({ message, red }) => {
    if (message == null || message == '') {
        return null;
    }
    return red ?
        <div className="error">
            {message}
        </div>
        : (
            <div className="notification">
                {message}
            </div>
        )
}

export default Notification;