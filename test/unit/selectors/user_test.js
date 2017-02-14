import Immutable from 'immutable'
import pad from 'lodash/pad'
import { clearJSON, json, stub, stubUser, stubCategories } from '../../support/stubs'
import * as selector from '../../../src/selectors/user'

describe('user selectors', () => {
  let userSixes
  let userManny
  let state
  beforeEach(() => {
    userSixes = stub('user', {
      id: '666',
      followersCount: 200,
      followingCount: 900,
      username: 'sixes',
      experimentalFeatures: true,
      hasRepostingEnabled: false,
      links: { categories: ['4', '5'] },
      lovesCount: 5000,
      postsCount: 555,
      relationshipPriority: 'friend',
    })
    userManny = stub('user', { id: '100', username: 'manny' })
    stub('user', { id: '4', relationshipPriority: 'self' })
    stubCategories()
    state = { json }
  })

  afterEach(() => {
    userSixes = {}
    userManny = {}
    clearJSON()
  })

  context('#selectPropsUserId', () => {
    it('returns the correct props user id from a postId', () => {
      const props = { userId: '666' }
      expect(selector.selectPropsUserId(state, props)).to.equal('666')
    })

    it('returns the correct props post id from a user', () => {
      const props = { user: userManny }
      expect(selector.selectPropsUserId(state, props)).to.equal('100')
    })
  })

  context('#selectUsers', () => {
    it('returns users model out of json', () => {
      expect(selector.selectUsers(state)).to.deep.equal(state.json.get('users'))
    })
  })

  context('#selectPost', () => {
    it('returns a user from a userId', () => {
      const props = { userId: '666' }
      const user = selector.selectUser(state, props)
      expect(user).to.deep.equal(state.json.get('users').first())
    })

    it('returns an empty Map if userId is not found', () => {
      const props = { userId: '166666' }
      const user = selector.selectUser(state, props)
      expect(user).to.deep.equal(Immutable.Map())
    })

    it('returns a post from a post.postId', () => {
      const props = { user: userSixes }
      const user = selector.selectUser(state, props)
      expect(user).to.deep.equal(state.json.get('users').first())
    })

    it('returns an empty Map if post.postId is not found', () => {
      const props = { user: stubUser({ id: '99999' }, false) }
      const user = selector.selectUser(state, props)
      expect(user).to.deep.equal(Immutable.Map())
    })

    it('returns a user from a username', () => {
      const props = { params: { username: 'manny' } }
      const user = selector.selectUser(state, props)
      expect(user).to.deep.equal(state.json.getIn(['users', '100']))
    })

    it('returns an empty Map if username is not found', () => {
      const props = { params: { username: 'token9999' } }
      const user = selector.selectUser(state, props)
      expect(user).to.deep.equal(Immutable.Map())
    })

    it('returns an empty Map if id and username are not found', () => {
      const props = {}
      const user = selector.selectUser(state, props)
      expect(user).to.deep.equal(Immutable.Map())
    })

    it('returns an empty Map if post is not found', () => {
      const props = {}
      const user = selector.selectUser({ json: Immutable.Map() }, props)
      expect(user).to.deep.equal(Immutable.Map())
    })
  })

  context('#selectUserAvatar', () => {
    it('returns the user.avatar property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserAvatar(state, props)
      expect(result).to.deep.equal(userSixes.get('avatar'))
    })
  })

  context('#selectUserBadForSeo', () => {
    it('returns the user.badForSeo property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserBadForSeo(state, props)
      expect(result).to.equal(false)
    })
  })

  context('#selectUserCoverImage', () => {
    it('returns the user.coverImage', () => {
      const props = { userId: '666' }
      const result = selector.selectUserCoverImage(state, props)
      expect(result).to.deep.equal(userSixes.get('coverImage'))
    })
  })

  context('#selectUserExperimentalFeatures', () => {
    it('returns the user.experimentalFeatures property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserExperimentalFeatures(state, props)
      expect(result).to.equal(true)
    })
  })

  context('#selectUserExternalLinksList', () => {
    it('returns the user.externalLinksList', () => {
      const props = { userId: '666' }
      const result = selector.selectUserExternalLinksList(state, props)
      expect(result).to.deep.equal(userSixes.get('externalLinksList'))
    })
  })

  context('#selectUserFollowersCount', () => {
    it('returns the user.followersCount property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserFollowersCount(state, props)
      expect(result).to.equal(200)
    })
  })

  context('#selectUserFollowingCount', () => {
    it('returns the user.followingCount property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserFollowingCount(state, props)
      expect(result).to.equal(900)
    })
  })

  context('#selectUserFormattedShortBio', () => {
    it('returns the user.formattedShortBio property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserFormattedShortBio(state, props)
      expect(result).to.deep.equal(userSixes.get('formattedShortBio'))
    })
  })

  context('#selectUserHasAutoWatchEnabled', () => {
    it('returns the user.hasAutoWatchEnabled property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserHasAutoWatchEnabled(state, props)
      expect(result).to.equal(true)
    })
  })

  context('#selectUserHasCommentingEnabled', () => {
    it('returns the user.hasCommentingEnabled property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserHasCommentingEnabled(state, props)
      expect(result).to.equal(true)
    })
  })

  context('#selectUserHasLovesEnabled', () => {
    it('returns the user.hasLovesEnabled property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserHasLovesEnabled(state, props)
      expect(result).to.equal(true)
    })
  })

  context('#selectUserHasRepostingEnabled', () => {
    it('returns the user.hasRepostingEnabled property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserHasRepostingEnabled(state, props)
      expect(result).to.equal(false)
    })
  })

  context('#selectUserHasSharingEnabled', () => {
    it('returns the user.hasSharingEnabled property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserHasSharingEnabled(state, props)
      expect(result).to.equal(true)
    })
  })

  context('#selectUserHref', () => {
    it('returns the user.href property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserHref(state, props)
      expect(result).to.equal(userSixes.get('href'))
    })
  })

  context('#selectUserId', () => {
    it('returns the user.id property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserId(state, props)
      expect(result).to.equal('666')
    })
  })

  context('#selectUserIsCollaborateable', () => {
    it('returns the user.isCollaborateable property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserIsCollaborateable(state, props)
      expect(result).to.equal(false)
    })
  })

  context('#selectUserIsHireable', () => {
    it('returns the user.isHireable property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserIsHireable(state, props)
      expect(result).to.equal(true)
    })
  })

  context('#selectUserLocation', () => {
    it('returns the user.location property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserLocation(state, props)
      expect(result).to.equal(userSixes.get('location'))
    })
  })

  context('#selectUserLovesCount', () => {
    it('returns the user.lovesCount property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserLovesCount(state, props)
      expect(result).to.equal(5000)
    })
  })

  context('#selectUserMetaAttributes', () => {
    it('returns the user meta attributes', () => {
      const props = { userId: '666' }
      const attr = Immutable.fromJS({
        description: 'meta user description',
        image: 'meta-user-image.jpg',
        robots: 'index, follow',
        title: 'meta user title',
      })
      const result = selector.selectUserMetaAttributes(state, props)
      expect(result).to.deep.equal(attr)
    })
  })

  context('#selectUserName', () => {
    it('returns the user.name property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserName(state, props)
      expect(result).to.equal(userSixes.get('name'))
    })
  })

  context('#selectUserPostsAdultContent', () => {
    it('returns the user.postsAdultContent property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserPostsAdultContent(state, props)
      expect(result).to.equal(false)
    })
  })

  context('#selectUserPostsCount', () => {
    it('returns the user.postsCount property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserPostsCount(state, props)
      expect(result).to.equal(555)
    })
  })

  context('#selectUserRelationshipPriority', () => {
    it('returns the user.relationshipPriority property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserRelationshipPriority(state, props)
      expect(result).to.equal('friend')
    })
  })

  // TODO: undefined until it's available in the api
  context('#selectUserTotalPostViewsCount', () => {
    it('returns the user.totalPostViewsCount property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserTotalPostViewsCount(state, props)
      expect(result).to.equal(undefined)
    })
  })

  context('#selectUserUsername', () => {
    it('returns the user.username property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserUsername(state, props)
      expect(result).to.equal(userSixes.get('username'))
    })
  })

  context('#selectUserViewsAdultContent', () => {
    it('returns the user.viewsAdultContent property', () => {
      const props = { userId: '666' }
      const result = selector.selectUserViewsAdultContent(state, props)
      expect(result).to.equal(true)
    })
  })

  context('#selectUserMetaDescription', () => {
    it('returns the user meta description', () => {
      const props = { userId: '666' }
      const result = selector.selectUserMetaDescription(state, props)
      expect(result).to.equal('meta user description')
    })
  })

  context('#selectUserMetaImage', () => {
    it('returns the user meta description', () => {
      const props = { userId: '666' }
      const result = selector.selectUserMetaImage(state, props)
      expect(result).to.equal('meta-user-image.jpg')
    })
  })

  context('#selectUserMetaRobots', () => {
    it('returns the user meta robot instructions', () => {
      const props = { userId: '666' }
      const result = selector.selectUserMetaRobots(state, props)
      expect(result).to.deep.equal('index, follow')
    })
  })

  context('#selectUserMetaTitle', () => {
    it('returns the user meta title', () => {
      const props = { userId: '666' }
      const result = selector.selectUserMetaTitle(state, props)
      expect(result).to.equal('meta user title')
    })
  })

  context('#selectUserCategories', () => {
    it('returns the json.categories for the user', () => {
      const props = { userId: '666' }
      const result = selector.selectUserCategories(state, props)
      const first = result.first()
      const second = result.get('1')
      expect(first).to.deep.equal(state.json.getIn(['categories', '4']))
      expect(second).to.deep.equal(state.json.getIn(['categories', '5']))
    })

    it('returns an empty list for a non-featured user', () => {
      const props = { userId: '100' }
      const result = selector.selectUserCategories(state, props)
      expect(result).to.deep.equal(Immutable.List())
    })
  })

  context('#selectUserIsEmpty', () => {
    it('returns whether the user is emtpy (false)', () => {
      const props = { userId: '666' }
      const result = selector.selectUserIsEmpty(state, props)
      expect(result).to.equal(false)
    })

    it('returns whether the user is emtpy (true)', () => {
      const props = { userId: '1000' }
      const result = selector.selectUserIsEmpty(state, props)
      expect(result).to.equal(true)
    })
  })

  context('#selectUserIsFeatured', () => {
    it('returns whether the user.isFeatured (true)', () => {
      const props = { userId: '666' }
      const result = selector.selectUserIsFeatured(state, props)
      expect(result).to.equal(true)
    })

    it('returns whether the user.isFeatured (false)', () => {
      const props = { userId: '100' }
      const result = selector.selectUserIsFeatured(state, props)
      expect(result).to.equal(false)
    })
  })

  context('#selectUserIsSelf', () => {
    it('returns whether the user.isSelf (false)', () => {
      const props = { userId: '666' }
      const result = selector.selectUserIsSelf(state, props)
      expect(result).to.equal(false)
    })

    it('returns whether the user.isSelf (true)', () => {
      const props = { userId: '4' }
      const result = selector.selectUserIsSelf(state, props)
      expect(result).to.equal(true)
    })
  })

  context('#selectUserTruncatedShortBio', () => {
    it('returns a truncated short bio to 160 characters', () => {
      state = {
        json: state.json.setIn(
          ['users', '100', 'formattedShortBio'],
          pad('', 500, '<b>this is some bold text</b>'),
        ),
      }
      const props = { userId: '100' }
      const truncatedShortBio = selector.selectUserTruncatedShortBio(state, props)
      expect(truncatedShortBio.text.length).to.equal(160)
      expect(truncatedShortBio.html).to.contain('<b>')
    })
  })
})

