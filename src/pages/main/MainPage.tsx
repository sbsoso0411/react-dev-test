import {
  useCallback,
  useEffect,
} from 'react';

import axios from 'axios';
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

import {
  openModal,
  setData,
} from '../../_redux/main';
import ModalA from '../../components/modalA';
import ModalB from '../../components/modalB';
import { MainPageProps } from './types';

export default function MainPage(props: MainPageProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    axios.post('/api/m1/buildings/isStake', {
      companyId: 171,
      query: '',
      page: 1,
      countryId: '',
    })
      .then(response => {
        if (response.data.success) {
          dispatch(setData(response.data.data))
        }
      })
      .catch(error => {
        console.log(error)
      })

    dispatch(setData({
      asdfasdf: `asdfasdfasdf`,
      1212312: '12312321',
    }))
  }, [])

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
          <Button onClick={handleModalABtnClick} variant="outline-success" style={{ color: "#46139f" }}>
            Modal A
          </Button>
        </Link>
        <Link to={"/modalB"}>
          <Button onClick={handleModalBBtnClick} variant="outline-success" style={{ color: "#ff7f50" }}>
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