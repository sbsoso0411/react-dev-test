import { useCallback } from 'react';

import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { openModal } from '../../_redux/main';
import { BtnBarProps } from './types';

export default function BtnBar(props: BtnBarProps) {
  const dispatch = useDispatch()

  const handleABtnClick = useCallback(() => {
    dispatch(openModal('A'))
  }, [])
  const handleBBtnClick = useCallback(() => {
    dispatch(openModal('B'))
  }, [])

  const handleCBtnClick = useCallback(() => {
    dispatch(openModal(null))
  }, [])

  return <>
    <Link to={"/modalA"}>
      <Button onClick={handleABtnClick}>All Contacts</Button>
    </Link>
    <Link to={"/modalB"}>
      <Button onClick={handleBBtnClick}>US Contacts</Button>
    </Link>
    <Link to={"/"}>
      <Button onClick={handleCBtnClick}>Close</Button>
    </Link>
  </>
}