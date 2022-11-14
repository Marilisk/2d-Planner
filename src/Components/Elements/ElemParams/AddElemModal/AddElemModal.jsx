import React from 'react';
import c from './AddElemModal.module.scss';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { addNewElem } from '../../../../redux/furnitureSlice';


export const AddElemModal = ({ isModalOpened, newElem, openAddElemModal }) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            width: newElem.width,
            height: newElem.height,
            name: newElem.name,
        },
        onSubmit: (values) => {
            dispatch(addNewElem({ width: values.width, height: values.height, name: values.name, }));
            openAddElemModal(false);
        },

    })

    return <div className={c.addElemModal}
        style={isModalOpened ? { opacity: '1' } : { opacity: '0', pointerEvents: 'none' }}>
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor='w'>ширина, см.</label>
                <input id='w' type={'text'}
                    name='width'
                    value={formik.values.width}
                    onChange={formik.handleChange} />
            </div>

            <div>
                <label htmlFor='h'>длина, см.</label>
                <input type={'text'} id='h'
                    name='height'
                    value={formik.values.height}
                    onChange={formik.handleChange} />
            </div>

            <div>
                <label htmlFor='n'>имя</label>
                <input type={'text'} id='n'
                    name='name'
                    value={formik.values.name}
                    onChange={formik.handleChange} />
            </div>
            <button type='submit' className={c.submAddBtn}>
                Добавить
            </button>
        </form>

    </div>
}