import './index.css'

const NotFound = () => (
  <div className="notFoundCont">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="notFoundImg"
    />
    <h1 className="notFoundText">Page Not Found</h1>
    <p className="notFoundMsg">
      we`re sorry, the page you requested could not be found.
    </p>
  </div>
)

export default NotFound
