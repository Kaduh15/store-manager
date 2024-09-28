import { ButtonLogout } from '@/components/button-logout'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/helpers/auth-options'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <h1>Hello, world! </h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <ButtonLogout>Logout</ButtonLogout>
    </>
  )
}
