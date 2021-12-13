import { FC, useMemo } from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'
import { __ } from '@/src/lang/ja'
import { PlaceOfActivity } from '@/src/lib/enum/api/PlaceOfActivity'
import { Circle } from '@/src/lib/types/model/Circle'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'
import { getDow, getMonth, getDay, getFullJPDate } from '@/src/lib/utils/Date'

const TableTitle: FC = ({ children }) => {
  return <h4 className="text-base text-gray-400 text-gray-500">{children}</h4>
}

type Props = {
  circle: Circle
  circleNewJoy: CircleNewJoy
}
const CircleNewJoyDetail: FC<Props> = ({ circle, circleNewJoy }) => {
  const pageUrl = useMemo(
    () => `https://uu-circles.com/circle/${circle.slug}/newjoy/${circleNewJoy.id}`,
    [circle.slug, circleNewJoy.id]
  )

  return (
    <div>
      <div className="hidden md:block">
        <div
          className="flex justify-center py-2 px-6 mx-auto mb-2 bg-white rounded-lg"
          style={{ width: 500 }}
        >
          <div className="my-3 mr-6">
            <section
              className="rounded-2xl border border-gray-300"
              style={{
                width: 70,
                height: 70,
              }}
            >
              <div className="text-center text-white bg-gray-600 rounded-2xl rounded-b-none ">
                <p className="text-xs leading-5">
                  {getDow(circleNewJoy.startDate)}
                </p>
              </div>
              <div
                className="items-center pb-4 text-center text-black rounded-2xl rounded-t-none "
                style={{ borderRadius: '0 0 10 10 ' }}
              >
                <p className="text-xs leading-4">
                  {getMonth(circleNewJoy.startDate)}月
                </p>
                <p className="text-2xl">{getDay(circleNewJoy.startDate)}</p>
              </div>
            </section>
          </div>
          <div
            style={{
              width: 335,
            }}
          >
            <section className="my-3 border-b border-gray-600">
              <TableTitle>新歓イベント名</TableTitle>
              <p className="pb-2 my-2 text-sm font-bold text-black">
                {circle.shortName || circle.name} {circleNewJoy.title}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>新歓日時</TableTitle>
              <p className="pb-2 my-2 text-sm font-bold text-black">
                {getFullJPDate(circleNewJoy.startDate, circleNewJoy.endDate)}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>活動場所</TableTitle>
              <p className="pb-2 my-2 text-sm font-bold text-black">
                {__(circleNewJoy.placeOfActivity, PlaceOfActivity._type)}
              </p>
            </section>

            {circleNewJoy.placeOfActivityDetail ? (
              <section className="my-6 border-b border-gray-600">
                <TableTitle>活動場所詳細</TableTitle>
                <p className="pb-2 my-2 text-sm font-bold text-black whitespace-pre-wrap">
                  {circleNewJoy.placeOfActivityDetail}
                </p>
              </section>
            ) : (
              ''
            )}

            {circleNewJoy.url ? (
              <section className="my-6 border-b border-gray-600">
                <TableTitle>URL</TableTitle>
                <p className="pb-2 my-2 text-sm">
                  <a
                    className="font-bold text-blue-600 hover:underline"
                    href={circleNewJoy.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    リンクを見る
                  </a>
                </p>
              </section>
            ) : (
              ''
            )}

            <section className="my-6 border-b border-gray-600">
              <TableTitle>新歓説明</TableTitle>
              <p className="pb-2 my-2 text-sm font-bold text-black whitespace-pre-wrap">
                {circleNewJoy.description}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>SNSで共有しよう</TableTitle>

              <div className="pb-2 my-2">
                <TwitterShareButton
                  url={pageUrl}
                  title={`UU-Circlesで${circle.shortName || circle.name}の新歓${
                    circleNewJoy.title
                  }を見る！`}
                  hashtags={['春から宇大']}
                  className="mr-2"
                >
                  <TwitterIcon size={40} round />
                </TwitterShareButton>

                <LineShareButton url={pageUrl} className="mr-2">
                  <LineIcon size={40} round />
                </LineShareButton>

                <FacebookShareButton
                  url={pageUrl}
                  hashtag={'春から宇大'}
                  className="mr-2"
                >
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="px-6">
          <div className="py-2 px-6 mx-auto mb-2 bg-white rounded-lg ">
            <section className="my-6 border-b border-gray-600">
              <TableTitle>新歓イベント名</TableTitle>

              <p className="pb-2 my-2 text-sm font-bold text-black">
                {circle.shortName || circle.name} {circleNewJoy.title}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>新歓日時</TableTitle>

              <p className="pb-2 my-2 text-sm font-bold text-black">
                {getFullJPDate(circleNewJoy.startDate, circleNewJoy.endDate)}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>活動場所</TableTitle>

              <p className="pb-2 my-2 text-sm font-bold text-black">
                {__(circleNewJoy.placeOfActivity, PlaceOfActivity._type)}
              </p>
            </section>

            {circleNewJoy.placeOfActivityDetail ? (
              <section className="my-6 border-b border-gray-600">
                <TableTitle>活動場所詳細</TableTitle>
                <p className="pb-2 my-2 text-sm font-bold text-black whitespace-pre-wrap">
                  {circleNewJoy.placeOfActivityDetail}
                </p>
              </section>
            ) : (
              ''
            )}

            {circleNewJoy.url ? (
              <section className="my-6 border-b border-gray-600">
                <TableTitle>URL</TableTitle>
                <p className="pb-2 my-2 text-sm">
                  <a
                    className="font-bold text-blue-600 hover:underline"
                    href={circleNewJoy.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    リンクを見る
                  </a>
                </p>
              </section>
            ) : (
              ''
            )}

            <section className="my-6 border-b border-gray-600">
              <TableTitle>新歓説明</TableTitle>

              <p className="pb-2 my-2 text-sm font-bold text-black whitespace-pre-wrap">
                {circleNewJoy.description}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>SNSで共有しよう</TableTitle>

              <div className="pb-2 my-2">
                <TwitterShareButton
                  url={pageUrl}
                  title={`UU-Circlesで${
                    circle.shortName || circle.name
                  }の新歓「${circleNewJoy.title}」を見る！`}
                  hashtags={['春から宇大']}
                  className="mr-2"
                >
                  <TwitterIcon size={40} round />
                </TwitterShareButton>

                <LineShareButton url={pageUrl} className="mr-2">
                  <LineIcon size={40} round />
                </LineShareButton>

                <FacebookShareButton
                  url={pageUrl}
                  hashtag={'春から宇大'}
                  className="mr-2"
                >
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CircleNewJoyDetail }
