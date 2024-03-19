import { CSSProperties } from 'react';
import cls from './Skeleton.module.scss';
import { classNames } from '../../lib/classNames/classNames';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
}

export const Skeleton = ({

    className, border, height, width,
}: SkeletonProps) => {
    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };
    return (
        <div
            className={classNames(cls.Skeleton, {}, [className])}
            style={styles}
        />
    );
};
