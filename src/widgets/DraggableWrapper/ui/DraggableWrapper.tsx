import React, { memo, ReactNode } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface DraggableWrapperProps {
    draggableElementId: string
    updateRequest:any
    children: ReactNode
}
export const DraggableWrapper = memo(({
    draggableElementId, updateRequest, children,
}: DraggableWrapperProps) => {
    const dispatch = useAppDispatch();

    const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/plain', draggableElementId);
    };

    const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.style.opacity = '0.5';
    };

    const onDragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.opacity = '1';
    };

    const onDragDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const firstId = e.dataTransfer.getData('text/plain');
        const secondId = draggableElementId;
        if (firstId && secondId) {
            dispatch(updateRequest({ firstId, secondId }));
        }
        e.currentTarget.style.opacity = '1';
    };

    return (
        <div
            draggable
            onDragStart={onDragStartHandler}
            onDragLeave={onDragEndHandler}
            onDragOver={onDragOverHandler}
            onDragEnd={onDragEndHandler}
            onDrop={onDragDropHandler}
        >
            {children}
        </div>
    );
});
