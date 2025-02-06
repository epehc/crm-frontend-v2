import {CheckCircleIcon, CheckIcon, ClockIcon, ExclamationTriangleIcon, XCircleIcon} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({status}: {status: string}) {
    return (
        <span
            className={clsx(
                'inline-flex items-center rounded-full px-2 py-1 text-xs',
                {
                    'bg-gray-100 text-gray-500': status === 'creada',
                    'bg-yellow-300 text-gray-500': status === 'parcial',
                    'bg-green-500 text-white': status === 'pagada',
                    'bg-orange-500 text-white': status === 'vencida',
                    'bg-red-500 text-white': status === 'anulada',
                },
            )}
        >
            {status === 'creada' ? (
                <>
                    Creada
                    <ClockIcon className="ml-1 w-4 text-gray-500"/>
                </>
            ) : null}
            {status === 'pagada' ? (
                <>
                    Pagada
                    <CheckCircleIcon className="ml-1 w-4 text-white"/>
                </>
            ) : null}
            {status === 'parcial' ? (
                <>
                    Parcial
                    <ClockIcon className="ml-1 w-4 text-gray-500"/>
                </>
            ) : null}
            {status === 'vencida' ? (
                <>
                    Vencida
                    <ExclamationTriangleIcon className="ml-1 w-4 text-white"/>
                </>
            ) : null}
            {status === 'anulada' ? (
                <>
                    Anulada
                    <XCircleIcon className="ml-1 w-4 text-white"/>
                </>
            ) : null}
        </span>
    );
}