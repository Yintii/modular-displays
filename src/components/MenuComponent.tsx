import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/store';
import ModuleMenu from './partials/ModuleMenu';
import { 
    setWallHeight,
    setWallWidth,
    setDisplayHeight,
    setDisplayWidth
} from '../state/menu/menuSlice';

const MenuComponent = () => {

    const dispatch = useDispatch();

    const wallHeight = useSelector((state: RootState) => state.menu.wallDimensions.height);
    const wallWidth = useSelector((state: RootState) => state.menu.wallDimensions.width);
    const displayHeight = useSelector((state: RootState) => state.menu.displayDimensions.height);
    const displayWidth = useSelector((state: RootState) => state.menu.displayDimensions.width);

    const handleWallHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setWallHeight(Number(event.target.value)));
    }

    const handleWallWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setWallWidth(Number(event.target.value)));
    }

    const handleDisplayHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDisplayHeight(Number(event.target.value)));
    }

    const handleDisplayWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDisplayWidth(Number(event.target.value)));
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
              value={wallHeight}
              onChange={handleWallHeightChange}
            />
          </div>
          <div className="input-item">
          <label>Width</label>
          <input
            type='number'
            placeholder='feet'
            value={wallWidth}
            onChange={handleWallWidthChange}
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
            value={displayHeight}
            onChange={handleDisplayHeightChange}
          />
          </div>
          <div className="input-item">
          <label>Width</label>
          <input
            type='number'
            placeholder='feet'
            value={displayWidth}
            onChange={handleDisplayWidthChange}
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
        <ModuleMenu />
        </form>
    </div>
  )
}


export default MenuComponent;