import { Component, Fragment } from 'react'
import Notifications from '../Notifications/Notifications.jsx'
import Header from '../Header/Header.jsx'
import Login from '../Login/Login.jsx'
import Footer from '../Footer/Footer.jsx'
import CourseList from '../CourseList/CourseList.jsx'
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom.jsx'
import BodySection from '../BodySection/BodySection.jsx'
import { getLatestNotification } from '../utils/utils.js'
import AppContext from '../Context/context.js'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayDrawer: false,
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
      logOut: this.logOut,
    }
  }

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true })
  }

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false })
  }

  logIn = (email, password) => {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    })
  }

  logOut = (event) => {
    if (event) event.preventDefault()

    this.setState({
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
    })
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
  }

  handleKeydown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out')
      this.logOut()
    }
  }

  render() {
    const { user, displayDrawer } = this.state

    const notificationsList = [
      {
        id: 1,
        type: 'default',
        value: 'New course available',
      },
      {
        id: 2,
        type: 'urgent',
        value: 'New resume available',
      },
      {
        id: 3,
        type: 'urgent',
        html: { __html: getLatestNotification() },
      },
    ]

    const coursesList = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ]

    return (
      <AppContext.Provider value={this.state}>
        <div className="App min-h-screen flex flex-col px-4 md:px-8">
          <Fragment>
            <div className="root-notifications">
              <Notifications
                notifications={notificationsList}
                displayDrawer={displayDrawer}
                handleDisplayDrawer={this.handleDisplayDrawer}
                handleHideDrawer={this.handleHideDrawer}
              />
            </div>

            <Header />

            <div
              className="red-line w-full h-[3px]"
              style={{ backgroundColor: 'var(--main-color)' }}
            />

            {user.isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList courses={coursesList} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login
                  logIn={this.logIn}
                  email={user.email}
                  password={user.password}
                />
              </BodySectionWithMarginBottom>
            )}

            <BodySection title="News from the School">
              <p>
                ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Similique, asperiores architecto blanditiis fuga doloribus sit
                illum aliquid ea distinctio minus accusantium, impedit quo
                voluptatibus ut magni dicta. Recusandae, quia dicta?
              </p>
            </BodySection>

            <div
              className="red-line w-full h-[3px]"
              style={{ backgroundColor: 'var(--main-color)' }}
            />

            <Footer />
          </Fragment>
        </div>
      </AppContext.Provider>
    )
  }
}

export default App