export const GachaMovieId = {
  // 部活
  A: 'oytrtUs_ODE',
  // サークル (公認団体)
  B: '-Z5A2674hak',
  // サークル (非公認団体)
  C: 'xMikB50dv8s',
  // サークル (学生団体)
  D: 'Apr4jK1AXMg',
} as const

export type GachaMovieIdKey = keyof typeof GachaMovieId
export type GachaMovieId = typeof GachaMovieId[keyof typeof GachaMovieId]
