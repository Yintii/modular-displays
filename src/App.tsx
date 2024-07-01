import MenuComponent from './components/MenuComponent'
import Display from './components/Display'
import { RootState } from './state/store';
import { useSelector } from 'react-redux';

function App() {

  const module = useSelector((state: RootState) => state.moduleMenu.module);
  const moduleVariation = useSelector((state: RootState) => state.moduleMenu.moduleVariation);

  const displayDimensions = useSelector((state: RootState) => state.menu.displayDimensions);

  const InfoBar = () => {
    if(module && moduleVariation && moduleVariation.resolution) {
      return(
        <div id="info">
          <p>Module: {module.name}</p>
          <p>Variation: {moduleVariation.name}</p>
          <p>Display Height: ~{displayDimensions.height}</p>
          <p>Display Width: ~{displayDimensions.width}</p>
          <p>Resolution: {moduleVariation.resolution.width} x {moduleVariation.resolution.height}</p>
        </div>
      );
    }else{
      return(
        <div id="info">
          <p>Module: - </p>
          <p>Variation: - </p>
          <p>Display Height: ~{displayDimensions.height}</p>
          <p>Display Width: ~{displayDimensions.width}</p>
          <p>Resolution: - </p>
        </div>
      );
    }
  }


  return (
    <>
      <MenuComponent />
      <main id="visual-area">
        <InfoBar />
        {module.name && moduleVariation.name && displayDimensions.height !== 0 && displayDimensions.width !== 0 && (
          <div id="renderingArea">
            <Display />
          </div>
        )}

      </main>
      
   
    </>
  )
}

export default App
