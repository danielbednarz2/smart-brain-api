import Clarifai from 'clarifai'

const app = new Clarifai.App({
    apiKey: 'c69b1964a2ae498f97fba34a8c89646a'
   });

export const handleApiCall = (req, res) => {app.models
.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data => res.json(data))
.catch(err => res.status(400).json('Unable to connect to API'))
}
export const handleImage = (req, res, postgres) => {
    const { id } = req.body;
    postgres('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('Unable to get entries'))
}