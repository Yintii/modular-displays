import MenuComponent from './components/MenuComponent'
import { RootState } from './state/store';
import { useSelector } from 'react-redux';

function App() {

  const module = useSelector((state: RootState) => state.moduleMenu.module);
  const moduleVariation = useSelector((state: RootState) => state.moduleMenu.moduleVariation);

  const displayDimensions = useSelector((state: RootState) => state.menu.displayDimensions);

  return (
    <>
      <MenuComponent />

      <main id="visual-area">
        {module.name && moduleVariation.name && (
        <div id="info">
          <p>Module: {module.name}</p>
          <p>Variation: {moduleVariation?.name}</p>
          <p>Display Height: ~{displayDimensions.height}</p>
          <p>Display Width: ~{displayDimensions.width}</p>
          <p>Resolution: {moduleVariation.resolution.width} x {moduleVariation.resolution.height}</p>
        </div>
        )}
      </main>
      
   
    </>
  )
}

export default App
