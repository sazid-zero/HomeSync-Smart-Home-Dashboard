
import React, {useState} from 'react';
import TimeRangeDropdown from "../components/DropDownMenu.tsx";
import TemperatureChart from "../components/TemperatureChart.tsx";
import ApplianceControlCard from "../components/ApplianceControlCard.tsx";
import { useTheme } from "../contexts/ThemeContext.tsx";

const devices = [
    { id: 1, name: "Air Condition", units: 2, power: "52kw", iconSrc: "/air-conditioner.png" },
    { id: 2, name: "Smart Lamp", units: 8, power: "12kw", iconSrc: "/light-bulb.png" },
    { id: 3, name: "Smart TV", units: 5, power: "21kw", iconSrc: "/monitor.png" },
    { id: 4, name: "Speaker", units: 1, power: "42kw", iconSrc: "/speaker.png" },
    { id: 5, name: "Fan", units: 3, power: "19kw", iconSrc: "/ceiling-fan.png" },
    { id: 6, name: "Heater", units: 1, power: "33kw", iconSrc: "/heating.png" },
];

interface DeviceCardProps {
    name: string;
    status: string;
    power: string;
    image: string;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ name, status, power, image }) => {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOn(!isOn);
    };

    return (
        <div className="w-full max-w-[280px] h-[160px] theme-card-bg rounded-3xl theme-shadow-strong p-4 flex justify-between">
            <div className="flex flex-col justify-between h-full">
                <div className="flex items-center">
                    <img src={image} alt="icon" className="w-6 h-6 rounded-sm theme-icon-filter" />
                </div>
                <div className="flex flex-col space-y-1">
                    <div className="text-base font-bold theme-text-primary">{name}</div>
                    <div className="theme-text-secondary text-xs">{status}</div>
                </div>
            </div>
            <div className="flex flex-col justify-between h-full items-end">
                <div
                    className="w-12 h-6 rounded-full p-1 cursor-pointer"
                    style={{ background: 'var(--gradient-bg)' }}
                    onClick={handleToggle}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <div
                        className={`w-4 h-4 rounded-full transition-transform duration-200 ${
                            isOn ? 'translate-x-6 theme-text-primary' : 'translate-x-0 bg-white'
                        }`}
                        style={{ backgroundColor: isOn ? 'var(--text-primary)' : 'white' }}
                    ></div>
                </div>
                <div className="text-right">
                    <div className="text-xl theme-text-primary font-bold tracking-[-0.2em]">---</div>
                    <div className="text-xs bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold bg-clip-text text-transparent">
                        {power}
                    </div>
                </div>
            </div>
        </div>
    );
};

const HumidityControl = () => {
    const [humidity, setHumidity] = useState(60);

    const setPreset = (value: number) => {
        setHumidity(value);
    };

    return (
        <div className="pt-6 space-y-6 w-full">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold theme-text-primary">Humidity</h3>
                <span className="text-xl font-bold theme-text-primary">{humidity}%</span>
            </div>

            <div className="relative w-full">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={humidity}
                    onChange={(e) => setHumidity(Number(e.target.value))}
                    className="w-full h-2 appearance-none bg-gray-300 rounded-full
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-white
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-black
                        [&::-webkit-slider-thumb]:shadow
                        [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:bg-white
                        [&::-moz-range-thumb]:border-2
                        [&::-moz-range-thumb]:border-black"
                    style={{
                        background: `linear-gradient(to right, black ${humidity}%, #e5e7eb ${humidity}%)`,
                    }}
                />
            </div>

            <div className="flex justify-center items-center space-x-4">
                <button
                    onClick={() => setPreset(50)}
                    className={`h-12 w-16 text-sm py-2 rounded-2xl shadow-[0_10px_10px_rgba(0,0,0,0.3)] ${
                        humidity === 50 ? "bg-gray-100" : "bg-gray-300"
                    }`}
                >
                    Auto
                </button>
                <button
                    onClick={() => setPreset(30)}
                    className={`h-12 w-16 text-sm py-2 rounded-2xl shadow-[0_10px_10px_rgba(0,0,0,0.3)] ${
                        humidity === 30 ? "bg-gray-100" : "bg-gray-300"
                    }`}
                >
                    30%
                </button>
                <button
                    onClick={() => setPreset(60)}
                    className={`h-12 w-16 text-sm py-2 rounded-2xl shadow-[0_10px_10px_rgba(0,0,0,0.3)] ${
                        humidity === 60 ? "bg-gray-100" : "bg-gray-300"
                    }`}
                >
                    60%
                </button>
            </div>
        </div>
    );
};

const TemperatureControl: React.FC = () => {
    const [temperature, setTemperature] = useState(12);
    const [mode, setMode] = useState('HEATING');

    const rotation = ((temperature - 10) / 20) * 180;

    const handleTemperatureChange = (delta: number) => {
        setTemperature((prev) => Math.min(Math.max(prev + delta, 10), 30));
    };

    const handleModeChange = (newMode: string) => {
        setMode(newMode);
    };

    return (
        <div className="w-full pt-4 px-6 pb-4 theme-card-bg rounded-2xl flex flex-col">
            <div className="flex justify-between">
                <h3 className="text-xl font-bold theme-text-primary">Temperature</h3>
                <h3 className="text-xl font-bold theme-text-primary">:</h3>
            </div>
            <div className="flex justify-center items-center w-full mt-8">
                <div className="relative w-60 h-60 rounded-full border border-gray-200 shadow-[0_8px_10px_rgba(0,0,0,0.3)]">
                    <div className="relative w-full h-full bg-gray-300 rounded-full border-12 border-gray-300">
                        <div className="absolute w-full h-full rounded-full">
                            {Array.from({ length: 21 }, (_, i) => {
                                const angle = (i * 180) / 20 - 270;
                                return (
                                    <div
                                        key={i}
                                        className="absolute w-[2px] h-[10px] bg-gray-400 shadow-[0_0_10px_rgba(0,0,0,0.6)]"
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            transform: `rotate(${angle}deg) translateY(134px)`,
                                            transformOrigin: 'center center',
                                        }}
                                    />
                                );
                            })}
                        </div>
                        <div
                            className="absolute w-full h-full rounded-full overflow-hidden"
                            style={{
                                clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
                                transform: `rotate(${rotation}deg)`,
                                transformOrigin: 'center',
                            }}
                        >
                            <div className="w-full h-full bg-gradient-to-t from-black via-gray-500 to-gray-400 shadow-[0_0_10px_rgba(0,0,0,0.3)]"></div>
                        </div>
                        <div className="absolute w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl">
                            <div className="absolute w-42 h-42 rounded-full bg-gray-200 border border-black/2 shadow-2xl flex flex-col items-center pt-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="text-gray-500 text-sm font-bold uppercase">{mode}</div>
                                <div className="text-5xl font-bold text-gray-400">{temperature}</div>
                                <img src="/leaf.png" alt="icon" className="h-8 w-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex space-x-4 mt-8 w-full justify-center">
                {['Heating', 'Cooling', 'Dry'].map((m) => (
                    <button
                        key={m}
                        className={`w-20 h-16 rounded-lg flex flex-col items-center justify-center bg-white border-2 shadow-[0_10px_10px_rgba(0,0,0,0.3)] ${
                            mode === m ? 'border-blue-500' : 'border-gray-200'
                        } hover:bg-gray-100`}
                        onClick={() => handleModeChange(m)}
                    >
                        <img
                            src={`/${m.toLowerCase()}.png`}
                            alt={m}
                            className="h-6 w-6"
                        />
                        <span className="text-xs font-semibold">{m}</span>
                    </button>
                ))}
            </div>
            <div className="mt-4 flex space-x-2 w-full justify-center items-center">
                <button
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-300 to-gray-200 flex items-center justify-center text-lg font-bold"
                    onClick={() => handleTemperatureChange(-1)}
                >
                    -
                </button>
                <button
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-300 to-gray-200 flex items-center justify-center text-lg font-bold"
                    onClick={() => handleTemperatureChange(1)}
                >
                    +
                </button>
            </div>
        </div>
    );
};

const AirQuality: React.FC = () => (
    <div className="flex flex-col space-y-4 w-full">
        <div className="pt-6 flex justify-between text-xl font-bold">
            <div className="theme-text-primary">Air Quality</div>
            <div className="theme-text-primary">Good</div>
        </div>

        <div className="flex justify-between space-x-4">
            <div className="flex-1 h-24 p-3 bg-white border-2 border-gray-300 rounded-xl shadow-[0_10px_10px_rgba(0,0,0,0.2)] flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <img src="/molecules.png" className="w-6 h-6" alt="icon" />
                    <h1 className="text-sm font-bold">Moderate</h1>
                </div>
                <div className="flex justify-between items-center">
                    <span className="flex items-end">
                        <h1 className="text-sm font-bold">CO</h1>
                        <h1 className="text-xs">2</h1>
                    </span>
                    <span className="flex items-end">
                        <h1 className="text-sm font-bold">874</h1>
                        <h1 className="text-xs font-semibold">ppm</h1>
                    </span>
                </div>
            </div>
            <div className="flex-1 h-24 p-3 bg-white border-2 border-gray-300 rounded-xl shadow-[0_10px_10px_rgba(0,0,0,0.2)] flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <img src="/virus.png" className="w-6 h-6" alt="icon" />
                    <h1 className="text-sm font-bold">Excellent</h1>
                </div>
                <div className="flex justify-between items-center">
                    <h1 className="text-sm font-bold">Pollutant</h1>
                    <span className="flex items-end">
                        <h1 className="text-sm font-bold">60</h1>
                        <h1 className="text-xs font-semibold">AQN</h1>
                    </span>
                </div>
            </div>
        </div>
    </div>
);

const UsageStats: React.FC = () => {
    const [selectedRange, setSelectedRange] = useState('Today');
    return (
        <div className="w-full h-full theme-card-bg rounded-2xl theme-shadow-strong p-4 flex flex-col">
            <div className="flex justify-between items-center mb-3">
                <h1 className="text-sm font-bold theme-text-primary">Usage Status</h1>
                <TimeRangeDropdown selected={selectedRange} setSelected={setSelectedRange}/>
            </div>
            <div className="flex-1 min-h-[180px]">
                <TemperatureChart selectedRange={selectedRange}/>
            </div>
        </div>
    );
};

const Appliances: React.FC = () => (
    <div className="w-full h-full">
        <ApplianceControlCard/>
    </div>
);

const PowerConsumption: React.FC = () => (
    <div className="w-full h-auto min-h-[280px] theme-card-bg rounded-xl p-4 theme-shadow-strong flex flex-col space-y-4">
        <h3 className="text-sm font-bold theme-text-primary">Device Power Consumption</h3>
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-4 space-y-3 max-h-[220px]">
            {devices.map((device) => (
                <div key={device.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 theme-bg-tertiary flex items-center justify-center rounded-xl theme-shadow-strong">
                            <img src={device.iconSrc} alt={device.name} className="w-5 h-5 object-contain theme-icon-filter" />
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-sm font-bold theme-text-primary">{device.name}</h4>
                            <span className="text-xs theme-text-secondary">{device.units} unit</span>
                        </div>
                    </div>
                    <span className="text-sm font-bold theme-text-primary">{device.power}</span>
                </div>
            ))}
        </div>
    </div>
);

const Occupant: React.FC = () => {
    const data = [
        { id: 1, name: "Sazid", imgSrc: "/profile/sazid.jpg" },
        { id: 2, name: "Juthi", imgSrc: "/profile/sharmin.jpg" },
        { id: 3, name: "Shafayat", imgSrc: "/profile/shafayat.jpg" },
        { id: 4, name: "Jui", imgSrc: "/profile/jui.jpg" }
    ];

    return (
        <div className="w-full min-h-[286px] theme-card-bg rounded-2xl theme-shadow-strong p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-sm font-bold theme-text-primary">Occupant</h1>
                <h3 className="text-xs font-semibold theme-text-secondary">See All {'->'}</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
                {data.map((item) => (
                    <div key={item.id} className="flex flex-col items-center space-y-2">
                        <img src={item.imgSrc} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
                        <h1 className="text-xs font-semibold text-center theme-text-primary">{item.name}</h1>
                    </div>
                ))}
                <div className="flex flex-col items-center space-y-2">
                    <button className="w-12 h-12 theme-bg-tertiary rounded-md flex items-center justify-center text-lg font-bold theme-text-primary">+</button>
                    <span className="text-xs text-transparent">Add</span>
                </div>
            </div>
        </div>
    );
};

const Sidebar: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="hidden lg:flex w-60 theme-bg-secondary min-h-screen pt-10 pl-9 flex-col space-y-6 flex-shrink-0">
            <div className="flex items-center space-x-2 pr-4">
                <img src="/profile.jpg" alt="User" className="rounded-full h-12 w-12" />
                <div className="flex flex-col space-y-1 pl-1">
                    <span className="text-xs font-semibold theme-text-tertiary">Welcome back</span>
                    <span className="text-sm font-bold theme-text-primary">Sharif Mahmud</span>
                </div>
            </div>
            <div className="flex flex-col space-y-8 pt-4 pl-8 theme-text-primary">
                <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                    <span className="text-lg">🏠</span>
                    <span>Dashboard</span>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                    <span className="text-lg">🏠</span>
                    <span>Rooms</span>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                    <span className="text-lg">🕒</span>
                    <span>Recent</span>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                    <span className="text-lg">🔖</span>
                    <span>Bookmark</span>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                    <span className="text-lg">🔔</span>
                    <span>Notification</span>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                    <span className="text-lg">📥</span>
                    <span>Downloaded</span>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                    <span className="text-lg">🆘</span>
                    <span>Support</span>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer hover:opacity-70">
                    <span className="text-lg">⚙️</span>
                    <span>Setting</span>
                </div>
                <div
                    className="flex items-center space-x-3 cursor-pointer hover:opacity-70"
                    onClick={toggleTheme}
                >
                    <span className="text-lg">{isDarkMode ? '☀️' : '🌙'}</span>
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </div>
            </div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    return (
        <div className="flex min-h-screen theme-bg-primary">
            <Sidebar />
            <div className="flex-1 w-full md:ml-0 p-4 md:p-6 lg:p-8">
                <div className="flex flex-col xl:flex-row gap-4 md:gap-6 xl:gap-8">
                    <div className="flex-1 flex flex-col space-y-4 md:space-y-6">
                        <span className="text-lg md:text-xl font-bold theme-text-primary">My Devices</span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                            <DeviceCard name="Smart TV" status="Active for 3 hours" power="5kWh" image="/monitor.png"/>
                            <DeviceCard name="Speaker" status="Active for 4 hours" power="5kWh" image="/speaker.png"/>
                            <DeviceCard name="Router" status="Active for 3 hours" power="5kWh" image="/router.png"/>
                            <DeviceCard name="WiFi" status="Active for 3 hours" power="5kWh" image="/hotspot.png"/>
                            <DeviceCard name="Heater" status="Active for 3 hours" power="5kWh" image="/water-heater.png"/>
                            <DeviceCard name="Socket" status="Active for 3 hours" power="5kWh" image="/plug.png"/>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                            <div className="h-[280px] md:h-[320px]">
                                <UsageStats />
                            </div>
                            <div className="h-[280px] md:h-[320px]">
                                <Appliances />
                            </div>
                            <div className="lg:col-span-1">
                                <PowerConsumption />
                            </div>
                            <div className="lg:col-span-1">
                                <Occupant />
                            </div>
                        </div>
                    </div>

                    <div className="w-full xl:w-96 xl:min-w-[384px]">
                        <div className="theme-card-bg theme-shadow-strong rounded-2xl p-4 md:p-6">
                            <TemperatureControl />
                            <HumidityControl />
                            <AirQuality />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
