import React from 'react'
import BodySlot from './BodySlot.js'
import "./BodyLayout.css"

export default function BodyLayout({ bodyplan, bodyPlans }) {
    return (
        <div class="BodyLayout">
            { bodyPlans[bodyplan].map(part => {
                return <BodySlot key={part["Name"]} slotname={part["Name"]} slottype={part["Type"]} />
            }) }
        </div>
    )
}
