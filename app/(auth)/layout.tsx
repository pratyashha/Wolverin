const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {children}
    </div>
  );
};

export default AuthLayout;
