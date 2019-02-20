import { Link, graphql, StaticQuery } from 'gatsby';
import Picture from 'gatsby-image';
import React from 'react';
import { ThemeContext } from "../../layouts";

function locateImage(props) {
  const split = props.src.split(".")
  const wantedName = split[split.length-2]
  const filteredPosts = props.data.posts.edges.filter(edge => {
    const piecesOfPath = edge.node.frontmatter.cover.children[0].fluid.src.toString().split("/")
    const imageName = piecesOfPath[piecesOfPath.length-1].split(".")[0]
    return imageName.includes(wantedName);
  })  
  if (filteredPosts.length != 1) {
    throw ("ReImage error! Expected to locate 1 image for " + wantedName + ", instead located " + filteredPosts.length);
  }
  const fluid = filteredPosts[0].node.frontmatter.cover.children[0].fluid
  return fluid
}

const ReImage = props => {
  console.log(props)
  const fluid = locateImage(props)
  
  return (
      <ThemeContext.Consumer>
        {theme => (
          <a href={fluid.originalImg} target="_blank">
            <div className="imgContainer">
              <img src={fluid.tracedSVG} title={props.title} style={{
                position: 'relative',
                top: 0,
                left: 0,
                margin: '2.5em 0',
                width: "100%",
                display: 'block',
                borderRadius: theme.size.radius.default,
                overflow: 'hidden'
              }} />
              <Picture
              fluid={fluid}
              title={props.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: "100%",
                borderRadius: theme.size.radius.default,
                overflow: 'hidden'
              }}
              />
        
            </div>
            <style jsx>{`
              .imgContainer {
                position: relative;
                top: 0;
                left: 0;
              }
              @from-width desktop {
                :global(picture) {
                  transition: 200ms cubic-bezier(.17, .67, .83, .67);
                }
                :global(picture):hover {
                  opacity: 0;
                }
              }
            `}</style>
          </a>
          
        )}
      </ThemeContext.Consumer>
  );
};

//export default ReImage;

export default props => (
  <StaticQuery
    //eslint-disable-next-line no-undef
    query={graphql`
      query {
        posts: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "//posts/[0-9]+.*--/" } }
        ) {
          edges {
            node {
              excerpt
              fields {
                slug
                prefix
              }
              frontmatter {
                title
                tags
                cover {
                  children {
                    ... on ImageSharp {
                      fluid(maxWidth: 800, traceSVG: { color: "#f9ebd2", blackOnWhite: true }) {
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                        originalImg
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <ReImage data={data} src={props.src} title={props.title} />
    )}
  />
)