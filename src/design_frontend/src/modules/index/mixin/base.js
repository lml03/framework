
import service from '../../../assets/mixin/service'
export default {
    mixins: [service],
    data() {
        return {
            pathLocal:false,
            form: {
                path: "",   
                layout: "",
            },
        }
    },     
    mounted() {
        this.$nextTick(() => {
            this.checkInitPath();

        });

    },
    methods: {
        checkInitPath(){
            if(localStorage.init_path){
                this.pathLocal=true;
                this.form.path=localStorage.init_path;
            }else{
                this.pathLocal=false;
                this.form.path="F:/git/framework/dest/src/modules/index/components/home.vue";
            }
        },
        pathSaveTake(){
            if(this.form.path==""){
                this.$message({
                    message: '路径为空不能保存',
                    duration:500,
                    type: 'warning'
                });    
            }else{
                this.pathLocal=true;
                localStorage.setItem("init_path",this.form.path);
                this.$message({
                    message: '保存路径成功',
                    duration:500,
                    type: 'success'
                });                       
            }
        }
    }
};
