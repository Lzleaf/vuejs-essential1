import Mock from 'mockjs'
import store from '../store'

Mock.mock('/users/active', 'get', () => {
  let articles = store.getters.computedArticles
  let comments = []
  let usersObj = {}

  let activeUsers = []

  articles.map((article) => {
    const articleComments = Array.isArray(article.comments) ? article.comments : []
    comments = [...comments, ...articleComments]
  })

  usersObj = comments.reduce((accumulator, currentValue) => {
    accumulator[currentValue.uname] = accumulator[currentValue.uname] || {}
    accumulator[currentValue.uname].avatar = currentValue.uavatar
    accumulator[currentValue.uname].num = ++accumulator[currentValue.uname].num || 1
    return accumulator
  }, {})

  for (const [key, value] of Object.entries(usersObj)){
    activeUsers.push({
      name: key,
      avatar: value.avatar,
      num: value.num
    })
  }

  activeUsers.sort((a, b) => b.num - a.num)
  activeUsers = activeUsers.slice(0,8)
  return activeUsers
})

Mock.mock('/articles/hot', 'post', (options) => {
  let filteredArticles = store.getters.getArticlesByFilter('noreply')

  let articles = filteredArticles.reverse()

  let hotArticles = articles.filter((article) => (new Date() - new Date(article.date) < 604800000))

  let num

  if(options.body){
    try {
      num = JSON.parse(options.body).num
    }catch (e) {

    }
  }

  hotArticles = hotArticles.slice(0, num || 10)

  return hotArticles
})
