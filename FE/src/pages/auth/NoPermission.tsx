const NoPermission = () => {
  return (
    <div className="rounded-lg bg-white shadow-lg p-16 max-w-7xl mx-auto justify-center mt-40">
      <div className="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-indigo-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
          />
        </svg>
      </div>
      <div className="text-center mt-2">
        <h1 className="text-purple-900 font-bold text-2xl">
          Bạn không phải ADMIN
        </h1>
        <p className="text-gray-500 mt-3">
          Bạn không có quyền truy cập trang này.
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <a href="/">
          <button className="text-white py-2 px-4 rounded-lg bg-purple-700 hover:bg-purple-600 shadow-md font-medium  transition-colors">
            Quay lại
          </button>
        </a>
      </div>
    </div>
  );
};

export default NoPermission;
