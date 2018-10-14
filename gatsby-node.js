const config = require('./src/utils/siteConfig')
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const loadPosts = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulPost(
          sort: { fields: [publishDate], order: DESC }
          limit: 10000
        ) {
          edges {
            node {
              slug
              publishDate
            }
          }
        }
        # Split into fragment
        allContentfulWork(
          sort: { fields: [publishDate], order: DESC }
          limit: 10000
        ) {
          edges {
            node {
              slug
              publishDate
            }
          }
        }
      }
    `).then(result => {
      const posts = result.data.allContentfulPost.edges
      const works = result.data.allContentfulWork.edges
      const combinedModels = [...posts, ...works]
      console.log(combinedModels)
      const postsPerFirstPage = config.postsPerHomePage
      const postsPerPage = config.postsPerPage
      const numPages = Math.ceil(
        combinedModels.slice(postsPerFirstPage).length / postsPerPage
      )

      // Create main home page
      createPage({
        path: `/`,
        component: path.resolve(`./src/templates/index.js`),
        context: {
          limit: postsPerFirstPage,
          skip: 0,
          numPages: numPages + 1,
          currentPage: 1,
        },
      })

      // Create additional pagination on home page if needed
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: `/${i + 2}/`,
          component: path.resolve(`./src/templates/index.js`),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage + postsPerFirstPage,
            numPages: numPages + 1,
            currentPage: i + 2,
          },
        })
      })

      // Create each individual post
      combinedModels.forEach((edge, i) => {
        const prev = i === 0 ? null : combinedModels[i - 1].node
        const next =
          i === combinedModels.length - 1 ? null : combinedModels[i + 1].node
        createPage({
          path: `${edge.node.slug}/`,
          component: path.resolve(`./src/templates/post.js`),
          context: {
            slug: edge.node.slug,
            prev,
            next,
          },
        })
      })
      resolve()
    })
  })

  const loadWork = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulWork(
          sort: { fields: [publishDate], order: DESC }
          limit: 10000
        ) {
          edges {
            node {
              slug
              publishDate
            }
          }
        }
      }
    `).then(result => {
      const works = result.data.allContentfulWork.edges
      // const worksPerFirstPage = config.postsPerHomePage
      // const worksPerPage = config.postsPerPage
      // const numPages = Math.ceil(
      //   works.slice(worksPerFirstPage).length / worksPerPage
      // )

      // Create main home page
      // createPage({
      //   path: `/`,
      //   component: path.resolve(`./src/templates/work.js`),
      //   context: {
      //     limit: worksPerFirstPage,
      //     skip: 0,
      //     numPages: numPages + 1,
      //     currentPage: 1,
      //   },
      // })

      works.forEach((edge, i) => {
        // console.log(edge)
        const prev = i === 0 ? null : works[i - 1].node
        const next = i === works.length - 1 ? null : works[i + 1].node
        createPage({
          path: `${edge.node.slug}/`,
          component: path.resolve(`./src/templates/work.js`),
          context: {
            slug: edge.node.slug,
            prev,
            next,
          },
        })
      })
      resolve()
    })
  })

  const loadTags = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulTag {
          edges {
            node {
              slug
              post {
                id
              }
            }
          }
        }
      }
    `).then(result => {
      const tags = result.data.allContentfulTag.edges
      const postsPerPage = config.postsPerPage

      // Create tag pages with pagination if needed
      tags.map(({ node }) => {
        // console.log(node.post)
      })
      resolve()
    })
  })

  const loadPages = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulPage {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      const pages = result.data.allContentfulPage.edges
      pages.map(({ node }) => {
        createPage({
          path: `${node.slug}/`,
          component: path.resolve(`./src/templates/page.js`),
          context: {
            slug: node.slug,
          },
        })
      })
      resolve()
    })
  })

  return Promise.all([loadPosts, loadWork, loadTags, loadPages])
}
