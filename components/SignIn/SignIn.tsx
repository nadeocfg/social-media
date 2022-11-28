import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal } from "antd";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { SignInContext } from "../../contexts/signInContext";

const SignIn = () => {
  const [form] = Form.useForm();
  const signInContext = useContext(SignInContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
    };

  const onSubmit = (form: typeof formData) => {
    console.log(form);

    signInContext.setSignInData("login", formData.email);
    signInContext.setSignInData("password", formData.password);

    signInContext.showModal(true);
  };

  return (
    <Modal
      title="Login"
      open={signInContext.isModalShow}
      onOk={form.submit}
      onCancel={() => signInContext.showModal(false)}
      footer={null}
    >
      <Form
        layout="horizontal"
        form={form}
        onFinish={onSubmit}
        labelCol={{ span: 4 }}
      >
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input
            type="email"
            value={formData.email}
            onChange={() => onChange("email")}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password
            type="password"
            value={formData.password}
            onChange={() => onChange("password")}
            placeholder="Input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

      <Divider />

      <p>Do not have account yet?</p>
      <Link href={"/signup"} onClick={() => signInContext.showModal(false)}>
        Sign Up
      </Link>
    </Modal>
  );
};

export default SignIn;
