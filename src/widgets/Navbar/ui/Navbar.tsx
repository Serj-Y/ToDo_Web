import { useTranslation } from 'react-i18next';
import {
    memo, SetStateAction, useCallback, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData, userActions, userReducer } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { SignInModal } from 'feautures/Auth/SignIn';
import { SignUpModal } from 'feautures/Auth/SignUp';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { EditUserModal } from 'feautures/EditUser';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import cls from './Navbar.module.scss';
import { ActivateEmailModal } from '../../../feautures/ActiveEmail';

interface NavbarProps {
    className?: string;
}
const reducers: ReducersList = {
    user: userReducer,
};
export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const [isSignUpModal, setIsSignUpModal] = useState(false);
    const [isEditUserModal, setIsEditUserModal] = useState(false);
    const [isActivateEmailModal, setIsActivateEmailModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();

    const openCloseModalHandler = useCallback((closeModal:(value:SetStateAction<boolean>) => void) => {
        closeModal((prev) => !prev);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (authData) {
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <Text title={t('Todo')} theme={TextTheme.SECONDARY} />
                <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
                    <div className={cls.buttonsWrapper}>
                        <Button
                            theme={ButtonTheme.CLEAR_INVERTED}
                            className={cls.links}
                            onClick={onLogout}
                        >
                            {t('Sign Out')}
                        </Button>
                        {/* { !authData.emailActivate */}
                        {/*    && ( */}
                        {/*        <Button */}
                        {/*            theme={ButtonTheme.CLEAR_INVERTED} */}
                        {/*            className={cls.links} */}
                        {/*            onClick={() => openCloseModalHandler(setIsActivateEmailModal)} */}
                        {/*        > */}
                        {/*            {t('Active email')} */}
                        {/*        </Button> */}
                        {/*    )} */}
                        <Button onClick={() => openCloseModalHandler(setIsEditUserModal)}>
                            <Text
                                title={authData.name}
                                theme={TextTheme.SECONDARY}
                                size={TextSize.S}
                            />
                        </Button>
                    </div>
                    {isEditUserModal && (
                        <EditUserModal
                            isOpen={isEditUserModal}
                            onClose={() => openCloseModalHandler(setIsEditUserModal)}
                            currentName={authData.name}
                        />
                    ) }
                    {isActivateEmailModal && (
                        <ActivateEmailModal
                            isOpen={isActivateEmailModal && !authData.emailActivate}
                            onClose={() => openCloseModalHandler(setIsActivateEmailModal)}
                        />
                    )}
                </DynamicModuleLoader>
            </div>
        );
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Text title={t('Todo')} theme={TextTheme.SECONDARY} />
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
                <div className={cls.buttonsWrapper}>
                    <Button
                        theme={ButtonTheme.CLEAR_INVERTED}
                        className={cls.links}
                        onClick={() => openCloseModalHandler(setIsAuthModal)}
                    >
                        {t('Sign in')}
                    </Button>
                    <Button
                        theme={ButtonTheme.CLEAR_INVERTED}
                        className={cls.links}
                        onClick={() => openCloseModalHandler(setIsSignUpModal)}
                    >
                        {t('Sign up')}
                    </Button>
                </div>
                { isAuthModal && (
                    <SignInModal
                        isOpen={isAuthModal}
                        onClose={() => openCloseModalHandler(setIsAuthModal)}
                    />
                )}
                { isSignUpModal && (
                    <SignUpModal
                        isOpen={isSignUpModal}
                        onClose={() => openCloseModalHandler(setIsSignUpModal)}
                    />
                )}
            </DynamicModuleLoader>
        </div>
    );
});
