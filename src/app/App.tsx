import React, { Suspense, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '../widgets/Navbar';
import { useTheme } from './providers/ThemeProvider';
import { getUserInited, userActions } from '../entities/User';
import { ToDoPage } from '../pages/ToDoPage';
import { getToDo, todosPageActions } from '../entities/ToDoList/model/slice/toDoListSlice';
import { initToDoPage } from '../pages/ToDoPage/model/services/initToDoPage/initToDoPage';

function App() {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    const state = useStore();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    });

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    {inited
                      && (
                          <ToDoPage />
                      )}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
