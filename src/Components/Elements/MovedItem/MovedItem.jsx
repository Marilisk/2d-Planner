import React from 'react';
import c from './MovedItem.module.scss';
import { imgLib } from './../../../assets/furniture images/imgLib';


export const MovedItem = ({ item, x, y, lastDragId, handleMouseDown, handleMouseUp }) => {
    const imgStyle = {
        width: item.sizeX + 'px',
        height: item.sizeY + 'px',
    };
    const immobilisedImgStyle = {
        width: item.sizeX + 'px',
        height: item.sizeY + 'px',
        border: '2px solid #FB675C',
    }

    return <div className={lastDragId === item.id ? c.lastDragItem : c.item}
        draggable={false}
        id={item.id}
        style={{
            top: y, left: x,
            /* width: item.sizeX + 'px', height: item.sizeY + 'px',  */
            transform: `rotate(${item.rotate * 90}deg)`,
        }}
        onMouseDown={() => handleMouseDown()}
        onMouseUp={(e) => !item.immobilised && handleMouseUp(e)} >

        <div className={c.imgContainer}>
            <img alt='' src={imgLib[`${item.imgSrc}`]}
                style={item.immobilised && lastDragId === item.id ? immobilisedImgStyle : imgStyle}
                 />
            {item.isCustom 
            && <p style={{width: item.sizeX + 'px'}}>{item.name}</p>}
        </div>
    </div>
}
