import React from 'react';
import c from './ElemParams.module.scss';
import rotate from './../../../assets/interface icons/rotate-right.svg';
import { useDispatch } from 'react-redux';
import { rotateElem } from '../../../redux/furnitureSlice';


export const ElemParams = ({ drag, lastDragId, lastDragRotate, touchedItems, mouseCords, mapCords }) => {
    const dispatch = useDispatch();


    return <div className={c.wrap}>
        <h2>Параметры элемента
            {/* <span className={c.output}>
                {lastDrag} {lastDrag && touchedItems.find(el => el.id === lastDrag).name}
            </span> */}
        </h2>

        <div className={c.block}>
            <div>
                <p>id</p>
                <span className={c.output}>{lastDragId}</span>
            </div>
            <div>
                <p>элемент:</p>
                <span className={c.output}>
                    {lastDragId && touchedItems.find(el => el.id === lastDragId).name}
                </span>
            </div>
            <div>
                <p>координаты элемента</p>
                <span className={c.output}>
                    x: 5.5 м.<br /> y: 3 м.
                </span>
            </div>
            <div>
                <p>предметов в помещении</p>
                <span className={c.output}>{touchedItems.length}</span>
            </div>
            <div>
                <div className={c.btnBlock}>
                    <button onClick={() => dispatch(rotateElem(/* lastDragRotate+1 */))}>
                        <span>Повернуть</span>
                        <img alt='' src={rotate} />
                    </button>
                    <button className={c.delBtn}>
                        <span>Удалить всё</span>
                    </button>
                    {lastDragRotate}

                </div>
            </div>
            {/* <div>
                <p>black map: </p>
                {mapCords.x}, {mapCords.y}
            </div> */}
        </div>
    </div>

}