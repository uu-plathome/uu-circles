import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FC } from 'react'
import { __ } from '@/src/lang/ja'
import { DemoCircleNewJoy } from '@/src/lib/types/model/DemoCircleNewJoy'
import { dayjs } from '@/src/plugins/Dayjs'

type Props = {
  demoCircleNewJoy: DemoCircleNewJoy
  name: string
  circleId: number
}

const CircleListItemTableColumn: FC<{
  title: string
  large?: boolean
  xs?: boolean
  children: React.ReactNode
}> = ({ children, title, large, xs }) => {
  let w = 'lg:w-1/6'
  w = large ? 'lg:w-1/4' : w
  w = xs ? 'lg:w-1/12' : w
  return (
    <div
      className={`
            w-1/2
            ${w}
            pr-2
            mb-8
            lg:mb-0
        `}
    >
      <p className="py-1 mb-2 text-sm font-bold text-center text-gray-300 bg-gray-800">
        {title}
      </p>
      <div className="flex justify-center items-center h-10">{children}</div>
    </div>
  )
}
const formatDateTime = (datetime: string) =>
  dayjs(datetime).format('M月D日 H時m分')
const NewJoyDateTime: FC<{
  startDate: string
  endDate: string
}> = ({ startDate, endDate }) => {
  if (startDate && endDate) {
    return (
      <div>
        <p className="mt-4 text-sm text-white">
          <span className="mr-2 text-gray-800 bg-white rounded-full border-2 border-white">
            始
          </span>
          {formatDateTime(startDate)}
        </p>
        <p className="mt-2 text-sm text-white">
          <span className="mr-2 text-gray-800 bg-white rounded-full border-2 border-white">
            終
          </span>
          {formatDateTime(endDate)}
        </p>
      </div>
    )
  }

  if (startDate && !endDate) {
    return (
      <div>
        <p className="text-sm text-white">
          <span className="mr-2 text-gray-800 bg-white rounded-full border-2 border-white">
            始
          </span>
          {formatDateTime(startDate)}
        </p>
      </div>
    )
  }

  if (!startDate && endDate) {
    return (
      <div>
        <p className="mt-4 text-sm text-white">
          <span className="mr-2 text-gray-800 bg-white rounded-full border-2 border-white">
            始
          </span>
        </p>
        <p className="mt-2 text-sm text-white">
          <span className="mr-2 text-gray-800 bg-white rounded-full border-2 border-white">
            終
          </span>
          {formatDateTime(endDate)}
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-white">未登録</p>
    </div>
  )
}

const DemoCircleNewJoyListItem: FC<Props> = ({ name, demoCircleNewJoy }) => {
  return (
    <div className="mb-8">
      <div className="ml-2 w-full">
        <h2 className="mb-2 text-lg font-bold text-gray-300">
          {`${name} ${demoCircleNewJoy.title}`}
        </h2>

        <div className="flex flex-wrap w-full">
          <CircleListItemTableColumn title="公開中">
            <FontAwesomeIcon
              size="lg"
              color={demoCircleNewJoy.published ? 'green' : 'red'}
              icon={demoCircleNewJoy.published ? faCheckCircle : faTimesCircle}
            />
          </CircleListItemTableColumn>

          <CircleListItemTableColumn title="新歓日時" large>
            <NewJoyDateTime
              startDate={demoCircleNewJoy.startDate}
              endDate={demoCircleNewJoy.endDate}
            />
          </CircleListItemTableColumn>

          <CircleListItemTableColumn title="活動場所" large>
            <div className="text-white">
              <p>{__(demoCircleNewJoy.placeOfActivity)}</p>
            </div>
          </CircleListItemTableColumn>

          <CircleListItemTableColumn title="編集">
            <Link
              href="/demo/newjoy/[demoCircleNewJoyId]/edit"
              as={`/demo/newjoy/${demoCircleNewJoy.demoCircleNewJoyId}/edit`}
            >
                <FontAwesomeIcon size="lg" color="orange" icon={faEdit} />
            </Link>
          </CircleListItemTableColumn>
        </div>
      </div>
    </div>
  )
}

export { DemoCircleNewJoyListItem }
