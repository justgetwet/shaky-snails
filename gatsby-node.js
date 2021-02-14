const path = require(`path`)
const kebabCase = require(`lodash/kebabCase`)

// archive
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `ContentfulBlogPost`) {
    const date = new Date(Date.parse(node.date))
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const yearMonth = `${year}-${`0${month}`.slice(-2)}`
    // console.log(yearMonth)
    createNodeField({
      node,
      name: `yearMonth`,
      value: yearMonth,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      Posts: allContentfulBlogPost(sort: {fields: date, order: DESC}) {
        edges {
          node {
            id
            slug
          }
          next {
            id
            slug
          }
          previous {
            id
            slug
          }
        }
      }

      months: allContentfulBlogPost(limit: 1000) {
        group(field: fields___yearMonth) {
          fieldValue
        }
      }

      allTags: allContentfulBlogPost(limit: 1000) {
        group(field: tags) {
          fieldValue
        }
      }

    }
  `)
  // post
  result.data.Posts.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        slug: node.slug,
        next,
        previous,
      },
    })
  })
  // archive
  result.data.months.group.forEach((m) => {
    createPage({
      path: `/archive/posted-in-${m.fieldValue}`,
      component: path.resolve('src/templates/archive-pages.js'),
      context: {
        month: m.fieldValue,
      },
    })
  })
  // categories
  result.data.allTags.group.forEach((t) => {
    createPage({
      path: `/tags/${kebabCase(t.fieldValue)}/`,
      component: path.resolve('src/templates/categories-pages.js'),
      context: {
        tag: t.fieldValue,
      },
    })
  })

}
