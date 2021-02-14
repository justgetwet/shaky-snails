import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Tag from './tags'

export default function Latest() {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: [date], order: DESC }, limit: 5) {
        edges {
          node {
            id
            slug
            title
            date
            tags
          }
        }
      }
    }
  `)
  const Posts = data.allContentfulBlogPost.edges
  return (
    <>
      <h2 className="text-lg text-dclCyan">Latest</h2>
      <hr />
      {Posts.map(({ node }) => (
        <div key={node.id} className="text-lg">
          <div className="inline">{node.date}</div>
          <h3 className="inline ml-2 text-dclYellow">
            <Link to={`/` + node.slug}>{node.title}</Link>
          </h3>
          <div className="inline ml-2 whitespace-nowrap">
            <Tag tags={node.tags} />
          </div>
        </div>
      ))}
    </>
  )
}

