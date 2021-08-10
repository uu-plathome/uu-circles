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
import { getDOW, getMonth, getDay, getFullJPDate } from '@/src/lib/utils/Date'

const TableTitle: FC = ({ children }) => {
  return <h4 className="text-gray-500 text-base text-gray-400">{children}</h4>
}

type Props = {
  circle: Circle
  circleNewJoy: CircleNewJoy
}
const CircleNewJoyDetail: FC<Props> = ({ circle, circleNewJoy }) => {
  const pageUrl = useMemo(
    () => `https://uu-circles.com/${circle.slug}/newjoy/${circleNewJoy.id}`,
    [circle.slug, circleNewJoy.id]
  )

  return (
    <div>
      <div className="hidden md:block">
        <div
          className="bg-white rounded-lg px-6 py-2 mx-auto mb-2 flex justify-center"
          style={{ width: 500 }}
        >
          <div className="my-3 mr-6">
            <section
              className="rounded-2xl border-gray-300 border"
              style={{
                width: 70,
                height: 70,
              }}
            >
              <div className="bg-gray-600 text-white  rounded-2xl rounded-b-none text-center ">
                <p className="text-xs leading-5">
                  {getDOW(circleNewJoy.startDate)}
                </p>
              </div>
              <div
                className=" text-black  text-center rounded-2xl rounded-t-none  items-center pb-4"
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
              <p className="text-black text-sm  my-2 pb-2 font-bold">
                {circle.shortName || circle.name} {circleNewJoy.title}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>新歓日時</TableTitle>
              <p className="text-black text-sm  my-2 pb-2 font-bold">
                {getFullJPDate(circleNewJoy.startDate, circleNewJoy.endDate)}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>活動場所</TableTitle>
              <p className="text-black text-sm  my-2 pb-2 font-bold">
                {__(circleNewJoy.placeOfActivity, PlaceOfActivity._type)}
              </p>
            </section>

            {circleNewJoy.placeOfActivityDetail ? (
              <section className="my-6 border-b border-gray-600">
                <TableTitle>活動場所詳細</TableTitle>
                <p className="text-black text-sm my-2 pb-2 font-bold whitespace-pre-wrap">
                  {circleNewJoy.placeOfActivityDetail}
                </p>
              </section>
            ) : (
              ''
            )}

            {circleNewJoy.url ? (
              <section className="my-6 border-b border-gray-600">
                <TableTitle>URL</TableTitle>
                <p className="text-sm my-2 pb-2">
                  <a
                    className="text-blue-600 font-bold hover:underline"
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
              <p className="text-black text-sm my-2 pb-2 font-bold whitespace-pre-wrap">
                {circleNewJoy.description}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>SNSで共有しよう</TableTitle>

              <div className="my-2 pb-2">
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
          <div className=" bg-white rounded-lg px-6 py-2 mx-auto mb-2">
            <section className="my-6 border-b border-gray-600">
              <TableTitle>新歓イベント名</TableTitle>

              <p className="text-black text-sm  my-2 pb-2 font-bold">
                {circle.shortName || circle.name} {circleNewJoy.title}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>新歓日時</TableTitle>

              <p className="text-black text-sm  my-2 pb-2 font-bold">
                {getFullJPDate(circleNewJoy.startDate, circleNewJoy.endDate)}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>活動場所</TableTitle>

              <p className="text-black text-sm  my-2 pb-2 font-bold">
                {__(circleNewJoy.placeOfActivity, PlaceOfActivity._type)}
              </p>
            </section>

            {circleNewJoy.placeOfActivityDetail ? (
              <section className="my-6 border-b border-gray-600">
                <TableTitle>活動場所詳細</TableTitle>
                <p className="text-black text-sm  my-2 pb-2 font-bold whitespace-pre-wrap">
                  {circleNewJoy.placeOfActivityDetail}
                </p>
              </section>
            ) : (
              ''
            )}

            {circleNewJoy.url ? (
              <section className="my-6 border-b border-gray-600">
                <TableTitle>URL</TableTitle>
                <p className="text-sm my-2 pb-2">
                  <a
                    className="text-blue-600 font-bold hover:underline"
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

              <p className="text-black text-sm  my-2 pb-2 font-bold whitespace-pre-wrap">
                {circleNewJoy.description}
              </p>
            </section>

            <section className="my-6 border-b border-gray-600">
              <TableTitle>SNSで共有しよう</TableTitle>

              <div className="my-2 pb-2">
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
