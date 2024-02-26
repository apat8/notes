import { useCallback, useRef } from 'react';

const useDebounceCallback = (func, wait) => {

    const timeout = useRef();

    return useCallback( (...args) => {
        const later = () => {
            clearTimeout(timeout.current);
            func(...args);
        }

        clearTimeout(timeout.current);
        timeout.current = setTimeout(later, wait);
    }, [func, wait])
}

export default useDebounceCallback;