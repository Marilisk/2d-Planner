import React from 'react';
import c from './TouchedList.module.scss';
import { useDispatch } from 'react-redux';
import { deleteAll } from '../../../redux/furnitureSlice';


export const TouchedList = ({touchedItems, mapCords, roomName}) => {
    const dispatch = useDispatch();
    
    const rows = touchedItems.map((elem, index) => {
        const cordX = ((elem.x - mapCords.x) / 50).toFixed(1);
        const cordY = ((elem.y - mapCords.y) / 50).toFixed(1);

        return <div className={c.block} key={index}>
            <div>
                <span className={c.output}>{index + 1}</span>
            </div>
            <div>
                <span className={c.output}>{elem.name}</span>
            </div>
            <div>
                <span className={c.output}>
                    слева {cordX} м. <br /> сверху {cordY} м.
                </span>
            </div>
        </div>
    })

    return <div className={c.wrap}>
        <div className={c.firstRow}>
            <h2>Список мебели</h2>
            <p>{roomName}</p>
            <div className={c.btnBlock}>
                <button className={c.delBtn}
                    onClick={() => dispatch(deleteAll())} >
                    <span>Удалить всё</span>
                </button>
            </div>
        </div>

        <div className={c.blockWrap}>
            <div className={c.block}>
                <div>
                    <p>№</p>
                </div>
                <div>
                    <p>элемент</p>
                </div>
                <div>
                    <p>положение</p>
                </div>
            </div>
            {rows}
        </div>
    </div>

}