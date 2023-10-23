import React, { useState } from "react";
import {
  Checkbox,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Upload,
} from "antd";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useEditUsersMutation } from "../../../api/auth";

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const DetailUser: React.FC = () => {
  const [data] = useEditUsersMutation();
  console.log(data);

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const { id } = useParams();

  return (
    <>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{ maxWidth: 600 }}
        className=""
      >
        <Form.Item label="Name">
          <Input />
        </Form.Item>
        <Form.Item label="Display Name">
          <Input />
        </Form.Item>

        <Form.Item label="email">
          <Input />
        </Form.Item>

        <Form.Item label="address">
          <Input />
        </Form.Item>
        <Form.Item label="Role">
          <Select>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="member">Member</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <AiOutlineUserAdd />
              <div style={{ marginTop: 8 }}>Ảnh</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Giới tính">
          <Radio.Group>
            <Radio value="admin"> Gái </Radio>
            <Radio value="member"> Trai </Radio>
            <Radio value="Unknown"> Không xác định </Radio>
          </Radio.Group>
        </Form.Item>

        <button className="bg-blue-500 px-4 py-2 rounded-2xl text-white hover:bg-red-500">
          Xóa tài khoản
        </button>

        <button className="bg-blue-500 px-4 py-2 rounded-2xl text-white ml-2 hover:bg-red-500">
          Cập nhật tài khoản
        </button>
      </Form>
    </>
  );
};

export default () => <DetailUser />;
