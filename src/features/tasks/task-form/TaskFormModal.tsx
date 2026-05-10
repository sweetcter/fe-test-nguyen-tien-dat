import { STATUS_CONFIG, PRIORITY_CONFIG } from '@/core/constants/tasks.constant.tsx';
import { taskFormRules } from '@/core/schemas/task.schema';
import type { Task, TaskFormValues } from '@/types/task';
import { DatePicker, Form, Input, Modal, Radio, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';

type TaskFormModalProps = {
  open: boolean;
  editingTask: Task | null;
  onClose: () => void;
  onSave: (values: TaskFormValues) => void;
};

const TaskFormModal = ({ open, editingTask, onClose, onSave }: TaskFormModalProps) => {
  const [form] = Form.useForm<TaskFormValues>();
  const isEditing = editingTask !== null;

  useEffect(() => {
    if (open) {
      if (isEditing && editingTask) {
        form.setFieldsValue({
          ...editingTask,
          dueDate: editingTask.dueDate ? dayjs(editingTask.dueDate) : undefined,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ status: 'todo', priority: 'medium' });
      }
    }
  }, [open, editingTask, isEditing, form]);

  const handleOk = () => {
    form.submit();
  };

  const handleFinish = (values: TaskFormValues) => {
    onSave(values);
  };

  const statusOptions = Object.entries(STATUS_CONFIG).map(([key, config]) => ({
    value: key,
    label: config.label,
  }));

  return (
    <Modal
      open={open}
      title={isEditing ? 'Chỉnh sửa Task' : 'Thêm mới Task'}
      okText={isEditing ? 'Lưu thay đổi' : 'Thêm mới'}
      cancelText="Hủy"
      okButtonProps={{ htmlType: 'submit' }}
      onOk={handleOk}
      onCancel={onClose}
      destroyOnHidden
      width={560}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="pt-2"
        requiredMark={false}
      >
        <Form.Item label="Tiêu đề" name="title" rules={taskFormRules.title}>
          <Input placeholder="Nhập tiêu đề task..." />
        </Form.Item>

        <Form.Item label="Mô tả" name="description" rules={taskFormRules.description}>
          <Input.TextArea
            placeholder="Nhập mô tả (tuỳ chọn)..."
            rows={3}
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item label="Trạng thái" name="status" rules={taskFormRules.status}>
            <Select placeholder="Chọn trạng thái" options={statusOptions} />
          </Form.Item>

          <Form.Item label="Độ ưu tiên" name="priority" rules={taskFormRules.priority}>
            <Radio.Group className="flex gap-2">
              {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
                <Radio.Button key={key} value={key}>
                  {config.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item label="Người thực hiện" name="assignee" rules={taskFormRules.assignee}>
            <Input placeholder="Tên người thực hiện..." />
          </Form.Item>

          <Form.Item label="Hạn hoàn thành" name="dueDate" rules={taskFormRules.dueDate}>
            <DatePicker className="w-full" placeholder="Chọn ngày..." format="DD/MM/YYYY" />
          </Form.Item>
        </div>

        <Form.Item label="Tags" name="tags" rules={taskFormRules.tags}>
          <Select
            mode="tags"
            placeholder="Nhập tags và nhấn Enter..."
            tokenSeparators={[',']}
            open={false}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskFormModal;
