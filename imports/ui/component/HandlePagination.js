import { useState } from 'react';

function HandlePagination(initialSort) {
    const [editItem, setEditItem] = useState({});
    const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState(initialSort);

    function handlePageChange(page) {
        setCurrentPage(page);
    }

    function handlePerPageChange(no) {
        // 換每頁的顯示筆數時 目前頁數要跳回1
        setCurrentPage(1);
        setPerPage(no);
    }

    function handleSort(e) {
        // 因為排序的欄位和sort class的名稱不一致 所要分兩個來取名字
        const newField = e.currentTarget.id;
        const newSortField = e.currentTarget.title;
        let newOrderBy = 'asc';
        let newSortClass = 'icon fas fa-sort-up';
        const oldField = sort.field;
        if (newField === oldField) {
            if (sort.orderBy === 'asc') {
                newOrderBy = 'desc';
                newSortClass = 'icon fas fa-sort-down';
            }
        }
        const newSortFieldClassName = `${newSortField}SortClass`;
        setSort({ ...initialSort, field: newField, orderBy: newOrderBy, [newSortFieldClassName]: newSortClass });
        setCurrentPage(1);
    }

    return {
        editItem,
        setEditItem,
        data,
        setData,
        perPage,
        totalPage,
        setTotalPage,
        currentPage,
        setCurrentPage,
        sort,
        handlePageChange,
        handlePerPageChange,
        handleSort,
    };
}

export default HandlePagination;
