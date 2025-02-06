import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface ExpandButtonProps {
    open: boolean;
    onClick: () => void;
}

export default function ExpandButton({ open, onClick }: ExpandButtonProps) {
    return (
        <button onClick={onClick}>
            {open ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
        </button>
    );
}