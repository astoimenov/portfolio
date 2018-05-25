const path = require('path');
const _ = require('lodash');

exports.onCreateNode = ({ node, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  let slug;
  if (node.internal.type === 'MarkdownRemark') {
    if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
      slug = `/${_.kebabCase(node.frontmatter.slug || node.frontmatter.title)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'project') && node.frontmatter.project) {
        slug = `photography${slug}`;
      }
    }

    if (slug) {
      createNodeField({ node, name: 'slug', value: slug });
    }
  }
};

exports.createPages = ({ graphql, boundActionCreators }) =>
  new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          content: allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  page
                  project
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          reject(result.errors);
        }

        const content = result.data.content.edges;
        const projectPosts = content.filter(({ node }) => node.frontmatter.project);
        const pages = content.filter(({ node }) => node.frontmatter.page);

        const { createPage } = boundActionCreators;

        const projectTemplate = path.resolve('src/templates/project.js');
        projectPosts.forEach((edge, index) => {
          const next = index === 0 ? null : projectPosts[index - 1].node;
          const prev = index === projectPosts.length - 1 ? null : projectPosts[index + 1].node;

          createPage({
            path: `/${edge.node.fields.slug}`,
            component: projectTemplate,
            context: {
              slug: edge.node.fields.slug,
              prev,
              next,
            },
          });
        });

        const pageTemplate = path.resolve('src/templates/page.js');
        pages.forEach((edge, index) => {
          createPage({
            path: edge.node.fields.slug,
            component: pageTemplate,
            context: {
              slug: edge.node.fields.slug,
            },
          });
        });
      })
    );
  });
