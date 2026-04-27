import './Header.css';
import holbertonLogo from '../assets/holberton-logo.jpg';

export default function Header() {
    return (
    <>
        <div className='App-header'>
            <img src={holbertonLogo} className="logo" alt="holberton logo" />
            <h1 style={{ color: '#e1003c' }}>School dashboard</h1>
        </div>
    </>
    )
}