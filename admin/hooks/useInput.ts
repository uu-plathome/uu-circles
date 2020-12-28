import { useState } from "react";

export const useInput = <T>(initialValue: T) => {
    const [ value, set ] = useState<T>(initialValue)
    const [ error, setError ] = useState<string>('')
    return {
        value,
        set,
        onChange: (e) => set(e.target.value),
        error,
        setError
    }
}