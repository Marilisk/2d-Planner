import React from 'react';
import c from './ElemParams.module.scss';
import rotate from './../../../assets/interface icons/rotate-right.svg';
import { useDispatch } from 'react-redux';
import { immobiliseItem, rotateElem } from '../../../redux/furnitureSlice';
import { useState } from 'react';
import { AddElemModal } from './AddElemModal/AddElemModal';


export const ElemParams = ({ newElem, lastDragId, touchedItems, mapCords }) => {
    const dispatch = useDispatch();
    const [isModalOpened, openAddElemModal] = useState(false);

    if (!lastDragId || !touchedItems.length) {
        return false; 
    }
    const touchedItem = touchedItems.find(el => el.id === lastDragId);
    const cordX = ((touchedItem.x - mapCords.x) / 50).toFixed(1);
    const cordY = ((touchedItem.y - mapCords.y) / 50).toFixed(1);

    return <div className={c.wrap}>

        <div className={c.headWrapper}>
            <h2>Параметры выбранного элемента</h2>
            <label htmlFor='immobilize'>зафиксировать</label>
            <input type='radio' 
                className={touchedItem.immobilised ? c.immobilizedRadioBtn : c.notImmobilizedRadioBtn}
                id='immobilize' name='immobilize' value={touchedItem.immobilised}
                onClick={() => dispatch(immobiliseItem({id: touchedItem.id, value: !touchedItem.immobilised })) } />
        </div>

        <div className={c.block}>

            <div>
                <p>№</p>
                <span className={c.output}>{touchedItems.indexOf(touchedItem) +1 }</span>
            </div>
            <div>
                <p>элемент:</p>
                <span className={c.output}>
                    {touchedItem.name}
                </span>
            </div>
            <div>
                <p>координаты элемента</p>
                <span className={c.output}>
                    слева {cordX} м. <br /> сверху {cordY} м.
                </span>
            </div>
            <div>
                <p>предметов в помещении</p>
                <span className={c.output}>{touchedItems.length}</span>
            </div>
            <div>
                <div className={c.btnBlock}>
                    <button className={c.rotateBtn} onClick={() => dispatch(rotateElem())}>
                        <span>Повернуть</span>
                        <img alt='' src={rotate} />
                    </button>
                    <button className={c.addBtn}
                        style={isModalOpened ? { background: '#475B73' } : null}
                        onClick={() => openAddElemModal(!isModalOpened)} >
                        <span>Элемент</span>
                        <span className={c.icon}>+</span>
                    </button>

                    <AddElemModal isModalOpened={isModalOpened}
                        newElem={newElem}
                        openAddElemModal={openAddElemModal} />

                </div>

            </div>


        </div>
    </div>

}