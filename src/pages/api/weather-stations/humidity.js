// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connection from '@/db';

export default async function index(req, res) {
  try {
    const [results] = await connection.query(
      'SELECT rh as relative_humidity FROM weather_data'
    );
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
