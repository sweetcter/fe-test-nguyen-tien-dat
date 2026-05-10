import ThemeToggle from '../../ThemeToggle';

const Header = () => {
  return (
    <header className="z-10 flex h-16 items-center justify-between border-b bg-card px-6 shadow-sm transition-colors duration-200">
      <div className="text-lg font-semibold tracking-tight">Management Task</div>
      <div className="flex items-center gap-6">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
