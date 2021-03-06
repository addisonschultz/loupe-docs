module.exports = {
  siteMetadata: {
    title: "Loupe 2019 Docs",
    author: "Addison Schultz <addison@framer.com>",
    description: "Docs for the Loupe 2019 Framer X for Teams Workshop",
    siteUrl: "https://framer-learn-docs.netlify.com"
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-emotion",
    "gatsby-plugin-catch-links",
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`roboto`, `roboto mono`],
        display: "swap"
      }
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/typography",
        omitGoogleFont: true
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "content",
        path: `${__dirname}/content`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: "#ff5700",
        showSpinner: false
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-mdx",
      options: {
        extensions: [".md", ".mdx"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-smartypants",
            options: {
              dashes: "oldschool"
            }
          },
          // {
          // 	resolve: `gatsby-remark-codemirror`,
          // 	options: {
          // 		// CSS class suffix to be used for produced `<pre/>` blocks.
          // 		// Default value is "default", which adds "cm-s-default" class.
          // 		// This class name matches
          // 		theme: 'default',
          // 	},
          // },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              inlineCodeMarker: {
                tsx: "tsx"
              },
              aliases: {}
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1200,
              sizeByPixelDensity: true
            }
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {}
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-lunr",
      options: {
        languages: [
          {
            name: "en",
            customEntries: []
          }
        ],
        fields: [
          { name: "title", store: true, attributes: { boost: 20 } },
          { name: "path", store: true },
          { name: "content" },
          { name: "tags" }
        ],
        resolvers: {
          Mdx: {
            title: node => node.frontmatter.title,
            path: node => node.frontmatter.path,
            content: node => node.rawBody,
            tags: node => node.frontmatter.tags
          }
        }
      }
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        /**
         * no need to specify the other options, since they will be merged with this
         */
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(({ node }) => {
                return {
                  ...node.frontmatter,
                  description: node.excerpt,
                  url: site.siteMetadata.siteUrl + node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + node.frontmatter.path,
                  custom_elements: [{ "content:encoded": node.html }]
                };
              });
            },
            query: `
              {
                allMdx(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      frontmatter {
                        path
                        title
                        date
                      }
                      excerpt
                      html
                    }
                  }
                }
              }
            `,
            output: "rss.xml"
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Loupe 2019 Docs",
        short_name: "Loupe Docs",
        start_url: "/",
        background_color: "#f7f0eb",
        theme_color: "#a2466c",
        display: "minimal-ui",
        icon: "static/favicon/favicon.png"
      }
    },
    "gatsby-plugin-sitemap",
    "gatsby-plugin-offline",
    "gatsby-plugin-netlify",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-7687647-14",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Any additional create only fields (optional)
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "framer-learn-docs.netlify.com"
      }
    }
  ]
};
