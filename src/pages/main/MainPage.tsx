import { useCallback } from 'react';

import {
  Button,
  Stack,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from 'react-router-dom';

import { openModal } from '../../_redux/main';
import ModalA from '../../components/modalA';
import ModalB from '../../components/modalB';
import { MainPageProps } from './types';

export default function MainPage(props: MainPageProps) {
  const dispatch = useDispatch()
  const temp = {
    "total": 10, // total amount of found contacts
    "contacts_ids": [ // this a list of IDs of found contacts
      745450,
      502931,
      11111,
      1234,
      431,
      3234,
      12343,
      2341,
      12312,
      34343,
    ],
    "contacts": {  // this is a data of found contacts
      "745450": {
        "id": 745450,
        "first_name": "Jason1",
        "last_name": "Alexis1",
        "email": null,
        "phone_number": "9404480524",
        "country_id": 225,
      },
      "502931": {
        "id": 502931,
        "first_name": "jason",
        "last_name": "Alexis",
        "email": "",
        "phone_number": "0",
        "country_id": 226,
      },
      "1234": {
        "id": 1234,
        "first_name": "Jason1",
        "last_name": "Alexis1",
        "email": null,
        "phone_number": "9404480524",
        "country_id": 225,
      },
      "431": {
        "id": 431,
        "first_name": "jason",
        "last_name": "Alexis",
        "email": "",
        "phone_number": "0",
        "country_id": 226,
      },
      "12343": {
        "id": 12343,
        "first_name": "Jason1",
        "last_name": "Alexis1",
        "email": null,
        "phone_number": "9404480524",
        "country_id": 225,
      },
      "3234": {
        "id": 3234,
        "first_name": "jason",
        "last_name": "Alexis",
        "email": "",
        "phone_number": "0",
        "country_id": 226,
      },
      "2341": {
        "id": 2341,
        "first_name": "Jason1",
        "last_name": "Alexis1",
        "email": null,
        "phone_number": "9404480524",
        "country_id": 225,
      },
      "12312": {
        "id": 12312,
        "first_name": "jason",
        "last_name": "Alexis",
        "email": "",
        "phone_number": "0",
        "country_id": 226,
      },
      "11111": {
        "id": 11111,
        "first_name": "Jason1",
        "last_name": "Alexis1",
        "email": null,
        "phone_number": "9404480524",
        "country_id": 225,
      },
      "34343": {
        "id": 34343,
        "first_name": "jason",
        "last_name": "Alexis",
        "email": "",
        "phone_number": "0",
        "country_id": 226,
      },
    }
  }

  const handleModalABtnClick = useCallback(() => {
    dispatch(openModal('A'))
  }, [])

  const handleModalBBtnClick = useCallback(() => {
    dispatch(openModal('B'))
  }, [])

  return <>
    <Router>
      <Stack direction="horizontal" gap={3}>
        <Link to={"/modalA"}>
          <Button onClick={handleModalABtnClick} variant="outline-success buttonA btn-lg">
            Modal A
          </Button>
        </Link>
        <Link to={"/modalB"}>
          <Button onClick={handleModalBBtnClick} variant="outline-success buttonB btn-lg">
            Modal B
          </Button>
        </Link>
      </Stack>

      <Routes>
        <Route path='/modalA/' element={<ModalA />} />
        <Route path='/modalB/' element={<ModalB />} />
      </Routes>
    </Router>
  </>
}