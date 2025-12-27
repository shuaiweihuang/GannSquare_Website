"use client";

import { useState } from "react";

export default function Home() {
  const [inputs, setInputs] = useState({ high: "", low: "" });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          high: inputs.high, 
          low: inputs.low 
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("計算失敗:", error);
    } finally {
      setLoading(false);
    }
  };

  const angles = ["45°", "90°", "135°", "180°"];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6 text-slate-800">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          Gann Square Calculator
        </h1>

        <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-1 text-red-600 font-bold">最高價 (High Root -)</label>
            <input
              type="number" step="any"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="輸入高點"
              value={inputs.high}
              onChange={(e) => setInputs({ ...inputs, high: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-green-600 font-bold">最低價 (Low Root +)</label>
            <input
              type="number" step="any"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="輸入低點"
              value={inputs.low}
              onChange={(e) => setInputs({ ...inputs, low: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full bg-indigo-600 text-white py-3 rounded-md font-bold hover:bg-indigo-700 transition duration-200 shadow-md"
          >
            {loading ? "計算中..." : "開始計算關鍵價點位"}
          </button>
        </form>

        {result && !result.error && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* 高點下移壓力區 */}
            <section>
              <h2 className="text-xl font-bold mb-4 text-red-700 flex items-center">
                <span className="bg-red-100 p-1 rounded mr-2">⬇</span> 高點向下旋轉 (壓力位)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {result.highLevels.map((val: string, i: number) => (
                  <div key={i} className="bg-red-50 border border-red-100 p-4 rounded-lg text-center shadow-sm">
                    <div className="text-xs text-red-400 font-bold mb-1">{angles[i]}</div>
                    <div className="text-lg font-mono font-black text-red-600">{val}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 低點上移支撐區 */}
            <section>
              <h2 className="text-xl font-bold mb-4 text-green-700 flex items-center">
                <span className="bg-green-100 p-1 rounded mr-2">⬆</span> 低點向上旋轉 (支撐位)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {result.lowLevels.map((val: string, i: number) => (
                  <div key={i} className="bg-green-50 border border-green-100 p-4 rounded-lg text-center shadow-sm">
                    <div className="text-xs text-green-400 font-bold mb-1">{angles[i]}</div>
                    <div className="text-lg font-mono font-black text-green-600">{val}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {result?.error && (
          <div className="p-4 bg-yellow-100 text-yellow-700 rounded-md text-center">
            {result.error}
          </div>
        )}
      </div>
      
      <footer className="mt-12 text-gray-400 text-sm flex flex-col items-center">
        <p>GannSquare Website – Financial Analysis Tool</p>
      </footer>
    </main>
  );
}
