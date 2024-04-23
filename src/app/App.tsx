import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '../widgets/Navbar';
import { useTheme } from './providers/ThemeProvider';
import { getUserInited } from '../entities/User';
import { ToDoPage } from '../pages/ToDoPage';
import { initUser } from '../entities/User/model/services/initUser';
import { Footer } from '../widgets/Footer';
import { ACCESS_TOKEN } from '../shared/consts/localStorage';

function App() {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        if (!ACCESS_TOKEN) {
            dispatch(initUser());
        }
    }, [dispatch]);
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
                <Footer />
            </Suspense>
        </div>
    );
}

export default App;
