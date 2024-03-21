import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { ToDoListItemSkeleton } from '../ToDoListItem/ToDoListItemSkeleton';
import cls from './ToDoList.module.scss';
import { ToDo } from '../../model/types/toDo';
import { ToDoListItem } from '../ToDoListItem/ToDoListItem';

interface ToDoListProps {
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
}: ToDoListProps) => {
    const { t } = useTranslation();
    const renderToDo = (toDo: ToDo) => (
        <ToDoListItem toDo={toDo} key={toDo._id} />
    );
    if (!isLoading && !toDo.length) {
        return (
            <div className={classNames('', {}, [className, cls.CARD])}>
                <Text
                    size={TextSize.L}
                    align={TextAlign.CENTER}
                    title={t('ToDoList not found')}
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
