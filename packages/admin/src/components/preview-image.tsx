import Image from 'next/image'

interface Props {
  file: string
  priority?: boolean
}

export const PreviewImage = ({ file, priority = false }: Props) => {
  return (
    <div>
      {file ? (
        <Image
          src={file}
          alt="avatar"
          width={100}
          height={100}
          priority={!!priority}
        />
      ) : (
        "You don't choosed a file"
      )}
    </div>
  )
}
