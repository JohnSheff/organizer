import { List, Card, Row, Col, Modal, Button } from "antd";
import { PlusCircleOutlined, EditOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import AddContact from "../components/addContact";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";

export default function ListContact() {
  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contact, setContact] = useState([]);

  const updateData = () =>
    fetch("/contacts")
      .then(d => d.json())
      .then(res => {
        setContact(res.data);
      });

  useEffect(() => {
    updateData();
  }, []);

  const setFormModal = item => {
      setIsModalVisible(true);
      // console.log(moment(new Date(item.date).setHours(0,0,0,0)))
    form.setFieldsValue({ ...item, date: moment(item.date) });
  };
  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Row justify="center">
        <Col span={24}>
          <List
            style={{ width: "100%" }}
            grid={{
              gutter: 10,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 2,
              xl: 4,
              xxl: 5,
            }}
            dataSource={contact}
            renderItem={item => (
              <List.Item>
                <Card
                  title={item.username}
                  description={item.description}
                  extra={
                    <Button onClick={() => setFormModal(item)}>
                      <EditOutlined />
                    </Button>
                  }>
                  <p>Телефон - {item.phone}</p>
                  <p>Email - {item.email}</p>
                  <p>Заметка - {item.description}</p>
                  <p>День рождения - {moment(item.date).format('DD.MM.YYYY')}</p>
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row justify="space-around">
        <Col xs>
          <Button
            type="primary"
            onClick={() => {
              setFormModal({});
              form.resetFields();
            }}>
            <PlusCircleOutlined />
            <span> Добавить контакт </span>
          </Button>
              <Modal title={"Карточка контакта"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <AddContact updateData={updateData} form={form} setIsModalVisible={setIsModalVisible} />
          </Modal>
        </Col>
      </Row>
    </>
  );
}
