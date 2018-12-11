import React from "react";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import LineChart from "recharts/lib/chart/LineChart";
import Line from "recharts/lib/cartesian/Line";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Tooltip from "recharts/lib/component/Tooltip";
import Legend from "recharts/lib/component/Legend";

const data = [
    { name: "Segunda", Visitas: 220, Vendas: 340 },
    { name: "Terça", Visitas: 128, Vendas: 239 },
    { name: "Quarta", Visitas: 500, Vendas: 430 },
    { name: "Quinta", Visitas: 478, Vendas: 290 },
    { name: "Sexta", Visitas: 589, Vendas: 480 },
    { name: "Sabado", Visitas: 439, Vendas: 380 },
    { name: "Domingo", Visitas: 449, Vendas: 430 }
];

function WeekSalesChart() {
    return (
        // 99% per https://github.com/recharts/recharts/issues/172
        <ResponsiveContainer width="99%" height={320}>
            <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Visitas" stroke="#82ca9d" />
                <Line
                    type="monotone"
                    dataKey="Vendas"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default WeekSalesChart;
