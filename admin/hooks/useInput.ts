import { useState } from "react";

export const useInput = <T>(initialValue: T) => {
    const [ state, set ] = useState<T>(initialValue)
    const [ error, setError ] = useState<string>('')

    const value = state === null ? '' : state

    return {
        value,
        set,
        onChange: (e) => set(e.target.value),
        error,
        setError
    }
}