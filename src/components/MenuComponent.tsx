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
        <form>
              <h2>Wall Dimensions</h2>
        <div className="input-area">
          <div className="input-item">
            <label>Height</label>
            <input
              type='number'
              placeholder='feet'
            />
          </div>
          <div className="input-item">
          <label>Width</label>
          <input
            type='number'
            placeholder='feet'
          />
          </div>
          <img width={20} height={20} id='fixed-info' className='hoverInfo' />
        </div>
        <div id="fixed-info-popper" className="disclaimer">
          <p>Here you can input dimensions for a 'fixed wall', this is to represent the area that you'd like to fit your modular display onto.</p>
          <p>Values here are represented in <strong>feet.</strong> Inches can be represented by ~0.083</p>
          <table>
            <tbody>
              <tr><td>1"</td><td>0.08</td><td>5"</td><td>0.41</td><td>9"</td><td>0.75</td></tr>
              <tr><td>2"</td><td>0.16</td><td>6"</td><td>0.50</td><td>10"</td><td>0.83</td></tr>
              <tr><td>3"</td><td>0.25</td><td>7"</td><td>0.58</td><td>11"</td><td>0.91</td></tr>
              <tr><td>4"</td><td>0.33</td><td>8"</td><td>0.66</td><td>12"</td><td>1</td></tr>
            </tbody>
          </table>
        </div>
     
        <h2>Display Dimensions</h2>
        <div className="input-area">
          <div className="input-item">
          <label>Height</label>
          <input
            type='number'
            placeholder='feet'
          />
          </div>
          <div className="input-item">
          <label>Width</label>
          <input
            type='number'
            placeholder='feet'
          />
          </div>
          <img width={20} height={20} id="display-info" className="hoverInfo"/>
        </div>
        <div id="display-info-popper" className="disclaimer">
          <p>Here you input dimensions for <strong>your desired display size.</strong>The display itself will vary in size depending on the module and variation of said module.</p>
          <p>Values here are represented in <strong>feet.</strong> Inches can be represented by ~0.083</p>
          <table>
            <tbody>
              <tr><td>1"</td><td>0.08</td><td>5"</td><td>0.41</td><td>9"</td><td>0.75</td></tr>
              <tr><td>2"</td><td>0.16</td><td>6"</td><td>0.50</td><td>10"</td><td>0.83</td></tr>
              <tr><td>3"</td><td>0.25</td><td>7"</td><td>0.58</td><td>11"</td><td>0.91</td></tr>
              <tr><td>4"</td><td>0.33</td><td>8"</td><td>0.66</td><td>12"</td><td>1</td></tr>
            </tbody>
          </table>
        </div>
        {/* ModuleMenu goes here */}
        </form>
        <button onClick={handleOpen}>Open</button>
        <button onClick={handleClose}>Close</button>
        {isOpen && <div>Menu is open</div>}
    </div>
  )
}

export default MenuComponent;