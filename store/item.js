import axios from 'axios'

export const state = () => ({
  tabs: {
    gender: false,
    category: false,
    keyword: false
  },
  parameter: {
    gender: 'WOMEN',
    category: '',
    brand: '',
    discount_flag: '',
    subCategory: '',
    min_price: 0,
    max_price: 9999999,
    keywords: '',
    order: '',
    offset: 0
  },
  genders: [
    {
      key: 'WOMEN',
      name: 'レディース'
    },
    {
      key: 'MEN',
      name: 'メンズ'
    }
  ],
  appBarHeight: 0,
  total: 0,
  categories: [],
  subCategories: [],
  data: {},
  list: []
})

export const actions = {
  init ({ commit }, payload) {
    commit('SET_TABS', payload)
  },
  async category ({ commit }) {
    const { data } = await axios.get(
      'https://5qh6aaw9u4.execute-api.ap-northeast-1.amazonaws.com/Prod/classification-info',
      {
        params: {
          index: 'categories',
          gender: this.state.item.parameter.gender
        }
      }
    )

    let categories = ['ALL']
    categories = categories.concat(data.hits.map(hit => hit._source.title))
    commit('SET_CATEGORY', categories)
  },
  async subCategory ({ commit }) {
    let categories = []
    if (this.state.item.parameter.category) {
      const { data } = await axios.get(
        'https://5qh6aaw9u4.execute-api.ap-northeast-1.amazonaws.com/Prod/classification-info',
        {
          params: {
            index: 'categories',
            gender: this.state.item.parameter.gender,
            title: this.state.item.parameter.category
          }
        }
      )
      if (data.total > 0) {
        categories = ['ALL']
        categories = categories.concat(
          data.hits[0]._source.sub_categories.map(category => category.title)
        )
      }
    }
    commit('SET_SUBCATEGORY', categories)
  },
  async recommend ({ commit }, payload) {
    const { data } = await axios.get(
      'https://5qh6aaw9u4.execute-api.ap-northeast-1.amazonaws.com/Prod/recommend-items',
      {
        params: {
          item_id: payload.itemId,
          brand: payload.brand,
          offset: payload.offset ? payload.offset : 0,
          limit: 36
        }
      }
    )
    commit('SET_RESULT', data)
  },
  async get ({ commit }, itemId) {
    const { data } = await axios.get('https://5qh6aaw9u4.execute-api.ap-northeast-1.amazonaws.com/Prod/search-items',
      {
        params: {
          item_id: itemId
        }
      }
    )
    commit('SET_DATA', data)
  },
  async search ({ commit }, payload) {
    commit('SET_PARAMETER', payload)
    const { data } = await axios.get(
      'https://5qh6aaw9u4.execute-api.ap-northeast-1.amazonaws.com/Prod/search-items',
      {
        params: {
          ...this.state.item.parameter,
          limit: 36
        }
      }
    )
    commit('SET_RESULT', data)
  }
}

export const mutations = {
  SET_TABS (state, data) {
    state.tabs = {
      gender: false,
      category: false,
      keyword: false
    }
    if (data !== undefined) {
      if (data.gender !== undefined) {
        state.tabs.gender = data.gender
      }
      if (data.category !== undefined) {
        state.tabs.category = data.category
      }
      if (data.keyword !== undefined) {
        state.tabs.keyword = data.keyword
      }
    }
    state.appBarHeight = 0
    if (state.tabs.gender) {
      state.appBarHeight += 48
    }
    if (state.tabs.category) {
      state.appBarHeight += 48
    }
    if (state.tabs.category && state.subCategories.length > 0) {
      state.appBarHeight += 56
    }
    if (state.tabs.keyword) {
      state.appBarHeight += 70
    }
  },
  SET_PARAMETER (state, data) {
    if (data !== undefined) {
      if (data.gender !== undefined) {
        state.parameter.gender = data.gender
      }
      if (data.category !== undefined) {
        state.parameter.category = ''
        if (data.category !== 'ALL') {
          state.parameter.category = data.category
        }
      }
      if (data.subCategory !== undefined) {
        state.parameter.subCategory = ''
        state.parameter.keywords = ''
        if (data.subCategory !== 'ALL') {
          state.parameter.subCategory = data.subCategory
          state.parameter.keywords = data.subCategory
        }
      }
      if (data.brand !== undefined) {
        state.parameter.brand = data.brand
      }
      if (data.discount_flag !== undefined) {
        state.parameter.discount_flag = data.discount_flag
      }
      if (data.min_price !== undefined && data.min_price > 0) {
        state.parameter.min_price = data.min_price
      }
      if (data.max_price !== undefined && data.max_price < 300000 && data.max_price > 0) {
        state.parameter.max_price = data.max_price
      }
      if (data.keyword !== undefined && data.keyword.length > 0) {
        state.parameter.keywords = data.keyword
      }
      if (data.order !== undefined) {
        state.parameter.order = data.order
      }
      if (data.offset !== undefined) {
        state.parameter.offset = data.offset
      }
    }
  },
  SET_DATA (state, data) {
    if (data.total === 0) {
      // throw new Error("todo");
    }
    const shops = []
    let imageUrls = []
    const detailUrls = {}
    const contents = {}
    const lowestPrice = {
      shop: '',
      price: 99999999
    }
    for (const item of data.items) {
      const shop = item._source.shop
      shops.push(shop)
      detailUrls[shop] = item._source.detail_url
      contents[shop] = item._source.description
      if (lowestPrice.price > item._source.lowest_price) {
        lowestPrice.shop = shop
        lowestPrice.price = item._source.lowest_price
      }
      if (item._source.image_urls === undefined) {
        for (let i = 1; i <= item._source.image_num; i++) {
          imageUrls.push(`https://d3sg9dzr200rhf.cloudfront.net/images/${item._source.shop}/${item._source.item_id}/main${i}.jpg`)
        }
      } else {
        imageUrls = item._source.image_urls
      }
    }
    const sizeTable = {
      headers: [],
      items: []
    }
    if (data.items[0]._source.SKUs) {
      sizeTable.headers.push({
        text: 'サイズ',
        sortable: false,
        value: 'size'
      })
      for (let i = 0; i < data.items[0]._source.SKUs.length; i++) {
        const sku = data.items[0]._source.SKUs[i]
        if (sku.parts !== undefined) {
          if (i === 0) {
            for (const part of sku.parts) {
              sizeTable.headers.push({
                text: part.part,
                sortable: false,
                value: part.part
              })
            }
          }
          const sizeInfo = {
            size: sku.size
          }
          for (const part of sku.parts) {
            sizeInfo[part.part] = part.scale
          }
          sizeTable.items.push(sizeInfo)
        }
      }
    }
    state.data = {
      title: data.items[0]._source.title,
      brand: data.items[0]._source.brand,
      category: data.items[0]._source.category,
      shops,
      gender: data.items[0]._source.gender,
      itemId: data.items[0]._source.item_id,
      clientId: 'todo',
      imageUrl: imageUrls[0],
      detailUrls,
      contents,
      lowestPrice,
      isSized: data.items[0]._source.is_sized,
      sizeTable,
      skus: data.items[0]._source.SKUs,
      color: data.items[0]._source.color
    }
  },
  SET_RESULT (state, data) {
    state.total = data.total
    state.list = data.items.map((item) => {
      const lowestPrice = {
        shop: '',
        price: 99999999
      }
      if (lowestPrice.price > item._source.lowest_price) {
        lowestPrice.shop = item._source.shop
        lowestPrice.price = item._source.lowest_price
      }
      let imageUrls = []
      if (item._source.image_urls === undefined) {
        for (let i = 1; i <= item._source.image_num; i++) {
          imageUrls.push(
            `https://d3sg9dzr200rhf.cloudfront.net/images/${item._source.shop}/${item._source.item_id}/main${i}.jpg`
          )
        }
      } else {
        imageUrls = item._source.image_urls
      }
      return {
        clientId: 'todo',
        itemId: item._source.item_id,
        title: item._source.title,
        brand: item._source.brand,
        gender: item._source.gender,
        category: item._source.category,
        imageUrl: {
          retina: `https://d3sg9dzr200rhf.cloudfront.net/images/${item._source.shop}/${item._source.item_id}/retina/thumbnail.jpg`,
          pc: `https://d3sg9dzr200rhf.cloudfront.net/images/${item._source.shop}/${item._source.item_id}/pc/thumbnail.jpg`,
          sp: `https://d3sg9dzr200rhf.cloudfront.net/images/${item._source.shop}/${item._source.item_id}/sp/thumbnail.jpg`
        },
        imageUrls,
        detailUrls: [item._source.detail_url],
        contents: [item._source.description],
        lowestPrice
      }
    })
  },
  SET_CATEGORY (state, data) {
    state.categories = data
  },
  SET_SUBCATEGORY (state, data) {
    state.subCategories = data
    state.appBarHeight = 0
    if (state.tabs.gender) {
      state.appBarHeight += 48
    }
    if (state.tabs.category) {
      state.appBarHeight += 48
    }
    if (state.tabs.category && state.subCategories.length > 0) {
      state.appBarHeight += 56
    }
    if (state.tabs.keyword) {
      state.appBarHeight += 70
    }
  }
}
