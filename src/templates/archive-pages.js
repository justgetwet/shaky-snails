import React from 'react'
import { graphql, Link } from 'gatsby'
import Tag from '../components/tags'

export default ({ pageContext, data }) => {
  const { month } = pageContext
  const { edges } = data.Posts
  const rootPath = `${__PATH_PREFIX__}/`
  const archive = `Archive - Posted in ${month}`
  return (
    <>
      <h2 className="text-lg text-dclCyan">{archive}</h2>
      <hr />
      {edges.map(({ node }) => (
        <h3 key={node.id} className="text-lg">
          <div className="inline">{node.date}</div>
          <div className="inline ml-2 text-dclYellow">
            <Link to={rootPath + node.slug}>{node.title}</Link>
          </div>
          <div className="inline ml-2 whitespace-nowrap">
            <Tag tags={node.tags} />
          </div>
        </h3>
      ))}
    </>
  )
}

export const pageQuery = graphql`
  query($month: Date) {
    Posts: allContentfulBlogPost(
      limit: 1000
      sort: { fields: [date], order: DESC }
      filter: { fields: { yearMonth: { eq: $month } } }
    ) {
      totalCount
      edges {
        node {
          id
          slug
          title
          date(formatString: "YYYY-MM-DD")
          tags
        }
      }
    }
  }
`
