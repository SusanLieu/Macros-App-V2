<template>
  <b-list-group-item>
    <strong>{{ account.email }}</strong>
    <b-button type="button" class="close" @click="$emit('delete-account', account._id)">&times;</b-button><br>
    {{ account.name }}
  </b-list-group-item>
</template>

<script>

export default {
  name: 'account-item',
  props: ['account']
}
</script>
