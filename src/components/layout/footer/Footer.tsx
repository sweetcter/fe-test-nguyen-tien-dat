const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-card p-4 text-center text-sm text-muted-foreground transition-colors duration-200">
      &copy; {new Date().getFullYear()} Management tasks
    </footer>
  );
};

export default Footer;
