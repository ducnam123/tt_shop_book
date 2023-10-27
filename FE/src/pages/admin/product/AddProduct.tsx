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

// api
import { useAddProductMutation } from "../../../api/product";
import { useGetCategoriesQuery } from "../../../api/categories";

const AdminProductAdd = () => {
  // lấy dữ liệu ra product và category
  const [addBook] = useAddProductMutation();
  const { data: getCategory } = useGetCategoriesQuery();
  console.log(getCategory);
  //

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  // báo thêm thành công
  const onFinish = (values: any) => {
    const imagesUrl =
      values.images && values.images[0]
        ? values.images[0]?.response?.url || values.images[0]?.url
        : null;

    // ! đoạn đang test
    // const imagesUrl = values.images || []; // Đảm bảo images là một mảng

    // // Xây dựng mảng ảnh mới bằng cách thêm ảnh mới vào mảng hiện có
    // const updatedImages = [...imagesUrl];

    // // Thêm ảnh mới vào mảng
    // if (values.images[0]) {
    //   updatedImages.push({
    //     url: values.images[0]?.response?.url || values.images[0]?.url,
    //   });
    // }
    //! end đoạn đang test
    const updateValues = {
      ...values,
      images: [{ url: imagesUrl }],
    };

    addBook(updateValues)
      .unwrap()
      .then(() =>
        messageApi.open({
          type: "success",
          content: "Thêm sản phẩm thành công",
        })
      );
    form.resetFields();
  };

  // báo lỗi nếu thất bại
  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo.errorFields[0].errors);
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
      className="h-screen"
    >
      {contextHolder}
      <Form.Item<IBooks>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<IBooks>
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item<IBooks>
        label="Original price"
        name="original_price"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item<IBooks>
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<IBooks>
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<IBooks>
        label="Author"
        name="author"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<any> label="Danh mục" name="categoryId">
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
        <Button type="primary" htmlType="submit" className="bg-blue-400">
          Quay lại
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminProductAdd;
