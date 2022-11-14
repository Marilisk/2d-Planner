import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import c from './App.module.scss';
import { Elements } from './Components/Elements/Elements';
import { TouchedList } from './Components/Elements/TouchedList/TouchedList';
import { Header } from './Components/Header/Header';
import { Navigation } from './Components/Navigation/Navigation';
import { setInitCs, setMapCs } from './redux/furnitureSlice';


function App() {
  const dispatch = useDispatch();

  const mapCords = useSelector(state => state.furniture.mapCords);
  const rooms = useSelector(state => state.furniture.rooms);
  const currentRoom = useSelector(state => state.furniture.currentRoom);
  const touchedItems = currentRoom.touchedItems;
  
  const map = useRef(null);

  const initCords = useSelector(state => state.furniture.initCords);
  const setInitCords = useCallback((x, y) => {
    dispatch(setInitCs(x, y));
  }, [dispatch]);
  const setMapCords = useCallback((x, y) => {
    dispatch(setMapCs(x, y));
  }, [dispatch]);

  useEffect(() => {
    let mapCords = map.current.getBoundingClientRect();
    setMapCords({ x: mapCords.left + window.pageXOffset, y: mapCords.top + window.pageYOffset }); // board coords setted
  }, [setInitCords, setMapCords]);

  return (
    <div className={c.appWrap}>
      <div className={c.headerWrap}>
        <Header />
      </div>
      <div className={c.navigationWrap}>
        <Navigation />
      </div>
      <div className={c.desktopWrap}>

        <Elements mapCords={mapCords}
          rooms={rooms}
          currentRoom={currentRoom}
          initCords={initCords} />

        <TouchedList roomName={currentRoom.name} touchedItems={touchedItems} mapCords={mapCords} />

      </div>

      <div className={c.mapWrap}
           style={{ width: currentRoom.width + 24 + 'px', height: currentRoom.height + 24 + 'px' }} >

        <p>Карта помещения</p>
        <div ref={map} className={c.place}
             style={{ width: currentRoom.width + 'px', height: currentRoom.height + 'px' }} >
        </div>

      </div>

    </div>
  );
}

export default App;
