import { useEffect, useState } from "react";

export default function Admin() {
  const [rows, setRows] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetch("https://lumenza.onrender.com", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setRows)
      .catch(() => alert("Auth failed; please login again."));
  }, [token]);

  async function remove(id) {
    await fetch(`https://lumenza.onrender.com${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setRows((r) => r.filter((x) => x._id !== id));
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin • Inquiries</h2>
        <button
          onClick={logout}
          className="bg-gray-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Phone</th>
            <th className="border px-2 py-1">Message</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r._id} className="border-t">
              <td className="border px-2 py-1">{r.name}</td>
              <td className="border px-2 py-1">{r.email}</td>
              <td className="border px-2 py-1">{r.phone}</td>
              <td className="border px-2 py-1">{r.message}</td>
              <td className="border px-2 py-1">
                {new Date(r.createdAt).toLocaleString()}
              </td>
              <td className="border px-2 py-1">
                <button
                  onClick={() => remove(r._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
