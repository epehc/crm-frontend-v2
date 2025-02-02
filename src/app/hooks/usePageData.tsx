import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

const usePageData = (basePath: string) => {
    const { data: session } = useSession();
    const token = session?.accessToken as string;
    const searchParams = useSearchParams();
    const router = useRouter();

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;

    useEffect(() => {
        const page = parseInt(searchParams?.get("page") as string) || 1;
        setCurrentPage(page);
    }, [searchParams]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        router.push(`${basePath}?page=${page}`);
    };

    return {
        token,
        currentPage,
        totalPages,
        setTotalPages,
        pageSize,
        handlePageChange,
    };
};

export default usePageData;