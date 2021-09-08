import { useEffect, useMemo, useState } from 'react'
import { useBooleanOrNullInput, useStringInput } from '@/hooks/useInput'
import { usePageInput } from '@/hooks/usePageInput'
import { CircleType } from '@/src/lib/enum/api/CircleType'
import { Circle } from '@/src/lib/types/model/Circle'
import { hiraToKana } from '@/src/lib/utils/String'

export const useCircles = (originalCircles: Circle[]) => {
  const [filteredCircles, setFilteredCircles] = useState<Circle[]>([])
  // 名前
  const searchName = useStringInput('')
  // 公開中かどうか
  const searchRelease = useBooleanOrNullInput(null)
  // サークルタイプ
  const searchCircleType = useStringInput('')
  // 新歓ビラがあるかどうか
  const searchIsHandbill = useBooleanOrNullInput(null)

  const page = usePageInput({
    initialMaxPage: Math.ceil(
      originalCircles ? originalCircles.length / 10 : 1
    ),
    pageSize: 10,
  })

  useEffect(() => {
    const search = {
      name: searchName.value,
      release: searchRelease.toBooleanOrNull,
      circleType: searchCircleType.value,
      isHandbill: searchIsHandbill.toBooleanOrNull,
    }

    setFilteredCircles(searchCircle({ circles: originalCircles, search }))
    page.updatePage(1)
  }, [
    originalCircles,
    searchName.value,
    searchRelease.toBooleanOrNull,
    searchCircleType.value,
    searchIsHandbill.toBooleanOrNull,
  ])

  useEffect(() => {
    const newPage = Math.ceil(filteredCircles.length / 10)

    page.setMaxPage(newPage === 0 ? 1 : newPage)
  }, [filteredCircles, page])

  const nowPageCircles = useMemo(() => {
    return filteredCircles.slice(
      (page.page - 1) * page.pageSize,
      page.page * page.pageSize
    )
  }, [filteredCircles, page.page, page.pageSize])

  return {
    searchName,
    searchRelease,
    searchCircleType,
    searchIsHandbill,
    nowPageCircles,
    page,
  }
}

const searchCircle = ({
  circles,
  search: { name, release, circleType, isHandbill },
}: {
  circles: Circle[]
  search: {
    name?: string
    release?: boolean | null | 'null'
    circleType?: string
    isHandbill?: boolean | null | 'null'
  }
}): Circle[] => {
  if (!circles) {
    return []
  }

  const searchedCirclesByName = searchCircleByName({
    circles,
    search: { name },
  })
  const searchedCirclesByRelease = searchCircleByRelease({
    circles: searchedCirclesByName,
    search: { release },
  })
  const searchedCirclesByCircleType = searchCircleByCircleType({
    circles: searchedCirclesByRelease,
    search: { circleType },
  })
  const searchedCircleByIsHandbill = searchCircleByIsHandbill({
    circles: searchedCirclesByCircleType,
    search: { isHandbill },
  })

  return searchedCircleByIsHandbill
}

const searchCircleByName = ({
  circles,
  search: { name },
}: {
  circles: Circle[]
  search: {
    name?: string
  }
}): Circle[] => {
  if (!name) {
    return circles
  }

  return circles.filter((c) => {
    const _name = hiraToKana(name)

    if (c.name && hiraToKana(c.name).includes(_name)) {
      return true
    }

    if (c.shortName && hiraToKana(c.shortName).includes(_name)) {
      return true
    }

    if (c.nameKana && hiraToKana(c.nameKana).includes(_name)) {
      return true
    }

    if (c.prefixName && hiraToKana(c.prefixName).includes(_name)) {
      return true
    }

    if (c.slug && c.slug.includes(_name)) {
      return true
    }

    if (c.description && c.description.includes(_name)) {
      return true
    }

    return false
  })
}

const searchCircleByRelease = ({
  circles,
  search: { release },
}: {
  circles: Circle[]
  search: {
    release?: null | 'null' | boolean | 'true' | 'false'
  }
}): Circle[] => {
  if (!release && release !== false /** release === null */) {
    return circles
  }

  if (release === 'null') {
    return circles
  }

  return circles.filter((c) => {
    if (release === 'true') {
      return c.release === true
    }

    if (release === 'false') {
      return c.release === false
    }

    if (c.release === release) {
      return true
    }

    return false
  })
}

const searchCircleByCircleType = ({
  circles,
  search: { circleType },
}: {
  circles: Circle[]
  search: {
    circleType?: string
  }
}): Circle[] => {
  if (!circleType) {
    return circles
  }

  return circles.filter((c) => {
    if (
      circleType === CircleType.OFFICIAL_ORGANIZATION &&
      c.circleType === CircleType.OFFICIAL_ORGANIZATION
    ) {
      return true
    }

    if (
      circleType === CircleType.SENDING_ORGANIZATION &&
      c.circleType === CircleType.SENDING_ORGANIZATION
    ) {
      return true
    }

    if (
      circleType === CircleType.STUDENT_GROUP &&
      c.circleType === CircleType.STUDENT_GROUP
    ) {
      return true
    }

    if (
      circleType === CircleType.UNOFFICIAL_ORGANIZATION &&
      c.circleType === CircleType.UNOFFICIAL_ORGANIZATION
    ) {
      return true
    }

    if (circleType === '不明' && ['', null].includes(c.circleType)) {
      return true
    }

    return false
  })
}

const searchCircleByIsHandbill = ({
  circles,
  search: { isHandbill },
}: {
  circles: Circle[]
  search: {
    isHandbill?: null | 'null' | boolean | 'true' | 'false'
  }
}): Circle[] => {
  if (!isHandbill && isHandbill !== false /** isHandbill === null */) {
    return circles
  }

  if (isHandbill === 'null') {
    return circles
  }

  return circles.filter((c) => {
    if (isHandbill === true || isHandbill === 'true') {
      return !!c.handbillImageUrl
    }

    if (isHandbill === false || isHandbill === 'false') {
      return !c.handbillImageUrl
    }

    return false
  })
}
