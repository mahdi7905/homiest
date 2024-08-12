import React, {useContext} from 'react'
import { NavLink } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from '@mui/icons-material/Notifications';
import './drawer.css'
import { DrawerContext } from '../../context/drawerContext'
import useAuth from '../../hooks/useAuth';

const Drawer = () => {
    const {drawerOpen, setDrawerOpen} = useContext(DrawerContext)
    const { Logout } = useAuth();

  
    
  return (
    <div className={`drawer-wrapper ${drawerOpen ? 'open-wrapper': 'close-wrapper'}`} onClick={() =>setDrawerOpen(prev => !prev) }>
        <div className={`drawer ${drawerOpen ? 'open' : 'close'}`}>
             <ul>
              
                <li><NavLink to='/notifications'>
                    <NotificationsIcon />
                    <p>Notifications</p>
                </NavLink></li>
              
              <li>
                <NavLink to="/wallet">
                  <AccountBalanceWalletIcon />
                  <p>Wallet</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings">
                  <SettingsIcon />
                  <p>Settings</p>
                </NavLink>
              </li>
              <li>
                <button className="logout-btn-drawer" onClick={() => Logout()}>
                  <LogoutIcon />
                  <p>Logout</p>
                </button>
              </li>
            </ul>
        </div>
    </div>
  )
}

export default Drawer