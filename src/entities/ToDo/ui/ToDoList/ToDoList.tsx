import { useTranslation } from 'react-i18next';
import { ToDoListItemSkeleton } from '../ToDoListItem/ToDoListItemSkeleton';
import cls from './ToDoList.module.scss';
import { ToDo } from '../../model/types/toDo';
import { ToDoListItem } from '../ToDoListItem/ToDoListItem';
import { Text, TextAlign, TextSize } from '../../../../shared/ui/Text/Text';
import { classNames } from '../../../../shared/lib/classNames/classNames';

interface ArticleListProps {
    className?: string;
    toDo: ToDo[];
    isLoading?: boolean;
}

const getSkeletons = () => (
    new Array(12)
        .fill(0)
        .map((item, index) => (
            <ToDoListItemSkeleton className={cls.card} key={index} />
        ))
);

export const ToDoList = ({
    className,
    toDo,
    isLoading,
}: ArticleListProps) => {
    const { t } = useTranslation();
    const renderToDo = (toDo: ToDo) => (
        <ToDoListItem toDo={toDo} className={cls.card} key={toDo._id} />
    );
    if (!isLoading && !toDo.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls.CARD])}>
                <Text
                    size={TextSize.L}
                    align={TextAlign.CENTER}
                    title={t('ToDo not found')}
                />
            </div>
        );
    }
    return (
        <div className={classNames(cls.ToDoList, {}, [className, cls.CARD])}>
            {toDo.length > 0 ? toDo.map(renderToDo) : null}
            {isLoading && getSkeletons()}
        </div>
    );
};
