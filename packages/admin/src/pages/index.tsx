import { MainLayout, NextHead } from 'src/components'

export default function Home() {
  return (
    <>
      <NextHead description="admin panel" title="Admin" />
      <MainLayout>
        <div>Some text</div>
      </MainLayout>
    </>
  )
}
