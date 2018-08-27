<template>
  <div class="page">
    <div class="body">
      <div class="heading">
        <h2>An error has occurred. Please try again later.</h2>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ErrorPage',
  components: {

  }
}
</script>

<style scoped>
  .page {
    text-align: left;
  }

  .header {
    margin-bottom: 20px;
    border-bottom: 1px solid #444;
  }

  .footer {
    display: none;
  }
  .heading {
    display: flex;
    padding: 0 10px;
    justify-content: flex-start;
  }
  .error-icon {
    width: 60px;
  }
  h2 {
    font-size: 20px;
    color: red;
    font-weight: normal;
    margin: 0;
    padding: 0 0 0 16px;
    text-align: left;
    color: #C90000;
    font-size: 26px;
    line-height: 1;
  }
  @media (min-width: 768px) {
    .header {
      margin-bottom: 40px;
    }

    .body {
      margin: 0 auto;
      max-width: 1000px;
    }

    .footer {
      display: block;
      border-top: 1px solid #999999;
      padding-top: 34px;
      margin-top: 40px;
    }

    h2 {
      font-size: 28px;
      padding: 0 0 0 8px;
    }
  }
</style>
