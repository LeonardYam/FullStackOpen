import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return;
  }

  const { type, text } = notification;

  const conditionalStyle =
    type === "success"
      ? {
          color: "green",
          borderColor: "green",
        }
      : {
          color: "red",
          borderColor: "red",
        };

  const notificationStyle = {
    fontSize: "20px",
    border: "0.2em solid",
    backgroundColor: "lightpink",
    padding: "0.5em",
    margin: "0.2em",
    ...conditionalStyle,
  };

  return (
    <div style={notificationStyle}>
      <em>{text}</em>
    </div>
  );
};

export default Notification;
