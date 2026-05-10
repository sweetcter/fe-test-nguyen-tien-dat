import { WarningOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import usePreventNavigation from '@/core/hooks/usePreventNavigation';
import Dialog from './Dialog';

const ConfirmExit = ({
  shouldConfirm,
  shouldCheckSearch = false,
  onConfirm,
}: {
  shouldConfirm: boolean | (() => boolean);
  shouldCheckSearch?: boolean;
  onConfirm?: (blocker: any) => void;
}) => {
  const [open, setOpen] = useState(false);
  const { prevent, setPrevent, blocker } = usePreventNavigation(shouldConfirm, shouldCheckSearch);

  useEffect(() => {
    if (prevent) {
      setOpen(true);
    }
  }, [prevent]);

  const handleConfirm = () => {
    onConfirm?.(blocker);
    setOpen(false);
    if (blocker.proceed) {
      blocker.proceed();
    }
    setPrevent(false);
  };

  const handleCancel = () => {
    setOpen(false);
    if (blocker.reset) {
      blocker.reset();
    }
    setPrevent(false);
  };

  return (
    <Dialog
      title={
        <div className="flex items-center gap-2 text-blue-900">
          <WarningOutlined style={{ color: '#facc15' }} />
          Lưu ý
        </div>
      }
      center={false}
      open={open}
      width={400}
      onOk={handleConfirm}
      onCancel={handleCancel}
      openButton={null}
      okButton="Đồng ý"
    >
      <div className="text-base font-normal">
        Một số thay đổi của bạn <span className="font-semibold">chưa được lưu</span>. Bạn có muốn
        rời đi ngay bây giờ?
      </div>
    </Dialog>
  );
};

export default ConfirmExit;
