import {
    MutableRefObject, ReactNode, useRef, UIEvent, useEffect,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getScrollSaveByPath, scrollSaveActions } from '../ScrollSave';
import { StateSchema } from '../../app/providers/StoreProvider';
import cls from './PageWrapper.module.scss';

interface PageWrapperProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const PageWrapper = ({
    className,
    children,
    onScrollEnd,
}: PageWrapperProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector(
        (state: StateSchema) => getScrollSaveByPath(state, pathname),
    );
    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });
    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(scrollSaveActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname,
        }));
    }, 1000);
    useEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    }, [scrollPosition]);
    return (
        <section
            ref={wrapperRef}
            onScroll={onScroll}
            className={classNames(cls.PageWrapper, {}, [className])}
        >
            {children}
            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
        </section>
    );
};
