
<template>
  <div class="hello">
    <Layout>
      <Header>header</Header>
      <Layout>
        <Sider>left sidebar</Sider>
        <Content>main content</Content>
        <Sider>right sidebar</Sider>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  </div>
</template>

<script>

export default {
  name: 'AntLayout'
}
</script>
<style>
.Layout {
  border: 1px solid red;
}
</style>
