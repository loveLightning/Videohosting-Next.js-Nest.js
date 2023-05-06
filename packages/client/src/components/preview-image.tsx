import Image from 'next/image'

interface Props {
  file: string
}

export const PreviewImage = ({ file }: Props) => {
  return (
    <div>
      {file ? (
        <Image src={file} alt="avatar" width={100} height={100} />
      ) : (
        "You don't choosed a file"
      )}
    </div>
  )
}
