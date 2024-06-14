import { ChangeEvent, useMemo } from 'react';
import cls from './Select.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

export interface SelectOption<T extends string> {
    value: T
    content: string
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string
  options?: SelectOption<T>[]
  value?: T
  onChange?: (value: T) => void
  readonly?: boolean
}

export const Select = <T extends string>({
    className, label, options, value, onChange, readonly,
}: SelectProps<T>) => {
    const mods: Mods = {};

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
    };

    const optionsList = useMemo(() => options?.map((opt) => (
        <option
            className={cls.options}
            value={opt.value}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);
    return (
        <div className={classNames(cls.Select, mods, [className])}>
            {label && (
                <span className={classNames(cls.label, {}, [className])}>
                    {`${label}>`}
                </span>
            )}
            <select
                className={cls.selectOption}
                value={value}
                onChange={onChangeHandler}
                disabled={readonly}
            >
                {optionsList}
            </select>
        </div>
    );
};
