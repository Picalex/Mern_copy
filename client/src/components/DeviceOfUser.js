import React, {useCallback, useContext, useState} from 'react'
import {Button,  Table, Modal} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";



export const DeviceOfUser = (props) => {

    const {token} = useContext(AuthContext)
    const [device, setDevice] = useState({})
    const {request} = useHttp()

    const FindDevice = useCallback(async (id)=>{
        try{
            const dataOfDevice = await request('/api/devices/info', 'POST', {id},{
                Authorization: `Bearer ${token}`
            })
            setDevice(dataOfDevice)

            // if(dataOfDevices!==devices){
            //     setDevices(dataOfDevices)
            // }

        }catch (e) {
            console.log(e)
        }
    }, [token, request])

    if(Object.entries(props.house).length !== 0){
        for(let i=0;i<props.house.devices.length;i++){
            FindDevice(props.house.devices[i])
        }

    }

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                список девайсов с опциями
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>девайс {props.device}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                        <tr>
                            <th>option</th>
                            <th>value</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>

                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}