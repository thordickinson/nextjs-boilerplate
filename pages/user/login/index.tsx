import { withAuthenticator } from '@aws-amplify/ui-react'
import { useRouter } from 'next/router'
import React from 'react'

function LoginPage() {
    const router = useRouter()
    const {redirectTo} = router.query

    router.push(redirectTo?.toString() || "/")
    return <div></div>
}

export default withAuthenticator(LoginPage)