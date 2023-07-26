"use client"

import { useUserStore, user } from "@/zustand/store"
import { useRef } from "react"
function UseStoreInitializer({
    name,
    email,
    image,
    isauthenticated
}: user) {
    const initialized = useRef(false);
    if (!initialized.current) {
        useUserStore.setState({ name, email, image, isauthenticated })
        initialized.current = true;
    }
    return null;
}
export default UseStoreInitializer;