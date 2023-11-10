const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req,res) =>{
    console.log("Get called!")
    let text = `
    SELECT * FROM "todos"
    ORDER BY "id";`
    pool.query(text)
    .then((dbResult) => {
      console.log(dbResult)
      res.send(dbResult.rows)
    }).catch((dbError)=>{
      res.sendStatus(500)
    })
})


module.exports = router;
