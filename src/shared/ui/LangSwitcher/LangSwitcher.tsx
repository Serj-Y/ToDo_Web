import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from '../Button/Button';
import { classNames } from '../../lib/classNames/classNames';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ua' ? 'en' : 'ua');
    };

    return (
        <Button
            className={classNames('', {}, [className])}
            theme={ButtonTheme.CLEAR}
            onClick={toggle}
        >
            {t('Lang')}
        </Button>
    );
});
