import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import SideBar from './SideBar';

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="current-path">{location.pathname}</div>;
};

describe('Component SideBar', () => {
  const mockToggleSidebar = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderSideBar = (isCollapsed = false, initialRoute = '/dashboard') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <SideBar isCollapsed={isCollapsed} toggleSidebar={mockToggleSidebar} />
        <LocationDisplay />
      </MemoryRouter>
    );
  };

  it('nên hiển thị logo và danh sách menu', () => {
    renderSideBar();

    expect(screen.getByText('Task App')).toBeInTheDocument();

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
  });

  it('nên gọi hàm toggleSidebar khi nhấn nút thu gọn/mở rộng', () => {
    renderSideBar();

    const toggleButton = screen.getByTitle('Thu gọn sidebar');
    fireEvent.click(toggleButton);

    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
  });

  it('nên highlight menu tương ứng với đường dẫn hiện tại', () => {
    renderSideBar(false, '/task');

    const taskLink = screen.getByText('Tasks').closest('a');
    const dashboardLink = screen.getByText('Dashboard').closest('a');

    expect(taskLink).toHaveClass('bg-primary');
    expect(dashboardLink).toHaveClass('text-muted-foreground');
  });

  it('nên tự động collapse (thu gọn) trên màn hình tablet (dưới 1024px)', () => {
    const addEventListenerMock = jest.fn();
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(max-width: 1023px)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: addEventListenerMock,
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    renderSideBar(false);

    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
    expect(addEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('không nên gọi toggleSidebar trên màn hình desktop (rộng hơn 1024px)', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    renderSideBar(false);

    expect(mockToggleSidebar).not.toHaveBeenCalled();
  });
});
