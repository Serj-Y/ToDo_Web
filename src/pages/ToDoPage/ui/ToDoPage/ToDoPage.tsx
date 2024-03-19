import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { memo, useEffect } from 'react';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToDoList } from '../../../../entities/ToDo';
import { getToDoPageError, getToDoPageIsLoading } from '../../model/selectors/mainPageSelectors';
import { getToDo, todosPageReducer } from '../../model/slice/toDoPageSlice';
import { PageWrapper } from '../../../../widgets/PageWrapper/PageWrapper';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import cls from './ToDoPage.module.scss';
import { initToDoPage } from '../../model/services/initToDoPage/initToDoPage';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    toDo: todosPageReducer,
};

const ToDoPage = ({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getToDoPageIsLoading);
    const error = useSelector(getToDoPageError);
    const toDo = useSelector(getToDo.selectAll);

    useEffect(() => {
        dispatch(initToDoPage());
    });
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <PageWrapper
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ToDoList
                    isLoading={isLoading}
                    className={cls.list}
                    toDo={toDo}
                />
            </PageWrapper>
        </DynamicModuleLoader>
    );
};
export default memo(ToDoPage);
