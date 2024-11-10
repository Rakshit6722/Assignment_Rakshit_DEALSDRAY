import React, { useEffect, useState } from 'react';
import { deleteEmployee, getEmployee } from '../../api/services/employee';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEdit } from '../../store/slices/editSlice';

const Table = () => {
    const dispatch = useDispatch()
    const [originalData, setOriginalData] = useState(null);
    const [displayData, setDisplayData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(4);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const getData = async () => {
        try {
            const response = await getEmployee();
            setOriginalData(response?.data);
            setDisplayData(response?.data);
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (!originalData) return;

        const filteredData = originalData.filter(item => {
            const searchStr = searchTerm.toLowerCase();
            return (
                item.f_id?.toString().includes(searchStr) ||
                item.f_Name?.toLowerCase().includes(searchStr) ||
                item.f_Email?.toLowerCase().includes(searchStr) ||
                item.f_Mobile?.toString().includes(searchStr) ||
                item.f_Designation?.toLowerCase().includes(searchStr) ||
                item.f_gender?.toLowerCase().includes(searchStr) ||
                item.f_Course?.toLowerCase().includes(searchStr) ||
                formatDate(item.f_createDate).toLowerCase().includes(searchStr)
            );
        });

        setDisplayData(filteredData);
    }, [searchTerm, originalData]);

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedData = [...displayData].sort((a, b) => {
            let aValue = a[key];
            let bValue = b[key];

            if (key === 'f_createDate') {
                return direction === 'ascending'
                    ? new Date(aValue) - new Date(bValue)
                    : new Date(bValue) - new Date(aValue);
            }

            // Handle numeric sorting for f_id
            if (key === 'f_id') {
                return direction === 'ascending'
                    ? Number(aValue) - Number(bValue)
                    : Number(bValue) - Number(aValue);
            }

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
            if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
            return 0;
        });

        setDisplayData(sortedData);
    };

    const getSortIcon = (columnName) => {
        if (sortConfig.key !== columnName) {
            return <span className="ml-1 text-gray-400">↕</span>;
        }
        return sortConfig.direction === 'ascending'
            ? <span className="ml-1">↑</span>
            : <span className="ml-1">↓</span>;
    };

    const SortableHeader = ({ columnKey, label }) => (
        <th
            className="border border-gray-300 p-2 text-left cursor-pointer hover:bg-blue-300"
            onClick={() => sortData(columnKey)}
        >
            <div className="flex items-center">
                {label}
                {getSortIcon(columnKey)}
            </div>
        </th>
    );

    // Pagination calculations
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = displayData?.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = displayData ? Math.ceil(displayData.length / rowsPerPage) : 0;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleDelete = async (id) => {
        await deleteEmployee(id);
        getData();
    }

    const navigate = useNavigate()
    const handleEdit = (id) => {
        dispatch(setEdit(true))
        navigate(`/dashboard/editEmployee/${id}`)
    }

    if (!displayData) return <div className="p-4">Loading...</div>;

    return (
        <div className="">
            <div className='flex justify-end space-x-7'>
                <p className='p-2'>Total Count: {originalData.length}</p>
                <div className='bg-green-400 p-2 w-64'>
                    <NavLink to={'/dashboard/createEmployee'}
                        onClick={dispatch(setEdit(false))}>
                        Create Employee
                    </NavLink>
                </div>
                <div className='w-10'></div>
            </div>
            <div className="flex justify-end bg-blue-200">
                <div className='space-x-7'>
                    <label className='font-semibold'>Search</label>
                    <input
                        type="text"
                        placeholder="Enter Search Keyword"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-96 p-2 border border-black focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-200">
                            <SortableHeader columnKey="f_id" label="Unique ID" />
                            <th className="border border-gray-300 p-2 text-left">Image</th>
                            <SortableHeader columnKey="f_Name" label="Name" />
                            <SortableHeader columnKey="f_Email" label="Email" />
                            <th className="border border-gray-300 p-2 text-left">Mobile No</th>
                            <th className="border border-gray-300 p-2 text-left">Designation</th>
                            <th className="border border-gray-300 p-2 text-left">Gender</th>
                            <th className="border border-gray-300 p-2 text-left">Course</th>
                            <SortableHeader columnKey="f_createDate" label="Create Date" />
                            <th className="border border-gray-300 p-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows?.map((item, index) => (
                            <tr key={item.f_id || index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2">{item.f_id}</td>
                                <td className="border border-gray-300 p-2"><img src={item.f_Image} width={150} alt={item.f_Name} /></td>
                                <td className="border border-gray-300 p-2">{item.f_Name}</td>
                                <td className="border border-gray-300 p-2">
                                    <a href={`mailto:${item.f_Email}`} className="text-blue-600 hover:underline">
                                        {item.f_Email}
                                    </a>
                                </td>
                                <td className="border border-gray-300 p-2">{item.f_Mobile}</td>
                                <td className="border border-gray-300 p-2">{item.f_Designation}</td>
                                <td className="border border-gray-300 p-2">{item.f_gender}</td>
                                <td className="border border-gray-300 p-2">{item.f_Course}</td>
                                <td className="border border-gray-300 p-2">{formatDate(item.f_createDate)}</td>
                                <td className="border border-gray-300 p-2">
                                    <div className="flex">
                                        <button
                                            className="py-1 text-sm text-black"
                                            onClick={() => handleEdit(item.f_id)}
                                        >
                                            Edit-
                                        </button>
                                        <button
                                            className="py-1 text-sm text-black"
                                            onClick={() => handleDelete(item.f_id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
                    <div className="flex justify-between items-center w-full">
                        <div className="text-sm text-gray-700">
                            Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, displayData.length)} of{' '}
                            {displayData.length} entries
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 ${currentPage === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-300 text-white hover:bg-blue-400'
                                    }`}
                            >
                                Previous
                            </button>

                            <div className="flex space-x-1">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => paginate(index + 1)}
                                        className={`px-3 py-1 ${currentPage === index + 1
                                            ? 'bg-blue-300 text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 ${currentPage === totalPages
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-300 text-white hover:bg-blue-400'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;