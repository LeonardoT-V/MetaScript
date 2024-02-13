import * as htmlparser2 from 'htmlparser2'

const excludeTypeHead = ['script', 'style']

export const getInfoPages = async (url: string) => {
  try {
    const resFetch = await fetch(url)
    const rawHtml = await resFetch.text()
    const headHtml = extractHead(rawHtml)
    // @ts-expect-error
    const metaData = headHtml.children.map((child) => {
      if (!excludeTypeHead.includes(child.type)) {
        if (child.name === 'link' && child?.attribs?.rel?.includes('icon')) {
          return child
        }
        if (child.name !== 'link' || child.name !== 'noscript') {
          return child
        }
      }
    }).filter((child) => child?.type !== undefined)

    const metaJson = formatToJson(metaData, { url })
    return metaJson
  } catch (error) {
    console.log(error);
    return
  }

}

export const extractHead = (html: string) => {
  const HEAD_TAG = {
    open: '<head>',
    close: '</head>'
  }
  const initHead = html.indexOf(HEAD_TAG.open)
  const latHead = html.indexOf(HEAD_TAG.close)
  const rawHead = html.slice(initHead, latHead + HEAD_TAG.close.length)
  const parsed = htmlparser2.parseDocument(rawHead)
  const head = parsed.firstChild
  return head
}

export const formatToJson = (childrens: any[], { url = '' }) => {
  const baseURL = new URL(url).origin.toString()
  let json = {}

  childrens.forEach(i => {
    if (i?.name === 'title') {
      const objValues = {
        type: i.type,
        tag: i.name,
        content: i.children[0].data
      }
      json['title'] = objValues
      return
    }
    if (i?.attribs?.property?.includes(':')) {
      const keyObject = i?.attribs?.property?.split(':')[0]
      const objValues = {
        type: i.type,
        tag: i.name,
        ...i.attribs
      }
      !json[keyObject] ? json[keyObject] = [objValues] : json[keyObject] = [objValues, ...json[keyObject]]
      return
    }
    if (i?.attribs?.name?.includes(':')) {
      const keyObject = i?.attribs?.name?.split(':')[0]
      const objValues = {
        type: i.type,
        tag: i.name,
        ...i.attribs
      }
      !json[keyObject] ? json[keyObject] = [objValues] : json[keyObject] = [objValues, ...json[keyObject]]
      return
    }
    if (i?.attribs?.rel?.includes('icon')) {
      const objValues = {
        type: i.type,
        tag: i.name,
        ...i.attribs,
        url: i?.attribs?.href?.includes('//') ? i?.attribs?.href : `${baseURL}${i?.attribs?.href}`
      }
      !json['icons'] ? json['icons'] = [objValues] : json['icons'] = [objValues, ...json['icons']]
      return
    }

    if (i?.attribs?.name) {
      json = {
        ...json, [i?.attribs?.name]: {
          type: i.type,
          tag: i.name,
          ...i.attribs
        }
      }
      return
    }

  })

  const jsonSend = Object.keys(json).
    filter((key) => key !== 'undefined' || typeof key !== undefined || json[key].name !== undefined).
    reduce((cur, key) => { return Object.assign(cur, { [key.toLowerCase()]: json[key] }) }, {});
  return jsonSend
}