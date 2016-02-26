import { expect } from '../spec_helper'
import * as api from '../../src/networking/api'

describe('api.js', () => {
  context('assets', () => {
    it('#s3CredentialsPath', () => {
      expect(api.s3CredentialsPath().path).to.match(/\/assets\/credentials$/)
      expect(api.s3CredentialsPath().pagingPath).to.be.undefined
    })
  })

  context('authentication', () => {
    it('#accessTokens', () => {
      expect(api.accessTokens().path).to.match(/\/oauth\/token/)
      expect(api.accessTokens().pagingPath).to.be.undefined
    })

    it('#forgotPassword', () => {
      expect(api.forgotPassword().path).to.match(/\/forgot-password$/)
      expect(api.forgotPassword().pagingPath).to.be.undefined
    })
  })

  context('profile', () => {
    it('#profilePath', () => {
      expect(api.profilePath().path).to.match(/\/profile$/)
      expect(api.profilePath().pagingPath).to.be.undefined
    })
  })

  context('onboarding', () => {
    it('#awesomePeoplePath', () => {
      expect(api.awesomePeoplePath().path).to.match(/\/discover\/users\/onboarding\?/)
      expect(api.awesomePeoplePath().pagingPath).to.be.undefined
    })

    it('#communitiesPath', () => {
      expect(api.communitiesPath().path).to.match(/\/interest_categories\/members\?/)
      expect(api.communitiesPath().pagingPath).to.be.undefined
    })

    it('#relationshipBatchPath', () => {
      expect(api.relationshipBatchPath().path).to.match(/\/relationships\/batches$/)
    })
  })

  context('discover', () => {
    it('#discoverUsers', () => {
      expect(api.discoverUsers('trending').path).to.match(/\/discover\/users\/trending/)
    })
  })

  context('streams', () => {
    it('#friendStream', () => {
      expect(api.friendStream().path).to.match(/\/streams\/friend\?/)
      expect(api.friendStream().pagingPath).to.be.undefined
    })

    it('#noiseStream', () => {
      expect(api.noiseStream().path).to.match(/\/streams\/noise\?/)
      expect(api.noiseStream().pagingPath).to.be.undefined
    })
  })

  context('posts', () => {
    it('#postDetail', () => {
      expect(api.postDetail('~666').path).to.match(/\/posts\/~666\?/)
      expect(api.postDetail('666').pagingPath).to.equal('comments')
    })

    it('#loversForPost', () => {
      expect(api.loversForPost({ id: 'what' }).path).to.match(/\/posts\/what\/loves\?/)
      expect(api.loversForPost({ id: 'what' }).pagingPath).to.be.undefined
    })

    it('#lovePost', () => {
      expect(api.lovePost({ id: '666' }).path).to.match(/\/posts\/666\/loves/)
    })

    it('#unlovePost', () => {
      expect(api.unlovePost({ id: '666' }).path).to.match(/\/posts\/666\/love/)
    })

    it('#deletePost', () => {
      expect(api.deletePost({ id: '666' }).path).to.match(/\/posts\/666$/)
    })

    it('#flagPost', () => {
      expect(api.flagPost({ id: '666' }, 'ants').path).to.match(/\/posts\/666\/flag\/ants$/)
    })

    it('#postReposters', () => {
      expect(api.postReposters({ id: '666' }).path).to.match(/\/posts\/666\/reposters$/)
    })

    it('#postLovers', () => {
      expect(api.postLovers({ id: '666' }).path).to.match(/\/posts\/666\/lovers/)
    })
  })

  context('comments', () => {
    it('#commentsForPost', () => {
      expect(api.commentsForPost({ id: 'what' }).path).to.match(/\/posts\/what\/comments\?/)
      expect(api.commentsForPost({ id: 'what' }).pagingPath).to.be.undefined
    })

    it('#deleteComment', () => {
      expect(api.deleteComment({
        id: '42',
        postId: '666',
      }).path).to.match(/\/posts\/666\/comments\/42$/)
    })

    it('#flagComment', () => {
      expect(api.flagComment({
        id: '42',
        postId: '666',
      }, 'ants').path).to.match(/\/posts\/666\/comments\/42\/flag\/ants$/)
    })
  })

  context('users', () => {
    it('#userDetail', () => {
      expect(api.userDetail('~666').path).to.match(/\/users\/~666\?post_count=false$/)
    })

    it('#userResources', () => {
      expect(api.userResources('~666', 'loves').path).to.match(/\/users\/~666\/loves\?per_page=/)
    })
  })

  context('search', () => {
    it('#searchPosts', () => {
      expect(api.searchPosts({ terms: 'blah' }).path).to.match(/\/posts\?terms=blah/)
      expect(api.searchPosts({ terms: 'blah' }).pagingPath).to.be.undefined
    })

    it('#searchUsers', () => {
      expect(api.searchUsers({ terms: 'blah' }).path).to.match(/\/users\?terms=blah/)
      expect(api.searchUsers({ terms: 'blah' }).pagingPath).to.be.undefined
    })
  })

  context('notifications', () => {
    it('#notifications', () => {
      expect(api.notifications().path).to.match(/\/notifications/)
    })
  })

  context('availability', () => {
    it('#availability', () => {
      expect(api.availability().path).to.match(/\/availability$/)
    })
  })

  context('invitations', () => {
    it('#invite', () => {
      expect(api.invite().path).to.match(/\/invitations/)
    })
  })

  context('relationships', () => {
    it('#relationshipAdd', () => {
      expect(api.relationshipAdd('666', 'buddy').path).to.match(/\/users\/666\/add\/buddy$/)
    })
  })
})

