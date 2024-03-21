import React, {
    forwardRef, ForwardRefRenderFunction, InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import cls from './Input.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>
interface InputProps extends HtmlInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void
    autofocus?: boolean
    readonly?: boolean
    customPlaceholder?: string
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        customPlaceholder,
        placeholder,
        autofocus,
        readonly,
        ...otherProps
    } = props;
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
        }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onSelect = (e:any) => {
        setCaretPosition(e?.target?.selectionStart || 0);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>
            {customPlaceholder && (
                <div className={cls.placeholder}>
                    {`${customPlaceholder}`}
                </div>
            ) }
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                onSelect={onSelect}
                readOnly={readonly}
                {...otherProps}
            />
            {isFocused && !readonly && (
                <span
                    className={cls.caret}
                    style={{ left: `${caretPosition * 7}px` }}
                />
            )}
        </div>
    );
};

export default forwardRef(Input);
