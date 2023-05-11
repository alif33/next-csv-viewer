import React from 'react';
import Link from 'next/link';


const Home = ({ children }) => {

    // const navigate = useNavigate();

    const LogoutHandler = () => {
        // localStorage.removeItem("__key__");
        // navigate('/login')
    }

    return (
        <div style={{ marginBottom: '60px' }}>
            <div className="navbar">
                <div className="container nav">
                    <h2><Link href="/">
                        <img className='navbar-logo' src="/img/logo.png" alt="" /></Link></h2>
                    <button onClick={LogoutHandler} className="logout-btn">
                        <img src="/img/logout-icon.png" alt="" /> Logout
                    </button>
                </div>
            </div>
            {children}
        </div>
    );
};

export default Home;