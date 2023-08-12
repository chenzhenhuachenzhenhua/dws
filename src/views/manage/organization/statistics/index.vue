<template>
  <div class="container">
    <div class="content">
      <div :style="{ width: '60%' }" class="content">
        <div class="textBackground">
          <span class="text_title">滨海党委党员队伍基本情况</span>
        </div>
        <div class="content-text">
          <p :style="{ textIndent: '2em' }"
            >滨海党委&nbsp;<span class="spanLine" id="count">202</span
            >&nbsp;名党员； 其中，正式党员&nbsp;<span class="spanLine">101</span
            >&nbsp;名， 预备党员&nbsp;<span class="spanLine">101</span
            >&nbsp;名。 另外，发展对象&nbsp;<span class="spanLine">101</span
            >&nbsp;名， 入党积极分子&nbsp;<span class="spanLine">101</span
            >&nbsp;名， 入党申请人&nbsp;<span class="spanLine">101</span
            >&nbsp;名。
          </p>
          <div>
            <p :style="{ textIndent: '2em' }">
              男性党员&nbsp;<span class="spanLine" id="box">48</span
              >&nbsp;名，占党员总数的&nbsp;<span class="spanLine" id="prebox"
                >23.76</span
              >&nbsp;%； 女性党员&nbsp;<span class="spanLine" id="girl">43</span
              >&nbsp;名，占党员总数的&nbsp;<span class="spanLine" id="pregirl"
                >21.29</span
              >&nbsp;%。
            </p>
            <p :style="{ textIndent: '2em' }">
              少数民族党员&nbsp;<span class="spanLine" id="nation">21</span
              >&nbsp;名，占党员总数的&nbsp;<span class="spanLine" id="preNation"
                >10.40</span
              >&nbsp;%。
            </p>
            <p style="text-indent: 2em">
              硕士研究生及以上学历&nbsp;<span class="spanLine" id="education2"
                >17</span
              >&nbsp;名，占党员总数的&nbsp;<span
                class="spanLine"
                id="preEducation2"
                >8.42</span
              >&nbsp;%； 大学学历党员&nbsp;<span
                class="spanLine"
                id="education3"
                >28</span
              >&nbsp;名，占党员总数的&nbsp;<span
                class="spanLine"
                id="preEducation3"
                >13.86</span
              >&nbsp;%； 大专以下学历学历党员&nbsp;<span
                class="spanLine"
                id="education4"
                >8</span
              >&nbsp;名，占党员总数的&nbsp;<span
                class="spanLine"
                id="preEducation4"
                >3.96</span
              >&nbsp;%。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- background: url('@/assets/images/login-left-bg3.png'); -->
<script lang="ts" setup></script>

<style scoped lang="less">
  .container {
    padding: 20px;
    height: calc(100% - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('@/assets/images/org_manage_bg.png');
    background-size: 100% 100%;
  }
  .content {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .textBackground {
    background-color: rgba(212, 20, 21, 1);
    border-radius: 8px;
    margin: 30px;
  }
  .text_title {
    overflow-wrap: break-word;
    color: rgba(255, 255, 255, 1);
    font-size: 24px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    line-height: 33px;
    margin: 8px 25px 8px 25px;
  }
  .content-text {
    font-size: 22px;
    color: #3d3d3d;
    line-height: 1.6;
  }
  .spanLine {
    border-bottom: 1px solid #cccccc;
    color: #ca0000;
    text-align: center;
  }
</style>
