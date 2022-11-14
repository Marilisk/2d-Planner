import { useFormik } from 'formik';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editRoom, setCurrentRoom } from '../../../redux/furnitureSlice';
import angleDown from './../../../assets/interface icons/angle-down.svg';
import c from './RoomParams.module.scss';


export const RoomParams = ({ rooms, currentRoom, mapCords, lastDragId, mouseCords }) => {
    const dispatch = useDispatch();

    const rWidth = currentRoom.width/50;
    const rHeight = currentRoom.height/50;

    const [isShown, showOptions] = useState(false);

    const formik = useFormik({
        initialValues: {
            width: rWidth,
            height: rHeight,
            name: currentRoom.name,
        },
        onSubmit: (values) => {
            dispatch(editRoom({
                width: values.width,
                height: values.height,
                name: values.name,
            }));
        },
        enableReinitialize: true,
    })

    const roomsOptions = rooms.map((room, index) => {
        return <div key={index} id={room.id}
            className={c.fakeOption}
            onClick={event => {
                dispatch(setCurrentRoom(event.target.id));
            } } >
            {room.name}
        </div>

    });

    return <div className={c.wrap}>
        <div className={c.headWrap}>
            <h2>Параметры помещения</h2>
            <div className={isShown ? c.optionsWrapperFocused : c.optionsWrapper}
                name='rooms'
                onClick={() => showOptions(!isShown)} >
                    {currentRoom.name} 
                    <img alt='' src={angleDown} />
                <div className={isShown ? c.fakeSelect : c.hiddenSelect} >
                    {roomsOptions}
                </div>
            </div>
        </div>

        <div className={c.block}>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor='n'>имя</label>
                    <input id='n' type={'text'}
                        name='name'
                        value={formik.values.name}
                        onChange={event => {
                            formik.values.name = event.currentTarget.value;
                            formik.submitForm();
                        }} />
                </div>

                <div>
                    <label htmlFor='w'>ширина, метров: </label>
                    <input id='w' type={'text'}
                        name='width'
                        value={formik.values.width}
                        onChange={(event) => {
                            formik.values.width = event.currentTarget.value;
                            formik.submitForm();
                        }} />
                </div>
                <div>
                    <label htmlFor='h'>длина, метров: </label>
                    <input id='n' type={'text'}
                        name='height'
                        value={formik.values.height}
                        onChange={event => {
                            formik.values.height = event.currentTarget.value;
                            formik.submitForm();
                        }} />
                </div>
            </form>
        </div>
    </div>

}