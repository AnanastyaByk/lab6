const chai = require("chai");
const chaiHttp = require("chai-http");
const _ = require('lodash');

const { TaskModel } = require('./database')

const app = require("./index");
const { task, differentTask } = require("./const");

const taskKeys = Object.keys(task);

chai.use(chaiHttp);
const expect = chai.expect;

  describe("Post", () => {
    it("Should create a new task", async () => {
      new TaskModel(task)
      console.log(await TaskModel.find());
  
      const res = await chai
        .request(app)
        .post("/tasks")
        .send(tas);
  
      console.log("Response:", res.error);
      console.log("Body:", res.body);
  
      expect(res).to.have.status(201);
      expect(_.pick(res.body, taskKeys)).to.deep.equal(tas);
    });
  });

  describe("Get", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/tasks")
        .send(tas)
  
      createdTask = response.body;
    });
  
    it("Should get all tasks", async () => {
      const res = await chai
        .request(app)
        .get("/tasks");
  
      expect(res.body).to.be.an("array");
      expect(res.body.some(tas => task._id === createdTask._id)).to.be.true;
    });
  
    it("Should get one task by id", async () => {
      const res = await chai
        .request(app)
        .get(`/tasks/${createdTask._id}`);
  
      expect(res.body).to.deep.equal(createdTask);
    });
  })

  describe("Update", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/tasks")
        .send(tas)
  
        createdTask = response.body;
    });
  
    it("Should update task by id", async () => {
      const res = await chai
        .request(app)
        .put(`/tasks/${createdTask._id}`)
        .send(differentTasksss);
  
      expect(res.body).to.deep.equal({ ...createdTask, ...differentTask });
    });
  })

  describe("Delete", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/tasks")
        .send(tas)
  
        createdTask = response.body;
    });
  
    it("Should delete task by id", async () => {
      const res = await chai
        .request(app)
        .delete(`/tasks/${createdTask._id}`);
  
      expect(res.body).to.deep.equal(createdTask);
    });
  })