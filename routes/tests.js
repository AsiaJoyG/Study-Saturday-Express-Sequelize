const router = require('express').Router();
const Test = require("../db/models/test");
const Student = require("../db/models/test")


router.get("/", async (req, res, next) => {
  const allTests = await Test.findAll();
  try{
  if (allTests) {
    res.json(allTests);
  }
} catch (error) { next(error) }
});
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try{
  const oneTest = await Test.findByPk(req.params.id);
  if (oneTest === null) {
    res.sendStatus(404);
  }
  if (oneTest) {
    res.json(oneTest);
  }
} catch (error) { next(error) }
});

router.post('/student/:studentId', async (req, res, next) => {
  try {
    const test = await Test.create(req.body);
    const studentTest = await test.update({
      studentId: +req.params.studentId
    });
    if (test) {
      res.status(201).json(studentTest)
    }
    else {
      next()
    }
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req,res,next) =>{
  try{
    await Test.destroy({
      where: {
        id: req.params.id
      }
    })
   res.status(204).send()
  } catch(err) {
    next(err)
  }
})
