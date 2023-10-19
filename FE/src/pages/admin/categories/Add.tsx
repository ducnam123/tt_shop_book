import { Button, Form, Input, message } from "antd";
import { useAddCategoryMutation } from "../../../api/categories";

type FieldType = {
  name?: string;
};

const Add = () => {
  const [addCategory] = useAddCategoryMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    addCategory(values)
      .unwrap()
      .then(() =>
        messageApi.open({
          type: "success",
          content: "Thêm sản phẩm thành công",
        })
      );
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo.errorFields[0].errors);
    messageApi.open({
      type: "error",
      content: `lỗi không thể thêm thử lại sau ${errorInfo.errorFields[0].errors}`,
    });
  };

  return (
    <>
      <div className="">
        {contextHolder}
        <Form
          form={form}
          className="flex"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="name"
            name="name"
            rules={[
              { required: true, message: "bắt buộc phải nhập tên danh mục!" },
              { min: 6, message: "Bắt buộc phải nhập trên 6 ký tự" },
            ]}
          >
            <Input placeholder="thêm tên danh mục" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Add;
