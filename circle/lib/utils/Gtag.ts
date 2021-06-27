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

declare const window: any
const gtag = window.gtag || (() => ({}))

// PVを測定する
export const pageview = (path) => {
  gtag('config', GA_ID, {
    page_path: path,
  })
}

export const event = ({ action, category, label }: Event) => {
  if (!existsGaId) {
    return
  }

  gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
  })
}
