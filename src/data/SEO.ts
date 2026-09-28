/**
 * SEO data for the site to be used with the Seo component.
 */
export interface SEO {
    site: string
    site_name: string
    title: string
    /**
     * Path to the image. This will be starting with a / and will be relative to the root of the site.
     */
    image: string | undefined
    description: string | undefined
}