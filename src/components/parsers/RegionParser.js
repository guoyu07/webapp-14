import React from 'react'
import { Link } from 'react-router'
import Avatar from '../assets/Avatar'
import TextRegion from '../posts/regions/TextRegion'
import ImageRegion from '../posts/regions/ImageRegion'

let models = {}

function textRegion(region, key, isGridLayout, postDetailPath) {
  return (
    <TextRegion
      content={ region.data }
      isGridLayout={ isGridLayout }
      key={ key }
      postDetailPath={ postDetailPath }
    />
  )
}

function imageRegion(region, key, isGridLayout, postDetailPath, isNotification, isComment) {
  return (
    <ImageRegion
      assets={ models.assets }
      content={ region.data }
      isComment={ isComment }
      isGridLayout={ isGridLayout }
      isNotification={ isNotification }
      key={ key }
      links={ region.links }
      postDetailPath={ postDetailPath }
    />
  )
}

function embedRegion(region, key) {
  const data = {}
  data[`data-${region.data.service}-id`] = region.data.id
  return (
    <div className="EmbedRegion embetter" { ...data } key={ key }>
      <Link className="EmbedRegionContent" to={ region.data.url }>
        <img src={ region.data.thumbnailLargeUrl } />
      </Link>
    </div>
  )
}

export function regionItemsForNotifications(content, postDetailPath = null) {
  const assets = []
  const texts = []

  content.forEach((region, i) => {
    switch (region.kind) {
      case 'text':
        texts.push(textRegion(region, `TextRegion_${i}`, false, postDetailPath))
        break
      case 'image':
        assets.push(imageRegion(region, `ImageRegion_${i}`, true, postDetailPath, true))
        break
      case 'embed':
        assets.push(embedRegion(region, `EmbedRegion_${i}`))
        break
      default:
        break
    }
  })
  return { assets, texts }
}

// TODO: Wrap all of these function arguments in an object and destructure so order doesn't matter.
/* eslint-disable max-len */
export function regionItems(content, only = null, isGridLayout = true, postDetailPath = null, isNotification = false, isComment = false) {
  return content.map((region, i) => {
    if (!only || only === region.kind) {
      switch (region.kind) {
        case 'text':
          return textRegion(region, `TextRegion_${i}`, isGridLayout, postDetailPath)
        case 'image':
          return imageRegion(region, `ImageRegion_${i}`, isGridLayout, postDetailPath, isNotification, isComment)
        case 'embed':
          return embedRegion(region, `EmbedRegion_${i}`)
        default:
          return null
      }
    }
    return null
  })
}

export function body(content, id, isGridLayout, postDetailPath = null, isComment = false) {
  return (
    <div className="PostBody" key={ `PostBody_${id}` }>
      { regionItems(content, null, isGridLayout, postDetailPath, isComment) }
    </div>
  )
}

export function repostedBody(author, content, id, isGridLayout, postDetailPath = null) {
  return (
    <div className="PostBody RepostedBody" key={ `RepostedBody_${id}` }>
      <Avatar
        priority={ author.relationshipPriority }
        sources={ author.avatar }
        to={ `/${author.username}` }
        userId={ `${author.id}` }
        username={ author.username }
      />
      { regionItems(content, null, isGridLayout, postDetailPath) }
    </div>
  )
}

export function setModels(newModels) {
  models = newModels
}

