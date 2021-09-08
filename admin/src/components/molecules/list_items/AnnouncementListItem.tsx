import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FC, useState } from 'react'
import Modal from 'react-modal'
import { GrayButton } from '@/src/components/atoms/buttons/GrayButton'
import { RedButton } from '@/src/components/atoms/buttons/RedButton'
import { __ } from '@/src/lang/ja'
import { Announcement } from '@/src/lib/types/model/Announcement'

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
        <h2 className="mb-4 text-lg font-bold text-center">
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
      <p className="py-1 mb-2 text-sm font-bold text-center text-gray-300 bg-gray-800">
        {title}
      </p>
      <div className="flex justify-center items-center h-7">{children}</div>
    </div>
  )
}
const AnnouncementListItem: FC<Props> = ({ announcement, onDelete }) => {
  return (
    <div className="flex mb-4 text-white">
      <div className="ml-2 w-full">
        <div className="flex items-center mb-4 lg:mb-0">
          <h2 className="mb-2 md:text-lg font-bold text-gray-300">
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
          <ListItemTableColumn title="お知らせ種類" lg>
            <p>{__(announcement.announcementType, 'AnnouncementType')}</p>
          </ListItemTableColumn>
          <ListItemTableColumn title="重要度">
            <p>{__(announcement.importance, 'Importance')}</p>
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
