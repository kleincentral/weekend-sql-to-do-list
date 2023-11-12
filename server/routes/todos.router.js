const router = require('express').Router();
const pool = require('../modules/pool');

/*
Gets the list from the database.
*/
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

/*
Posts some new items to the database and
sends a confirm to the server.
*/
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

/*
Gets deletes some item with a specific
id from the database with the route
passed from the server.
*/
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

/*
Updates the list in the database by
id to make isComplete true.
*/
router.put('/:id', (req,res) => {
    console.log("Updating!")
    let text = `
    UPDATE "todos"
    SET "isComplete" = TRUE
    WHERE "id" = $1`
    let sqlValues = [req.params.id]
    pool.query(text,sqlValues)
    .then((dbResult) => {
      res.sendStatus(201)
    }).catch((dbError) => {
      res.sendStatus(500)
    })
})


module.exports = router;
