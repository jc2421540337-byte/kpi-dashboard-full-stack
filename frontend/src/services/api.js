// Centralized API service
export async function fetchKPI() {
  try {
    const res = await fetch('/api/kpi');
    const json = await res.json();

    if (json.status !== 'success') {
      throw new Error(json.message);
    }

    return json.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function createKPI(data) {
  return fetch('/api/kpi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

export async function updateKPI(id, data) {
  return fetch(`/api/kpi/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

export async function deleteKPI(id) {
  return fetch(`/api/kpi/${id}`, {
    method: 'DELETE'
  }).then(res => res.json());
}