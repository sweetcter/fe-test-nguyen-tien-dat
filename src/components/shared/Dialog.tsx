import { Button, Modal, type ModalProps } from 'antd';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';

type OpenButtonProps = {
  openButton?: React.ReactNode;
  showModal: () => void;
};

const Open = ({ openButton, showModal }: OpenButtonProps) => {
  if (openButton === null) return null;

  return (
    <>
      {openButton ? (
        <div onClick={showModal} style={{ display: 'inline-block' }}>
          {openButton}
        </div>
      ) : (
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
      )}
    </>
  );
};

interface ModalStyles {
  header?: CSSProperties;
  body?: CSSProperties;
  footer?: CSSProperties;
  mask?: CSSProperties;
  wrapper?: CSSProperties;
  content?: CSSProperties;
}

type TDialog = {
  onOpen?: () => void;
  onConfirm?: () => void;
  onClose?: () => void;
  closeAfterConfirm?: boolean;
  disabledOkButton?: boolean;
  hiddenOkButton?: boolean;

  okButton?: ReactNode;
  cancelButton?: ReactNode;

  styles?: ModalStyles;
  className?: string;
  width?: number;

  center?: boolean;
  children?: ReactNode;
  openButton?: ReactNode;
  title?: ReactNode;
  loading?: boolean;
  footer?: ReactNode | null;
  closeIcon?: ReactNode;
  cancelButtonProps?: ModalProps['cancelButtonProps'];
} & Omit<ModalProps, 'loading'>;

const Dialog = ({
  center = true,
  okButton = 'OK',
  cancelButton = 'Hủy',
  closeAfterConfirm,
  disabledOkButton,
  hiddenOkButton = false,
  ...props
}: TDialog) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof props.loading === 'boolean' || typeof closeAfterConfirm === 'boolean') {
      if (closeAfterConfirm && !props.loading) setIsModalOpen(false);
    }
  }, [props.loading, closeAfterConfirm]);

  const showModal = () => {
    setIsModalOpen(!isModalOpen);
    if (props.onOpen) props.onOpen();
  };

  const handleOk = () => {
    if (props.loading) return;
    if (props.onConfirm) {
      props.onConfirm();
    }
    if (closeAfterConfirm) {
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    if (props.onClose) props.onClose();
  };

  return (
    <>
      <Open showModal={showModal} openButton={props.openButton} />
      <Modal
        centered={center}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={cancelButton}
        okButtonProps={{
          disabled: props.loading || disabledOkButton,
          loading: props.loading,
          hidden: hiddenOkButton,
        }}
        okText={okButton}
        {...props}
        loading={false}
        destroyOnHidden
      >
        {props.children}
      </Modal>
    </>
  );
};

export default Dialog;
