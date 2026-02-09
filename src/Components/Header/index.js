import "./index.css"

<<<<<<< HEAD
const Header = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <FaSignOutAlt />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/signup'>Signup</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
=======
const Header = () => (
>>>>>>> parent of 88f52bc (Backend and Frontend Setup)
    <header className="expenses-navbar">
        <h4 className="text-center">Budget</h4>
    </header>
)

export default Header;