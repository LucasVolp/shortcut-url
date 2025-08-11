import { nanoid } from "nanoid"

export const shortCode = (): string => {
    return nanoid(6)
}