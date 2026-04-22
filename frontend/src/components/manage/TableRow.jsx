import { useState } from 'react';
import { updateKPI, deleteKPI } from '../../services/api';

export default function TableRow({ row, refreshData }) {

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ ...row });

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    await updateKPI(row.id, {
      ...editData,
      fuel: Number(editData.fuel),
      productivity: Number(editData.productivity),
      cost: Number(editData.cost)
    });

    setEditing(false);
    await refreshData();
  };

  const handleDelete = async () => {
    await deleteKPI(row.id);
    await refreshData();
  };

  return (
    <tr>
      <td>
        {editing
          ? <input value={editData.day}
              onChange={e => handleChange('day', e.target.value)} />
          : row.day}
      </td>

      <td>
        {editing
          ? <input type="number" value={editData.fuel}
              onChange={e => handleChange('fuel', e.target.value)} />
          : row.fuel}
      </td>

      <td>
        {editing
          ? <input type="number" value={editData.productivity}
              onChange={e => handleChange('productivity', e.target.value)} />
          : row.productivity}
      </td>

      <td>
        {editing
          ? <input type="number" value={editData.cost}
              onChange={e => handleChange('cost', e.target.value)} />
          : row.cost}
      </td>

      <td>
        {editing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
}