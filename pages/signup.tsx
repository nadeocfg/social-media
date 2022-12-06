import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useContext, useState } from "react";
import SelectPhoto from "../components/form/SelectPhoto";
import { MessageContext } from "../contexts/messageContext";
import { SignInContext } from "../contexts/signInContext";
import api from "../utils/axios";

type RegistrationFormModel = {
  username: string;
  name: string;
  sex: "male" | "female";
  email: string;
  password: string;
  about: string;
  photo: File | null;
  photoUrl: string;
};

type RegistrationResponseModel = {
  token: string;
  username: string;
  name: string;
  email: string;
  sex: string;
  about: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
};

const Signup = () => {
  const messageContext = useContext(MessageContext);
  const signInContext = useContext(SignInContext);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<RegistrationFormModel>({
    username: "",
    name: "",
    email: "",
    sex: "female",
    password: "",
    about: "",
    photo: null,
    photoUrl: "",
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

  const uploadFile = (file: File) => {
    const formData = new FormData();

    formData.append("photo", file);

    return api
      .post("/api/upload/photo", formData)
      .then((res) => {
        messageContext.setMessage({
          type: "success",
          content: "File uploaded succesfully",
        });

        return res.data;
      })
      .catch((err) => {
        messageContext.setMessage({
          type: "error",
          content: err.response.data.message,
        });

        return null;
      });
  };

  const onSubmit = async () => {
    if (formData.photo) {
      const uploadedData = await uploadFile(formData.photo);
      if (uploadedData) {
        formData.photoUrl = uploadedData.photoUrl;
      }
    }

    const data = { user: formData };

    api
      .post(`/api/signup`, data)
      .then((response): void => {
        window.localStorage.setItem("token", response.data.token);

        signInContext.setSingInResponse(response.data);

        messageContext.setMessage({
          type: "success",
          content: "User succesfully created",
        });
      })
      .catch((err) => {
        messageContext.setMessage({
          type: "error",
          content: err.response.data.message,
        });
      });
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
