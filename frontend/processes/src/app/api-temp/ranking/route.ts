import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'InventoryManagement',
  password: 'user1234',
  port: 5432,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year') || '2024';

    const client = await pool.connect();

    const totalBudgetQuery = 'SELECT SUM(po_amount) as total_budget FROM stock_po WHERE EXTRACT(YEAR FROM end_date) = $1';
    const departmentSpendingQuery = `
      SELECT d.departmentname, SUM(po.po_amount) as total_spent
      FROM stock_po po
      JOIN stock_department d ON po.department_id = d.departmentid
      WHERE EXTRACT(YEAR FROM po.end_date) = $1
      GROUP BY d.departmentname
      ORDER BY total_spent DESC`;

    const monthlySpendingQuery = `
      SELECT DATE_TRUNC('month', end_date) as month, SUM(po_amount) as monthly_spent
      FROM stock_po
      WHERE EXTRACT(YEAR FROM end_date) = $1
      GROUP BY month
      ORDER BY month`;

    const latestOrdersQuery = `
      SELECT po.stock_po_no, d.departmentname, po.po_amount, po.end_date
      FROM stock_po po
      JOIN stock_department d ON po.department_id = d.departmentid
      WHERE EXTRACT(YEAR FROM po.end_date) = $1
      ORDER BY po.end_date DESC
      LIMIT 10`;

    const totalBudget = await client.query(totalBudgetQuery, [year]);
    const departments = await client.query(departmentSpendingQuery, [year]);
    const monthlySpending = await client.query(monthlySpendingQuery, [year]);
    const latestOrders = await client.query(latestOrdersQuery, [year]);

    client.release();

    return NextResponse.json({
      totalBudget: totalBudget.rows[0]?.total_budget || 0,
      departments: departments.rows || [],
      monthlySpending: monthlySpending.rows || [],
      latestOrders: latestOrders.rows || [],
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export const config = {
  matcher: '/api-temp/ranking',
};
