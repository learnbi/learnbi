require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const config = require("./content/meta/config");
const transformer = require("./src/utils/algolia");

const query = `{
  allMarkdownRemark( filter: { fields: { slug: { ne: null } } }) {
    edges {
      node {
        objectID: fileAbsolutePath
        fields {
          slug
        }
        internal {
          content
        }
        frontmatter {
          title
        }
      }
    }
  }
}`;

const queries = [
  {
    query,
    transformer: ({ data }) => {
      return data.allMarkdownRemark.edges.reduce(transformer, []);
    }
  }
];

module.exports = {
  // pathPrefix: config.pathPrefix, 
  
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    siteUrl: config.siteUrl,
    contactPostAddress: process.env.CONTACT_POST_ADDRESS || "",
    emailSubLink: process.env.EMAIL_SUB_LINK || "",
    algolia: {
      appId: process.env.ALGOLIA_APP_ID || "",
      searchOnlyApiKey: process.env.ALGOLIA_SEARCH_ONLY_API_KEY
        ? process.env.ALGOLIA_SEARCH_ONLY_API_KEY
        : "",
      indexName: process.env.ALGOLIA_INDEX_NAME ? process.env.ALGOLIA_INDEX_NAME : ""
    }
  },
  plugins: [
    `gatsby-plugin-styled-jsx`, // the plugin's code is inserted directly to gatsby-node.js and gatsby-ssr.js files
    `gatsby-plugin-styled-jsx-postcss`, // as above
    
    // If you want a Search page, put this back in plugins:
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID ? process.env.ALGOLIA_APP_ID : "",
        apiKey: process.env.ALGOLIA_ADMIN_API_KEY ? process.env.ALGOLIA_ADMIN_API_KEY : "",
        indexName: process.env.ALGOLIA_INDEX_NAME ? process.env.ALGOLIA_INDEX_NAME : "",
        queries,
        chunkSize: 10000 // default: 1000
      }
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        //jsxPragma: `jsx`, // defaults to "React" ??
        allExtensions: true
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/`)
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/${process.env.POSTS_FOLDER || 'mock_posts'}/`,
        name: "posts"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages/`,
        name: "pages"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `parts`,
        path: `${__dirname}/content/parts/`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-component-parent2div",
            options: { components: ["re-icons", "re-img", "re-tracedsvg-gallery"] }
          },
          `gatsby-plugin-sharp`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              backgroundColor: "transparent",
              tracedSVG: { color: '#f9ebd2' }
            }
          },
          {
            resolve: `gatsby-remark-rehype-images`,
            options: {
              tag: 're-img',
              maxWidth: 800,
              quality: 90,
              tracedSVG: { color: '#f9ebd2' },
              generateTracedSVG: true
            }
          },

          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 2em`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: "gatsby-remark-emojis",
            options: {
              // Deactivate the plugin globally (default: true)
              active: true,
              // Add a custom css class
              class: "emoji-icon",
              // Select the size (available size: 16, 24, 32, 64)
              size: 64,
              // Add custom styles
              styles: {
                display: "inline",
                margin: "0",
                "margin-top": "1px",
                position: "relative",
                top: "5px",
                width: "25px"
              }
            }
          }
        ]
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.manifestName,
        short_name: config.manifestShortName,
        start_url: config.manifestStartUrl,
        background_color: config.manifestBackgroundColor,
        theme_color: config.manifestThemeColor,
        display: config.manifestDisplay,
        icons: [
          {
            src: "/icons/icon-48x48.png",
            sizes: "48x48",
            type: "image/png"
          },
          {
            src: "/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "/icons/icon-196x196.png",
            sizes: "196x196",
            type: "image/png"
          },
          {
            src: "/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.fields.prefix,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }]
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [fields___prefix] },
                  filter: {
                    fields: {
                      prefix: { regex: "/[0-9]{4}.*/" },
                      slug: { ne: null }
                    }
                  }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                        prefix
                      }
                      frontmatter {
                        title
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml"
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        include: /svg-icons/
      }
    }
  ]
};
