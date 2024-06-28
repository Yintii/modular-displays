import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/store';
import { openMenu, closeMenu } from '../state/menu/menuSlice';

const MenuComponent = () => {

    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.menu.isOpen);

    const handleOpen = () => {
        dispatch(openMenu());
    }

    const handleClose = () => {
        dispatch(closeMenu());
    }


  return (
    <div id="menu">
        <div id="menu-header">
            <h1>Brand</h1>
        </div>
        <button onClick={handleOpen}>Open</button>
        <button onClick={handleClose}>Close</button>
        {isOpen && <div>Menu is open</div>}
    </div>
  )
}

export default MenuComponent;