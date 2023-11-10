const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req,res) =>{
    console.log("Get called!")
    const text = `
    SELECT * FROM "todos"
    ORDER BY "id";`
    pool.query(text)
    .then((dbResult) => {
      res.send(dbResult.rows)
    }).catch((dbError)=>{
      res.sendStatus(500)
    })
})

router.post('/', (req,res) => {
    console.log('Attempting to POST')
    let text = `
    INSERT INTO "todos"
        ("text")
    VALUES
        ($1)
    `
    let sqlValues = [req.body.todo]
    console.log(req.body.todo)
    pool.query(text, sqlValues)
    .then((dbResult) =>{
        res.sendStatus(201)
    }).catch((dbError) =>{
        res.sendStatus(500)
    })
})

router.delete('/:id', (req,res) =>{
    console.log('Deleting!')
    let text = `
    DELETE FROM "todos"
      WHERE "id" = $1`
    const sqlValues = [req.params.id]
    pool.query(text,sqlValues)
    .then((dbResult) => {
      res.sendStatus(201)
    }).catch((dbError) => {
      res.sendStatus(500)
    })
})


module.exports = router;
