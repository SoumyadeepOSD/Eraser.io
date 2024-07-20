import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'

type Props = {}

function DashBoard({}: Props) {
  return (
    <div>
    <h1>
      DashBoard
    </h1>
    <LogoutLink >
      Logout
    </LogoutLink>
    </div>
  )
}

export default DashBoard;