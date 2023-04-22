import React, { useEffect, useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInitCs, changeMouseCs, setDrag, duplicateItem, throwOnMap, deleteTouchedElem, setLastDragId } from '../../redux/furnitureSlice';
import c from './Elements.module.scss';
import { ElemParams } from './ElemParams/ElemParams';
import { FurnitureItem } from './FurnitureItem/FurnitureItem';
import { MovedItem } from './MovedItem/MovedItem';
import { RoomParams } from './RoomParams/RoomParams';


export const Elements = ({ mapCords, rooms, currentRoom, initCords }) => {
    const dispatch = useDispatch();
    const furniture = useSelector(state => state.furniture.items);
    const drag = useSelector(state => state.furniture.drag);
    const newElem = useSelector(state => state.furniture.newElement);

    const lastDragId = currentRoom.lastDragId;

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
        return () => window.removeEventListener('resize', resizeHandler)
    });

    const mouseCords = useSelector(state => state.furniture.mouseCords);
    const handleMouseMove = (clX, clY) => {
        dispatch(changeMouseCs({ x: clX, y: clY }));
    }

    const setInitCords = useCallback((x, y) => {
        dispatch(setInitCs(x, y));
    }, [dispatch]);


    useEffect(() => {
        let cords = container.current.getBoundingClientRect();
        setInitCords({ x: cords.left + window.pageXOffset, y: cords.top + window.pageYOffset });// board coords setted
    }, [size.clientHeight, size.clientWidth, setInitCords]);

    const handleMouseDown = ({ ex, ey, index }) => {
        dispatch(duplicateItem({ ex, ey, index }));
    };
    const handleMouseUp = ({ ex, ey, index }) => {
        if (ex > mapCords.x && ey > mapCords.y 
                && ex < (mapCords.x + currentRoom.width) 
                && ey < (mapCords.y + currentRoom.height)  ) {
            dispatch(throwOnMap({ ex, ey, index }))
        } else {
            dispatch(deleteTouchedElem(index));
        }
        dispatch(setDrag(null));
    };

    // создаем предметы мебели для панели :
    const items = furniture.map((item, index) => {
        let x = initCords.x + (item.sizeX + 13) * index;
        let y = initCords.y;
        return <FurnitureItem
            item={item}
            x={x}
            y={y}
            handleMouseDown={(e, index) => handleMouseDown({ ex: e.pageX, ey: e.pageY, index })}
            index={index} key={item.id} />
    });

    // создаем передвигаемые предметы мебели для карты :
    const movedItems = currentRoom.touchedItems.map((item, index) => {
        let x, y;
        if (drag === item.id ) { //если элемент передвигаемый
            x = mouseCords.x - item.sizeX / 2;
            y = mouseCords.y - item.sizeY / 2;
        } else {
            x = item.x - item.sizeX / 2;
            y = item.y - item.sizeY / 2;
        }

        const handleMouseDown = () => {
            if (!item.immobilised) {
                dispatch(setDrag(item.id));
            }
            dispatch(setLastDragId(item.id));            
        }

        return <MovedItem
            item={item}
            x={x}
            y={y}
            handleMouseDown={() => handleMouseDown()}
            handleMouseUp={(e) => handleMouseUp({ ex: e.pageX, ey: e.pageY, index })}
            lastDragId={lastDragId} key={item.id} />
    });

    return <div className={c.wrap} onPointerMove={(e) => handleMouseMove(e.pageX, e.pageY)}
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
                touchedItems={currentRoom.touchedItems}
                mouseCords={mouseCords}
                mapCords={mapCords}
                newElem={newElem} />

            <RoomParams rooms={rooms} currentRoom={currentRoom} lastDragId={lastDragId} mouseCords={mouseCords} mapCords={mapCords} />
        </div>
    </div>

}