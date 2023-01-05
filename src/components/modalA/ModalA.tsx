import { useMemo } from 'react';

import { Modal } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  dataSelector,
  openedModalSelector,
} from '../../_redux/main';
import BtnBar from '../btnBar';
import { ModalAProps } from './types';

export default function ModalA(props: ModalAProps) {
  const dispatch = useDispatch()

  const openedModal = useSelector(openedModalSelector)
  const show = useMemo<boolean>(() => openedModal === 'A', [openedModal])

  const data = useSelector(dataSelector)

  return <>
    <Modal backdrop="static" show={show} animation={false}>
      <Modal.Header>
        <Modal.Title>A</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Scrollbars style={{ width: 500, height: 300 }}>
          {JSON.stringify(data)}
        </Scrollbars>
      </Modal.Body>
      <Modal.Footer>
        <BtnBar></BtnBar>
      </Modal.Footer>
    </Modal>
  </>
}