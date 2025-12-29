import React from 'react'; 
import { PieChart } from 'react-minimal-pie-chart';

const SuperPiechart = ({ data }) => {
  if (!data) return <div></div>; 

  const total = data.total || 1;
  
  const present = data.total - data.onLeave - data.inactive;
  const active = data.active;
  const onLeave = data.onLeave;
  const inactive = data.inactive;

  const getPercent = (value) => ((value / total) * 100).toFixed(0);

  return (
    <div className="w-full max-w-sm bg-gray-100 flex flex-col justify-center items-center py-6 px-4 mt-10 rounded-3xl shadow-md mx-auto">
      <div className="h-[180px] w-[180px] mb-4">
        <PieChart
          viewBoxSize={[130, 130]}
          lineWidth={55}
          data={[
            { title: 'Present', value: present, color: '#3182ce' },
            { title: 'On Leave', value: onLeave, color: '#f6e05e' },
            { title: 'Inactive', value: inactive, color: '#f56565' },
            { title: 'Active', value: active, color: '#117e2c' },
          ]}
        />
      </div>

      <div className="flex flex-col gap-4 w-full px-2">
        <ChartLegend label="Present" color="bg-blue-500" percent={getPercent(present)} />
        <ChartLegend label="On Leave" color="bg-yellow-400" percent={getPercent(onLeave)} />
        <ChartLegend label="Inactive" color="bg-red-500" percent={getPercent(inactive)} />
        <ChartLegend label="Active" color="bg-green-500" percent={getPercent(active)} />
      </div>
    </div>
  );
};

const ChartLegend = ({ label, color, percent }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 ${color} rounded-full`}></div>
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className="text-sm text-gray-600">{percent}%</span>
  </div>
);

export default SuperPiechart;
