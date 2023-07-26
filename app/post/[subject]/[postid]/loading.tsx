import React from 'react'
import { LoadingSpinner } from '@/components/Elements/LoadingSpinner'
function loading() {
    return (
        <LoadingSpinner className="w-10 h-10 absolute left-1/2 top-1/2" />
    )
}

export default loading