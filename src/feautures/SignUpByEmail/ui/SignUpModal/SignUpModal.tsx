import { Suspense } from 'react';
import { Modal } from '../../../../shared/ui/Modal/Modal';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Loader } from '../../../../shared/ui/Loader/Loader';
import { SignUpFormAsync } from '../SignUpForm/SignUpForm.async';

interface SignUpModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}
export const SignUpModal = ({ className, onClose, isOpen }: SignUpModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <SignUpFormAsync onSuccess={onClose} />
        </Suspense>
    </Modal>
);
