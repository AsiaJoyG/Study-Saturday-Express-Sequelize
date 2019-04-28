const router = require("express").Router();
const Student = require("../db/models/student");

router.get("/", async (req, res, next) => {
  const allStudents = await Student.findAll();
  try{
  if (allStudents) {
    res.json(allStudents);
  }
} catch (error) { next(error) }
});

router.get("/:id", async (req, res, next) => {
  try{
  const oneStudent = await Student.findByPk(req.params.id);
  if (oneStudent === null) {
    res.sendStatus(404);
  }
  if (oneStudent) {
    res.json(oneStudent);
  }
} catch (error) { next(error) }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body.lastName, req.body.firstName)
    const newStudent = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email})

      // could also say Student.create(req.body)

     console.log(newStudent)
    res.status(201).json(newStudent);
  } catch (error) { next(error) }
});

router.put("/:id", async (req, res, next) => {
  try {
   const [numOfStudents, studentToChange] = await Student.update(req.body,{
     where: {
       id: req.params.id
     },
     returning: true,
     plain: true

   })
    res.send(studentToChange);

  } catch (error) { next(error) }
});

router.delete('/:id', async (req,res,next) =>{
  try{
    await Student.destroy({
      where: {
        id: req.params.id
      }
    })
   res.status(204).send()
  } catch(err) {
    next(err)
  }
})

module.exports = router;
