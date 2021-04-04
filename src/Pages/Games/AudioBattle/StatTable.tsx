import React from 'react';

const StatTable = ({
  arrayOfData,
} : any) => (
  <div style={{ height: '300px' }}>
    <table>
      <caption>Результаты игры</caption>
      <tbody>
        {arrayOfData.map((parameter:any) => (

          <tr key={parameter.name}>
            <td>{parameter.name}</td>
            <td>
              {parameter.value}
            </td>
          </tr>

        ))}
      </tbody>
    </table>
  </div>
);

export default StatTable;
