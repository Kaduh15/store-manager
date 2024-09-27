import { env } from '@/env'

export default function Home() {
  return (
    <>
      <h1>Hello, world! </h1>
      <pre>{JSON.stringify(env, null, 2)}</pre>
    </>
  )
}
