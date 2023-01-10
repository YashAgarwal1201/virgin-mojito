import * as React from "react"
import * as styles from "../components/index.module.css"
import image from "../images/CWA.png"

const Card = (props) => {
 return (
  <div className={styles.card}>
    <div><img src={image} height="167" width="300"></img></div>
    <div className={styles.title}>{props.project['project_name']}</div>
    <div className={styles.subtitle}>Content Management</div>
    {!props.project['isEnabled']?
    (<div className={styles.enableBtn} onClick={(event) => {props.updateNode(props.project,true);event.stopPropagation()}}>Enable Project</div>) :
    
    (<div className={styles.enabledProject}>
      <div className={styles.demo}>View Demo</div>
      <div className={styles.disableproject} onClick={(event) => {props.updateNode(props.project,false);event.stopPropagation();}}>Disable project</div>
    </div>)}
  </div>)
}

export default Card