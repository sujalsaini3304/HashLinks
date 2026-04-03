import React from 'react'
import Icon from '/hash.png'
import ArrowIcon from '/arrow.png'
import { ArrowBigLeft, ArrowLeftIcon, Gauge, Lock, LogOutIcon } from 'lucide-react'
import Avatar from '@mui/material/Avatar';
import { auth } from "../../firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [firebaseUser, setFirebaseUser] = React.useState(auth.currentUser);
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setFirebaseUser(user);
        });

        return () => unsubscribe();
    }, []);

    const location = useLocation();

    if (location.pathname === "/dashboard") {
        console.log("This is Dashboard page");
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Failed to logout. Please try again.");
        }
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className='h-16 sticky top-0 z-50 bg-white shadow-sm' >
                <div className='flex items-center justify-between px-4 h-full mx-auto' style={{ maxWidth: '1400px' }}>

                    {location.pathname != "/dashboard" && <div className='flex items-center gap-2'>
                        <img
                            src={Icon}
                            alt='website-icon'
                            height={40}
                            width={40}
                        />
                        <div className='flex items-center gap-1' >
                            <div className='text-xl' >Hash<span className='font-semibold underline' >Links</span></div>
                            <img
                                src={ArrowIcon}
                                alt='website-icon'
                                height={12}
                                width={12}
                                className='mt-1'
                            />
                        </div>
                    </div>}

                    {location.pathname === "/dashboard" && <div>
                        <Link to={'/'} replace >
                            <ArrowLeftIcon />
                        </Link>
                    </div>}


                    <div>
                        <ul type='none' className='flex items-center text-lg'>
                            <li
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={open ? handleClose : handleClick}
                                className='hover:cursor-pointer'
                            >
                                {firebaseUser.photoURL ? (
                                    <img
                                        src={firebaseUser.photoURL}
                                        alt="profile"
                                        className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                                    />
                                ) : (
                                    <Avatar sx={{ width: 40, height: 40 }}>
                                        {(firebaseUser.displayName || firebaseUser.email || "U").charAt(0).toUpperCase()}
                                    </Avatar>
                                )}

                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                }}
            >

                <Link to={'/dashboard'} replace >
                    <MenuItem onClick={handleClose} className='gap-2' ><Gauge size={22} /> Dashboard</MenuItem>
                </Link>
                <MenuItem onClick={() => {
                    handleLogout();
                }} className='gap-2' > <LogOutIcon size={22} /> Logout</MenuItem>
                <MenuItem onClick={() => {
                    alert("coming soon...");
                }} className='gap-2 ' style={{backgroundColor : "#32cd32", margin:"2px" , borderRadius:"4px" , color:"white" }} > <Lock size={22} color='white' /> Upgrade</MenuItem>
            </Menu>
        </>
    )
}

export default Navbar


