import React, { SVGProps, VFC } from 'react';
import cls from './Icon.module.scss';
import { classNames } from '../../lib/classNames/classNames';

interface IconProps {
    className?: string;
    Svg: VFC<SVGProps<SVGSVGElement>>
}

export const Icon = ({ className, Svg }: IconProps) => (
    <Svg className={classNames(cls.Icon, {}, [className])} />
);
