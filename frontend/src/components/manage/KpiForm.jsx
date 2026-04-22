import { useState } from 'react';

export default function KpiForm({ onCreate }) {
  const [form, setForm] = useState({
    day: '',
    fuel: '',
    productivity: '',
    cost: ''
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await onCreate({
      ...form,
      fuel: Number(form.fuel),
      productivity: Number(form.productivity),
      cost: Number(form.cost)
    });

    setForm({ day: '', fuel: '', productivity: '', cost: '' });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input placeholder="Day" value={form.day}
        onChange={e => handleChange('day', e.target.value)} />

      <input placeholder="Fuel" type="number" value={form.fuel}
        onChange={e => handleChange('fuel', e.target.value)} />

      <input placeholder="Productivity" type="number" value={form.productivity}
        onChange={e => handleChange('productivity', e.target.value)} />

      <input placeholder="Cost" type="number" value={form.cost}
        onChange={e => handleChange('cost', e.target.value)} />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}