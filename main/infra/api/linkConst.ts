export const GROUP = '/api'

export const linkConst = {
  MAIN: {
    INDEX: `${GROUP}/main`,

    DEMO: `${GROUP}/main/demo`,
  },

  ADVERTISE: {
    GET: `${GROUP}/advertises`,
  },

  STATISTICS: {
    INDEX: `${GROUP}/statistics`,
  },

  /** 識別子発行 */
  IDENTIFICATION: {
    PUBLISH: `${GROUP}/identification/publish`,

    VALID: (
      identifierHash: string
    ): `${typeof GROUP}/identification/valid/${string}` =>
      `${GROUP}/identification/valid/${identifierHash}` as `${typeof GROUP}/identification/valid/${string}`,
  },

  CIRCLE: {
    GROUP: `${GROUP}/circle`,

    SLUG: (slug: string): `${typeof GROUP}/circle/${string}` =>
      `${GROUP}/circle/${slug}` as `${typeof GROUP}/circle/${string}`,

    CATEGORY: (category: string): `${typeof GROUP}/circle/${string}` =>
      `${GROUP}/circle/category/${category}` as `${typeof GROUP}/circle/${string}`,
  },

  CIRCLE_NEW_JOY: {
    TODAY: `${GROUP}/circle/newjoy`,

    TODAY_DEMO: `${GROUP}/circle/newjoy/demo`,

    LIST: (slug: string): `${typeof GROUP}/circle/${string}/newjoy` =>
      `${GROUP}/circle/${slug}/newjoy` as `${typeof GROUP}/circle/${string}/newjoy`,

    LIST_DEMO: (slug: string): `${typeof GROUP}/circle/${string}/newjoy/demo` =>
      `${GROUP}/circle/${slug}/newjoy/demo` as `${typeof GROUP}/circle/${string}/newjoy/demo`,

    SHOW: (slug: string, circleNewJoyId: number) =>
      `${GROUP}/circle/${slug}/newjoy/${circleNewJoyId}`,

    SHOW_DEMO: (slug: string, demoCircleNewJoyId: number) =>
      `${GROUP}/circle/${slug}/newjoy/demo/${demoCircleNewJoyId}`,
  },
} as const
