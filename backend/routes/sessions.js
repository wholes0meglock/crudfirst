const express = require("express");
const router = express.Router();
const Session = require("../models/Session");

const auth  = require("../middleware/auth");

router.get('/',auth, async (req,res) =>
{
    const sessions = await Session.find();
    res.json(sessions);
})

router.post('/',auth, async (req,res) =>
{
    const subject = req.body.subject;
    const duration = req.body.duration;
    const newSession = await Session.create({
        subject,
        duration
    });
    res.json(newSession); 
})

router.get('/:id',auth, async (req,res) =>
{
    const session = await Session.findById(req.params.id);
    if(!session) 
    {
        return res.status(404).json({message : "Session not found."})
    }
    res.json(session);
    // alternative code
    // const session = sessions.find(s => s.id === id);
    // if(!session) return res.status(404).json({message : "session not found"});
    // res.json(session)
})

router.put('/:id',auth, async (req,res)=>
{
    const session = await Session.findById(req.params.id);
    if(!session) { return res.status(404).json({"message" : "session not found"}); }
    session.duration = req.body.duration;
    session.subject = req.body.subject;
    await session.save();
    res.json(session);
})



router.delete('/:id',auth,async (req,res) =>
{
    const session = await Session.findByIdAndDelete(req.params.id);
    if(!session) {return res.status(404).json({"message" : "Session not found."})}
    // sessions = sessions.filter(s => s.id !== idToSearch);
    res.json({"message" : "Session deleted successfully"});
})



module.exports = router;