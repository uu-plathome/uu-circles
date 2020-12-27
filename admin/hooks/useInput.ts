import { useState } from "react";

export const useInput = <T>(initialValue: T) => {
    const [value, set] = useState<T>(initialValue)
    return { value, onChange: (e) => set(e.target.value), set }
}