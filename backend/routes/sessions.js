const express = require("express");
const router = express.Router();
const Session = require("../models/Session");

const auth  = require("../middleware/auth");

router.get('/',auth, async (req,res) =>
{
    const sessions = await Session.find({ user: req.user.id });
    res.json(sessions);
})

router.post('/',auth, async (req,res) =>
{
    const username = req.user.id;
    const subject = req.body.subject;
    const duration = req.body.duration;
    const newSession = await Session.create({
        username,
        subject,
        duration
    });
    res.json(newSession); 
})

router.get('/:id',auth, async (req,res) =>
{
    // const sessions = await Session.find({user: req.user.id});
    const session = await Session.findOne(
        {
            _id : req.params.id,
            user : req.user.id
        }
    );
    if(!session) 
    {
        return res.status(404).json({message : "Session not found."})
    }
    res.json(session);
    
})

router.put('/:id',auth, async (req,res)=>
{
    const session = await Session.findOne(
        {
            _id : req.params.id,
            user : req.user.id
        }
    );
    if(!session) { return res.status(404).json({"message" : "session not found"}); }
    session.duration = req.body.duration;
    session.subject = req.body.subject;
    await session.save();
    res.json(session);
})



router.delete('/:id',auth,async (req,res) =>
{
    const session = await Session.findOneAndDelete(
        {
            _id : req.params.id,
            user : req.user.id
        });
    if(!session) {return res.status(404).json({"message" : "Session not found."})}
    // sessions = sessions.filter(s => s.id !== idToSearch);
    res.json({"message" : "Session deleted successfully"});
})



module.exports = router;