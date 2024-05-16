import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';

export default function useIsWindowFocused(): boolean {
    const [windowIsActive, setWindowIsActive] = useState(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleActivity = useCallback(
        _.debounce(
            // eslint-disable-next-line consistent-return
            (e: { type: string }) => {
                if (e?.type === 'focus') {
                    return setWindowIsActive(true);
                }
                if (e?.type === 'blur') {
                    return setWindowIsActive(false);
                }
                if (e?.type === 'visibilitychange') {
                    if (document.hidden) {
                        return setWindowIsActive(false);
                    }
                    return setWindowIsActive(true);
                }
            },
            100,
            { leading: false },
        ),
        [],
    );

    useEffect(() => {
        document.addEventListener('visibilitychange', handleActivity);
        document.addEventListener('blur', handleActivity);
        window.addEventListener('blur', handleActivity);
        window.addEventListener('focus', handleActivity);
        document.addEventListener('focus', handleActivity);

        return () => {
            window.removeEventListener('blur', handleActivity);
            document.removeEventListener('blur', handleActivity);
            window.removeEventListener('focus', handleActivity);
            document.removeEventListener('focus', handleActivity);
            document.removeEventListener('visibilitychange', handleActivity);
        };
    }, [handleActivity]);

    return windowIsActive;
}
