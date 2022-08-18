import { useState, useCallback } from 'react'

export function useToggle(initialValue: boolean): [boolean, () => void] {
    const [value, setValue] = useState<boolean>(initialValue);

    const toggleValue = useCallback(() => {
        setValue((v) => !v);
    }, []);

    return [value, toggleValue];
}