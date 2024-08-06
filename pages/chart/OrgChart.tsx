import React from 'react';

const OrgChart = ({ data }) => {
  console.log('data', data);
  return (
    <div className="flex flex-col items-center">
      <OrgChartNode node={data} />
    </div>
  );
};

const OrgChartNode = ({ node }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div className="flex flex-col items-center">
          <img src={`http://hr-admin-api.test/storage/employees/avatars/` + node.image} alt={node.name} className="w-16 h-16 rounded-full mb-2 border border-gray-300" />
          <h3 className="text-lg font-bold mt-2">{node.first_name} {node.last_name}</h3>
          <p>{node.position}</p>
        </div>
        {node.children && node.children.length > 0 && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 h-6 w-0.5 bg-blue-500"></div>
        )}
      </div>
      {node.children && node.children.length > 0 && (
        <div className="relative flex items-start justify-center space-x-4">
          {node.children.map((child, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                {index !== 0 && <div className="w-6 h-0.5 bg-blue-500"></div>}
                <div className="w-0.5 h-6 bg-blue-500"></div>
                <OrgChartNode node={child} />
              </div>
              {index < node.children.length - 1 && (
                <div className="absolute left-1/2 top-6 w-full h-0.5 bg-blue-500 transform -translate-x-1/2"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrgChart;
