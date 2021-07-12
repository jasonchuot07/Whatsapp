import React from 'react'
import { SketchPicker } from 'react-color'

const cover = {
    position: 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
}

const popover = {
    position: 'absolute',
    zIndex: 2,
}

function ColorPicker({object, setObject}) {
    const newcolor = object.color
    const handleChange = (color) => {
        setObject({...object, color: color.rgb})
    }
    return (<>
        <button style={{background: `rgba(${newcolor.r},${newcolor.g}, ${newcolor.b}, ${newcolor.a})`, padding: '2px', width: '30px', height: '30px', borderRadius: '5px'}} onClick={() => setObject({...object, open: true})}></button>
        {object.open && <div style={popover}>
            <div style={cover} onClick={() => setObject({...object, open: false})}>
                <SketchPicker color={object.color} onChange={handleChange} />
            </div>
        </div>}
    </>)
}
export default ColorPicker

