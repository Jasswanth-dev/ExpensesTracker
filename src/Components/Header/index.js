import "./index.css"

const Header = ({ categoryName }) => (
    <header className="expenses-navbar">
        <h4 className="text-center">{categoryName}</h4>
    </header>
)

export default Header;