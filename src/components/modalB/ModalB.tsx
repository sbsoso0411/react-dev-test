import { useMemo } from 'react';

import { Form, Modal, Table } from 'react-bootstrap';
import Scrollbars from 'react-custom-scrollbars';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  dataSelector,
  themeColorSelector,
  openedModalSelector,
  setDetailData,
  evenFlagSelector,
  setData,
} from '../../_redux/main';
import BtnBar from '../btnBar';
import ModalDetail from '../modalDetail';
import { ModalBProps } from './types';
import apiClient from "../../axios";
export default function ModalB(props: ModalBProps) {
  const dispatch = useDispatch()

  const openedModal = useSelector(openedModalSelector)
  const show = useMemo<boolean>(() => openedModal === 'B', [openedModal])

  const data = useSelector(dataSelector)
  const evenFlag = useSelector(evenFlagSelector)

  const themeColor = useSelector(themeColorSelector)

  const onShowDetail = (contact: {}) => {
    dispatch(setDetailData(contact))
  }
  const ENTER_KEY_CODE = 13
  const onFilter = async (event: any) => {
    if (event.keyCode == ENTER_KEY_CODE || event.target.value == '') {
      try {
        const res = await apiClient.post(
          "https://api.dev.pastorsline.com/api/contacts.json",
          {
            companyId: 171,
            query: event.target.value,
            page: 1,
            countryId: 226,
          }
        );

        dispatch(setData(res))
      } catch (err) {
        console.log('error')
      }
    }
  }

  return <>
    <Modal size="lg" centered backdrop="static" show={show} animation={false}>
      <Modal.Header style={{ 'backgroundColor': themeColor, 'color': 'white' }}>
        <Modal.Title>Modal B</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Input Search key</Form.Label>
          <Form.Control type="text" placeholder="search..." onKeyUp={onFilter} />
        </Form.Group>
        <Scrollbars style={{ width: '100%', height: 200 }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th >No</th>
                <th >First Name</th>
                <th >Last Name</th>
                <th >Email</th>
                <th >Phone</th>
                <th >Country</th>
              </tr>
            </thead>
            <tbody>
              {data.length == 0 ? <><tr><td colSpan={6}>No contact</td></tr></> : (evenFlag ? data.filter((el: any) => (el.id % 2 == 0 && el.country_id === 226)) : data.filter((el: any) => el.country_id === 226)).map((el: any) => (
                <tr key={el.id} onClick={() => onShowDetail(el)}>
                  <td >{el.id}</td>
                  <td >{el.first_name}</td>
                  <td >{el.last_name}</td>
                  <td >{el.email}</td>
                  <td >{el.phone_number}</td>
                  <td >{el.country_id}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Scrollbars>
      </Modal.Body>
      <Modal.Footer>
        <BtnBar></BtnBar>
      </Modal.Footer>
    </Modal>

    <ModalDetail></ModalDetail>
  </>
}