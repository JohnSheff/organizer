import React from "react";
import {Form, Input, DatePicker, message} from "antd";
import {Select} from 'antd';

const {Option} = Select;
const {RangePicker} = DatePicker;
export default function AddCalendar(props) {
    const handlerOnFinish = e => {
        fetch(`/calendars`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nameEvent: e.nameEvent,
                date: e.date,
                username: e.username
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

                size={"small"}>
                <Form.Item
                    name="nameEvent"
                    label="Название события"
                    rules={
                        [
                            {
                                required: true,
                                message: "Пожалуйста введите название события ",
                            }
                        ]
                    }>
                    <Input placeholder="Введите название события"/>
                </Form.Item>

                <Form.Item
                    name="date"
                    label="Дата События"
                    rules={
                        [
                            {
                                required: true,
                                message: "Пожалуйста укажите дату",
                            },
                        ]
                    }
                >
                    <RangePicker

                        showTime={{format: 'HH:mm'}}
                        format="YYYY-MM-DD HH:mm"
                    />
                </Form.Item>
                <Form.Item


                    name="username"
                    label="Выбрать контакт">
                    <Select
                        tokenSeparators={[',']}
                        allowClear
                        autoClearSearchValue={true}
                        mode="multiple"
                        >

                        {props.listContacts.map(item => (
                            <Option key={item._id}  value={item.username}>{item.username}</Option>
                        ))}
                    </Select>

                </Form.Item>
            </Form>
        </>
    );
}
