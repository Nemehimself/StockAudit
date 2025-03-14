import React from 'react';
import { FaRegSnowflake, FaLeaf, FaSun, FaCanadianMapleLeaf } from 'react-icons/fa';

interface Season {
    name: string;
    icon: React.ReactElement;
    color: string;
    price: number;
    startDate: string;
    endDate: string;
}

export const getSeasonDates = (year: number): Season[] => {
    return [
        {
            name: 'Winter',
            icon: React.createElement(FaRegSnowflake, { className: "text-cyan-500 w-6 h-6" }),
            color: 'bg-cyan-300',
            price: 0,
            startDate: `${year - 1}-12-01`, // Previous year Dec
            endDate: `${year}-02-28`, // Current year Feb
        },
        {
            name: 'Spring',
            icon: React.createElement(FaLeaf, { className: "text-lime-500 w-6 h-6" }),
            color: 'bg-lime-300',
            price: 0,
            startDate: `${year}-03-01`,
            endDate: `${year}-05-31`,
        },
        {
            name: 'Summer',
            icon: React.createElement(FaSun, { className: "text-yellow-500 w-6 h-6" }),
            color: 'bg-yellow-300',
            price: 0,
            startDate: `${year}-06-01`,
            endDate: `${year}-08-31`,
        },
        {
            name: 'Autumn',
            icon: React.createElement(FaCanadianMapleLeaf, { className: "text-orange-500 w-6 h-6" }),
            color: 'bg-orange-300',
            price: 0,
            startDate: `${year}-09-01`,
            endDate: `${year}-11-30`,
        },
    ];
};