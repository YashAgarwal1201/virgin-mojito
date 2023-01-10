import * as React from "react"
import * as styles from "../components/index.module.css"
import loginimg from "../images/loginimg.svg"
import googleicon from "../images/googleicon.svg"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '978px',
  height: '470px',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '5px 5px 10px #00000029',
  border: '1px solid #707070',
  borderRadius: '5px',
  opacity: '1',
  outline: 0
};

const Login = (props) => {
 return (
   <div>
  <Modal
  open='true'
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  >
  <Box sx={style}>
    <div className={styles.loginModal}>
      <img src={loginimg} className={styles.loginimg}></img>
      <div className={styles.loginBox}>
        <div className={styles.loginText}>Sign in to Techolution</div>
        <div className={styles.loginBtn} onClick={(event) => {props.authAndload()}}>
          <img src={googleicon} className={styles.googleImg}></img>
          <div className={styles.f18}>Sign in with Google</div>
        </div>
      </div>
    </div>
  </Box>
  </Modal>
  </div>
  
  )
}

export default Login