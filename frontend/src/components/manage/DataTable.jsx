import TableRow from './TableRow';

export default function DataTable({ data, refreshData }) {
    
    // Extract records
    const records = data.records; 
    return (
        <table border="1" cellPadding="10">
        <thead>
            <tr>
            <th>Day</th>
            <th>Fuel</th>
            <th>Productivity</th>
            <th>Cost</th>
            <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            {records.map(row => (
                <TableRow
                    key={row.id}
                    row={row}
                    refreshData={refreshData}
                />
            ))}
        </tbody>
        </table>
    );
}