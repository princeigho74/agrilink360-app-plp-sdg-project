const { useEffect, useState } = React;

export default function Dashboard(){
  const [orders,setOrders]=useState([
    {id:'A101',customer:'John Doe',quantity:10,status:'Delivered'},
    {id:'A102',customer:'Jane Smith',quantity:5,status:'Pending'},
    {id:'A103',customer:'Mark Lee',quantity:8,status:'In Transit'},
  ]);

  useEffect(()=>{
    const ctx=document.getElementById('ordersChart');
    if(ctx){
      new Chart(ctx,{
        type:'line',
        data:{
          labels:['Jan','Feb','Mar','Apr','May'],
          datasets:[{
            label:'Orders',
            data:[12,19,3,5,2],
            backgroundColor:'rgba(34,197,94,0.2)',
            borderColor:'rgba(34,197,94,1)',
            borderWidth:2,
            fill:true,
            tension:0.3
          }]
        },
        options:{responsive:true,maintainAspectRatio:false}
      });
    }
  },[]);

  return (
    <div className="p-4 space-y-6">
      <section className="bg-white p-6 rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">🌍 AgriLink360 Dashboard</h2>
        <p className="text-gray-600">Smart farming insights and order monitoring</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-700 font-bold">Total Orders</h2>
          <p className="text-2xl font-bold">{orders.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-700 font-bold">Stock Level</h2>
          <p className="text-2xl font-bold">150</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-700 font-bold">IoT Devices</h2>
          <p className="text-sm text-gray-700">Monitoring active devices</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow h-80">
        <canvas id="ordersChart"></canvas>
      </div>
    </div>
  );
}
