import Head from 'next/head'

interface Props {
  title?: string
  description?: string
}

export const NextHead = ({ title, description }: Props) => (
  <Head>
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
  </Head>
)
