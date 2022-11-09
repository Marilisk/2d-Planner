import React from 'react';
import c from './RoomParams.module.scss';
//import rotate from './../../../assets/interface icons/rotate-right.svg';
//import { useDispatch } from 'react-redux';



export const RoomParams = ({mapCords, lastDragId, mouseCords }) => {
    //const dispatch = useDispatch();


    return <div className={c.wrap}>
        <h2>Параметры помещения</h2>

        <div className={c.block}>
            <div>
                <p>id</p>
                <span className={c.output}>{lastDragId}</span>
            </div>
            
            <div>
                <p>black map: </p>
                <span className={c.output}>{mapCords.x}, {mapCords.y}</span>
            </div>
        </div>
    </div>

}