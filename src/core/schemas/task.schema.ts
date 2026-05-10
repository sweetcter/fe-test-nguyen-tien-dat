import type { Rule } from 'antd/es/form';

export const taskFormRules: Record<string, Rule[]> = {
  title: [
    { required: true, message: 'Tiêu đề không được để trống' },
    { min: 3, message: 'Tiêu đề phải có ít nhất 3 ký tự' },
    { max: 200, message: 'Tiêu đề không được vượt quá 200 ký tự' },
  ],
  description: [{ max: 1000, message: 'Mô tả không được vượt quá 1000 ký tự' }],
  status: [{ required: true, message: 'Vui lòng chọn trạng thái' }],
  priority: [{ required: true, message: 'Vui lòng chọn độ ưu tiên' }],
  assignee: [{ max: 100, message: 'Tên người thực hiện không được vượt quá 100 ký tự' }],
  dueDate: [],
  tags: [],
};
