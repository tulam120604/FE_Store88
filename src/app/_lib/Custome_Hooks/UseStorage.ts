'use client';

import { useCallback, useState, useEffect } from "react"

export function useLocalStorage(key: any, defaultValue: any) {
    return useStorage(key, defaultValue, 'localStorage')
}

export function useSessionStorage(key: any, defaultValue: any) {
    return useStorage(key, defaultValue, 'sessionStorage');
}

function useStorage(key: string, defaultValue: any, storageType: 'localStorage' | 'sessionStorage') {
    const [value, setValue] = useState(() => {
        if (typeof window !== 'undefined') {
            const storageObject = storageType === 'localStorage' ? window.localStorage : window.sessionStorage;
            const jsonValue = storageObject.getItem(key);
            if (jsonValue != null) return JSON.parse(jsonValue);
        }

        if (typeof defaultValue === "function") {
            return defaultValue();
        } else {
            return defaultValue;
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storageObject = storageType === 'localStorage' ? window.localStorage : window.sessionStorage;
            if (value === undefined) {
                storageObject.removeItem(key);
            } else {
                storageObject.setItem(key, JSON.stringify(value));
            }
        }
    }, [key, value, storageType]);

    const remove = useCallback(() => {
        setValue(undefined);
    }, []);

    return [value, setValue, remove];
}