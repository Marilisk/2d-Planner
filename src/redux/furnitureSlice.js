import { createSlice } from "@reduxjs/toolkit";

const furnitureSlice = createSlice({
    name: 'furniture',
    initialState: {
        items: [
            {
                id: 1,
                name: 'стол на 5 мест',
                sizeY: 80,
                sizeX: 80,
                imgSrc: 'table5seats',
                x: 0,
                y: 0,
                rotate: 0,
            },
            {
                id: 2,
                name: 'круглый стол 4 места',
                sizeY: 80,
                sizeX: 80,
                imgSrc: 'roundTable',
                x: 0,
                y: 0,
                rotate: 0,
            },
            {
                id: 3,
                name: 'маленький стол 2 места',
                sizeY: 80,
                sizeX: 80,
                imgSrc: 'smallTable',
                x: 0,
                y: 0,
                rotate: 0,
            },
            {
                id: 4,
                name: 'диван, боковая часть',
                sizeY: 80,
                sizeX: 80,
                imgSrc: '',
                x: 0,
                y: 0,
                rotate: 0,
            },
            {
                id: 5,
                name: 'диван, средняя часть',
                sizeY: 80,
                sizeX: 80,
                imgSrc: '',
                x: 0,
                y: 0,
                rotate: 0,
            },
        ],
        touchedItems: [],

        drag: null,
        lastDragId: null,
        mouseCords: { x: 0, y: 0 },
        initCords: { x: 0, y: 0 },
        mapCords: { x: 0, y: 0 },

    },
    reducers: {
        setInitCs(state, action) {
            state.initCords.x = action.payload.x;
            state.initCords.y = action.payload.y;
        },
        setMapCs(state, action) {
            state.mapCords.x = action.payload.x;
            state.mapCords.y = action.payload.y;
        },
        changeMouseCs(state, action) {
            state.mouseCords.x = action.payload.x;
            state.mouseCords.y = action.payload.y;
        },
        setDrag(state, action) {
            state.drag = action.payload;
        },
        setLastDragId(state, action) {
            state.lastDragId = action.payload;
        },
        duplicateItem(state, action) {
            const copiedElem = {...state.items[action.payload.index]};
            copiedElem.id += `${state.touchedItems.length}`;
            copiedElem.x = action.payload.ex;
            copiedElem.y = action.payload.ey;
            state.drag = copiedElem.id;
            state.lastDragId = copiedElem.id;
            state.touchedItems.push(copiedElem);
        },
        throwOnMap(state, action) {
            let managebleItem = state.touchedItems[action.payload.index];
            managebleItem.x = action.payload.ex;
            managebleItem.y = action.payload.ey;
        },
        deleteTouchedElem(state, action) {
            state.touchedItems.splice(action.payload, 1);
            state.lastDragId = null;
        },
        rotateElem(state) {
            const rotatingElem = state.touchedItems.find(elem => elem.id === state.lastDragId);
            rotatingElem.rotate += 1;
            if (rotatingElem.rotate > 4) {rotatingElem.rotate = 0};
        },
        
    }
})

export const { setInitCs, 
    setMapCs, 
    changeMouseCs, 
    setDrag, 
    duplicateItem,  
    throwOnMap,
    deleteTouchedElem,
    rotateElem,
    setLastDragId, } = furnitureSlice.actions;
export default furnitureSlice.reducer;