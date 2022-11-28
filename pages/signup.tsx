import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import SelectPhoto from "../components/form/SelectPhoto";

type RegistrationFormModel = {
  username: string;
  name: string;
  sex: "male" | "female";
  email: string;
  password: string;
  about: string;
  photo: File | null;
};

const Signup = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<RegistrationFormModel>({
    username: "",
    name: "",
    email: "",
    sex: "female",
    password: "",
    about: "",
    photo: null,
  });

  const onFormChange =
    (name: string) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | string
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      let value = typeof event === "string" ? event : event.target?.value;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

  const onPhotoSelect = (files: FileList | null | undefined) => {
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        photo: files[0],
      });
    }
  };

  const onSubmit = () => {
    console.log(formData);
  };

  return (
    <>
      <h1>Signup page</h1>

      <Form
        layout="horizontal"
        form={form}
        onFinish={onSubmit}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true }, { pattern: /^[a-zA-Z0-9]+$/ }]}
        >
          <Input
            type="text"
            value={formData.username}
            onChange={onFormChange("username")}
            placeholder="Input username"
          />
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input
            type="text"
            value={formData.name}
            onChange={onFormChange("name")}
            placeholder="Input name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true }, { type: "email" }]}
        >
          <Input
            type="email"
            value={formData.email}
            onChange={onFormChange("email")}
            placeholder="Input email"
          />
        </Form.Item>
        <Form.Item label="Sex">
          <Select
            value={formData.sex}
            onChange={onFormChange("sex")}
            options={[
              {
                value: "male",
                label: "Male",
              },
              {
                value: "female",
                label: "Female",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true },
            {
              pattern: /^[a-zA-Z0-9!@#$&*]+$/,
              message:
                "Password can contain only letters, numbers and special chars",
            },
          ]}
        >
          <Input.Password
            type="password"
            value={formData.password}
            onChange={onFormChange("password")}
            placeholder="Input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item name="about" label="About">
          <TextArea
            value={formData.about}
            placeholder="About"
            allowClear
            onChange={onFormChange("about")}
          />
        </Form.Item>
        <Form.Item name="photo" label="Photo">
          <SelectPhoto file={formData.photo} onChange={onPhotoSelect} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 10, offset: 2 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Signup;
