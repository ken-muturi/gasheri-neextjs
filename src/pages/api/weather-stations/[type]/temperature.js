// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connection from '@/db';

export const annual = async () => {
  const [results] = await connection.query(
    `
    SELECT YEAR(timestamp) as year, MONTH(timestamp) as month, AVG(ptemp_c) as avg, MAX(ptemp_c) as max, MIN(ptemp_c) as min 
    FROM weather_data
    GROUP BY YEAR(timestamp), MONTH(timestamp);
    `
  );
  return results;
}

export const monthly = async () => {
  const [results] = await connection.query(
    `
    SELECT MONTH(timestamp) as month, DAY(timestamp) as day, AVG(ptemp_c) as avg, MAX(ptemp_c) as max, MIN(ptemp_c) as min 
    FROM weather_data
    GROUP BY MONTH(timestamp), DAY(timestamp);
    `
  );
  return results;
}

export const daily = async () => {
  const [results] = await connection.query(
    `
    SELECT Day(timestamp) as day,Month(timestamp) as month, AVG(ptemp_c) as avg, MAX(ptemp_c) as max, MIN(ptemp_c) as min
    FROM weather_data
    GROUP BY Day(timestamp), MONTH(timestamp)
  `
  );
  return results;
}

export default async function index(req, res) {
  try {
    const { type } = req.query;
    let results = [];
    if (type === "monthly") {
      results = await monthly();
    }
    if (type === "annual") {
      results = await annual();
    }

    if (type === "daily") {
      results = await daily();
    }
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
