<template>
  <div class="add_game">
    <div class="upload_box">
      <el-upload
        class="avatar-uploader"
        action="#"
        ref="upload"
        :http-request="httpRequest"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleChange"
        :before-upload="beforeAvatarUpload">
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
        <el-form-item label="开发商">
          <el-input v-model="form.developer" placeholder="请输入开发商"></el-input>
        </el-form-item>
        <el-form-item label="游戏URL" prop="playUrl">
          <el-input v-model="form.playUrl" placeholder="请输入游戏URL"></el-input>
        </el-form-item>
        <el-form-item label="游戏类别">
          <el-radio v-model="form.type" label="1">射击</el-radio>
          <el-radio v-model="form.type" label="2">竞技</el-radio>
          <el-radio v-model="form.type" label="3">棋牌</el-radio>
          <el-radio v-model="form.type" label="4">休闲</el-radio>
          <el-radio v-model="form.type" label="5">消除</el-radio>
        </el-form-item>
        <el-form-item label="屏幕适配">
          <el-radio v-model="form.adaptation" label="1">竖屏</el-radio>
          <el-radio v-model="form.adaptation" label="2">横屏</el-radio>
        </el-form-item>
        <el-form-item label="游戏分级">
          <el-radio v-model="form.classify" label="1">3+</el-radio>
          <el-radio v-model="form.classify" label="2">4+</el-radio>
          <el-radio v-model="form.classify" label="3">5</el-radio>
        </el-form-item>
        <el-form-item label="语言">
          <el-radio v-model="form.language" label="1">中文</el-radio>
          <el-radio v-model="form.language" label="2">英文</el-radio>
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
      form: {
        name: '',
        description: '', // 简介
        score: '', // 评分
        downloads: '', // 下载数量
        players: '', // 在玩人数
        developer: '', // 开发商
        playUrl: '', // 游戏URL
        type: '1',
        adaptation: '1',
        classify: '1',
        language: '1',
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
        // developer: [
        //   { required: true, message: '请输入活动名称' }
        // ],
        playUrl: [
          { required: true, message: '请输入游戏URL' }
        ],
      }
    };
  },
  methods: {
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
    handleChange(file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    httpRequest(param) {
      console.log(param);
    },
    onSubmit(form) {
      this.$refs.upload.submit()
      console.log('submit!');
      console.log(this.$refs[form]);
      this.$refs[form].validate((valid) => {
        if (valid) {
          request({
            url: "/api/todos/1",  //接口路径
            method: "get",  //接口方法
            headers: { 'Content-Type': 'multipart/form-data' }, //给接口添加请求头
            params:{
              gameId: 1
            }//接口参数
          });
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
