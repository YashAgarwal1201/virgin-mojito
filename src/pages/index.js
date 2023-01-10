// App.js
import React from "react";
import Button from '@mui/material/Button';
import { Container } from "@mui/material";
import * as styles from "../components/index.module.css";
import Card from "../components/card";
import logo from "../images/logo.svg";
import Layout from "../components/layout";
import Seo from "../components/seo";
import image from "../images/CWA.png"
import backBtn from "../images/arrow-left.svg"
import Login from "../components/login";

class App extends React.Component {
  authenticated = false;
  filters = ['Medical','E-commerce','Content Management','Telecom','Virtual reality','B2C'];
  innerTabs = ['Summary','Features','Notes','Videos','Team Info']
  features = ['Asset Management & Monitoring platform',
  'Asset detailed pages with data and information related to a specific asset.',
  'Realtime asset alerts',
  'Representation of assets on ArcGIS map.',
  'User Management',
  'Configuration Management based on specific assets.',
  'Asset Grouping']
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      projects: [],
      isShowDetailedView: false,
      projectdetailsView: {},
      projectStack: ['UX','Angular','AI','DBMS'],
      selectedTab: 'Summary',
      accessToken: ''
    }
  }

  componentDidMount() {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({
        client_id:
          "507727671815-ikkpd6ae387clvdkatb544rs2av2qil8.apps.googleusercontent.com",
          //"1086663276238-3uovfukbs35e518h32k7bhn66gfv9ndr.apps.googleusercontent.com"
      }).then(authResult => {
        let googleUser = authResult.currentUser.get();
        this.state.accessToken = googleUser.Cc.access_token
        console.log(this.state.accessToken)
        let hasGoogleSheetsPermission = googleUser.Cc.scope.split(' ').map(x => x.trim()).indexOf('https://www.googleapis.com/auth/spreadsheets') > -1;
        let isLoggedIn = authResult.isSignedIn.get();
        if(isLoggedIn && hasGoogleSheetsPermission) {
          this.setState({...this.state, authenticated: isLoggedIn});
          // fetch data
          this.loadClient()
            .then(this.execute)
            .then(this.processResult.bind(this));
        } else {
          // show login to continue
        }
      });

    });
  }

  /*componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = false;
    document.body.appendChild(script);
  }*/

  authenticate() {
    return gapi.auth2
      .getAuthInstance()
      .signIn({
        scope:
          "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/cloud-platform",
      })
      .then(
        user => {
          this.setState({...this.state, authenticated: true});
        },
        err =>  {
          console.error("Error signing in", err);
          this.setState({...this.state, authenticated: false});
        }
      );
  }

  /*authenticate() {
    google.accounts.id.initialize({
      client_id: "507727671815-ikkpd6ae387clvdkatb544rs2av2qil8.apps.googleusercontent.com",
      login_uri: "http://localhost http://localhost:8000",
      cancel_on_tap_outside: false,
      context: "signin",
      callback: () => {console.log(99)}
    })
    google.accounts.id.prompt()
  }*/

  processResult(response) {
    let values = response.result.values;
    let result = [];
    const columns = values.length && values[0].length ? values[0]: 0;
    if(columns) {
      result = values.map((element, index, array) => {
        if(index > 0) {
          let obj = {};
          columns.forEach((key, i, a) => {
            obj[key] = element[i];
          });
          return obj;
        } else {
          return ;
        }
      }).filter(Boolean);
    } else {
      console.error("No header data available")
    }
    this.getCurrentNodeCount(result)

  }

  loadClient() {
    gapi.client.setApiKey("AIzaSyA4Z4uagYBTdsyVQgcvYquNANML3zrv6j4");
    //gapi.client.setApiKey("AIzaSyAqkewqZZdn90o5econiRnyuU_WdWCbCjY");
    return gapi.client
      .load("https://sheets.googleapis.com/$discovery/rest?version=v4")
      .then(
        () => {
          console.log("GAPI client loaded for API");
        },
        err => {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }

  // Make sure the client is loaded and sign-in is complete before calling this method.
  execute() {
    return gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: "1KU9Ihup6qu2c6DEGQOB7dGiGzEbbP6RYJ0LaKyOHunk",
        range: "Projects",
      });
  }

  authAndload() {
    this.authenticate()
      .then(this.loadClient)
      .then(this.execute)
      .then(this.processResult.bind(this))
  }

  enableDisableProject = (project,event) => {
    this.state.projects.map(item => {
      if(item.id == project.id){
        item.isEnabled = event
      }
    })
    let data = []
    data = this.state.projects
    this.setState({...this.state,projects: data})
    if(project.title == 'The Brooklyn Hospital'){
    //if(project.title == 'BeThereNow'){
      this.updateNodeCount(event)
    }
  }

  updateNodeCount = (isEnable) => {
  //console.log(isEnable)
  console.log(this.state.accessToken)
    const reqBody = {
      "clusterId": "tbh-dev",
      "zone": "us-east4-a",
      "nodeCount": isEnable ? 5 : 0,
      "nodePoolId": "default-pool",
      "projectId": "brooklyn-hospital-dev"
    }
    /*const reqBody = {
        "clusterId": "one-stop-btn-betherenow",
        "zone": "us-east1-d",
        //"nodeCount": 0,
        "nodeCount": isEnable ? 5 : 0,
        "nodePoolId": "betherenow-k8s-cluster",
        "projectId": "betherenow-221612"
    }*/
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.state.accessToken}`  },
      body: JSON.stringify(reqBody)
    };
    fetch('https://container.googleapis.com/v1beta1/projects/brooklyn-hospital-dev/zones/us-east4-a/clusters/tbh-dev/nodePools/default-pool/setSize', requestOptions)
    //fetch('https://container.googleapis.com/v1beta1/projects/betherenow-221612/zones/us-east1-d/clusters/one-stop-btn-betherenow/nodePools/betherenow-k8s-cluster/setSize', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data,'api'));
  }

  getCurrentNodeCount(result){
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.state.accessToken}`  },
    };
    //fetch('https://container.googleapis.com/v1beta1/projects/brooklyn-hospital-dev/zones/us-east4-a/clusters/tbh-dev', requestOptions)
    fetch('https://container.googleapis.com/v1beta1/projects/betherenow-221612/zones/us-east1-d/clusters/one-stop-btn-betherenow/', requestOptions)
      .then(response => response.json())
      .then(data => { 
        result.map(obj => {
          if(obj.title == 'The Brooklyn Hospital'){
            obj['isEnabled'] = data.currentNodeCount > 0 ? true : false
          }else{
            obj['isEnabled'] = false
          }
        })
        this.setState({
          ...this.state,
          projects: result
        });
      });
  }

  render() {
    return (
      <Container maxWidth="false">
        {!this.state.authenticated?
          (
          // <Button variant="contained" onClick={this.authAndload.bind(this)}>Login with Google</Button>
          <Login authAndload={this.authAndload.bind(this)}></Login>
          ):
          ((
            <div>
              <div className={styles.header}>
                <img src={logo}></img>
                <div>Logout</div>
              </div>
              <Layout>
              <Seo title="Home" />
              {!this.state.isShowDetailedView?
               ( <div className={styles.textCenter}>
                <div className={styles.subheader}>
                  <div className={styles.projects}>
                    Projects
                  </div>
                  <div className={styles.enableBtn}>Add New Project</div>
                </div>
                <div className={styles.filter}>
                {this.filters.map((item) =>
                  <div className={styles.filterItem}>{item}</div>
                )}
    
                </div>
                <div className={styles.container}>
                  {(this.state.projects && this.state.projects.length )? this.state.projects.map((project) =>
                    <div className={styles.pointer} onClick={() => this.setState({isShowDetailedView: true, projectdetailsView: project,selectedTab: 'Summary'})}>
                      <Card key={project.id} project={project} updateNode={this.enableDisableProject}></Card>
                    </div>
                  ): (<div> No projects to show </div>)}
                </div>
              </div>):
             ((
                <div>
                 <div className={styles.detailsheader}>
                  <div className={styles.backimg}>
                    <img src={backBtn} onClick={() => this.setState({isShowDetailedView: false, projectdetailsView: {}})}></img>
                  </div>
                  <div className={styles.section1}>
                    <div className={styles.titledetailview}>
                      {this.state.projectdetailsView['project_name']}
                    </div>
                    <div className={styles.filter}>
                      {this.state.projectStack.map((item) =>
                        <div className={styles.filterItem}>{item}</div>
                      )}
                    </div>
                    <div className={styles.tabList}>
                      {this.innerTabs.map((item) =>
                        <div className={item === this.state.selectedTab ? styles.selectedTab : styles.tab} onClick={() => this.setState({selectedTab: item})}>{item}</div>
                      )}
                    </div>
                  </div>
                  <div className={styles.viewdemoBtn}>View Demo</div>
                 </div>
                    {this.state.selectedTab === 'Summary'?
                    (
                      <div className={styles.tabSection}>
                        <div className={styles.section1}>
                          <div className={styles.titlesSummary}>
                            Project Description
                          </div>
                          <div className={styles.descriptions}>
                            {this.state.projectdetailsView['description']}
                          </div>
                          <div className={styles.titlesSummary}>
                            Technologies used
                          </div>
                          <div className={styles.descriptions}>
                            <div className={styles.filter}>
                              {this.state.projectStack.map((item) =>
                                <div className={styles.filterItem}>{item}</div>
                              )}
                            </div>
                          </div>
                          <div className={styles.titlesSummary}>
                            Domain
                          </div>
                          <div>
                            Domain
                          </div>
                        </div>
                        <div>
                          <img src={image} height="200" width="480"></img>
                        </div>
                      </div>
                    ) : ''
                    }
                    {this.state.selectedTab === 'Features'?
                    (
                      <div className={styles.tabSection}>
                        <ul>
                          {this.features.map((item) =>
                            <li>{item}</li>
                          )}
                        </ul>
                      </div>
                    ) : ''
                    }
                </div>))
              }
              
            </Layout>
          </div>
          ))
        }
      </Container>
    );
  }
}

export default App;
