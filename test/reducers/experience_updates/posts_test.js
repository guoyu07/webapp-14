import {
  clearJSON,
  expect,
  json,
  stub,
} from '../../spec_helper'
import subject from '../../../src/reducers/experience_updates/posts'
import * as ACTION_TYPES from '../../../src/constants/action_types'

function stubJSONStore() {
  // add some users
  stub('user', { id: '1', username: 'archer' })
  stub('user', { id: '2', username: 'lana', relationshipPriority: 'friend' })
  stub('user', { id: '3', username: 'cyril' })
  stub('user', { id: '4', username: 'pam' })
  // add some posts
  stub('post', { id: '1', token: 'token1', authorId: '1' })
  stub('post', { id: '2', token: 'token2', authorId: '2' })
  stub('post', { id: '3', token: 'token3', authorId: '3' })
  stub('post', { id: '4', token: 'token4', authorId: '4' })
}

describe('posts experience update', () => {
  beforeEach(() => {
    stubJSONStore()
  })

  afterEach(() => {
    clearJSON()
  })

  describe('#updatePostLoves', () => {
    it('returns original state if action is not love request or fail', () => {
      expect(subject.updatePostLoves(
        { state: 'yo' },
        json,
        { payload: {} }
      )).to.deep.equal({ state: 'yo' })
    })

    context('on love request', () => {
      it('handles POST', () => {
        const post = json.posts['1']
        expect(post.lovesCount).to.equal(0)
        expect(post.loved).to.be.false
        const action = { type: ACTION_TYPES.POST.LOVE_REQUEST }
        action.payload = { method: 'POST', model: post }
        subject.updatePostLoves({ state: 'yo' }, json, action)
        const updatedPost = json.posts['1']
        expect(updatedPost.lovesCount).to.equal(1)
        expect(updatedPost.loved).to.be.true
      })

      it('handles DELETE', () => {
        const post = json.posts['1']
        expect(post.lovesCount).to.equal(0)
        expect(post.loved).to.be.false
        const action = { type: ACTION_TYPES.POST.LOVE_REQUEST }
        action.payload = { method: 'DELETE', model: post }
        subject.updatePostLoves({ state: 'yo' }, json, action)
        const updatedPost = json.posts['1']
        expect(updatedPost.lovesCount).to.equal(-1)
        expect(updatedPost.loved).to.be.false
      })
    })

    context('on love failure', () => {
      it('handles POST', () => {
        const post = json.posts['1']
        expect(post.lovesCount).to.equal(0)
        expect(post.loved).to.be.false
        const action = { type: ACTION_TYPES.POST.LOVE_FAILURE }
        action.payload = { method: 'POST', model: post }
        subject.updatePostLoves({ state: 'yo' }, json, action)
        const updatedPost = json.posts['1']
        expect(updatedPost.lovesCount).to.equal(-1)
        expect(updatedPost.loved).to.be.false
      })

      it('handles DELETE', () => {
        const post = json.posts['1']
        expect(post.lovesCount).to.equal(0)
        expect(post.loved).to.be.false
        const action = { type: ACTION_TYPES.POST.LOVE_FAILURE }
        action.payload = { method: 'DELETE', model: post }
        subject.updatePostLoves({ state: 'yo' }, json, action)
        const updatedPost = json.posts['1']
        expect(updatedPost.lovesCount).to.equal(1)
        expect(updatedPost.loved).to.be.true
      })
    })
  })

  describe('#deletePost', () => {
    it('deletes the post on request', () => {
      const post = json.posts['1']
      expect(post).not.to.be.undefined
      const action = { type: ACTION_TYPES.POST.DELETE_REQUEST }
      action.payload = { model: post }
      subject.deletePost({ state: 'yo' }, json, action)
      expect(json.posts['1']).to.be.undefined
    })

    it('deletes the post on success', () => {
      const post = json.posts['1']
      expect(post).not.to.be.undefined
      const action = { type: ACTION_TYPES.POST.DELETE_SUCCESS }
      action.payload = { model: post }
      subject.deletePost({ state: 'yo' }, json, action)
      expect(json.posts['1']).to.be.undefined
    })

    it('restores the post on failure', () => {
      const post = json.posts['1']
      expect(post).not.to.be.undefined
      const action = { type: ACTION_TYPES.POST.DELETE_FAILURE }
      action.payload = { model: post }
      subject.deletePost({ state: 'yo' }, json, action)
      expect(json.posts['1']).not.to.be.undefined
    })

    it('returns the passed in state if type is not supported', () => {
      const post = json.posts['1']
      expect(post).not.to.be.undefined
      const action = { type: 'blah' }
      action.payload = { model: post }
      expect(subject.deletePost({ state: 'yo' }, json, action)).to.deep.equal({ state: 'yo' })
    })
  })
})
