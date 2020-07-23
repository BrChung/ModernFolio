module.exports = {
  siteMetadata: {
    title: `Brian Chung`,
    description: `I am a software engineer based in Los Angeles, CA, specializing in building full-stack cloud-based solutions.`,
    author: `@briankhchung`,
    siteUrl: `https://brianchung.netlify.app`,
    keywords: `Brian Chung, Brian, Chung, briankhchung, software engineer, full-stack engineer, software developer, javascript, python`,
    siteLang: `en_US`,
    image: "/images/og.png",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        data: `@import "${__dirname}/src/styles/styles";
                @import "${__dirname}/src/styles/_include-media";`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Brian Chung | Software Engineer`,
        short_name: `Brian Chung`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
        legacy: false,
        include_favicon: false,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow noopener noreferrer",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 700,
              linkImagesToOriginal: true,
              quality: 90,
            },
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-154985241-2`,
      },
    },
  ],
}
