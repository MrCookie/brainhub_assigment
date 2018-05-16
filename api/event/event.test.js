const expect = require('expect')
const request = require('supertest')
const { ObjectId } = require('mongodb')

const app = require('./../../server')
const Event = require('./event')

describe('POST /api/event', () => {
    it('should create a new event', (done) => {

        const eventSample = {
            "data": {
                'firstName': 'test1',
                'lastName': 'test2',
                'email': 'teest@gmail.pl',
                'date': "2019-04-04"
            }
        }

        request(app)
            .post('/api/event')
            .send(eventSample)
            .expect(200)
            .expect((res) => {
                expect(res.body.status).toBe('success')
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done();
            })
    }).timeout(5000)

    it('should return error with data not wrapped in "data" object', (done) => {

        const eventSample = {
            "body": {
                'firstName': 'test1',
                'lastName': 'test2',
                'email': 'teest@gmail.pl',
                'date': "2019-04-04"
            }
        }

        request(app)
            .post('/api/event')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done();
            })
    })

    it('should return 4 errors with missing inputs', (done) => {

        const eventSample = {
            "data": {}
        }

        request(app)
            .post('/api/event')
            .send(eventSample)
            .expect(200)
            .expect((res) => {
                expect(res.body.errors.firstName).toExist();
                expect(res.body.errors.lastName).toExist();
                expect(res.body.errors.email).toExist();
                expect(res.body.errors.date).toExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done();
            })
    })

    it('should return error with invalid email', (done) => {

        const eventSample = {
            "data": {
                'firstName': 'test1',
                'lastName': 'test2',
                'email': 'teestgmail.pl',
                'date': "2019-04-04"
            }
        }

        request(app)
            .post('/api/event')
            .send(eventSample)
            .expect(200)
            .expect((res) => {
                expect(res.body.errors.email).toExist()
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done();
            })
    })

    it('should return error with date in past', (done) => {

        const eventSample = {
            "data": {
                'firstName': 'test1',
                'lastName': 'test2',
                'email': 'teest@gmail.pl',
                'date': "2016-04-04"
            }
        }

        request(app)
            .post('/api/event')
            .send(eventSample)
            .expect(200)
            .expect((res) => {
                expect(res.body.errors.date).toExist()
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done();
            })
    })

    it('should add event with today\'s date', (done) => {

        const eventSample = {
            "data": {
                'firstName': 'test1',
                'lastName': 'test2',
                'email': 'teest@gmail.pl',
                'date': new Date()
            }
        }

        request(app)
            .post('/api/event')
            .send(eventSample)
            .expect(200)
            .expect((res) => {
                expect(res.body.status).toBe('success')
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done();
            })
    })

})