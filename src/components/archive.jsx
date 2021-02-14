import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

export default function Archive() {
  const data = useStaticQuery(graphql`
    query {
      Posts: allContentfulBlogPost {
        group(field: fields___yearMonth) {
          fieldValue
          totalCount
        }
      }
    }
  `)
  const months = data.Posts.group.slice().reverse() // 非破壊的に反転
  return (
    <>
      <h2 className="mt-4 text-lg text-dclCyan">Archive</h2>
      <hr />
      {months.map((m, index) => {
        const monthCount =
          `${m.fieldValue}` + `(` + `${m.totalCount}` + `)`
        return (
          <ul key={index} className="list-none text-lg">
            <li className="">
              <Link to={`/archive/posted-in-${m.fieldValue}/`}>
                {monthCount}
              </Link>
            </li>
          </ul>
        )
      })}
    </>
  )
}