
import { useState } from 'react';

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
    { id: 'bathroom', label: 'Bathroom' }
];

// Initial list of all appliances with values
const initialAppliances: Appliance[] = [
    { id: 1, room: 'lounge', name: 'TV set', type: 'toggle', value: true },
    { id: 2, room: 'lounge', name: 'Stereo system', type: 'toggle', value: false },
    { id: 3, room: 'lounge', name: 'Playstation 4', type: 'toggle', value: true },
    { id: 4, room: 'lounge', name: 'Computer', type: 'toggle', value: false },
    { id: 5, room: 'lounge', name: 'Light fixture', type: 'slider', value: 50 },
    { id: 6, room: 'lounge', name: 'Backlight', type: 'slider', value: 70 },
    { id: 7, room: 'lounge', name: 'Lamp 1', type: 'slider', value: 10 },
    { id: 8, room: 'lounge', name: 'Lamp 2', type: 'slider', value: 30 },
    { id: 9, room: 'hall', name: 'Backlight', type: 'slider', value: 70 },
    { id: 10, room: 'hall', name: 'Stereo system', type: 'toggle', value: false },
    { id: 11, room: 'bedroom', name: 'Lamp 1', type: 'slider', value: 10 },
    { id: 12, room: 'bedroom', name: 'Play Station 4', type: 'toggle', value: true },
    { id: 13, room: 'kitchen', name: 'Lamp 2', type: 'slider', value: 30 },
    { id: 14, room: 'kitchen', name: 'Computer', type: 'toggle', value: false }
];

export default function ApplianceControlCard() {
    // State to track selected room tab
    const [selectedRoom, setSelectedRoom] = useState<string>('all');
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
        <div className="w-full h-full theme-card-bg rounded-2xl theme-shadow-strong p-4 flex flex-col">
            {/* Header with room tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-x-2 space-y-3 sm:space-y-0">
                <h1 className="text-sm font-bold theme-text-primary">APPLIANCES</h1>
                <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
                    {rooms.map(room => (
                        <button
                            key={room.id}
                            onClick={() => setSelectedRoom(room.id)}
                            className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-medium transition-colors ${
                                selectedRoom === room.id
                                    ? 'theme-text-secondary theme-bg-primary'
                                    : 'theme-bg-tertiary theme-text-tertiary hover:opacity-70'
                            }`}
                        >
                            {room.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Appliance Controls */}
            <div className="flex-1 overflow-y-auto hide-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {/* Toggle Controls */}
                    <div className="space-y-3">
                        {visibleAppliances
                            .filter(app => app.type === 'toggle')
                            .map(app => (
                                <div key={app.id} className="flex items-center justify-between">
                                    <span className="theme-text-secondary text-xs md:text-sm tracking-wide font-bold">
                                        {app.name}
                                    </span>
                                    <button
                                        onClick={() => handleToggle(app.id)}
                                        className="relative inline-flex items-center h-4 w-7 rounded-full focus:outline-none"
                                        style={{ background: 'var(--gradient-bg)' }}
                                    >
                                        <span
                                            className={`inline-block w-3 h-3 transform rounded-full shadow transition-transform duration-200 ${
                                                app.value ? 'translate-x-3.5 theme-text-primary' : 'translate-x-1 bg-white'
                                            }`}
                                            style={{ backgroundColor: app.value ? 'var(--text-primary)' : 'white' }}
                                        />
                                    </button>
                                </div>
                            ))}
                    </div>

                    {/* Slider Controls */}
                    <div className="space-y-3">
                        {visibleAppliances
                            .filter(app => app.type === 'slider')
                            .map(app => (
                                <div key={app.id} className="flex items-center justify-between">
                                    <span className="theme-text-secondary font-bold text-xs md:text-sm tracking-wide w-20 truncate">
                                        {app.name}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        {typeof app.value === 'number' && (
                                            <input
                                                type="range"
                                                min={0}
                                                max={100}
                                                value={app.value}
                                                onChange={(e) => handleSliderChange(app.id, Number(e.target.value))}
                                                className="w-16 sm:w-20 h-[3px] appearance-none theme-bg-tertiary rounded-full cursor-pointer
                                                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[10px]
                                                [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:rounded-full
                                                [&::-webkit-slider-thumb]:cursor-pointer
                                                [&::-moz-range-thumb]:h-[10px] [&::-moz-range-thumb]:w-[10px]
                                                [&::-moz-range-thumb]:rounded-full
                                                [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                                                style={{
                                                    background: `linear-gradient(to right, var(--text-primary) ${app.value}%, var(--bg-tertiary) ${app.value}%)`,
                                                }}
                                            />
                                        )}
                                        <span className="text-xs theme-text-tertiary w-8 text-right">
                                            {app.value}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
