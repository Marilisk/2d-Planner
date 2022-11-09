import React from 'react';
import c from './Navigation.module.scss';
import { PlannerIcon } from '../../assets/navigation_icons/PlannerIcon';
import { BarCodeIcon } from '../../assets/navigation_icons/BarCodeIcon';
import { MapIcon } from '../../assets/navigation_icons/MapIcon';
import { useState } from 'react';


export const Navigation = () => {
    const [active, setActive] = useState('planner');

    return <div className={c.wrapper}>
        <div className={active === 'planner' ? c.activeItem : c.item} id='planner' onClick={(e) => setActive(e.currentTarget.id)}>
            <div className={c.iconWrapper}>
                <PlannerIcon fill={active === 'planner' ? '#2953A4' : '#475B73'} />
            </div>
            <span>Планировщик</span>
        </div>

        <div className={active === 'clients' ? c.activeItem : c.item} id='clients' onClick={(e) => setActive(e.currentTarget.id)}>
            <div className={c.iconWrapper} id='clients'>
                <BarCodeIcon fill={active === 'clients' ? '#2953A4' : '#475B73'} />
            </div>
            <span>Клиенты</span>
        </div>

        <div className={active === 'map' ? c.activeItem : c.item} id='map' onClick={(e) => setActive(e.currentTarget.id)}>
            <div className={c.iconWrapper} id='map'>
                <MapIcon fill={active === 'map' ? '#2953A4' : '#475B73'} />
            </div>
            <span>План заведения</span>
        </div>
    </div>

}