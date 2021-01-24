import {Calendar, Modal} from "antd";
import React, {useState, useEffect} from "react";
import moment from "moment";
import AddCalendar from "./addEventCalendar";
import {useForm} from "antd/lib/form/Form";

export default function Calendars() {
    const [contacts, setContacts] = useState([]);
    const [calendars, setCalendars] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = useForm();

    const updateData = () => {
        fetch("/contacts")
            .then(d => d.json())
            .then(res => {
                setContacts(res.data);
            });
        fetch("/calendars")
            .then(d => d.json())
            .then(res => {
                setCalendars(res.data);
            });
    }
    useEffect(() => {
        updateData()
    }, []);
    const onSelect = value => {
        form.resetFields();
        setIsModalVisible(true);
        form.setFieldsValue({date: [moment(new Date(value).setHours(0, 0, 0, 0)), moment(new Date(value).setHours(1, 0, 0, 0))]});
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    function dateCellRender(value) {

        const filterContacts = contacts.filter(item => {
            const conData = new Date(item.date);
            return (
                conData.getDate() === value._d.getDate() &&
                conData.getMonth() === value._d.getMonth()
            );
        });
        const filterEvents = calendars.filter(item => {
            const conDataStart = new Date(item.date[0]);
            const conDataEnd = new Date(item.date[1]);
            return (
                (
                    conDataStart.getDate() <= value._d.getDate()
                    && conDataStart.getMonth() <= value._d.getMonth()
                    && conDataStart.getFullYear() <= value._d.getFullYear()
                )
                && (
                    conDataEnd.getDate() >= value._d.getDate()
                    && conDataEnd.getMonth() >= value._d.getMonth()
                    && conDataEnd.getFullYear() >= value._d.getFullYear()
                )
            )

        });

        return (
            <>
                <ul className="events">
                    {filterContacts.map(item => (
                        <li key={item._id}>День Рождение у - {item.username}</li>
                    ))}
                </ul>
                <ul className="events">
                    {filterEvents.map((item) => {
                        return <li key={item._id}>Событие - {item.nameEvent}
                            <ul>
                                {item.username.map((el, ind) => {
                                    return <li key={ind}>Участники - {el}</li>
                                })}
                            </ul>
                        </li>
                    })}
                </ul>
            </>
        );

    }


    return (
        <>
            <Calendar style={{margin: 10}} onSelect={onSelect} dateCellRender={dateCellRender}/>
            <Modal
                width={550}
                title="Добавить новое событие"
                visible={isModalVisible} onOk={handleOk}
                onCancel={handleCancel}
            >
                <AddCalendar listContacts={contacts} updateData={updateData} form={form}
                             setIsModalVisible={setIsModalVisible}/>
            </Modal>
        </>
    )
}
//
//     <li key={item._id}> {item.username.length < 0 ?
//     <>
//         событие
//         <br/>{item.nameEvent}
//     </>
//     :
//     <>
//         событие
//         <br/>
//         {item.nameEvent}
//
//         <br/>
//         участник события
//         {item.username}
//     </>
// }
// </li>