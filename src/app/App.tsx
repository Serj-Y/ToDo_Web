import React, { Suspense, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '../widgets/Navbar';
import { useTheme } from './providers/ThemeProvider';
import { getUserInited, userActions } from '../entities/User';
import { ToDoPage } from '../pages/ToDoPage';
import { initUser } from '../entities/User/model/services/initUser';
import { authUserData } from '../entities/User/model/services/authUserData';

function App() {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    const state = useStore();
    console.log(inited);
    useEffect(() => {
        dispatch(authUserData());
    });

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">

                    <ToDoPage />

                </div>
            </Suspense>
        </div>
    );
}

export default App;
