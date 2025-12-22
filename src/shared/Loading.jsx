const Loading = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex-col gap-4 flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
