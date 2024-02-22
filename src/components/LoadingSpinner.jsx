const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-16">
      <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
