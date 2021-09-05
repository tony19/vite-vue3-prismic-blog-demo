import Vue from 'vue'
import { RichText, Link, HTMLSerializer } from 'prismic-dom'
import { default as prismicClient } from '@prismicio/client'

declare module 'vue/types/vue' {
  interface Vue {
    $prismic: Omit<typeof prismicClient, 'client'> & {
      // properties
      endpoint: string
      linkResolver: (doc: any) => string
      htmlSerializer: typeof HTMLSerializer
      client: ReturnType<typeof prismicClient.client>

      // methods
      asText: typeof RichText['asText']
      richTextAsPlain: typeof RichText['asText']
      asHtml: typeof RichText['asHtml']
      asLink: typeof Link['url']
      asDate: (date: string | number | Date) => Date
    }
  }
}
