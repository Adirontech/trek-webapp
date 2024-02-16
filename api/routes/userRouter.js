/**
 * userRouter.js - Router for handling user-related routes.
 * This router handles routes for creating and signing in users.
 */


router.get('/user-info', async (req, res, next) => {
    try{
        if(req.query.key){
            user = await userModel.getUserInfo(req.query.key);
            res.status(200).json({ data: user.getuserdata });
        }else{
            res.send({message: 'no key'});
        }
    }catch (error){
        res.send({ message: error.message });
    }
    
});

router.post('/', async (req, res, next) => {
    try {
        const createParams = ['username', 'password', 'first_name', 'last_name', 'phone'];
        const signInParams = ['username', 'password'];

        const missingCreateParams = createParams.filter(param => !(param in req.body));
        const missingSignInParams = signInParams.filter(param => !(param in req.body));

        if(missingCreateParams.length == 0){
            user = await userModel.createUser(req.body);
            res.status(200).json({ user_id: user.id, message: "User created successfully with id " + user.id + "." });
        }else if (missingSignInParams.length == 0){
            user = await userModel.signInUser(req.body);
            res.status(200).json({ session_key: user.session_key, message: "User signed in succesfully"});
        } else {
            throw new Error("Missing required parameters to sign in: " + missingSignInParams.join(', ') + 
                            ". Missing required parameters to create user: " + missingCreateParams.join(', '));
        }
    } catch (error) {
        res.send({ message: error.message});
    }
});

router.put('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {

});

module.exports=router