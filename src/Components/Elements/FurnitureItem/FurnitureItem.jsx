import React from 'react';
import c from './FurnitureItem.module.scss';
import {imgLib} from './../../../assets/furniture images/imgLib';

export const FurnitureItem = ({ item, x, y, handleMouseDown, index}) => {
    
    return <div className={c.itemWrapper}>

            <p style={{ left: x, width: item.sizeX+'px' }}>
                {item.name}
            </p>

            <div className={c.item}
                draggable={false}
                id={item.id}
                style={{ top: y, left: x, width: item.sizeX+'px', height: item.sizeY+'px' }}
                onPointerDown={(e) => handleMouseDown(e, index)}
            >
                <img alt='' src={imgLib[`${item.imgSrc}`]} />
            </div>
        </div>
}
