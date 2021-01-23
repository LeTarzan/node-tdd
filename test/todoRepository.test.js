const {describe, it, before, afterEach} = require('mocha')
const { expect } = require('chai')
const { createSandbox } = require('sinon')

const TodoRepository = require('../src/todoRepository')

describe('todoRepository', () => {
  let todoRepository
  let sandbox
  
  before(() => {
    todoRepository = new TodoRepository()
    sandbox = createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('methods signature', () => {
    it('Should call insertOne from lokijs', () => {
      const fnName = 'insertOne'
      const data = { name: 'Leandroo'} 

      sandbox.stub(
        todoRepository.schedule,
        fnName
      ).returns(true)

      const result = todoRepository.create(data)
      expect(result).to.be.ok
      expect(todoRepository.schedule[fnName].calledOnceWithExactly(data)).to.be.ok
    })
    it('Should call find from lokijs', () => {
      const mockDatabase = [
        {
          name: 'Leandro',
          age: 10,
          meta: { revision: 0, created: 1611278271096, version: 0 },
          '$loki': 1
        }
      ]

      const fnName = 'find'
      sandbox.stub(
        todoRepository.schedule,
        fnName
      ).returns(mockDatabase)

      const result = todoRepository.list()
      expect(result).to.be.deep.equal(mockDatabase)
      expect(todoRepository.schedule[fnName].calledOnce).to.be.ok
    })
  })
})

