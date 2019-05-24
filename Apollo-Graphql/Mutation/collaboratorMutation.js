/********************************************************************************************************************
 *  @Execution      : default node          : cmd> collaboratorMutation.js
 *                      
 *  @Purpose        : perform operations by using users for collaborate
 * 
 *  @description    : By using mutation we can manipulate the data (CURD)
 * 
 *  @overview       : fundoo application  
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 15-may-2019
 *
 *******************************************************************************************************************/
/**
 * @requires files
 */
var userModel = require('../../model/userSchema')
var noteModel = require('../../model/noteSchema')
var sendMail = require('../../sendMailer/sendMail')
var colModel = require('../../model/collabatorsSchema');
var tokenVerify = require('../../Authentication/authenticationUser')


//saltrounds for hash password
var saltRounds = 10;

//create a empty function
var collaboratorMutation = function () { }


/*******************************************************************************************************************/
/**
 * @description : addCollaboration APIs for collaborators to add user using apollo-graphql
 * @purpose : addCollaborator ID for which user you add in database
 * @param {root}, which has data information
 * @param {params}, input by users
 * @param {context}, req from queries, headers, server
 */
collaboratorMutation.prototype.addCollaboration = async (root, args, context) => {

    try {
        if (!context.token) {
            return { "message": "token not provided" }
        }


        /**
         * @var payload, to take token after verify
         */
        var payload = await tokenVerify.verification(context.token)


        /**
         * @var user, find the user ID from userModel
         */
        var user = await userModel.find({ "_id": payload.userID });
        if (!user) {
            return { "message": "user not found" }
        }


        /**
         * @var note,find the note ID from noteModel
         */
        var note = await noteModel.find({ "_id": args.noteID })
        if (!note) {
            return { "message": "note not found" }
        }


        /**
         * @var colab, find colab ID from colModel
         */
        var colab = await colModel.find({ "collaboratorID": args.colabID })
        if (colab.length > 0) {
            return { "message": "user already colabrated" }
        }

        //take those var from input 
        var newColab = new colModel({
            "userID": payload.userID,
            "noteID": args.noteID,
            "collaboratorID": args.colabID
        })

        //save in given database
        var save = newColab.save()


        //email which we collaborate
        var findEmail = await userModel.find({ _id: args.colabID })
        var email = findEmail[0].email

        //message for mail
        var url = "This " + email + " email is collaborate with me for Fundoo Notes"

        //condition
        if (save) {
            sendMail.sendEmailFunction(url, email)
            return { "message": "colabbed successfully" }
        }

        return { "message": "colab unsuccessful" }


    } catch (err) {
        console.log("!Error")
        return { "message": err }
    }
}






/*******************************************************************************************************************/
/**
 * @description : removeCollaboration APIs for collaborators to remove from user using apollo-graphql
 * @purpose : removeCollaboration ID for which user you remove from database
 * @param {root}, which has data information
 * @param {params}, input by users
 * @param {context}, req from queries, headers, server
 */
collaboratorMutation.prototype.removeCollaboration = async (root, args, context) => {

    try {
        if (!context.token) {
            return { "message": "token not provided" }
        }


        /**
         * @var payload, to take token after verify
         */
        var payload = await tokenVerify.verification(context.token)


        /**
         * @var user, find the user ID from userModel
         */
        var user = await userModel.find({ "_id": payload.userID });
        if (!user) {
            return { "message": "user not found" }
        }


        /**
         * @var note,find the note ID from noteModel
         */
        var note = await noteModel.find({ "_id": args.noteID })
        if (!note) {
            return { "message": "note not found" }
        }


        /**
         * @var colab, find colab ID from colModel
         */
        var findColab = await colModel.findOneAndDelete({ "collaboratorID": args.colabID })
        if (findColab) {
            return { "message": "collaborator removed successfully" }
        }

        return { "message": "This collaborator is not present" }


    } catch (err) {
        console.log("!Error")
        return { "message": err }
    }
}




/**
 * @exports collaboratorMutation
 */
module.exports = new collaboratorMutation()