<template>
  <div class="game_list">
    <div class="add_button">
      <div class="search">
        <el-input placeholder="请输入游戏名称/游戏ID" v-model="nameSearch" @keyup.enter.native="onNameSearch">
          <el-button slot="append" icon="el-icon-search" @click="onNameSearch"></el-button>
        </el-input>
      </div>
      <el-button type="primary" @click="addGame">添加游戏</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :row-key="record=>record.id"
      border
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="160"
        fixed
      >
        <template slot-scope="scope">
          <div class="action_button">
            <el-button @click="edit(scope)">编辑</el-button>
            <el-button>启用</el-button>
            <el-button>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="num"
        label="游戏编号"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="游戏名"
      >
      </el-table-column>
      <el-table-column
        prop="type"
        label="游戏类型"
      >
      </el-table-column>
      <el-table-column
        prop="wrapName"
        label="包名"
      >
      </el-table-column>
      <el-table-column
        prop="download"
        label="下载链接"
      >
      </el-table-column>
      <el-table-column
        prop="developers"
        label="开发商"
      >
      </el-table-column>
      <el-table-column
        prop="country"
        label="国家"
      >
      </el-table-column>
      <el-table-column
        prop="language"
        label="语言"
      >
      </el-table-column>
      <el-table-column
        prop="grade"
        label="评分"
      >
      </el-table-column>
      <el-table-column
        prop="currentState"
        label="当前状态"
      >
      </el-table-column>
      <el-table-column
        prop="intermodalStatus"
        label="联运状态"
      >
      </el-table-column>
      <el-table-column
        prop="crawlState"
        label="爬取状态"
      >
      </el-table-column>
      <el-table-column
        prop="appointment"
        label="是否预约"
        >
      </el-table-column>
      <el-table-column
        prop="currentRanking"
        label="当前排名"
        fixed="right"
      >
        <template slot-scope="scope">
          <div class="current_ranking">
            <el-button><i class="el-icon-top" /></el-button>
            <el-button><i class="el-icon-bottom" /></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "GameList",
  data() {
    return {
      nameSearch: '', // 搜索值
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: []
    }
  },
  methods: {
    onNameSearch() {
      console.log(111111);
    },
    addGame() {
      this.$router.push({
        path: '/addGame'
      },()=>{})
    },
    edit(scope) {
      console.log(scope);
      this.$router.push({
        path: '/addGame',
        query: {

        }
      },()=>{})
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style lang="less">
  .el-tooltip__popper{
    max-width: 200px;
  }
</style>
<style lang="less" scoped>
.game_list{
  margin-top: 20px;
  .add_button{
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .search{
      width: 50%;
    }
  }
  .action_button,.current_ranking{
    display: flex;
    .el-button{
      padding: 2px 5px;
    }
  }
}
</style>
