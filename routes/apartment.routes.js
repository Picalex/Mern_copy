const {Router} = require('express')
const Build = require('../models/Builds/Build')
const Entrance = require('../models/Builds/Entrance')
const Floor = require('../models/Builds/Floor')
const Apartment = require('../models/Builds/Apartment')



const auth = require('../middleware/auth.middleware')
const router = Router()




router.get('/all', auth, async (req, res) => {
    try {
        const builds = await Build.find({})
        res.json(builds)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})


// /api/build/create
router.post('/create', auth, async (req, res) => {
    try {

        let nowEntranceId
        let nowFloorId

        const build = new Build({ name:req.body.name})
        build.save()

        for(let i=0;i<req.body.entrance;i++){
            const entrance = new Entrance({ build:build._id})
            entrance.save()
            nowEntranceId=entrance._id

            for(let j=0;j< req.body.floor ;j++){
                const floor = new Floor({ entrance:nowEntranceId})
                floor.save()
                nowFloorId=floor._id
                for(let y=0;y<req.body.apartment;y++){
                    const apartment = new Apartment({ floor:nowFloorId})
                    apartment.save()
                }
            }
        }


        res.status(201).json({ message: 'Здание создано' })
        // res.json(build)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так сссссс, попробуйте снова' })
    }
})
module.exports = router
