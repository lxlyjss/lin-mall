<template>
  <div class="position-detail">
    <div class="position-header">
      <p class="title">
        <span>{{ position.name }}</span>
        <span class="money"
          >{{ position.money_start }}-{{ position.money_end }}K</span
        >
      </p>
      <p class="subtitle">
        {{ position.school_level }}|{{ position.work_time }}|{{
          position.work_nature
        }}
      </p>
      <p class="subtitle">
        <van-icon name="location-o" />{{ position.work_city }}
        {{ position.work_space }}
      </p>
    </div>
    <div class="body">
      <section>
        <p class="title">职位亮点</p>
        <p class="desc" v-html="position.job_light"></p>
      </section>
      <!-- <section v-if="position.tags">
        <p class="title">职位描述</p>
        <p class="desc">{{ position.job_content }}</p> -->
      <!-- <van-tag
          v-for="tag in position.tags.split(',')"
          :key="tag"
          type="default"
          >{{ tag }}</van-tag
        > -->
      <!-- </section> -->
      <section>
        <p class="title">岗位职责</p>
        <p class="desc" v-html="position.job_duty"></p>
      </section>
      <section>
        <p class="title">岗位要求</p>
        <p class="desc" v-html="position.job_requirement"></p>
      </section>
    </div>
    <div class="company-info">
      <p class="line-title">公司信息</p>
      <div class="info-detail" @click="toCompanyDetail">
        <div class="info-left">
          <p class="company-title">{{ company.name }}</p>
          <p class="subtitle">
            {{ company.financing_level }}|{{ company.office_worker_num }}|{{
              company.tags.join("、")
            }}
          </p>
          <!-- <p class="subtitle">已有34条评价</p> -->
        </div>
        <div class="info-right">
          <van-image :src="company.logo" class="company-logo" />
        </div>
      </div>
      <div class="company-address">
        <p>
          <img src="@/assets/common/company-icon.png" /><span>{{
            company.city_name
          }}</span>
        </p>
        <p>{{ company.address }}</p>
      </div>
      <div class="tips-content">
        <p><img src="@/assets/common/notice.png" /><span>提示</span></p>
        <p>
          求职过程中如遇到招聘方有收费，扣押证件的行为，请立即举报。
          岗位要求海外上班，请提高警惕，谨防诈骗。
        </p>
      </div>
    </div>
    <div class="lesson-container">
      <p class="line-title">职场课程</p>
      <div class="lesson-list">
        <lessonItem v-for="item in lessonList" :info="item" :key="item.id" />
      </div>
    </div>
    <div class="bottom-container">
      <van-button plain><a href="tel:010-53387898">立即沟通</a></van-button>
      <van-button type="danger" @click="toMoreLesson">更多优质课程</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, computed } from "vue";
import lessonItem from "@/components/position/lessonItem.vue";
import { getPositionDetail } from "@/api/home/index";
import { useRoute, useRouter } from "vue-router";
import { Toast } from "vant";
import { setTitle } from "@/utils/utils";
import { setWechatShareInfo } from "@/utils/utils";

interface State {
  searchValue: string;
  position: any;
  company: any;
  lessonList: any;
}
export default {
  components: {
    lessonItem,
  },
  setup() {
    const route: any = useRoute();
    const router: any = useRouter();
    const state: State = reactive({
      searchValue: "",
      position: {},
      company: {
        tags: [],
      },
      lessonList: [],
    });
    const getPositionData = async () => {
      const id: number = +route.query.id || 0;
      const {
        data: { data, code },
      } = await getPositionDetail(id);
      if (code !== 200) {
        Toast("获取数据失败！");
        return;
      }
      console.log(data);
      state.position = data;
      state.position.job_duty = state.position.job_duty?.replace(
        /\n/g,
        "<br />"
      );
      state.position.job_requirement = state.position.job_requirement?.replace(
        /\n/g,
        "<br />"
      );
      state.position.job_light = state.position.job_light?.replace(
        /\n/g,
        "<br />"
      );
      state.company = data.company;
      document.title;
      console.log(data.courses);
      if (data.courses.totalCount && data.courses.totalCount !== 0) {
        state.lessonList = data.courses.result.list;
        console.log(state.lessonList);
      }
      setTitle(state.position.name);
      try {
        setWechatShareInfo({
          title: `【人民智慧教育招聘】${state?.company?.name}正在招聘${state?.position?.name}，速来！`,
          desc: `${state?.company?.name}${state?.position?.job_light}`,
          link: location.href,
          imgUrl:
            state.company.logo ||
            "https://asset.txqn.huohua.cn/assets/28f7639f-be0a-423c-8ca8-23e3b352110e.png",
        });
      } catch (err) {
        console.log(err);
      }
    };
    const toCompanyDetail = () => {
      router.push({
        path: "/company",
        query: {
          id: state.company.id,
        },
      });
    };
    const toMoreLesson = () => {
      location.href = `http://www.zhongminzhihui.cn/wap/schoolCourseList?orgId=38879&categoryId=${state.position.course_id}&toCourseList=true`;
    };
    onMounted(() => {
      console.log("dd");
    });
    getPositionData();
    return {
      ...toRefs(state),
      toCompanyDetail,
      toMoreLesson,
    };
  },
};
</script>
<style lang="scss" scoped src="./detail.scss"></style>
