import React from 'react';
import c from './MovedItem.module.scss';
import { imgLib } from './../../../assets/furniture images/imgLib';


export const MovedItem = ({ item, x, y, lastDragId, handleMouseDown, handleMouseUp }) => {
    
    return <div className={lastDragId === item.id ? c.lastDragItem : c.item}
        /* onSelect={() => false}
        onSelectCapture={() => false}
        onDrag={() => false} */

        draggable={false}
        id={item.id}
        style={{ top: y, left: x, width: item.sizeX + 'px', 
                height: item.sizeY + 'px', 
                transform: `rotate(${item.rotate * 90}deg)` }}
        onMouseDown={() => handleMouseDown(/* e.target.id, index */)}
        onMouseUp={(e) => handleMouseUp(e)} >
        {/* {item.id} */}
        <img alt='' src={imgLib[`${item.imgSrc}`]} />
    </div>
}
