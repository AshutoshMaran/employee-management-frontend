import React, { useState, useEffect } from 'react'; 
import { FaSearch } from 'react-icons/fa';

const gradingLabels = [
  { min: 0, max: 1, label: 'Unsatisfactory' },
  { min: 1, max: 2, label: 'Needs Improvement' },
  { min: 2, max: 3, label: 'Satisfactory' },
  { min: 3, max: 4, label: 'Good' },
  { min: 4, max: 5.1, label: 'Excellent' },
];

const criteria = [
  'Technical Skills',
  'Team Collaboration',
  'Communication Skills',
  'Adaptability and Learning',
  'Behavior and Professionalism',
];



const getGradingLabel = (score) => {
  return gradingLabels.find(g => score >= g.min && score < g.max)?.label || 'Excellent';
};


const allEmployees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Michael Johnson' },
  { id: 4, name: 'Emily Davis' }
];

const EmployeeEvaluation = () => {
  const [employees, setEmployees] = useState([]);
  const [saveMessage, setSaveMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('employees');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setEmployees(parsed);
      }
    }
  }, []);
  
  const saveToLocalStorage = () => {
    localStorage.setItem('employees', JSON.stringify(employees));
    setSaveMessage('✅ Data saved successfully!');

    if (selectedMonth) {
      const monthKey = `averages-${selectedMonth}`;
      const monthData = employees.map((e) => ({
        name: e.name,
        average: getAverageScore(e.scores)
      }));
      localStorage.setItem(monthKey, JSON.stringify(monthData));
    }

    setTimeout(() => setSaveMessage(''), 3001);
  };

  const handleSearchSubmit = () => {
    if (!searchTerm.trim()) return;

    const emp = allEmployees.find(
      e => e.name.toLowerCase() === searchTerm.trim().toLowerCase()
    );

    if (!emp) return alert('Employee not found.');
    if (employees.some(e => e.name.toLowerCase() === emp.name.toLowerCase()))
      return alert('Already added.');

    const newEmployee = {
      name: emp.name,
      scores: criteria.reduce((acc, c) => ({ ...acc, [c]: 0 }), {}),
    };

    setEmployees([...employees, newEmployee]);
    setSearchTerm('');
  };

  const handleScoreChange = (empIndex, criterion, value) => {
    const updatedEmployees = employees.map((emp, i) => {
      if (i === empIndex) {
        return {
          ...emp,
          scores: {
            ...emp.scores,
            [criterion]: parseFloat(value),
          },
        };
      }
      return emp;
    });
    setEmployees(updatedEmployees);
  };

  const getAverageScore = (scores) => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    return total / criteria.length;
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Employee Evaluation</h3>

      
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter employee name"
          className="border border-gray-400 px-3 py-2 rounded w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-400 px-3 py-2 rounded"
        >
          <option value="">Select Month</option>
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <button
          onClick={handleSearchSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <FaSearch />
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-2xl p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-800 uppercase tracking-wide text-xs">
              <tr>
                <th className="px-4 py-3 border text-left rounded-tl-lg">Employee Name</th>
                {criteria.map((criterion, i) => (
                  <th key={i} className="px-4 py-3 border text-center">{criterion}</th>
                ))}
                <th className="px-4 py-3 border text-center">Average</th>
                <th className="px-4 py-3 border text-center rounded-tr-lg">Overall Grade</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, i) => {
                const avg = getAverageScore(emp.scores);
                const isLastRow = i === employees.length - 1;
                return (
                  <tr
                    key={i}
                    className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition`}
                  >
                    <td className={`px-4 py-3 border ${isLastRow ? 'rounded-bl-lg' : ''}`}>
                      {emp.name}
                    </td>
                    {criteria.map((c, j) => (
                      <td key={j} className="px-4 py-3 border text-center">
                        <select
                          className="border border-gray-300 rounded px-2 py-1"
                          value={emp.scores[c]}
                          onChange={(e) => handleScoreChange(i, c, e.target.value)}
                        >
                          {[...Array(11)].map((_, k) => {
                            const val = +(k * 0.5).toFixed(1);
                            return <option key={k} value={val}>{val}</option>;
                          })}
                        </select>
                      </td>
                    ))}
                    <td className="px-4 py-3 border text-center font-semibold text-blue-600">
                      {avg.toFixed(2)}
                    </td>
                    <td className={`px-4 py-3 border text-center ${isLastRow ? 'rounded-br-lg' : ''}`}>
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-lg">
                        {getGradingLabel(avg)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={saveToLocalStorage}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
          {saveMessage && <span className="text-green-600 font-semibold">{saveMessage}</span>}
        </div>
      </div>
    </div>
  );
};

export default EmployeeEvaluation;
