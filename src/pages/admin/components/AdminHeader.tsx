const AdminHeader = () => {
  return (
    <div className="flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="min-w-0">
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
          Admin Dashboard
        </h1>

        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
          Monitor users and overall platform activity.
        </p>
      </div>
    </div>
  );
};

export default AdminHeader;
