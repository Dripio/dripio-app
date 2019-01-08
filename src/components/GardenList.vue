export default {
  data: () => ({ gardens: [] }),
  created() {
    this.$bind('gardens', db.collection('gardens'))
  }
}
