/* eslint-disable react/jsx-filename-extension */
import * as React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import Card from "../components/card"
import logo from "../images/logo.svg"

const filters = ['Medical','E-commerce','Content Management','Telecom','Virtual reality','B2C'];

const IndexPage = () => (
  <StaticQuery
      query={graphql`
          query GoogleSheetQuery {
            googleSheet {
              Projects {
                id
                parent
                projectName
                image
              }
            }
          }
      `}
      render={data => (
        <div>
          <div className={styles.header}>
            <img src={logo}></img>
            <div>Logout</div>
          </div>
          <Layout>
          <Seo title="Home" />
          <div className={styles.textCenter}>
            <div className={styles.subheader}>
              <div className={styles.projects}>
                Projects
              </div>
              <div className={styles.enableBtn}>Add New Project</div>
            </div>
            <div className={styles.filter}>
            {filters.map((item) =>
              <div className={styles.filterItem}>{item}</div>
            )}

            </div>
            <div className={styles.container}>
              {data.googleSheet.Projects.map((project) =>
                <Card project={project}></Card>
              )}
            </div>
          </div>
        </Layout>
      </div>
      )}
    />
)



export default IndexPage
