import { faker } from "@faker-js/faker";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import dynamic from "next/dynamic";
import styles from "./chart.module.css";
import { useState } from "react";

const data = [
  {
    name: "January",
    sales: faker.datatype.number({ min: 100, max: 1000 }),
    id: faker.datatype.uuid(),
    fill: "rgba(119, 209, 215, 0.85)",
  },
  {
    name: "February",
    sales: faker.datatype.number({ min: 100, max: 1000 }),
    id: faker.datatype.uuid(),
    fill: "rgba(254, 106, 96, 0.85)",
  },
  {
    name: "March",
    sales: faker.datatype.number({ min: 100, max: 1000 }),
    id: faker.datatype.uuid(),
    fill: "rgba(253, 212, 93, 0.85)",
  },
  {
    name: "April",
    sales: faker.datatype.number({ min: 100, max: 1000 }),
    id: faker.datatype.uuid(),
    fill: "rgba(206, 94, 122, 0.85)",
  },
  {
    name: "May",
    sales: faker.datatype.number({ min: 100, max: 1000 }),
    id: faker.datatype.uuid(),
    fill: "rgba(128, 204, 255, 0.85)",
  },
];

const DinamicChart = () => {
  const [activeBarId, setActiveBarId] = useState<string | null>(null);

  const handleMouseOver = (id: string) => {
    setActiveBarId(id);
  };

  const handleMouseLeave = () => {
    setActiveBarId(null);
  };

  const renderBackground = (props: any) => {
    const { x, y, width, height, id } = props;
    const isActive = id === activeBarId;
    const fill = isActive ? "#292b2f" : "transparent";
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        style={{
          transition: "fill 0.3s ease-in-out",
        }}
      />
    );
  };

  const renderLegend = () => {
    return (
      <ul
        style={{
          display: "flex",
          gap: "10px",
          listStyle: "none",
          marginBottom: "15px",
          justifyContent: "center",
          fontFamily: "inter,sans-serif",
        }}
      >
        {data.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.fill }}>
            <span
              style={{
                backgroundColor: entry.fill,
                width: "10px",
                height: "10px",
                display: "inline-block",
                marginRight: "5px",
                borderRadius: "20%",
              }}
            ></span>
            {entry.name}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <ResponsiveContainer height={400}>
      <BarChart width={600} height={400} data={data}>
        <CartesianGrid
          strokeDasharray="3 0"
          vertical={false}
          opacity={0.5}
          strokeWidth={0.5}
        />
        <XAxis
          dataKey="name"
          style={{
            fontFamily: "inter,sans-serif",
          }}
        />
        <YAxis
          style={{
            fontFamily: "inter,sans-serif",
          }}
        />
        <Tooltip
          cursor={false}
          wrapperStyle={{
            width: 100,
          }}
        />
        <Legend content={renderLegend} verticalAlign="top" />
        <Bar
          background={renderBackground}
          onMouseOver={(event) => {
            const id = event?.payload?.id;
            if (id) {
              handleMouseOver(id);
            }
          }}
          onMouseLeave={handleMouseLeave}
          dataKey="sales"
          barSize={50}
          className={styles.bar}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default function Chart() {
  const Chart = dynamic(() => Promise.resolve(DinamicChart), {
    ssr: false,
  });

  return <Chart />;
}
