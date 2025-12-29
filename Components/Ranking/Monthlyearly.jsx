import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const Dropdown = ({ label, options, selected, setSelected }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between items-center w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-sm text-gray-700 hover:bg-gray-100 shadow-sm"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{label}{selected && `: ${selected}`}</span>
        <span className="ml-2 text-gray-500">▼</span>
      </button>
      {open && (
        <div
          className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto"
          role="listbox"
        >
          {options.map(option => (
            <button
              key={option}
              onClick={() => { setSelected(option); setOpen(false); }}
              className={`block w-full text-left px-4 py-2 hover:bg-blue-100 transition ${
                selected === option ? 'bg-blue-50 font-medium' : ''
              }`}
              role="option"
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Monthlyearly = () => {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const quarters = ['Jan-Mar','Apr-Jun','Jul-Sep','Oct-Dec'];
  const years = [2025,2026,2027,2028,2029,2030];

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [monthlyData, setMonthlyData] = useState([]);
  const [quarterData, setQuarterData] = useState(null);
  const [yearData, setYearData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (selectedMonth) {
      const raw = localStorage.getItem(`averages-${selectedMonth}`);
      setMonthlyData(raw ? JSON.parse(raw) : []);
    } else {
      setMonthlyData([]);
    }
  }, [selectedMonth]);

  useEffect(() => {
    if (selectedQuarter) {
      const [start, end] = selectedQuarter.split('-').map(m =>
        months.findIndex(x => x.startsWith(m))
      );
      const all = [];
      for (let idx = start; idx <= end; idx++) {
        const raw = localStorage.getItem(`averages-${months[idx]}`);
        if (raw) {
          const arr = JSON.parse(raw);
          arr.forEach(e => {
            let existing = all.find(x => x.name === e.name);
            if (existing) {
              existing.total += e.average;
              existing.count++;
            } else {
              all.push({ name: e.name, total: e.average, count: 1 });
            }
          });
        }
      }
      const result = all.map(e => ({
        name: e.name,
        average: e.total / e.count
      }));
      setQuarterData(result);
    } else {
      setQuarterData(null);
    }
  }, [selectedQuarter]);

  useEffect(() => {
    if (selectedYear) {
      const all = [];
      for (let idx = 0; idx < 12; idx++) {
        const raw = localStorage.getItem(`averages-${months[idx]}`);
        if (raw) {
          JSON.parse(raw).forEach(e => {
            let existing = all.find(x => x.name === e.name);
            if (existing) {
              existing.total += e.average;
              existing.count++;
            } else {
              all.push({ name: e.name, total: e.average, count: 1 });
            }
          });
        }
      }
      const result = all.map(e => ({
        name: e.name,
        average: e.total / e.count
      }));
      setYearData(result);
    } else {
      setYearData(null);
    }
  }, [selectedYear]);

  const getDataToRender = () => {
    if (selectedYear && yearData) return yearData;
    if (selectedQuarter && quarterData) return quarterData;
    return monthlyData;
  };

  const filteredData = getDataToRender().filter(e =>
    e.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const renderRows = () => {
    if (filteredData.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="text-center py-6 text-gray-500">
            No data available for the selected filter{searchTerm ? ' and search term.' : '.'}
          </td>
        </tr>
      );
    }

    return filteredData.map((e, i) => {
      const isLast = i === filteredData.length - 1;
      return (
        <tr
          key={i}
          className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition`}
        >
          <td className={`px-4 py-3 border text-center ${isLast ? 'rounded-bl-lg' : ''}`}>{i + 1}</td>
          <td className="px-4 py-3 border font-medium text-gray-800">{e.name}</td>
          <td className="px-4 py-3 border text-center text-blue-600">{e.average.toFixed(2)}</td>
          <td className="px-4 py-3 border text-center">{selectedQuarter || '-'}</td>
          <td className={`px-4 py-3 border text-center ${isLast ? 'rounded-br-lg' : ''}`}>{selectedYear || '-'}</td>
        </tr>
      );
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Employee Evaluation Table
      </h2>

      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex justify-center items-center gap-2 max-w-md mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search employee name..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Search employee name"
            />
            <FaSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
          >
            Search
          </button>
        </div>
      </div>

     
      <div className="bg-white shadow-2xl rounded-xl p-6 max-w-6xl mx-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-800 uppercase tracking-wide text-xs">
              <tr>
                <th className="px-4 py-3 border text-center rounded-tl-lg">S.No</th>
                <th className="px-4 py-3 border">Employee Name</th>
                <th className="px-4 py-3 border">
                  <Dropdown
                    label="Monthly"
                    options={months}
                    selected={selectedMonth}
                    setSelected={month => {
                      setSelectedMonth(month);
                      setSelectedQuarter('');
                      setSelectedYear('');
                      setSearchTerm('');
                      setSearchInput('');
                    }}
                  />
                </th>
                <th className="px-4 py-3 border">
                  <Dropdown
                    label="Quarterly"
                    options={quarters}
                    selected={selectedQuarter}
                    setSelected={quarter => {
                      setSelectedQuarter(quarter);
                      setSelectedMonth('');
                      setSelectedYear('');
                      setSearchTerm('');
                      setSearchInput('');
                    }}
                  />
                </th>
                <th className="px-4 py-3 border rounded-tr-lg">
                  <Dropdown
                    label="Yearly"
                    options={years}
                    selected={selectedYear}
                    setSelected={year => {
                      setSelectedYear(year);
                      setSelectedMonth('');
                      setSelectedQuarter('');
                      setSearchTerm('');
                      setSearchInput('');
                    }}
                  />
                </th>
              </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Monthlyearly;
