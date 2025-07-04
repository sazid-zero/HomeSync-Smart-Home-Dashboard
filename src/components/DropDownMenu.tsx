
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
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex justify-between items-center w-16 sm:w-20 h-6 sm:h-7 rounded-md theme-bg-primary px-2 text-xs sm:text-sm font-medium theme-text-primary hover:opacity-70 focus:outline-none">
                <span className="truncate">{selected}</span>
                <span><FaCaretDown className="theme-text-primary h-2 w-2 ml-1"/></span>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-32 sm:w-40 origin-top-right rounded-md theme-card-bg theme-shadow-strong ring-1 theme-border ring-opacity-5 focus:outline-none z-50">
                {options.map((option) => (
                    <Menu.Item key={option}>
                        {({ active }) => (
                            <button
                                onClick={() => setSelected(option)}
                                className={`${
                                    active ? 'bg-blue-500 text-white' : 'theme-text-primary'
                                } group flex w-full items-center rounded-md px-3 py-2 text-xs sm:text-sm`}
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
