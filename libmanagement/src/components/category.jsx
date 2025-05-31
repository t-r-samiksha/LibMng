
// import '../styles/category.css';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS } from 'chart.js/auto';
// import { useState, useEffect } from 'react';
// import axios from "axios"

// function Category() {

//   const [totalbooks,settotalbooks] = useState(0)
//   const [bdata,setbdata] = useState([])

//   const fetchAPI = async ()=>{
//     const res = await axios.get('http://localhost:8080/progress')
//     console.log(res.data)
//     settotalbooks(res.data.total)
//     setbdata(res.data.catarray)
//   }

//   useEffect(()=>{
//     fetchAPI()
//   },[])

//   const percentage = bdata.map(n => ((n/totalbooks)*100).toFixed(2))
//   console.log('p:',percentage)

//   const data = {
//     labels: ['Fiction', 'Mystery', 'Sci-Fi', 'Biography'],
//     datasets: [
//       {
//         label: 'Book Categories',
//         data: bdata,
//         backgroundColor: ['#7755aa', '#e55164', '#e59e37', '#299263'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     cutout: '85%',
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//   };

//   return (
//     <div className="box">
//       <p className="boxtitle">Category in Anna library</p>

//       {/* Doughnut Chart with Centered Text */}
//       <div className="chart-wrapper">
//         <Doughnut data={data} options={options} />
//         <div className="chartcenter">
//           <p className="amount">{totalbooks}</p>
//           <p className="change positive">↑ 5.3%</p>
//         </div>
//       </div>

//       <div className="side">
//         <div className="legend">
//           <div className="item">
//             <span className="ldot" style={{ backgroundColor: '#7755aa' }}></span>
//             Fiction <span>{percentage[0]}%</span>
//           </div>
//           <div className="item">
//             <span className="ldot" style={{ backgroundColor: '#e55164' }}></span>
//             Mystery <span>2{percentage[1]}%</span>
//           </div>
//           <div className="item">
//             <span className="ldot" style={{ backgroundColor: '#e59e37' }}></span>
//             Sci-Fi <span>{percentage[2]}%</span>
//           </div>
//           <div className="item">
//             <span className="ldot" style={{ backgroundColor: '#299263' }}></span>
//             Biography <span>{percentage[3]}%%</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Category;

import '../styles/category.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../context/usercontext.jsx';
import { useContext } from 'react';

function Category() {

  const {user} = useContext(UserContext)

  const [totalBooks, setTotalBooks] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);

  const fetchAPI = async () => {
    const res = await axios.get(`http://localhost:8080/progress?name=${user.name}`);
    setTotalBooks(res.data.total);
    setMonthlyData(res.data.monthlyData);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Books Read',
        data: monthlyData,
        fill: true,
        backgroundColor: '#68388938', // Light green
        borderColor: '#551c7d',
        tension: 0.4,
        pointBackgroundColor: '#39075b',
        pointBorderColor: '#fff',
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#111827',
        bodyColor: '#111827',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        callbacks: {
          label: (context) => `Books: ${context.parsed.y}`
        }
      }
    },
    scales: {
      x: {
        grid: { color: '#e5e7eb' },
        ticks: { color: '#374151' }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#e5e7eb' },
        ticks: { color: '#374151' }
      }
    }
  };

  return (
    <div className="light-box">
      <div className="header">
        <div>
          <p className="title"><img src="https://cdn-icons-png.flaticon.com/128/2417/2417791.png" alt="" height={20} /> Total Books Read</p>
          <p className="big-number">{totalBooks}</p>
          {/* <p className="growth">+12.3% <span className="label">vs previous year</span></p> */}
          <p className="label">You’re doing great, keep it up!</p>
        </div>
        {/* <button className="dropdown">Last 12 months ⌄</button> */}
      </div>

      <div className="line-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default Category;


