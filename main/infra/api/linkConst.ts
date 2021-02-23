export const GROUP = '/api'

export const linkConst = {
    MAIN: {
        INDEX: `${GROUP}/main`
    },

    CIRCLE: {
        GROUP: `${GROUP}/circle`
    },

    CIRCLE_NEW_JOY: {
        TODAY: `${GROUP}/circle/newjoy`,

        LIST: (slug: string) => `${linkConst.CIRCLE.GROUP}/${slug}/newjoy`,

        SHOW: (slug: string, circleNewJoyId: number) => 
            `${linkConst.CIRCLE.GROUP}/${slug}/newjoy/${circleNewJoyId}`
    },
} as const