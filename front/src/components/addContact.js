import React from "react";
import {Form, Input, DatePicker, message} from "antd";

const {TextArea} = Input;
export default function AddContact(props) {
    const handlerOnFinish = e => {
        fetch(`http://localhost:5010/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                username: e.username,
                email: e.email,
                date: e.date._d,
                description: e.description,
                phone: e.phone,
                id: e._id
            }),
        })
            .then(d => d.json())
            .then(() => {
                props.setIsModalVisible(false);
                props.updateData();


            })
            .catch(e => message.error(JSON.stringify(e)));
    };

    return (
        <>
            <Form
                form={props.form}
                onFinish={handlerOnFinish}
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"

                size={"default"}>
                <Form.Item
                    name="username"
                    label="ФИО"
                    rules={
                        [
                            {
                              pattern: /^([\u0400-\u04FF]{3,})\s([\u0400-\u04FF]{3,})\s([\u0400-\u04FF]{3,}$)/,
                              message: "Введите корректное Фамилию Имя Отчество",
                            },
                            {
                              type: "string",
                              message: "Ваша Фамилию Имя Отчество не должна состоять из ц",
                            },
                            {
                              required: true,
                              message: "Пожалуйста укажите вашу Фамилию Имя Отчество ",
                            }
                        ]
                    }>
                    <Input placeholder="Введите Фамилию, Имя, Отчество"/>
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Телефон"
                    placeholder="Введите ваш номер телефона"
                    rules={
                        [
                            {
                              pattern: /^((\+7|7|8)+([0-9]){10})$/g,
                              message: "Введите корректный номер телефона ",
                            },
                            {
                              required: true,
                              message: "Пожалуйста укажите ваш номер телефона",
                            }
                        ]
                    }>
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={
                        [
                            { pattern: /\S+@\S+\.\S+/, message: "Введите корректную электронную почту" },
                            {
                              required: true,
                              message: "Пожалуйста укажите вашу электронную почту",
                            }
                        ]
                    }>
                    <Input/>
                </Form.Item>

                <Form.Item name="description" label="Заметка">
                    <TextArea showCount maxLength={120} rows={4}/>
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Дата рождения"
                    rules={
                        [
                            {
                              required: true,
                              message: "Пожалуйста укажите дату",
                            }
                        ]
                    }>
                    <DatePicker/>
                </Form.Item>
                <Form.Item
                    name="_id"
                    hidden={true}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </>
    );
}
