import React from 'react';

function Pagination({ page, setpage }) {
    const nexthandler = () => {
        if (page >= 15) return;
        setpage((page) => page + 1);
    };

    const previoushandler = () => {
        if (page <= 1) return;
        setpage((page) => page - 1);
    };

    return (
        <div className="bg-[#111827] text-white flex items-center justify-center gap-2 p-4 rounded-lg">
            {/* دکمه قبلی */}
            <button 
                onClick={previoushandler} 
                className="bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600 transition"
            >
                Previous
            </button>

            {/* شماره صفحات */}
            {[1, 2].map((num) => (
                <p 
                    key={num} 
                    className={`px-3 py-1 rounded-md ${page === num ? "bg-indigo-500 text-white" : ""}`}
                >
                    {num}
                </p>
            ))}

            {/* صفحه وسط */}
            {page > 2 && page < 13 && (
                <>
                    <span className="px-2">...</span>
                    <p 
                        className="px-3 py-1 rounded-md bg-indigo-500 text-white"
                    >
                        {page}
                    </p>
                </>
            )}

            {/* صفحات آخر */}
            <p className="px-2">...</p>
            {[14, 15].map((num) => (
                <p 
                    key={num} 
                    className={`px-3 py-1 rounded-md ${page === num ? "bg-indigo-500 text-white" : ""}`}
                >
                    {num}
                </p>
            ))}

            {/* دکمه بعدی */}
            <button 
                onClick={nexthandler} 
                className="bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600 transition"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
