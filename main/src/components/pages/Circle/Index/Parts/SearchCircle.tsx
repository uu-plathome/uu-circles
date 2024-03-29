import { useRouter } from 'next/dist/client/router'
import { FC, FormEvent } from 'react'
import { SearchTextField } from '@/src/components/atoms/form/SearchTextField'
import { useStringInput } from '@/src/hooks/useInput'

export const SearchCircle: FC = () => {
  const router = useRouter()
  const name = useStringInput('')
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (name.value) {
      router.push(`/circle/search/[name]`, `/circle/search/${name.value}`)
    } else {
      router.push(`/circle`)
    }
  }

  return (
    <form onSubmit={onSubmit} role="search" aria-label="サークルを検索">
      <SearchTextField id="search" name="search" expand {...name} />
    </form>
  )
}
