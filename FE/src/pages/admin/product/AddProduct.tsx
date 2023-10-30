import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IBooks } from "../../../interfaces/book";
import { useNavigate } from "react-router-dom";

// api
import { useAddProductMutation } from "../../../api/product";
import { useGetCategoriesQuery } from "../../../api/categories";

const AdminProductAdd = () => {
  // lấy dữ liệu ra product và category

  const navigate = useNavigate();

  const [addBook] = useAddProductMutation();
  const { data: getCategory } = useGetCategoriesQuery();

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  // báo thêm thành công
  const onFinish = (values: any) => {
    const imagesUrl = values.images.map((image: any) => {
      return {
        url: image?.response?.url || image?.url || null,
      };
    });

    const updateValues = {
      ...values,
      images: imagesUrl,
    };

    addBook(updateValues)
      .unwrap()
      .then(() =>
        messageApi.open({
          type: "success",
          content: "Thêm sản phẩm thành công",
        })
      )
      .then(() => {
        navigate("/admin/product");
      });
    form.resetFields();
  };

  // báo lỗi nếu thất bại
  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      type: "error",
      content: `lỗi không thể thêm thử lại sau ${errorInfo.errorFields[0].errors}`,
    });
  };

  // load ảnh update
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item<IBooks>
        label="Name"
        name="name"
        rules={[
          { required: true, message: "tên không được để trống!" },
          { min: 3, message: "nhập ít nhất 3 ký tự" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item<IBooks>
        label="Price"
        name="price"
        rules={[{ required: true, message: "bạn phải nhập giá tiền!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item<IBooks>
        label="Original price"
        name="original_price"
        rules={[{ required: true, message: "bạn chưa nhập giá tiền gốc" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item<IBooks>
        label="Title"
        name="title"
        rules={[{ required: true, message: "Bạn chưa nhập tiêu đề" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<IBooks>
        label="Description"
        name="description"
        rules={[{ required: true, message: "Bạn chưa nhập sự miêu tả" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<IBooks>
        label="Author"
        name="author"
        rules={[
          { required: true, message: "bạn chưa nhập tên tác giả cho sách" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item<any>
        label="Danh mục"
        name="categoryId"
        rules={[{ required: true, message: "bạn chưa chọn danh mục cho sách" }]}
      >
        <Select>
          {getCategory?.map((items: any) => (
            <Select.Option key={items._id} value={items._id}>
              {items.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item<any>
        label="Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        name="images"
      >
        <Upload
          action="https://api.cloudinary.com/v1_1/da83kzvpb/image/upload"
          data={{
            upload_preset: "shopBook",
          }}
          listType="picture-card"
        >
          <div>
            <AiOutlineUserAdd />
            <div style={{ marginTop: 8 }}>Ảnh</div>
          </div>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className="bg-blue-500 mr-2">
          Submit
        </Button>
        <Button type="primary" htmlType="reset" className="bg-blue-400">
          Quay lại
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminProductAdd;
