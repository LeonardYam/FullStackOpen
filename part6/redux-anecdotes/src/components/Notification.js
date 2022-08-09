import { connect } from "react-redux"

const Notification = (props) => {
  const { notification } = props
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification === '') return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = state => {
  return { notification: state.notification.message }
}

const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification