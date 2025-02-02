import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({currentPage, totalPages, onPageChange,}: PaginationProps) {

    const maxPageNumbers = 8

    const getPageNumbers = () => {
        const pages = []
        const ellipsis = "..."

        if(totalPages <= maxPageNumbers) {
            for(let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            const left = Math.max(2, currentPage - Math.floor(maxPageNumbers / 2))
            const right = Math.min(totalPages - 1, currentPage + Math.floor(maxPageNumbers / 2))

            if(left > 2) {
                pages.push(ellipsis)
            }

            for(let i = left; i <= right; i++) {
                pages.push(i)
            }

            if(right < totalPages - 1) {
                pages.push(ellipsis)
            }
        }
        return [1, ...pages, totalPages];
    }

    const pageNumbers = getPageNumbers()

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-black rounded-l hover:bg-gray-400 disabled:opacity-50"
            >
                <ArrowLeftIcon className="w-6 text-white"/>
            </button>
            {pageNumbers.map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === "number" && onPageChange(page)}
                    disabled={page === currentPage || page === "..."}
                    className={`px-4 py-2 ${
                        currentPage === page
                            ? "bg-black text-white"
                            : "bg-gray-50 text-black"
                    } hover:bg-gray-300 hover:text-black `}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-black rounded-r hover:bg-gray-400 disabled:opacity-50"
            >
                <ArrowRightIcon className="w-6 text-white"/>
            </button>
        </div>
    );
}
