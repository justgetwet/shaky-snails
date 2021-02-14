import React from 'react'
import { graphql, Link } from 'gatsby'
import Tag from '../components/tags'

export default ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.Posts
  const categories = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`
  const rootPath = `${__PATH_PREFIX__}/`
  return (
    <>
      <h2 className="text-lg text-dclCyan">{categories}</h2>
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
  query($tag: String) {
    Posts: allContentfulBlogPost(
      limit: 1000
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: [$tag] } }
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
