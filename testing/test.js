/********************************************************************************************************************
 *  @Execution      : default node          : cmd> test.js
 *                      
 * 
 *  @Purpose        : Mocha testing in apollo-graphql for test code
 * 
 *  @description    : test code with the help of mocha, chai, supertest
 * 
 *  @overview       : fundoo application  
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 30-april-2019
 *
 *******************************************************************************************************************/
/**
 * @requires files
 */
const { describe, it } = require('mocha')
const { expect } = require('chai')
const request = require('supertest')
var server = require('../server')
var fs = require('fs')
var access_token = "";
var signUp_token = "";
var forgotPassword_token = "";
var git_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1Y2VlMzNjYzFmZTljZjNlNThkNGJlNzEiLCJpZCI6NDc2Mzk2MzYsImxvZ2luIjoiQmh1cGkyNTA4IiwiaWF0IjoxNTU5MTE0NzAwLCJleHAiOjE2NDU1MTQ3MDB9.I4HHmI6FdABmiL5qaoevyTXA3UsGQ6J9Iy8RZsXpff8";


/**
 * @function testJSON
 */
function testJSON() {

    var data = fs.readFileSync('/home/admin1/Desktop/fundoo(apollo)/testing/testFile.json');
    var data1 = JSON.parse(data);
    return data1;
}











/*********************************************************    Users   *********************************************************************/
/*********************************************************    Users   *********************************************************************/
/*********************************************************    Users   *********************************************************************/
/**
 * @param {function()}
 */
describe('Apollo-GraphQL Users API', () => {

    /***************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */
    it('register API  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql')

            //write your data for checking by giving mutation
            .send({ query: testJSON().signUp })
            .expect(200)
            .end((err, res) => {

                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success data
                expect(JSON.parse(res.text).data.signUp.message).to.deep.equal("Register successfull")
                signUp_token = JSON.parse(res.text).data.signUp.token
                done();
            });
    });





    /***************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */
    it('register API  (Negative Testing)', done => {
        console.log("Enter pasword more than 8 letters ");
        request('http://localhost:4000')
            .post('/graphql')

            //write your data for checking by giving mutation
            .send({ query: testJSON().signUp1 })
            .expect(200)
            .end((err, res) => {

                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success data
                expect(JSON.parse(res.text).data.signUp.message).to.deep.equal("Enter pasword more than 8 letters ")
                done();
            });
    });




    /***************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */
    it('register API  (Negative Testing)', done => {
        console.log("not valid email");
        request('http://localhost:4000')
            .post('/graphql')

            //write your data for checking by giving mutation
            .send({ query: testJSON().signUp2 })
            .expect(200)
            .end((err, res) => {

                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success data
                expect(JSON.parse(res.text).data.signUp.message).to.deep.equal("not valid email")
                done();
            });
    });
})




/***************************************************************************************************************/
/**
* @purpose : Testing for users APIs
* @property {request} request has do request for server
* @property {post} post has post the function to the given path
* @property {send} send has send the parameter to the mutation
* @property {expect} expect has pass the ok means all are fine
* @returns {error} error
*/
it('register API  (Negative Testing)', done => {
    console.log("email already exists");
    request('http://localhost:4000')
        .post('/graphql')

        //write your data for checking by giving mutation
        .send({ query: testJSON().signUp3 })
        .expect(200)
        .end((err, res) => {

            //if any error the return error
            if (err) {
                return done(err);
            }

            //otherwise return success data
            expect(JSON.parse(res.text).data.signUp.message).to.deep.equal("email already exists")
            done();
        });
});




/***************************************************************************************************************/
/**
* @purpose : Testing for users APIs
* @property {request} request has do request for server
* @property {post} post has post the function to the given path
* @property {send} send has send the parameter to the mutation
* @property {expect} expect has pass the ok means all are fine
* @returns {error} error
*/
it('Email Verify API  (Positive Testing)', done => {
    request('http://localhost:4000')
        .post('/graphql')

        //write your data for checking by giving mutation
        .query({ 'token': signUp_token })
        .send({ query: testJSON().emailVerify })
        .expect(200)
        .end((err, res) => {

            //if any error the return error
            if (err) {
                return done(err);
            }

            //otherwise return success data
            expect(JSON.parse(res.text).data.emailVerify.message).to.deep.equal("verification successfull")
            done();
        });
});





/****************************************************************************************************************/
/**
* @purpose : Testing for users APIs
* @property {request} request has do request for server
* @property {post} post has post the function to the given path
* @property {send} send has send the parameter to the mutation
* @property {expect} expect has pass the ok means all are fine
* @returns {error} error
*/
it('login APIs  (Positive Testing)', done => {
    request('http://localhost:4000')
        .post('/graphql ')

        //write your data for checking by giving mutation
        .send({ query: testJSON().login })
        .expect(200)
        .end((err, res) => {



            //if any error the return error
            if (err) {
                return done(err);
            }

            //otherwise return success
            expect(JSON.parse(res.text).data.login.message).to.deep.equal("!Login....Successfully")
            access_token = JSON.parse(res.text).data.login.token
            done();
        });
});




/****************************************************************************************************************/
/**
* @purpose : Testing for users APIs
* @property {request} request has do request for server
* @property {post} post has post the function to the given path
* @property {send} send has send the parameter to the mutation
* @property {expect} expect has pass the ok means all are fine
* @returns {error} error
*/
it('login APIs  (Negative Testing)', done => {
    console.log("unauthonticate password");
    request('http://localhost:4000')
        .post('/graphql ')

        //write your data for checking by giving mutation
        .send({ query: testJSON().login1 })
        .expect(200)
        .end((err, res) => {



            //if any error the return error
            if (err) {
                return done(err);
            }

            //otherwise return success
            expect(JSON.parse(res.text).data.login.message).to.deep.equal("unauthonticate password")
            done();
        });
});





/****************************************************************************************************************/
/**
* @purpose : Testing for users APIs
* @property {request} request has do request for server
* @property {post} post has post the function to the given path
* @property {send} send has send the parameter to the mutation
* @property {expect} expect has pass the ok means all are fine
* @returns {error} error
*/
it('login APIs  (Negative Testing)', done => {
    console.log("email is not present");
    request('http://localhost:4000')
        .post('/graphql ')

        //write your data for checking by giving mutation
        .send({ query: testJSON().login2 })
        .expect(200)
        .end((err, res) => {



            //if any error the return error
            if (err) {
                return done(err);
            }

            //otherwise return success
            expect(JSON.parse(res.text).data.login.message).to.deep.equal("email is not present")
            done();
        });
});





/****************************************************************************************************************/
/**
* @purpose : Testing for users APIs
* @property {request} request has do request for server
* @property {post} post has post the function to the given path
* @property {send} send has send the parameter to the mutation
* @property {expect} expect has pass the ok means all are fine
* @returns {error} error
*/
it('login APIs  (Negative Testing)', done => {
    console.log("not valid email");
    request('http://localhost:4000')
        .post('/graphql ')

        //write your data for checking by giving mutation
        .send({ query: testJSON().login3 })
        .expect(200)
        .end((err, res) => {



            //if any error the return error
            if (err) {
                return done(err);
            }

            //otherwise return success
            expect(JSON.parse(res.text).data.login.message).to.deep.equal("not valid email")
            done();
        });
});



/***************************************************************************************************************/
/**
* @purpose : Testing for users APIs
* @property {request} request has do request for server
* @property {post} post has post the function to the given path
* @property {send} send has send the parameter to the mutation
* @property {expect} expect has pass the ok means all are fine
* @returns {error} error
*/
it('forgotPassword APIs  (Positive Testing)', done => {
    request('http://localhost:4000')
        .post('/graphql ')

        //write your data for checking by giving mutation
        .query({ 'token': signUp_token })
        .send({ query: testJSON().forgotPassword })
        .expect(200)
        .end((err, res) => {


            //if any error the return error
            if (err) {
                return done(err);
            }

            //otherwise return success
            expect(JSON.parse(res.text).data.forgotPassword.message).to.deep.equal("Mail sent to your given email id")
            forgotPassword_token = JSON.parse(res.text).data.forgotPassword.token
            done();
        });
});





/***************************************************************************************************************/
/**
* @purpose : Testing for users APIs
* @property {request} request has do request for server
* @property {post} post has post the function to the given path
* @property {send} send has send the parameter to the mutation
* @property {expect} expect has pass the ok means all are fine
* @returns {error} error
*/
it('forgotPassword APIs  (Negative Testing)', done => {
    console.log("not valid email");
    request('http://localhost:4000')
        .post('/graphql ')

        //write your data for checking by giving mutation
        .query({ 'token': signUp_token })
        .send({ query: testJSON().forgotPassword1 })
        .expect(200)
        .end((err, res) => {


            //if any error the return error
            if (err) {
                return done(err);
            }

            //otherwise return success
            expect(JSON.parse(res.text).data.forgotPassword.message).to.deep.equal("not valid email")
            done();
        });
});





/***************************************************************************************************************/
/**
* @purpose : Testing for users APIs
* @property {request} request has do request for server
* @property {post} post has post the function to the given path
* @property {send} send has send the parameter to the mutation
* @property {expect} expect has pass the ok means all are fine
* @returns {error} error
*/
it('forgotPassword APIs  (Negative Testing)', done => {
    console.log("email is not present in database");
    request('http://localhost:4000')
        .post('/graphql ')

        //write your data for checking by giving mutation
        .query({ 'token': signUp_token })
        .send({ query: testJSON().forgotPassword2 })
        .expect(200)
        .end((err, res) => {


            //if any error the return error
            if (err) {
                return done(err);
            }

            //otherwise return success
            expect(JSON.parse(res.text).data.forgotPassword.message).to.deep.equal("email is not present in database")
            done();
        });
});




/***************************************************************************************************************/
/**
* @purpose : Testing for users APIs
* @property {request} request has do request for server
* @property {post} post has post the function to the given path
* @property {send} send has send the parameter to the mutation
* @property {expect} expect has pass the ok means all are fine
* @returns {error} error
*/
it('resetPassword APIs  (Positive Testing)', done => {
    console.log(forgotPassword_token);
    request('http://localhost:4000')
        .post('/graphql ')

        //write your data for checking by giving mutation
        .query({ 'token': forgotPassword_token })
        .send({ query: testJSON().resetPassword })
        .expect(200)
        .end((err, res) => {


            //if any error the return error
            if (err) {
                return done(err);
            }

            //otherwise return success
            expect(JSON.parse(res.text).data.resetPassword.message).to.deep.equal("resetPassword Successfully")
            done();

        });
});





/***************************************************************************************************************/
/**
* @purpose : Testing for users APIs
* @property {request} request has do request for server
* @property {post} post has post the function to the given path
* @property {send} send has send the parameter to the mutation
* @property {expect} expect has pass the ok means all are fine
* @returns {error} error
*/
it('resetPassword APIs  (Negative Testing)', done => {
    console.log("password and confirm password are not match");
    request('http://localhost:4000')
        .post('/graphql ')

        //write your data for checking by giving mutation
        .query({ 'token': forgotPassword_token })
        .send({ query: testJSON().resetPassword1 })
        .expect(200)
        .end((err, res) => {


            //if any error the return error
            if (err) {
                return done(err);
            }

            //otherwise return success
            expect(JSON.parse(res.text).data.resetPassword.message).to.deep.equal("password and confirm password are not match")
            done();

        });
});















/*********************************************************  Labels ********************************************************************/
/*********************************************************  Labels ********************************************************************/
/*********************************************************  Labels ********************************************************************/
/**
 * @param {function()}
*/
describe('Apollo-GraphQL Labels APIs', () => {

    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('createLabel APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().createLabel })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.createLabel.message).to.deep.equal("Label created")
                done();

            });
    });





    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('createLabel APIs  (Negative Testing)', done => {
        console.log("Enter name min 4 letter ");
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().createLabel1 })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.createLabel.message).to.deep.equal("Enter name min 4 letter ")
                done();

            });
    });





    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('createLabel APIs  (Negative Testing)', done => {
        console.log("labelName already present");
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().createLabel2 })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.createLabel.message).to.deep.equal("labelName already present")
                done();

            });
    });




    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('editLabel APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().editLabel })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.editLabel.message).to.deep.equal("label is not updated")
                done();

            });
    });



    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('removeLabel APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().removeLabel })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.removeLabel.message).to.deep.equal("label is already removed")
                done();

            });
    });
})















/**********************************************************    Notes   ********************************************************************/
/**********************************************************    Notes   ********************************************************************/
/**********************************************************    Notes   ********************************************************************/
/**
* @param {function()}
*/
describe('Apollo-GraphQL Notes APIs', () => {


    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('createNote APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().createNote })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.createNote.message).to.deep.equal("note created")
                done();

            });
    });




    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('createNote APIs  (Negative Testing)', done => {
        console.log("Enter title length min 3 letter ");
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().createNote1 })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.createNote.message).to.deep.equal("Enter title length min 3 letter ")
                done();

            });
    });




    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('createNote APIs  (Negative Testing)', done => {
        console.log("Enter description length min 4 letter ");
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().createNote2 })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.createNote.message).to.deep.equal("Enter description length min 4 letter ")
                done();

            });
    });





    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('createNote APIs  (Negative Testing)', done => {
        console.log("title already present");
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().createNote3 })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.createNote.message).to.deep.equal("title already present")
                done();

            });
    });




    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('editNote APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().editNote })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.editNote.message).to.deep.equal("note updated")
                done();

            });
    });



    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('removeNote APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().removeNote })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.removeNote.message).to.deep.equal("note is not present")
                done();

            });
    });



    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('Reminder APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().Reminder })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.Reminder.message).to.deep.equal("reminder set in note successfully")
                done();

            });
    });





    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('Reminder APIs  (Negative Testing)', done => {
        console.log("This noteID is not present in notes");
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().Reminder1 })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.Reminder.message).to.deep.equal("This noteID is not present in notes")
                done();

            });
    });




    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('Reminder delete APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().deleteReminder })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.deleteReminder.message).to.deep.equal("reminder remove successfully")
                done();

            });
    });




    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('Reminder delete APIs  (Negative Testing)', done => {
        console.log("This noteID is not present in notes");
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().deleteReminder1 })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.deleteReminder.message).to.deep.equal("This noteID is not present in notes")
                done();

            });
    });






    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('Archieve APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().Archieve })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.Archieve.message).to.deep.equal("note Archieve")
                done();

            });
    });




    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('ArchieveRemove APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().ArchieveRemove })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.ArchieveRemove.message).to.deep.equal("note remove from Archieve")
                done();

            });

    });




    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('saveLabelToNote APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            //.query({ 'token': access_token })
            .send({ query: testJSON().saveLabelToNote })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.saveLabelToNote.message).to.deep.equal("This label is already added in note")
                done();

            });
    });





    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('saveLabelToNote APIs  (Negative Testing)', done => {
        console.log("This label is already added in note")
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            //.query({ 'token': access_token })
            .send({ query: testJSON().saveLabelToNote1 })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.saveLabelToNote.message).to.deep.equal("This label is already added in note")
                done();

            });
    });





    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('removeLabelFromNote APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            //.query({ 'token': access_token })
            .send({ query: testJSON().removeLabelFromNote })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.removeLabelFromNote.message).to.deep.equal("This label is not present in notes")
                done();

            });
    });





    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('addCollaborator APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().addCollaboration })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.addCollaboration.message).to.deep.equal("colabbed successfully")
                done();

            });
    });





    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('addCollaborator APIs  (Positive Testing)', done => {
        console.log("user already colabrated")
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().addCollaboration1 })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.addCollaboration.message).to.deep.equal("user already colabrated")
                done();

            });
    });






    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('removeCollaborators APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': access_token })
            .send({ query: testJSON().removeCollaboration })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.removeCollaboration.message).to.deep.equal("collaborator removed successfully")
                done();

            });
    });
})

















/********************************************************    GithubAith   **************************************************************/
/********************************************************    GithubAith   **************************************************************/
/********************************************************    GithubAith   **************************************************************/
/**
* @param {function()}
*/
describe('Apollo-GraphQL GithubAith APIs', () => {


    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('social Git OAuth 2.0 APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .send({ query: testJSON().GithubAuth })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.GithubAuth.message).to.deep.equal("Mail sent to your mail ID")
                done();

            });
    });




    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('codeVerify APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1Y2Q0MDY1MDI1ZDA4ZjNjODg0MjUzOTUiLCJpZCI6NDc2Mzk2MzYsImxvZ2luIjoiQmh1cGkyNTA4IiwiaWF0IjoxNTU3Mzk5MTIwLCJleHAiOjE2NDM3OTkxMjB9.nidKhPCHXubIosxpueDGynYMMv5qtpd5oDCHKediXo8' })
            .send({ query: testJSON().codeVerify })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.codeVerify.message).to.deep.equal("Data save successfully")
                git_token = JSON.parse(res.text).data.codeVerify.token
                done();

            });
    });





    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('GitAuthTokenVerify for git login verification  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            //.query({ 'token': git_token })
            .send({ query: testJSON().GitAuthTokenVerify })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.GitAuthTokenVerify.message).to.deep.equal("login & verification successfull")
                done();

            });
    });




    // /****************************************************************************************************************/
    // /**
    // * @purpose : Testing for users APIs
    // * @property {request} request has do request for server
    // * @property {post} post has post the function to the given path
    // * @property {send} send has send the parameter to the mutation
    // * @property {expect} expect has pass the ok means all are fine
    // * @returns {error} error
    // */

    // it('Star Repository APIs  (Positive Testing)', done => {
    //     request('http://localhost:4000')
    //         .post('/graphql ')

    //         //write your data for checking by giving mutation
    //         .query({ 'token': git_token })
    //         .send({ query: testJSON().starRepository })
    //         .expect(200)
    //         .end((err, res) => {


    //             //if any error the return error
    //             if (err) {
    //                 return done(err);
    //             }

    //             //otherwise return success 
    //             expect(JSON.parse(res.text).data.starRepository.message).to.deep.equal("Star the repository Successfully")
    //             done();

    //         });
    // });





    // /****************************************************************************************************************/
    // /**
    // * @purpose : Testing for users APIs
    // * @property {request} request has do request for server
    // * @property {post} post has post the function to the given path
    // * @property {send} send has send the parameter to the mutation
    // * @property {expect} expect has pass the ok means all are fine
    // * @returns {error} error
    // */

    // it('Remove Star Repository APIs  (Positive Testing)', done => {
    //     request('http://localhost:4000')
    //         .post('/graphql ')

    //         //write your data for checking by giving mutation
    //         .query({ 'token': git_token })
    //         .send({ query: testJSON().removeStarRepository })
    //         .expect(200)
    //         .end((err, res) => {


    //             //if any error the return error
    //             if (err) {
    //                 return done(err);
    //             }

    //             //otherwise return success 
    //             expect(JSON.parse(res.text).data.removeStarRepository.message).to.deep.equal("remove Star from repository Successfully")
    //             done();

    //         });
    // });





    // /****************************************************************************************************************/
    // /**
    // * @purpose : Testing for users APIs
    // * @property {request} request has do request for server
    // * @property {post} post has post the function to the given path
    // * @property {send} send has send the parameter to the mutation
    // * @property {expect} expect has pass the ok means all are fine
    // * @returns {error} error
    // */

    // it('pullGitRepository fetching  (Positive Testing)', done => {
    //     request('http://localhost:4000')
    //         .post('/graphql ')

    //         //write your data for checking by giving mutation
    //         .query({ 'token': git_token })
    //         .send({ query: testJSON().pullGitRepository })
    //         .expect(200)
    //         .end((err, res) => {


    //             //if any error the return error
    //             if (err) {
    //                 return done(err);
    //             }

    //             //otherwise return success 
    //             expect(JSON.parse(res.text).data.pullGitRepository.message).to.deep.equal("git  repository fetch Successfully")
    //             done();

    //         });
    // });





    // /****************************************************************************************************************/
    // /**
    // * @purpose : Testing for users APIs
    // * @property {request} request has do request for server
    // * @property {post} post has post the function to the given path
    // * @property {send} send has send the parameter to the mutation
    // * @property {expect} expect has pass the ok means all are fine
    // * @returns {error} error
    // */

    // it('addWatch In Git Repo APIs  (Positive Testing)', done => {
    //     request('http://localhost:4000')
    //         .post('/graphql ')

    //         //write your data for checking by giving mutation
    //         .query({ 'token': git_token })
    //         .send({ query: testJSON().addWatchInGitRepo })
    //         .expect(200)
    //         .end((err, res) => {


    //             //if any error the return error
    //             if (err) {
    //                 return done(err);
    //             }

    //             //otherwise return success 
    //             expect(JSON.parse(res.text).data.addWatchInGitRepo.message).to.deep.equal("Watch add successfully in Git Repository")
    //             done();

    //         });
    // });





    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('deleteWatch In Git Repo APIs  (Positive Testing)', done => {
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': git_token })
            .send({ query: testJSON().deleteWatchInGitRepo })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.deleteWatchInGitRepo.message).to.deep.equal("Watch is not removed from Github")
                done();

            });
    });





    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('create Git Branch Repository APIs  (Positive Testing)', done => {
        setImmediate(done);
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': git_token })
            .send({ query: testJSON().createGitBranch })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.createGitBranch.message).to.deep.equal("git branch create Successfully")
                done();

            });
    });





    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('Delete Git Branch Repository APIs  (Positive Testing)', done => {
        //setImmediate(done);
        request('http://localhost:4000')
            .post('/graphql ')

            //write your data for checking by giving mutation
            .query({ 'token': git_token })
            .send({ query: testJSON().deleteGitBranch })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.deleteGitBranch.message).to.deep.equal("This branch is not created in Repository")
                done();

            });
    });

});

