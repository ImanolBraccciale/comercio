"use client"
import React, { useEffect } from "react"
import { confirmEmail } from "../redux/actions"
import { useAppDispatch } from "../utils/hooks"
import {  useSearchParams } from "next/navigation"

const ConfirmEmail = () => {
    const pathname = useSearchParams()
 
    const dispatch = useAppDispatch()

    const token= pathname.get("token")

    useEffect(() => {
     dispatch(confirmEmail(token))
    })

    return (
        <>
            <h1>se confirmo tu email</h1>
        </>
    )
}

export default ConfirmEmail