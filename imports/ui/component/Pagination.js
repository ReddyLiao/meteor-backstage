import React from 'react';
import PropTypes from 'prop-types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export const Page = ({ currentPage, index, onChange }) => (
    <a
        className={`bg-white  text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium ${
            (currentPage === index || (index === 1 && !currentPage)) &&
            'z-10 bg-gray-50  text-indigo-600 relative text-sm '
        }`}
        aria-label={`Goto page ${index}`}
        aria-current={index === currentPage && 'page'}
        onClick={() => onChange(index)}
    >
        {index}
    </a>
);

Page.propTypes = {
    currentPage: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

Page.defaultProps = {
    className: '',
};

const Ellipses = () => (
    <span className="relative inline-flex items-center px-4 py-2  bg-white text-sm font-medium text-gray-700">...</span>
);

export const getVisiblePages = (visibleRadius, currentPage, maxPages) => {
    const visiblePages = [];

    let start = currentPage - visibleRadius;
    let end = currentPage + visibleRadius;

    if (start < 1) {
        start = 1;
        end = start + visibleRadius * 2;
    }

    if (end > maxPages) {
        start = maxPages - visibleRadius * 2;
        end = maxPages;
    }

    if (visibleRadius * 2 + 1 > maxPages) {
        start = 1;
        end = maxPages;
    }

    for (let i = start; i <= end; i++) {
        visiblePages.push(i);
    }

    return visiblePages;
};

const Pagination = ({ pages, currentPage, visibleRadius, onChange, onPerPageChange }) => {
    const visiblePages = getVisiblePages(visibleRadius, currentPage, pages);
    const pagesComponents = [];

    if (visiblePages[0] >= 2) {
        pagesComponents.push(
            <Page
                key="page-1"
                index={1}
                currentPage={currentPage}
                onChange={onChange}
                className="bg-white  text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2  text-sm font-medium"
            />,
        );

        if (visiblePages[0] !== 2) {
            pagesComponents.push(<Ellipses key="ellipses-1" />);
        }
    }

    visiblePages.map((page) =>
        pagesComponents.push(
            <Page
                key={`page-${page}`}
                index={page}
                currentPage={currentPage}
                onChange={onChange}
                className="relative inline-flex items-center px-4 py-2 bg-white text-sm font-medium text-gray-700"
            />,
        ),
    );

    if (currentPage <= pages - visibleRadius - 1 && visiblePages.length < pages) {
        if (currentPage < pages - visibleRadius - 1) {
            pagesComponents.push(<Ellipses key="ellipses-2" />);
        }

        pagesComponents.push(
            <Page key={`page-${pages}`} index={pages} currentPage={currentPage} onChange={onChange} />,
        );
    }

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    role="navigation"
                    aria-label="pagination"
                >
                    <div className="relative inline-flex px-4 ">
                        {/* eslint-disable-next-line radix */}
                        <select
                            defaultValue="10"
                            className="mt-1 block w-full py-2 px-3 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={(e) => onPerPageChange(parseInt(e.target.value))}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="1000">1000</option>
                        </select>
                    </div>
                    <div hidden={currentPage === 1}>
                        <a
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            onClick={() => onChange(currentPage - 1)}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                    </div>
                    {pagesComponents}
                    <div hidden={currentPage === pages}>
                        <a
                            disabled={currentPage === pages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            onClick={() => onChange(currentPage + 1)}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    );
};

Pagination.propTypes = {
    pages: PropTypes.number.isRequired,
    currentPage: PropTypes.number,
    visibleRadius: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onPerPageChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
    currentPage: 1,
    visibleRadius: 1,
};

export default Pagination;
