import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import cls from './Footer.module.scss';
import { ThemeSwitcher } from '../../../shared/ui/ThemeSwitcher';

interface FooterProps {
    className?: string;
}

export const Footer = memo(({ className }: FooterProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.Footer, {}, [className])}>
            <LangSwitcher />
            <ThemeSwitcher />
        </div>
    );
});
