import { useCallback, useMemo, useRef } from 'react';

import { Modal } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  dataSelector,
  themeColorSelector,
  openedModalSelector,
  evenFlagSelector,
  setDetailData,
  setData,
} from '../../_redux/main';
import BtnBar from '../btnBar';
import { ModalAProps } from './types';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import ModalDetail from '../modalDetail';
import apiClient from "../../axios";
export default function ModalA(props: ModalAProps) {
  const dispatch = useDispatch()
  const ENTER_KEY_CODE = 13
  const openedModal = useSelector(openedModalSelector)
  const show = useMemo<boolean>(() => openedModal === 'A', [openedModal])

  const data = useSelector(dataSelector)
  const evenFlag = useSelector(evenFlagSelector)
  const themeColor = useSelector(themeColorSelector)

  const customScroll = useRef<Scrollbars>(null)

  const onShowDetail = (contact: {}) => {
    dispatch(setDetailData(contact))
  }

  const onFilter = async (event: any) => {
    if (event.keyCode == ENTER_KEY_CODE || event.target.value == '') {
      try {
        const res = await apiClient.post(
          "https://api.dev.pastorsline.com/api/contacts.json",
          {
            companyId: 171,
            query: event.target.value,
            page: 1,
            countryId: '',
          }
        );

        dispatch(setData(res))
      } catch (err) {
        console.log('error')
      }
    }
  }

  const pending = useRef<boolean>(false)

  const onScroll = (values: any) => {
    if (pending.current === true) return
    
    const { scrollTop, scrollHeight, clientHeight } = values;
    let temp = (evenFlag ? data.filter((el: any) => el.id % 2 == 0) : data)
    const pad = 20; // 100px of the bottom
    // t will be greater than 1 if we are about to reach the bottom
    const t = ((scrollTop + pad) / (scrollHeight - clientHeight));
    if (t > 1) loadMore();
  }

  const loadMore = () => {
    pending.current = true
    console.log('load more')
  }
  return <>
    <Modal size="lg" centered backdrop="static" show={show} animation={false}>
      <Modal.Header style={{ 'backgroundColor': themeColor, 'color': 'white' }}>
        <Modal.Title>Modal A</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Input Search key</Form.Label>
          <Form.Control type="text" placeholder="search..." onKeyUp={onFilter} />
        </Form.Group>
        <Scrollbars ref={customScroll} onUpdate={onScroll} style={{ width: '100%', height: 200 }}>
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
              {data.length == 0 ? <><tr><td colSpan={6}>No contact</td></tr></> : (evenFlag ? data.filter((el: any) => el.id % 2 == 0) : data).map((el: any) => (
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