<template>
  <div class="blog-container">
    <div class="blog-pages">
      <router-view/>

      <div class="col-md-3 main-col pull-left">
        <div class="panel panel-default corner-radius">
          <div class="panel-body text-center topic-author-box blog-info">
            <div class="image blog-cover">
              <router-link :to="`/${userName}`">
                <img :src="userAvatar" class="avatar-112 avatar img-thumbnail">
              </router-link>
            </div>

            <div class="blog-name">
              <h4>
                <router-link :to="`/${userName}`">
                  <li class="list-group-item"><i class="text-md fa fa-list-ul"></i> 专栏文章({{ articleNum }})</li>
                </router-link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Column',
    data(){
      return {
        userName: '',
        userAvatar: '',
        articles: []
      }
    },
    computed: {
      ...mapState([
        'user'
      ]),
      articleNum() {
        return this.articles ? this.articles.length : 0
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.setDataByParams(to.params)
      })
    },
    watch: {
      '$route'(to) {
        this.setDataByParams(to.params)
      }
    },
    methods: {
      setDataByParams(params) {
        const user = params.user
        const articleId = params.articleId

        const article = this.$store.getters.getArticleById(articleId)

        if(article){
          this.userName = article.uname
          this.userAvatar = article.uavatar
          this.articles = this.$store.getters.getArticlesByUid(null, article.uname)
        }else if(user){
          const articles = this.$store.getters.getArticlesByUid(null, user)

          // 存在至少一篇用户文章时，设置用户数据为第一篇文章的用户信息
          if (articles.length) {
            this.userName = articles[0].uname
            this.userAvatar = articles[0].uavatar
          } else if (this.user) {
            // 不存在用户文章时，设置用户数据为当前用户的用户信息
            this.userName = this.user.name
            this.userAvatar = this.user.avatar
          }

          this.articles = articles
        }
      }
    }
  }
</script>

<style scoped>
  .blog-container { margin-top: 20px;}
</style>
