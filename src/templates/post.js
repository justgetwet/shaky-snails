import React from 'react'
import { graphql, Link } from 'gatsby'
import Tags from '../components/tags'
import SEO from '../components/seo'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import MDXComponents from '../styles/markdown-styles'
import scrollTo from 'gatsby-plugin-smoothscroll'
import { ArrowLeft, ArrowRight, ArrowUp } from '../components/icons'

export default ({ data, pageContext }) => {
  const { previous, next } = pageContext
  const rootPath = `${__PATH_PREFIX__}/`
  const post = data.contentfulBlogPost
  const Grow = () => <div className="flex-grow" />
  return (
    <>
      <SEO
        title={post.title}
        description={post.description || post.body.childMdx.excerpt}
      />
      <div className="text-lg mt-2">Posted on {post.date}</div>
      <hr />
      <h2 className="text-4xl mt-2">{post.title}</h2>
      <div className="text-lg mt-2 mb-4">
        <Tags tags={post.tags} />
      </div>
      <MDXProvider components={MDXComponents}>
        <MDXRenderer>{post.body.childMdx.body}</MDXRenderer>
      </MDXProvider>
      <div className="flex mt-8 mb-4">
        {previous && (
          <Link to={rootPath + previous.slug}>
            <ArrowLeft />
          </Link>
        )}
        <Grow />
        <button onClick={() => scrollTo('html')}>
          <ArrowUp />
        </button>
        <Grow />
        {next && (
          <Link to={rootPath + next.slug}>
            <ArrowRight />
          </Link>
        )}
      </div>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      id
      slug
      title
      date(formatString: "YYYY-MM-DD")
      tags
      description
      body {
        id
        childMdx {
          excerpt
          body
        }
      }
    }
  }
`
