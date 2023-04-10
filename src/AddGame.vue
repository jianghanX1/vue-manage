<template>
  <div class="add_game">
    <div class="upload_box">
      <el-upload
        class="avatar-uploader"
        action="http://game.afantai.com/pmm/system/upload/image"
        ref="upload"
        :headers="headers"
        :auto-upload="true"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-success="uploadSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="from_box">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="游戏名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入游戏名称"></el-input>
        </el-form-item>
        <el-form-item label="游戏简介" prop="description">
          <el-input v-model="form.description" placeholder="请输入游戏简介"></el-input>
        </el-form-item>
        <el-form-item label="游戏评分" prop="score">
          <el-input v-model="form.score" placeholder="请输入游戏评分"></el-input>
        </el-form-item>
        <el-form-item label="下载数量" prop="downloads">
          <el-input v-model="form.downloads" placeholder="请输入下载数量"></el-input>
        </el-form-item>
        <el-form-item label="在玩人数" prop="players">
          <el-input v-model="form.players" placeholder="请输入在玩人数"></el-input>
        </el-form-item>
        <el-form-item label="游戏排名" prop="ranking">
          <el-input v-model="form.ranking" placeholder="请输入游戏排名"></el-input>
        </el-form-item>
        <el-form-item label="开发商">
          <el-input v-model="form.developer" placeholder="请输入开发商"></el-input>
        </el-form-item>
        <el-form-item label="游戏URL" prop="playUrl">
          <el-input v-model="form.playUrl" placeholder="请输入游戏URL"></el-input>
        </el-form-item>
        <el-form-item label="游戏类别">
          <el-radio v-model="form.type" label="1">角色扮演</el-radio>
          <el-radio v-model="form.type" label="2">休闲益智</el-radio>
          <el-radio v-model="form.type" label="3">经营策略</el-radio>
          <el-radio v-model="form.type" label="4">体育竞速</el-radio>
          <el-radio v-model="form.type" label="5">动作射击</el-radio>
          <el-radio v-model="form.type" label="6">棋牌桌游</el-radio>
        </el-form-item>
        <el-form-item label="屏幕适配">
          <el-radio v-model="form.adaptation" label="vertical">竖屏</el-radio>
          <el-radio v-model="form.adaptation" label="horizontal">横屏</el-radio>
        </el-form-item>
        <el-form-item label="游戏分级">
          <el-radio v-model="form.classify" label="3+">3+</el-radio>
          <el-radio v-model="form.classify" label="4+">4+</el-radio>
          <el-radio v-model="form.classify" label="5+">5+</el-radio>
        </el-form-item>
        <el-form-item label="语言">
          <el-radio v-model="form.language" label="chinese">中文</el-radio>
          <el-radio v-model="form.language" label="english">英文</el-radio>
        </el-form-item>
        <el-form-item>
          <div class="submit_now">
            <div>
              <el-button type="primary" @click="onSubmit('form')">立即添加</el-button>
              <el-button @click="cancel">取消</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request.js'
export default {
  name: "AddGame",
  data() {
    return {
      imageUrl: '',
      headers: {
        'Authorization': '4bb65ab3b16d414fb60dd2afb2beee9d'
      },
      form: {
        name: '',
        description: '', // 简介
        score: '', // 评分
        downloads: '', // 下载数量
        players: '', // 在玩人数
        ranking: '', // 游戏排名
        developer: '', // 开发商
        playUrl: '', // 游戏URL
        type: '1',
        adaptation: 'vertical',
        classify: '3+',
        language: 'chinese',
      },
      rules: {
        name: [
          { required: true, message: '请输入游戏名称' }
        ],
        description: [
          { required: true, message: '请输入游戏简介' },
          { max: 140, message: '长度在140个字符' }
        ],
        score: [
          { required: true, message: '请输入游戏评分' }
        ],
        downloads: [
          { required: true, message: '请输入下载数量' }
        ],
        players: [
          { required: true, message: '请输入在玩人数' }
        ],
        ranking: [
          { required: true, message: '请输入游戏排名' }
        ],
        // developer: [
        //   { required: true, message: '请输入活动名称' }
        // ],
        playUrl: [
          { required: true, message: '请输入游戏URL' }
        ],
      }
    };
  },
  mounted() {
    // this.getGameType()
    const { query } = this.$route || {}
    const { gameId } = query || {}
    if (gameId) {
      this.getGameInfo(gameId)
    }
  },
  methods: {
    // 获取游戏类型
    // getGameType() {
    //   request({
    //     url: '/system/dict',
    //     method: 'get',
    //     params: {
    //       dictTypes: 1
    //     }
    //   }).then((res)=>{
    //
    //   }).catch((err)=>{
    //     console.log(err);
    //   })
    // },

    // 回显
    getGameInfo(gameId) {
      request({
        url: '/api/info',
        method: 'get',
        params: {
          gameId: gameId
        }
      }).then((res)=>{
        const { data } = res || {}
        const { code, data:dataObj } = data || {}
        const { gameName, description, score, downloads, players, ranking, developer, playUrl, gameType, screenAdapter, gameGrade, language, iconUrl } = dataObj || {}
        if (code == 1) {
          this.form = {
            name: gameName,
            description: description, // 简介
            score: score, // 评分
            downloads: downloads, // 下载数量
            players: players, // 在玩人数
            ranking: ranking, // 在玩人数
            developer: developer, // 开发商
            playUrl: playUrl, // 游戏URL
            type: gameType,
            adaptation: screenAdapter,
            classify: gameGrade,
            language: language,
          }
          this.imageUrl = iconUrl
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // handleChange(file) {
    //   console.log(file.raw);
    //   this.imageUrl = URL.createObjectURL(file.raw)
    // },
    uploadSuccess(res) {
      const { data } = res || {}
      this.imageUrl = data
    },
    onSubmit(form) {
      console.log('submit!');
      console.log(this.$refs[form]);
      const { query } = this.$route || {}
      const { gameId } = query || {}
      this.$refs[form].validate((valid) => {
        if (valid) {
          request({
            url: gameId ? "/api/update" : "/api/add",  //接口路径
            method: "post",  //接口方法
            // headers: { 'Content-Type': 'multipart/form-data' }, //给接口添加请求头
            data:{
              siteId: gameId ? null : 'default',
              gameId,
              gameName: this.form.name,
              gameType: this.form.type,
              isAvailable: true,
              description: this.form.description,
              screenAdapter: this.form.adaptation,
              gameGrade: this.form.classify,
              language: this.form.language,
              score: this.form.score,
              ranking: this.form.ranking,
              downloads: this.form.downloads,
              players: this.form.players,
              developer: this.form.developer,
              iconUrl: this.imageUrl,
              playUrl: this.form.playUrl
            }//接口参数
          }).then((res)=>{
            console.log(res);
            this.$router.push({
              path: '/'
            },()=>{})
          }).catch((err)=>{
            console.log(err);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    cancel() {
      this.$router.push({
        path: '/'
      },()=>{})
    }
  }
}
</script>

<style lang="less" scoped>
  .add_game{
    .upload_box{
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      margin-top: 20px;
      /deep/.avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      /deep/.avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
    .from_box{
      .submit_now{
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
