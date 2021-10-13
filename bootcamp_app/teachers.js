const { Pool } = require('pg');

const pool = new Pool({
  user: 'ettybarone',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect();

const queryString = `
SELECT DISTINCT teachers.name as teacher_name, cohorts.name as cohort
FROM teachers JOIN assistance_requests
ON teachers.id = assistance_requests.teacher_id
JOIN students
ON assistance_requests.student_id = students.id
JOIN cohorts
ON students.cohort_id = cohorts.id
WHERE cohorts.name = $1
;
`;
const cohort = `${process.argv[2] || 'JUL02'}`;
const values = [cohort];
pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.teacher_name}: ${user.cohort}`);
  })
}).catch(err => console.error('query error', err.stack));