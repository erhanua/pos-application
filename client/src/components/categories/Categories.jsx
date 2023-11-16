import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import "./style.css";

const Categories = ({ categories, setCategories }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      //The fetch(axios) function is used to send HTTP requests.
      fetch("http://localhost:5000/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      //Forwarding messages and clearing input
      message.success("Category added successfully.");
      form.resetFields();
      setCategories([...categories, values]); //see instantly on the page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className="flex gap-4 md:flex-col text-lg">
      {/* <li className="category-item">
        <span>All Products</span>
      </li>
      <li className="category-item">
        <span>Food</span>
      </li>
      <li className="category-item">
        <span>Beverage</span>
      </li>
      <li className="category-item">
        <span>All Products</span>
      </li> */}
      {categories.map((item) => (
        <li className="category-item" key={item._id}>
          <span>{item.title}</span>
        </li>
      ))}

      <li
        className="category-item  !bg-fuchsia-700 hover:opacity-90"
        onClick={() => setIsAddModalOpen(true)} //Open a modal when clicked
      >
        <PlusOutlined className="md:text-2xl" />
      </li>
      <Modal
        title="Add New Category"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)} // Close the modal
        footer={false} //Delete the bottom part of the modal
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="title"
            label="Add Category"
            rules={[
              { required: true, message: "Category Field Cannot Be Empty!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ul>
  );
};

export default Categories;
