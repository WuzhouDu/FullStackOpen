const Notification = ({ text, color }) => {
  if (text === '') {
    return null;
  }

  const style = {
    color: color,
    backgroundColor: 'grey',
    padding: '10px',
    border: `1px solid ${color}`
  };
  return (
    <h1 style={style}>{text}</h1>
  );
};

export default Notification;