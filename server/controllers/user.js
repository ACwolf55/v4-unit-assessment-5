const bcrypt = require('bcryptjs')

module.exports = {

register: async (req, res) => {
        const db = req.app.get('db')
        // Receive the needed info (name, email, password, admin) from req.body
        const { username,password} = req.body
    
        // Check if they are already registered.  If they are, reject the request
        const [existingUser] = await db.find_user([username])
    
        if (existingUser) {
          return res.status(409).send('User already exists')
        }
    // Hash and salt the password
    const salt = bcrypt.genSaltSync(10)

    const hash = bcrypt.hashSync(password, salt)

    // Insert them into the db
    const [newUser] = await db.create_user([username, password,`https://robohash.org/${username}.png`])

    // Attach that user to the session
    req.session.user = newUser

    //Send confirmation of registration
    res.status(200).send(newUser)
    },
login: async (req,res)=> {
        const db = req.app.get('db')
        // Get necessary info off of req.body (email, password)
        const { username, password } = req.body
    
        // Check if user exists, if they do NOT, reject the request
        const [existingUser] = await db.get_user_by_username([username])
    
        if (!existingUser) {
          return res.status(404).send('User does not exist')
        }
    
        // Check their password against the hash, if there is a mismatch, reject the request
        const isAuthenticated = bcrypt.compareSync(password, existingUser.hash)
    
        if (!isAuthenticated) {
          return res.status(403).send('Incorrect password')
        }
    
        // Delete the has from the user object
        delete existingUser.hash
    
        // Attach the user to the session
        req.session.user = existingUser
    
        // Send back confirmation of login
        res.status(200).send(existingUser)

},
logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200) 
},
getUser: (req,res)=>{
  if (req.session.user) {
    res.status(200).send(req.session.user)
  } else {
    res.status(404).send('NOT FOUND 404')
  }


}




}