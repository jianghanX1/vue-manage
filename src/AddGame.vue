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
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="游戏名称">
          <el-input v-model="form.name" placeholder="请输入游戏名称"></el-input>
        </el-form-item>
        <el-form-item label="游戏简介">
          <el-input v-model="form.description" placeholder="请输入游戏简介"></el-input>
        </el-form-item>
        <el-form-item label="游戏评分">
          <el-input v-model="form.score" placeholder="请输入游戏评分"></el-input>
        </el-form-item>
        <el-form-item label="下载数量">
          <el-input v-model="form.downloads" placeholder="请输入下载数量"></el-input>
        </el-form-item>
        <el-form-item label="在玩人数">
          <el-input v-model="form.players" placeholder="请输入在玩人数"></el-input>
        </el-form-item>
        <el-form-item label="开发商">
          <el-input v-model="form.developer" placeholder="请输入开发商"></el-input>
        </el-form-item>
        <el-form-item label="游戏URL">
          <el-input v-model="form.playUrl" placeholder="请输入游戏URL"></el-input>
        </el-form-item>
        <el-form-item label="游戏类别">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="射击" name="type"></el-checkbox>
            <el-checkbox label="竞技" name="type"></el-checkbox>
            <el-checkbox label="棋牌" name="type"></el-checkbox>
            <el-checkbox label="休闲" name="type"></el-checkbox>
            <el-checkbox label="消除" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="屏幕适配">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="竖屏" name="type"></el-checkbox>
            <el-checkbox label="横屏" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="游戏分级">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="3+" name="type"></el-checkbox>
            <el-checkbox label="4+" name="type"></el-checkbox>
            <el-checkbox label="5" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="语言">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="中文" name="type"></el-checkbox>
            <el-checkbox label="英文" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <div class="submit_now">
            <div>
              <el-button type="primary" @click="onSubmit">立即添加</el-button>
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
        type: [],
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
    onSubmit() {
      this.$refs.upload.submit()
      console.log('submit!');
      request({
        url: "/api/todos/1",  //接口路径
        method: "get",  //接口方法
        headers: { 'Content-Type': 'multipart/form-data' }, //给接口添加请求头
        params:{
          gameId: 1
        }//接口参数
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
