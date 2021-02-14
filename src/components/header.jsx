import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import { Github, Twitter } from './icons'

export default function Header() {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/snail.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          title
          summary
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const { title, summary, social } = data.site.siteMetadata
  return (
    <div className="flex">
      <Link to="/">
        <Image
          className="rounded-full"
          fixed={data.avatar.childImageSharp.fixed}
        />
      </Link>
      <div className="ml-4">
        <h1 className="text-2xl text-dclYellow">{title}</h1>
        <span className="text-lg">{summary}</span>
        <a className="ml-2" href={social.github}>
          <Github />
        </a>
        <a className="ml-2" href={social.twitter}>
          <Twitter />
        </a>
      </div>
    </div>
  )
}
