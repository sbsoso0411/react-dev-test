import { useCallback, useRef } from 'react';

import { Button } from 'react-bootstrap';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { openModal, setEvenFlag } from '../../_redux/main';
import { BtnBarProps } from './types';

export default function BtnBar(props: BtnBarProps) {
  const dispatch = useDispatch()
  const flag = useRef(false)
  const handleABtnClick = useCallback(() => {
    dispatch(openModal('A'))
  }, [])
  const handleBBtnClick = useCallback(() => {
    dispatch(openModal('B'))
  }, [])

  const handleCBtnClick = useCallback(() => {
    dispatch(openModal(null))
  }, [])

  const changeCheckbox = useCallback(() => {
    flag.current = !flag.current
    dispatch(setEvenFlag(flag.current))
  }, [])

  return <>
    <Link to={"/modalA"}>
      <Button onClick={handleABtnClick} variant="outline-success buttonA">All Contacts</Button>
    </Link>
    <Link to={"/modalB"}>
      <Button onClick={handleBBtnClick}  variant="outline-success buttonB">US Contacts</Button>
    </Link>
    <Link to={"/"}>
      <Button onClick={handleCBtnClick}  variant="close-modal">Close</Button>
    </Link>
    <MDBCheckbox name='Checkbox' onChange={changeCheckbox} value='' id='selectEven' label='Only even' />
  </>
}