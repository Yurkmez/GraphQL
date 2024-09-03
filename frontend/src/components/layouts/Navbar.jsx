// https://materializecss.com/getting-started.html
// import { NavLink } from 'react-router-dom';
// import pict from '../../picture/Dev.png';
import './navbar.css';

const Navbar = () => {
    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    {/* <img src={pict} className="imgMyClass" /> */}
                    <a href="" className="brand-logo center">
                        Some application...
                    </a>
                    <ul className="left hide-on-med-and-down">
                        <li>
                            <a className="fSize" href="/">
                                Users
                            </a>
                        </li>
                        <li>
                            <a className="fSize" href="add">
                                Add User
                            </a>
                        </li>
                        {/* <li className="active"><a href="collapsible.html">JavaScript</a></li> */}
                    </ul>
                </div>
            </nav>
        </>
        // <div className={styleNavbar.mainDiv}>
        //     <p className={styleNavbar.subDiv}>
        //         <NavLink
        //             style={({ isActive }) =>
        //                 isActive ? { color: 'lightgray' } : { color: 'white' }
        //             }
        //             to="/"
        //             end
        //         >
        //             Users
        //         </NavLink>
        //         <NavLink
        //             style={({ isActive }) =>
        //                 isActive ? { color: 'lightgray' } : { color: 'white' }
        //             }
        //             to="add"
        //         >
        //             Add user
        //         </NavLink>
        //     </p>
        // </div>
    );
};

export default Navbar;
