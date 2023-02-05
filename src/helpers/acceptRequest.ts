import { ACCEPT_REQUEST } from "@/graphql/mutations/notificationMutations"
import { useMutation } from "@apollo/client"
import { useState, useContext, useEffect } from "react"


export async function acceptRequest() {
    const [runAcceptReq, { loading, data, error }] = useMutation(ACCEPT_REQUEST)

    useEffect(() => {
        runAcceptReq()
    }, [])

    if (loading) return console.log(loading)
    if (data) return console.log(data)
    if (error) return console.log(error)
}


