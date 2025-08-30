import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const res = await fetch("https://lumenza.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/admin";
    } else {
      alert(data.error || "Login failed");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-xl rounded-xl p-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-3 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
