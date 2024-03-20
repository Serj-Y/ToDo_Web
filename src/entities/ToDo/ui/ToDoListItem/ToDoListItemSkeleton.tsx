import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './ToDoListItem.module.scss';

interface ArticleListItemSkeletonProps {
    className?: string;
}

export const ToDoListItemSkeleton = memo(({
    className,
}: ArticleListItemSkeletonProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames('', {}, [className])}>
            <Card className={cls.card}>
                <div className={cls.header}>
                    <Skeleton border="50%" width={30} height={30} />
                    <Skeleton width={150} height={16} className={cls.username} />
                    <Skeleton width={150} height={16} className={cls.date} />
                </div>
                <Skeleton width={250} height={24} className={cls.title} />
                <Skeleton height={200} className={cls.img} />
                <Skeleton height={100} className={cls.img} />
                <div className={cls.footer}>
                    <Skeleton height={36} width={100} />
                    <Skeleton height={24} width={100} className={cls.views} />
                </div>
            </Card>
        </div>
    );
});
