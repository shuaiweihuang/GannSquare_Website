import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { high, low } = await request.json();
    const h = parseFloat(high);
    const l = parseFloat(low);

    if (isNaN(h) || isNaN(l)) {
      return NextResponse.json({ error: "請輸入有效的數字" }, { status: 400 });
    }

    // 最高價計算 (開根號 - 位移後平方)
    const highLevels = [0.125, 0.25, 0.375, 0.5].map(offset => 
      Math.pow(Math.sqrt(h) - offset, 2).toFixed(2)
    );

    // 最低價計算 (開根號 + 位移後平方)
    const lowLevels = [0.125, 0.25, 0.375, 0.5].map(offset => 
      Math.pow(Math.sqrt(l) + offset, 2).toFixed(2)
    );

    return NextResponse.json({
      highLevels, // 這是壓力位陣列
      lowLevels   // 這是支撐位陣列
    });
  } catch (error) {
    return NextResponse.json({ error: "計算出錯" }, { status: 500 });
  }
}
