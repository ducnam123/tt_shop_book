import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../../api/categories";
import { pause } from "../../../utils/pause";
import { Button, Form, Input, Skeleton } from "antd";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ICategory } from "../../../interfaces/categorys";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const [updateCategory, { isLoading: isUpdateLoading }] =
    useUpdateCategoryMutation();
  const { data: categoryData, isLoading: isGetCategoryLoading } =
    useGetCategoryByIdQuery(id || "");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    // đồng bộ dữ liệu từ API fill vào form
    form.setFieldsValue({
      name: categoryData?.name,
    });
  }, [categoryData]);

  const onFinish = (values: any) => {
    const updateValues = { ...values, id };

    updateCategory(updateValues)
      .unwrap()
      .then(async () => {
        console.log("Update success");
        await pause(200);
        navigate("/admin/category");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  if (isGetCategoryLoading) return <Skeleton />;
  return (
    <>
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Sửa sản phẩm</h2>
      </header>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<ICategory> label="Id" name="id">
          <Input disabled placeholder={id} />
        </Form.Item>

        <Form.Item<ICategory>
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên sản phẩm!" },
            { min: 6, message: "Sản phẩm ít nhất phải 6 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Rating */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" danger htmlType="submit">
            {isUpdateLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Cập nhật sản phẩm"
            )}
          </Button>
          <Button
            className="ml-2"
            type="primary"
            danger
            htmlType="submit"
            onClick={() => navigate("/admin/category")}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditCategory;
