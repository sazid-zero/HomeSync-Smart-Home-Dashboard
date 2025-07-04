import  { useState } from 'react';

// Define types for clarity and type safety
type Room = {
    id: string;       // Internal identifier
    label: string;    // Text to display in the UI
};

type Appliance = {
    id: number;
    room: string;     // Room this appliance belongs to
    name: string;     // Display name
    type: 'toggle' | 'slider'; // Control type
    value: boolean | number;   // On/off for toggle, 0–100 for slider
};

// Room tabs to filter appliances
const rooms: Room[] = [
    { id: 'all', label: 'All' },
    { id: 'lounge', label: 'Lounge' },
    { id: 'hall', label: 'Hall' },
    { id: 'bedroom', label: 'Bedroom' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'Bathroom', label: 'Bathroom' }
];

// Initial list of all appliances with values
const initialAppliances: Appliance[] = [
    { id: 1, room: 'lounge', name: 'Light fixture', type: 'slider', value: 50 },
    { id: 2, room: 'hall', name: 'Backlight', type: 'slider', value: 70 },
    { id: 3, room: 'bedroom', name: 'Lamp 1', type: 'slider', value: 10 },
    { id: 4, room: 'kitchen', name: 'Lamp 2', type: 'slider', value: 30 },
    { id: 5, room: 'lounge', name: 'TV set', type: 'toggle', value: true },
    { id: 6, room: 'hall', name: 'Stereo system', type: 'toggle', value: false },
    { id: 7, room: 'bedroom', name: 'Play Station 4', type: 'toggle', value: true },
    { id: 8, room: 'kitchen', name: 'Computer', type: 'toggle', value: false },
    { id: 9, room: 'lounge', name: 'Backlight', type: 'slider', value: 70 },
    { id: 10, room: 'lounge', name: 'Lamp 1', type: 'slider', value: 10 },
    { id: 11, room: 'lounge', name: 'Lamp 2', type: 'slider', value: 30 },
    { id: 12, room: 'lounge', name: 'Stereo system', type: 'toggle', value: false },
    { id: 13, room: 'lounge', name: 'Playstation 4', type: 'toggle', value: true },
    { id: 14, room: 'lounge', name: 'Computer', type: 'toggle', value: false }
];


export default function ApplianceControlCard() {
    // State to track selected room tab
    const [selectedRoom, setSelectedRoom] = useState<string>('lounge');
    // State to track all appliances and their current values
    const [appliances, setAppliances] = useState<Appliance[]>(initialAppliances);

    // Filter appliances based on selected room
    const visibleAppliances = appliances.filter(a =>
        selectedRoom === 'all' ? true : a.room === selectedRoom
    );

    // Handle toggle switch change
    const handleToggle = (id: number) => {
        setAppliances(prev =>
            prev.map(app =>
                app.id === id && typeof app.value === 'boolean'
                    ? { ...app, value: !app.value } // Flip boolean toggle
                    : app
            )
        );
    };

    // Handle slider value change
    const handleSliderChange = (id: number, newValue: number) => {
        setAppliances(prev =>
            prev.map(app =>
                app.id === id && typeof app.value === 'number'
                    ? { ...app, value: newValue } // Update slider value
                    : app
            )
        );
    };


    return (
        <div className="w-93 h-55 bg-white rounded-2xl shadow-[0_10px_10px_rgba(0,0,0,0.2)] pt-6 pl-4 pr-4 pb-2 ">

            {/* Room Selector Tabs */}
            <div className="flex space-x-2 items-center">
            <span className="text-[12px] text-gray-400 tracking-wide font-bold">APPLIANCES</span>
            <div className="flex space-x-2 overflow-x-auto pl-4 hide-scrollbar">
                {rooms.map(room => (
                    <button
                        key={room.id}
                        onClick={() => setSelectedRoom(room.id)}
                        className={`px-2 py-1 rounded-full whitespace-nowrap text-[9px] font-medium ${
                            selectedRoom === room.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'
                        }`}
                    >
                        {room.label}
                    </button>
                ))}
            </div>
            </div>

            {/* Appliance List Display */}
            <div className="max-h-40 max-w-full grid grid-cols-[35%_65%] gap-4 pt-6 pb-1 overflow-y-auto hide-scrollbar">
                {/* Left Column: Toggles */}
                <div className="space-y-4">
                    {visibleAppliances
                        .filter(app => app.type === 'toggle')
                        .map(app => (
                            <div key={app.id} className="flex items-center justify-between">
                                <span className="text-gray-400 text-[12px] tracking-wide font-bold">{app.name}</span>
                                <button
                                    onClick={() => handleToggle(app.id)}
                                    className={`relative inline-flex items-center h-4 w-7 rounded-full bg-gradient-to-b from-gray-300 to-gray-200`}
                                >
            <span
                className={`inline-block w-3 h-3 transform rounded-full shadow
                transition-transform duration-200
                ${app.value ? 'translate-x-3.5 bg-black' : 'translate-x-1 bg-white'}`}
            />
                                </button>
                            </div>
                        ))}
                </div>

                {/* Right Column: Sliders */}
                <div className="space-y-4 pr-6">
                    {visibleAppliances
                        .filter(app => app.type === 'slider')
                        .map(app => (
                            <div key={app.id} className="flex items-center justify-between">
                                {/* Fixed-width container for the name */}
                                <span className="text-gray-400 font-bold text-[12px] tracking-wide w-[80px] truncate">
          {app.name}
        </span>
                                <div className="flex items-center justify-end">
                                    {typeof app.value === 'number' && (
                                        <input
                                            type="range"
                                            min={0}
                                            max={100}
                                            value={app.value}
                                            onChange={(e) => handleSliderChange(app.id, Number(e.target.value))}
                                            className="w-[80px] h-[3px] appearance-none bg-gray-300 rounded-full cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[10px]
                [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-black
                [&::-moz-range-thumb]:h-[10px] [&::-moz-range-thumb]:w-[10px]
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black"
                                        />
                                    )}
                                    <span className="text-xs text-gray-500 w-[30px] text-right ml-2">
            {app.value}%
          </span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
