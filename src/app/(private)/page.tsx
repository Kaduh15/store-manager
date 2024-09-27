import { ButtonLogout } from '@/components/button-logout'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(nextAuthOptions)

  return (
    <>
      <h1>Hello, world! </h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <ButtonLogout>Logout</ButtonLogout>
    </>
  )
}
