export const GROUP = '/api'

export const linkConst = {
  MAIN: {
    INDEX: `${GROUP}/main`,
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

    LIST: (slug: string): `${typeof GROUP}/circle/${string}/newjoy` =>
      `${GROUP}/circle/${slug}/newjoy` as `${typeof GROUP}/circle/${string}/newjoy`,

    SHOW: (slug: string, circleNewJoyId: number) =>
      `${GROUP}/circle/${slug}/newjoy/${circleNewJoyId}`,
  },
} as const
