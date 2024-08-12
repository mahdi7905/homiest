import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import './wallet.css'

const Wallet = () => {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  return (
    <div style={{padding:'20px',gap:"10px", display:"flex",flexDirection:"column", alignItems:"center"}}>
      <p className="balance">You have <span className={user.wallet.balance >= 50 ? 'good': 'low'}>{user.wallet.balance}</span> Homie Coins</p>
      <button type="button" className='recharge-btn' onClick={()=> navigate("/packages")}>Recharge Wallet</button>
    </div>
  )
}

export default Wallet