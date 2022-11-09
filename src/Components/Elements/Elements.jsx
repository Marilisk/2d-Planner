import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInitCs, setMapCs, changeMouseCs, setDrag, duplicateItem, throwOnMap, deleteTouchedElem, setLastDragId } from '../../redux/furnitureSlice';
import c from './Elements.module.scss';
import { ElemParams } from './ElemParams/ElemParams';
import { FurnitureItem } from './FurnitureItem/FurnitureItem';
import { MovedItem } from './MovedItem/MovedItem';

export const Elements = () => {
    const dispatch = useDispatch();
    const furniture = useSelector(state => state.furniture.items);
    const touchedItems = useSelector(state => state.furniture.touchedItems);
    const drag = useSelector(state => state.furniture.drag);
    const lastDragId = useSelector(state => state.furniture.lastDragId);
    //const lastDragRotate = useSelector(state => state.furniture.lastDrag.rotate);
    
    const container = useRef(null);
    // слушаем изменение размеров окна, чтобы следить за ними для определения координат абсолютно позиционированных элементов
    const [size, setSize] = useState({});
    const resizeHandler = () => {
        setSize({
            clientHeight: document.documentElement.clientHeight,
            clientWidth: document.documentElement.clientWidth
        });
    };
    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
    }/* , [] */);


    const map = useRef(null);

    const initCords = useSelector(state => state.furniture.initCords);
    const setInitCords = (x, y) => {
        dispatch(setInitCs(x, y));
    }
    const mapCords = useSelector(state => state.furniture.mapCords);
    const setMapCords = (x, y) => {
        dispatch(setMapCs(x, y));
    }

    const mouseCords = useSelector(state => state.furniture.mouseCords);
    const handleMouseMove = (clX, clY) => {
        dispatch(changeMouseCs({ x: clX, y: clY }));
    }

    useEffect(() => {
        let cords = container.current.getBoundingClientRect();
        setInitCords({ x: cords.left + window.pageXOffset, y: cords.top + window.pageYOffset });// board coords setted
        let mapCords = map.current.getBoundingClientRect();
        setMapCords({ x: mapCords.left + window.pageXOffset, y: mapCords.top + window.pageYOffset }); // board coords setted
    }, [size.clientHeight, size.clientWidth]);

    const handleMouseDown = ({ ex, ey, index }) => {
        dispatch(duplicateItem({ ex, ey, index }));
    };
    const handleMouseUp = ({ ex, ey, index }) => {
        if (ex > mapCords.x && ey > mapCords.y) {
            dispatch(throwOnMap({ ex, ey, index }))
        } else {
            dispatch(deleteTouchedElem(index));
        }
        dispatch(setDrag(null));
    };

    const items = furniture.map((item, index) => {
        let x = initCords.x + 100 * (index)
        let y = initCords.y
        return <FurnitureItem
            item={item}
            x={x}
            y={y}
            handleMouseDown={(e, index) => handleMouseDown({ ex: e.pageX, ey: e.pageY, index })}
            index={index} key={item.id} />
    });

    const movedItems = touchedItems.map((item, index) => {
        let x, y;
        if (drag === item.id) { //если элемент передвигаемый
            x = mouseCords.x - 40;
            y = mouseCords.y - 40;
        } else {
            x = item.x - 40;
            y = item.y - 40;
        }

        return <MovedItem
            item={item}
            x={x}
            y={y}
            handleMouseDown={() => {dispatch(setDrag(item.id)); dispatch(setLastDragId(item.id) )}}
            handleMouseUp={(e) => handleMouseUp({ ex: e.pageX, ey: e.pageY, index })}
            lastDragId={lastDragId} key={item.id + index} />
    });

    return <div className={c.wrap} onMouseMove={(e) => handleMouseMove(e.pageX, e.pageY)}
            onDragStart={() => false} >
            <div>
                <div className={c.elementsBoard}>
                    <div ref={container} className={c.elements}>
                        {items}
                        {movedItems}
                    </div>
                </div>
                <ElemParams drag={drag}
                    lastDragId={lastDragId}
                    touchedItems={touchedItems}  
                    mouseCords={mouseCords} 
                    mapCords={mapCords} />

                {/* <RoomParams drag={drag} touchedItemsLength={touchedItems.length} mouseCords={mouseCords} mapCords={mapCords} /> */}
            </div>
            <div className={c.map} >
                <p>Карта заведения</p>
                <div ref={map} className={c.place} >

                </div>

            </div>

        </div>

}