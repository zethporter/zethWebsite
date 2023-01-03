import { RocketLaunchIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Component } from 'react';

const colors = {
    red: {
        classes: "bg-red-300 cursor-pointer text-center p-2 align-middle align-text-middle rounded-xl hover:ring-3 hover:ring-red-800 hover:bg-red-200",
        outer: "col-span-1 p-2 rounded bg-red-600"
    },
    yellow: {
        classes: "bg-yellow-300 cursor-pointer text-center p-2 align-middle align-text-middle rounded-xl hover:ring-3 hover:ring-yellow-800 hover:bg-yellow-200",
        outer: "col-span-1 p-2 rounded bg-yellow-600"
    },
    green: {
        classes: "bg-green-300 cursor-pointer text-center p-2 align-middle align-text-middle rounded-xl hover:ring-3 hover:ring-green-800 hover:bg-green-200",
        outer: "col-span-1 p-2 rounded bg-green-600"
    },
    blue: {
        classes: "bg-blue-300 cursor-pointer text-center p-2 align-middle align-text-middle rounded-xl hover:ring-3 hover:ring-blue-800 hover:bg-blue-200",
        outer: "col-span-1 p-2 rounded bg-blue-600"
    },
    disabled: {
        classes: "bg-zinc-300 cursor-pointer text-center p-2 align-middle align-text-middle rounded-xl hover:ring-3 hover:ring-zinc-800 hover:bg-zinc-200",
        outer: "col-span-1 p-2 rounded bg-zinc-600"
    }
}


const BlueBox = ({
    onClick,
    number,
    icon,
    color,
    selected,
    disabled
}:{
    onClick?: React.MouseEventHandler,
    number?: any,
    icon?: any,
    color: string,
    selected: boolean,
    disabled: boolean
}) => {
    let innerClass = "";
    let outerClass = "";
    switch (color) {
        case "red":
            innerClass = colors.red.classes
            outerClass = colors.red.outer
            break;
        case "yellow":
            innerClass = colors.yellow.classes
            outerClass = colors.yellow.outer
            break;
        case "green":
            innerClass = colors.green.classes
            outerClass = colors.green.outer
            break;
        case "blue":
            innerClass = colors.blue.classes
            outerClass = colors.blue.outer
            break;
    }
    if (disabled) {
        return(
            <div className={colors.disabled.outer}>
                <div className={colors.disabled.classes} onClick={onClick}>
                    <XMarkIcon />
                </div>
            </div>
        )
    } else {
        return(
            <div className={outerClass}>
                <div className={innerClass} onClick={onClick}>
                    {
                    selected
                    ? icon
                    : <p className="text-4xl">{number}</p>
                    }
                </div>
            </div>
        )
    }
}

export default BlueBox
