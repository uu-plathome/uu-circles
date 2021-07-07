/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    // STG は 'production'
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly API_URL: string
    readonly GOOGLE_ANALYTICS_ID: string
    readonly BUGSNAG_API_KEY: string
  }
}

declare global {
  interface Window {
    // pageviewのため
    gtag(type: 'config', googleAnalyticsId: string, { page_path: string })
    // eventのため
    gtag(
      type: 'event',
      eventAction: string,
      fieldObject: {
        event_label: string
        event_category: string
        value?: string
      }
    )
  }
}
