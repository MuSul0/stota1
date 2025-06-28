import { queryWithErrorHandling } from '@/integrations/supabase/db';

// In Ihrer Komponente:
const fetchWorkHours = async (userId: string) => {
  try {
    const result = await queryWithErrorHandling(
      'SELECT * FROM work_hours WHERE employee_id = $1 ORDER BY date DESC',
      [userId]
    );
    return result.rows;
  } catch (error) {
    console.error('Failed to fetch work hours:', error);
    return [];
  }
};