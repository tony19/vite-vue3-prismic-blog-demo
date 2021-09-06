/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */
import type { FilledLinkToDocumentField } from '@prismicio/types'

const resolver = (doc: FilledLinkToDocumentField) => {
  if (doc.isBroken) {
    return '/not-found'
  }

  if (doc.type === 'blog_home') {
    return '/blog'
  } else if (doc.type === 'post') {
    return '/blog/' + doc.uid
  }

  return '/not-found'
}

export default resolver
