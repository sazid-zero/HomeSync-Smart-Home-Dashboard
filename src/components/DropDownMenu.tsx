import { Menu } from '@headlessui/react';
import React from "react";
import { FaCaretDown } from 'react-icons/fa';

type TimeRangeDropdownProps = {
    selected: string;
    setSelected: (value: string) => void;
};

const TimeRangeDropdown: React.FC<TimeRangeDropdownProps> = ({ selected, setSelected }) => {
    const options = ['Today', 'This Week', 'This Month'];

    return (
        <Menu as="div" className=" relative inline-block text-left">
            <Menu.Button className="inline-flex justify-between items-center w-16 h-6 rounded-md bg-black px-2 text-[7px] font-medium text-white hover:bg-gray-600 focus:outline-none">
                <span>{selected}</span>
                <span><FaCaretDown className="text-white h-2 w-2"/></span>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                {options.map((option) => (
                    <Menu.Item key={option}>
                        {({ active }) => (
                            <button
                                onClick={() => setSelected(option)}
                                className={`${
                                    active ? 'bg-blue-500 text-white' : 'text-gray-700'
                                } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                            >
                                {option}
                            </button>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    );
};

export default TimeRangeDropdown;
