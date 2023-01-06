import { useCallback, useMemo, useRef } from 'react';

import { Button, Modal, Table } from 'react-bootstrap';
import Scrollbars from 'react-custom-scrollbars';
import {
    useDispatch,
    useSelector,
} from 'react-redux';

import {
    dataSelector,
    detailDataSelector,
    openedModalSelector,
    openedDetailModalSelector,
    closeDetailModal,
} from '../../_redux/main';
import BtnBar from '../btnBar';
import { ModalDetailProps } from './types';

export default function ModalB(props: ModalDetailProps) {
    const dispatch = useDispatch()

    const openedModal = useSelector(openedModalSelector)
    const show = useMemo<boolean>(() => openedModal === 'B', [openedModal])

    const data = useSelector(dataSelector)
    const contact = useSelector(detailDataSelector)
    const openedDetailModal = useSelector(openedDetailModalSelector)

    const onCloseModal = useCallback(() => {
        dispatch(closeDetailModal(false))
    }, [])


    return <>
        <Modal size="lg" centered show={openedDetailModal} onHide={onCloseModal} animation={false}>
            <Modal.Header>
                <Modal.Title>Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Scrollbars style={{ width: '100%', height: 500 }}>
                    <Table bordered hover>
                        <tbody>
                            <tr>
                                <td >No</td><td >{contact.id}</td>
                            </tr>
                            <tr>
                                <td >First Name</td><td >{contact.first_name}</td>
                            </tr>
                            <tr>
                                <td >Last Name</td><td >{contact.last_name}</td>
                            </tr>
                            <tr>
                                <td >Email</td><td >{contact.email}</td>
                            </tr>
                            <tr>
                                <td >Phone Number</td><td >{contact.phone_number}</td>
                            </tr>
                            <tr>
                                <td >Country</td><td >{contact.country_id}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Scrollbars>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onCloseModal} variant="close-modal">Close</Button>
            </Modal.Footer>
        </Modal>
    </>
}