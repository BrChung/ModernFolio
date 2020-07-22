/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            keywords
            siteLang
            image
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`${site.siteMetadata.title} | %s`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: site.siteMetadata.keywords,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: site.siteMetadata.siteUrl,
        },
        {
          property: `og:site_name`,
          content: site.siteMetadata.title,
        },
        {
          property: `og:image`,
          content: `${site.siteMetadata.siteUrl}${site.siteMetadata.image}`,
        },
        {
          property: `og:image:width`,
          content: `1200`,
        },
        {
          property: `og:image:height`,
          content: `630`,
        },
        {
          property: `og:image:type`,
          content: `image/png`,
        },
        {
          property: `og:locale`,
          content: site.siteMetadata.siteLang,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:url`,
          content: site.siteMetadata.siteUrl,
        },
        {
          name: `twitter:site`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: `${site.siteMetadata.siteUrl}${site.siteMetadata.image}`,
        },
        {
          name: `twitter:image:alt`,
          content: site.siteMetadata.title,
        },
        {
          name: `msapplication-TileColor`,
          content: `#2b5797`,
        },
        {
          name: `theme-color`,
          content: `#ffffff`,
        },
      ].concat(meta)}
      link={[
        {
          rel: `stylesheet`,
          href: `https://fonts.googleapis.com/css2?family=Roboto&display=swap`,
        },
        {
          rel: `apple-touch-icon`,
          sizes: `180x180`,
          href: `/apple-touch-icon.png`,
        },
        {
          rel: `icon`,
          type: `image/png`,
          sizes: `32x32`,
          href: `/favicon-32x32.png`,
        },
        {
          rel: `icon`,
          type: `image/png`,
          sizes: `16x16`,
          href: `/favicon-16x16.png`,
        },
        {
          rel: `mask-icon`,
          color: `#5bbad5`,
          href: `/safari-pinned-tab.svg`,
        },
      ]}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
