import { UseStringInput } from '@/hooks/useInput'
import { createRef, FC, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { BaseLabel } from './BaseLabel'

const inputClass = `
    transition
    duration-300
    bg-white
    border
    border-gray-300
    rounded
    cursor-pointer
    focus:border-transparent
    focus:outline-none
    focus:ring-4
    focus:ring-blue-200
`

interface ImageInputProps {
  id: string
  label: string
  preview: string
  onDrop(acceptedFiles: any): void
  width: number
}
const ImageInput: FC<ImageInputProps> = ({
  onDrop,
  id,
  label,
  preview,
  width,
}) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const [height, setHeight] = useState(0)
  useEffect(() => {
    // w : h = 375 : 200
    setHeight((width * 200) / 375)
  }, [width])

  return (
    <div id={id} className="flex justify-center">
      <div {...getRootProps()} className={inputClass}>
        <input {...getInputProps()} />

        <div className="text-center">
          <img
            src={preview}
            alt={label}
            style={{
              width,
              height,
            }}
          />
        </div>
      </div>
    </div>
  )
}

interface Props {
  onDrop(acceptedFiles: any, idx: 1 | 2 | 3 | 4 | 5 | 6): void
  activityImageUrl1: UseStringInput
  activityImageUrl2: UseStringInput
  activityImageUrl3: UseStringInput
  activityImageUrl4: UseStringInput
  activityImageUrl5: UseStringInput
  activityImageUrl6: UseStringInput
}
const CircleActivityImageInput: FC<Props> = ({
  onDrop,
  activityImageUrl1,
  activityImageUrl2,
  activityImageUrl3,
  activityImageUrl4,
  activityImageUrl5,
  activityImageUrl6,
}) => {
  const [error, setError] = useState('')
  const [width, setWidth] = useState(0)
  const ref = createRef<HTMLDivElement>()
  useEffect(() => {
    setError(
      activityImageUrl1.error ||
        activityImageUrl2.error ||
        activityImageUrl3.error ||
        activityImageUrl4.error ||
        activityImageUrl5.error ||
        activityImageUrl6.error ||
        ''
    )
  }, [
    activityImageUrl1.error,
    activityImageUrl2.error,
    activityImageUrl3.error,
    activityImageUrl4.error,
    activityImageUrl5.error,
    activityImageUrl6.error,
  ])

  useEffect(() => {
    if (ref.current.clientWidth) {
      setWidth((ref.current.clientWidth - 12 * 2) / 3)
    }
  }, [])

  return (
    <div className="mb-4">
      <BaseLabel
        label="活動画像"
        note={
          '最適なアスペクト比は375:200です。画像編集ソフトなどを使って最適なサイズに変更するようにお願いします。'
        }
        id="activityImageUrl"
      />

      <div ref={ref} className="flex mb-3">
        <div className="pr-3">
          <ImageInput
            id="activityImageUrl1"
            label="activityImageUrl1"
            preview={
              activityImageUrl1.value
                ? activityImageUrl1.value
                : `/images/no-image.png`
            }
            onDrop={(acceptedFiles) => onDrop(acceptedFiles, 1)}
            width={width}
          />
        </div>

        <div className="pr-3">
          <ImageInput
            id="activityImageUrl2"
            label="activityImageUrl2"
            preview={
              activityImageUrl2.value
                ? activityImageUrl2.value
                : `/images/no-image.png`
            }
            width={width}
            onDrop={(acceptedFiles) => onDrop(acceptedFiles, 2)}
          />
        </div>

        <ImageInput
          id="activityImageUrl3"
          label="activityImageUrl3"
          preview={
            activityImageUrl3.value
              ? activityImageUrl3.value
              : `/images/no-image.png`
          }
          width={width}
          onDrop={(acceptedFiles) => onDrop(acceptedFiles, 3)}
        />
      </div>

      <div className="flex">
        <div className="pr-3">
          <ImageInput
            id="activityImageUrl4"
            label="activityImageUrl4"
            preview={
              activityImageUrl4.value
                ? activityImageUrl4.value
                : `/images/no-image.png`
            }
            width={width}
            onDrop={(acceptedFiles) => onDrop(acceptedFiles, 4)}
          />
        </div>

        <div className="pr-3">
          <ImageInput
            id="activityImageUrl5"
            label="activityImageUrl5"
            preview={
              activityImageUrl5.value
                ? activityImageUrl5.value
                : `/images/no-image.png`
            }
            width={width}
            onDrop={(acceptedFiles) => onDrop(acceptedFiles, 5)}
          />
        </div>

        <ImageInput
          id="activityImageUrl6"
          label="activityImageUrl6"
          preview={
            activityImageUrl6.value
              ? activityImageUrl6.value
              : `/images/no-image.png`
          }
          width={width}
          onDrop={(acceptedFiles) => onDrop(acceptedFiles, 6)}
        />
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : ''}
    </div>
  )
}

export { CircleActivityImageInput }
