import { GrayButton } from '@/components/atoms/buttons/GrayButton'
import { RedButton } from '@/components/atoms/buttons/RedButton'
import { __ } from '@/lang/ja'
import { Announcement } from '@/lib/types/model/Announcement'
import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Modal from 'react-modal'
import { FC, useState } from 'react'

type Props = {
  announcement: Announcement
  onDelete(announcementId: number): void
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '200px',
  },
}
type DeleteButtonProps = {
  announcement: Announcement
  onDelete(): void
}
const DeleteButton: FC<DeleteButtonProps> = ({ announcement, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClickDeleteButton = () => {
    setIsOpen(false)
    onDelete()
  }

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon size="lg" color="red" icon={faTrash} />
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="お知らせの削除"
      >
        <h2 className="text-center text-lg mb-4 font-bold">
          本当に削除しますか？
        </h2>

        <p className="mb-8 text-center">{announcement.title}</p>

        <div className="flex justify-center">
          <div className="mx-2">
            <GrayButton onClick={() => setIsOpen(false)}>閉じる</GrayButton>
          </div>
          <div className="mx-2">
            <RedButton onClick={onClickDeleteButton}>削除</RedButton>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const ListItemTableColumn: FC<{
  title: string
  lg?: boolean
}> = ({ children, title, lg }) => {
  const widthClass = lg ? 'w-1/3 lg:w-1/4' : 'w-1/3 lg:w-1/6'
  return (
    <div className={`${widthClass} pr-2 mb-2`}>
      <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">
        {title}
      </p>
      <div className="flex justify-center h-7 items-center">{children}</div>
    </div>
  )
}
const AnnouncementListItem: FC<Props> = ({ announcement, onDelete }) => {
  return (
    <div className="text-white flex mb-4">
      <div className="ml-2 w-full">
        <div className="flex items-center mb-4 lg:mb-0">
          <h2 className="font-bold md:text-lg text-gray-300 mb-2">
            {announcement.title}
          </h2>
        </div>

        <div className="flex flex-wrap w-full">
          <ListItemTableColumn title="公開中">
            <FontAwesomeIcon
              size="lg"
              color={announcement.active ? 'green' : 'red'}
              icon={announcement.active ? faCheckCircle : faTimesCircle}
            />
          </ListItemTableColumn>
          <ListItemTableColumn title="公開中" lg>
            <p>{__(announcement.announcementType, 'AnnouncementType')}</p>
          </ListItemTableColumn>
          <ListItemTableColumn title="編集する">
            <Link
              href="/announcement/[announcementId]/edit"
              as={`/announcement/${announcement.id}/edit`}
            >
              <a>
                <FontAwesomeIcon size="lg" color="orange" icon={faEdit} />
              </a>
            </Link>
          </ListItemTableColumn>
          <ListItemTableColumn title="削除する">
            <DeleteButton
              announcement={announcement}
              onDelete={() => onDelete(announcement.id)}
            />
          </ListItemTableColumn>
        </div>
      </div>
    </div>
  )
}

export { AnnouncementListItem }
