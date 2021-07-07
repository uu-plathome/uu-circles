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

type ContactEvent = {
  action: 'submit_form'
  category: 'Contact'
  label: string
}

type ClickEvent = {
  action: 'click'
  category: 'Other'
  label: string
}

export type Event = ContactEvent | ClickEvent

export const GA_ID = process.env.GOOGLE_ANALYTICS_ID

// IDが取得できない場合を想定する
export const existsGaId = GA_ID !== ''

// PVを測定する
export const pageview = (path) => {
  window.gtag('config', GA_ID, {
    page_path: path,
  })
}

export const event = ({ action, category, label }: Event) => {
  if (!existsGaId) {
    return
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
  })
}
