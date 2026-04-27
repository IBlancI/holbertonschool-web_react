import WithLogging from '../HOC/WithLogging'
import useLogin from '../hooks/useLogin'

function Login(props) {
  const {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  } = useLogin(props.logIn)

  return (
    <div className="App-body flex flex-col p-5 pl-1 h-[45vh] border-t-4 border-[color:var(--main-color)]">
      <p className="text-xl mb-4">Login to access the full dashboard</p>

      <form onSubmit={handleLoginSubmit}>
        <div className="text-lg flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
          <label htmlFor="email" className="sm:pr-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={handleChangeEmail}
            name="user_email"
            id="email"
            className="border rounded w-3/5 sm:w-auto px-2 py-1"
          />

          <label htmlFor="password" className="sm:pl-2 sm:pr-2">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={handleChangePassword}
            name="user_password"
            id="password"
            className="border rounded w-3/5 sm:w-auto px-2 py-1"
          />

          <button
            type="submit"
            disabled={!enableSubmit}
            className="cursor-pointer border px-1 rounded sm:ml-2 w-fit"
          >
            OK
          </button>
        </div>
      </form>
    </div>
  )
}

const LoginWithLogging = WithLogging(Login)

export default LoginWithLogging