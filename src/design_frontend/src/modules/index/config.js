var elementHtmlMap = {
    input:`<el-input v-model="input" style="width:200px;" placeholder="请输入内容"></el-input>`,
    button:`<el-button type="primary" icon="search">搜索</el-button>`,
    'nav-menu':`<el-menu theme="dark" class="el-nav-menu" mode="horizontal">
        <el-menu-item index="1">材料管理</el-menu-item>
        <el-menu-item index="2">财务管理</el-menu-item>
    </el-menu>`,
    'tree-menu':`<el-menu default-active="1" class="el-tree-menu">
        <el-menu-item index="1"><i class="el-icon-menu"></i>导航一</el-menu-item>
        <el-menu-item index="2"><i class="el-icon-setting"></i>导航二</el-menu-item>
    </el-menu>`,
    breadcrumb:`<el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>`,
    table: `<el-table 
    :data="tableData"
    style="width: 100%">
    <el-table-column
        prop="date"
        label="日期"
        width="180">
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名">
    </el-table-column>
    </el-table>`,
    pagination:`<el-pagination
        layout="prev, pager, next"
        :total="50">
    </el-pagination>`
}

export default {
    elementHtmlMap
}