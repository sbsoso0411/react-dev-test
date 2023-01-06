import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  Contact,
  mainStateSelector,
  setPending,
} from '../../_redux/main';
import { filterDelay } from '../../config';
import BtnBar from '../btnBar';
import ModalDetail from '../modalDetail';
import { ModalAProps } from './types';

export default function ModalA(props: ModalAProps) {
  const dispatch = useDispatch()

  // main redux
  const { openedModal, pending, data } = useSelector(mainStateSelector)

  const show = useMemo<boolean>(() => openedModal === 'A', [openedModal])

  // filter
  const filterTimeout = useRef<NodeJS.Timeout | null>(null)
  const onFilter = useCallback(async (event: any) => {
    filterTimeout.current !== null && clearTimeout(filterTimeout.current)

    filterTimeout.current = setTimeout(() => {
      console.log('on filter')
    }, event.key === 'Enter' ? 0 : filterDelay)


    /*  if (event.keyCode == ENTER_KEY_CODE || event.target?.value == '') {
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
     } */
  }, [])

  // load more
  const onScroll = useCallback((values: any) => {
    if (pending === true) return

    const { scrollTop, scrollHeight, clientHeight } = values
    const pad = 20 // offset pixels

    // t will be greater than 1 if we are about to reach the bottom
    const t = ((scrollTop + pad) / (scrollHeight - clientHeight))
    t > 1 && loadMore()
  }, [pending])

  const loadMore = useCallback(() => {
    dispatch(setPending(true))
    // callApi()
    dispatch(setPending(false))
  }, [])

  // only even checkbox state
  const [onlyEven, setOnlyEven] = useState(false)
  const toogleOnlyEven = useCallback(() => {
    setOnlyEven(!onlyEven)
  }, [onlyEven])

  // show detail modal
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const onShowDetail = useCallback((contact: Contact) => {
    setSelectedContact(contact)
    setShowDetail(true)
  }, [])
  const closeDetailModal = useCallback(() => {
    setShowDetail(false)
  }, [])

  return <>
    <Modal size="lg" centered backdrop="static" show={show} animation={false}>
      <Modal.Header style={{ 'backgroundColor': '#46139f', 'color': 'white' }}>
        <Modal.Title>Modal A</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* filter */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Input Search key</Form.Label>
          <Form.Control type="text" placeholder="search..." onKeyUp={onFilter} />
        </Form.Group>

        {/* table */}
        <Scrollbars onUpdate={onScroll} style={{ width: '100%', height: '300px' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {data.contact_ids.length === 0 ? <>
                <tr>
                  <td colSpan={6}>No contact</td>
                </tr>
              </> : (onlyEven ? data.contact_ids.filter((contact_id: number) => contact_id % 2 === 0) : data.contact_ids).map((contact_id: number) => {
                const contact: Contact = data.contacts[contact_id]

                return <>
                  <tr
                    key={contact.id}
                    onClick={() => onShowDetail(contact)}
                  >
                    <td>{contact.id}</td>
                    <td>{contact.first_name}</td>
                    <td>{contact.last_name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone_number}</td>
                    <td>{contact.country_id}</td>
                  </tr>
                </>
              })}
            </tbody>
          </Table>
        </Scrollbars>
      </Modal.Body>

      <Modal.Footer>
        <BtnBar
          onlyEven={onlyEven}
          toogleOnlyEven={toogleOnlyEven}
        />
      </Modal.Footer>
    </Modal>

    <ModalDetail
      open={showDetail}
      data={selectedContact}
      dismiss={closeDetailModal}
    />
  </>
}