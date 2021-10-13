const { Pool } = require('pg');

const pool = new Pool({
  user: 'ettybarone',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect();

pool.query(`
SELECT DISTINCT teachers.name as teacher_name, cohorts.name as cohort
FROM teachers JOIN assistance_requests
ON teachers.id = assistance_requests.teacher_id
JOIN students
ON assistance_requests.student_id = students.id
JOIN cohorts
ON students.cohort_id = cohorts.id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
;
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.teacher_name}: ${user.cohort}`);
  })
}).catch(err => console.error('query error', err.stack));