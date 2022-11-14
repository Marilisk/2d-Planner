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
                isCustom: false,
                immobilised: false,
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
                isCustom: false,
                immobilised: false,
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
                isCustom: false,
                immobilised: false,
            },
            {
                id: 4,
                name: 'диван, левая часть',
                sizeY: 80,
                sizeX: 80,
                imgSrc: 'sofaLeft',
                x: 0,
                y: 0,
                rotate: 0,
                isCustom: false,
                immobilised: false,
            },
            {
                id: 5,
                name: 'диван, правая часть',
                sizeY: 80,
                sizeX: 80,
                imgSrc: 'sofaRight',
                x: 0,
                y: 0,
                rotate: 0,
                isCustom: false,
                immobilised: false,
            },
            {
                id: 6,
                name: 'диван, средняя часть',
                sizeY: 80,
                sizeX: 80,
                imgSrc: 'sofaCenter',
                x: 0,
                y: 0,
                rotate: 0,
                isCustom: false,
                immobilised: false,
            },
        ],
        rooms: [
            { id: 1, width: 560, height: 538, name: 'основной зал', lastDragId: null, touchedItems: [], },
            { id: 2, width: 300, height: 300, name: 'маленький зал', lastDragId: null, touchedItems: [], },
            { id: 3, width: 600, height: 400, name: 'средний зал', lastDragId: null, touchedItems: [], },
        ],
        currentRoom: { id: 1, width: 560, height: 538, name: 'первый зал', lastDragId: null, touchedItems: [], },
        touchedItems: [],
        newElement: { width: 110, height: 110, name: 'мой элемент' },

        drag: null,
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
            state.currentRoom.lastDragId = action.payload;
        },
        duplicateItem(state, action) {
            const copiedElem = { ...state.items[action.payload.index] };
            copiedElem.id += `${state.currentRoom.id} - ${state.currentRoom.touchedItems.length}`;
            copiedElem.x = action.payload.ex;
            copiedElem.y = action.payload.ey;
            copiedElem.room = state.currentRoom.id;
            state.drag = copiedElem.id;
            state.currentRoom.lastDragId = copiedElem.id;
            state.currentRoom.touchedItems.push(copiedElem);
        },
        throwOnMap(state, action) {
            let managebleItem = state.currentRoom.touchedItems[action.payload.index];
            managebleItem.x = action.payload.ex;
            managebleItem.y = action.payload.ey;
        },
        deleteTouchedElem(state, action) {
            state.currentRoom.touchedItems.splice(action.payload, 1);
            state.currentRoom.lastDragId = null;
        },
        deleteAll(state) {
            state.currentRoom.touchedItems = [];
            state.currentRoom.lastDragId = null;
        },
        rotateElem(state) {
            const rotatingElem = state.currentRoom.touchedItems.find(elem => elem.id === state.currentRoom.lastDragId);
            rotatingElem.rotate += 1;
            if (rotatingElem.rotate > 4) { rotatingElem.rotate = 0 };
        },
        addNewElem(state, action) {
            state.currentRoom.touchedItems.push({
                id: state.currentRoom.touchedItems.length + 1,
                name: action.payload.name,
                sizeY: action.payload.height / 2,
                sizeX: action.payload.width / 2,
                imgSrc: 'custom',
                x: state.mapCords.x + 30,
                y: state.mapCords.y + 30,
                rotate: 0,
                isCustom: true,
                room: state.currentRoom.id,
            });
        },
        editRoom(state, action) {
            state.currentRoom.name = action.payload.name;
            state.currentRoom.width = action.payload.width * 50;
            state.currentRoom.height = action.payload.height * 50;
        },
        setCurrentRoom(state, action) {
            state.currentRoom = state.rooms.find(r => r.id === Number(action.payload));
        },
        immobiliseItem(state, action) {
            state.currentRoom
                .touchedItems.find(i => i.id === action.payload.id).immobilised = action.payload.value;
        }

    }
})

export const { setInitCs,
    setMapCs,
    changeMouseCs,
    setDrag,
    duplicateItem,
    throwOnMap,
    deleteTouchedElem,
    deleteAll,
    rotateElem,
    setLastDragId,
    addNewElem,
    editRoom,
    setCurrentRoom,
    immobiliseItem } = furnitureSlice.actions;
    
export default furnitureSlice.reducer;