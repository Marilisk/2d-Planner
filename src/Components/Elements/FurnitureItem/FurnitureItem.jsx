import React from 'react';
import c from './FurnitureItem.module.scss';
import {imgLib} from './../../../assets/furniture images/imgLib';

export const FurnitureItem = ({ item, x, y, handleMouseDown, index}) => {
    
    return <div className={c.itemWrapper}>
            {item.name}
            <div className={c.item}
                draggable={false}
                id={item.id}
                style={{ top: y, left: x, width: item.sizeX+'px', height: item.sizeY+'px' }}
                onMouseDown={(e) => handleMouseDown(e, index)}
            >
                {/* {item.id} */}
                <img alt='' src={imgLib[`${item.imgSrc}`]} />
                
                
            </div>
        </div>
}
