<template>
  <Card style="overflow: visible;">
    <template #content>
      <Card class="v-sheet--offset mx-auto"
        style="background-color: var(--p-primary-500)"
        elevation="4"
        rounded>
        <template #content >
          <Menu :model="localTopDifference.slice(0, 4)"
            style="background-color: var(--p-primary-500);color: var(--p-text-color);"
            class="border-0 gap-2">
            <template #item="{ item }">
              <div class="py-2">
                <a v-ripple class="flex items-center">
                  <!-- <span :class="item.icon" /> -->
                  <Image style="margin-right: 1em;" :src="constants.ADDRESS + item.avatar"
                  :error="item.avatar = constants.DEFAULT_TEAM_URL" width="30"/>
                  <span>{{ item.name }}</span>
                  <div style="margin-left: auto;" class="grid grid-cols-2 gap-2 text-center">
                    <span>{{ item.stats.goalDif }}</span><i class="material-icons center-h">sports_soccer</i>
                  </div>
                </a>
              </div>
            </template>
          </Menu>
        </template>
      </Card>
      <div class="text-center mt-[-1em] text-xl">
        <p>Mayor diferencia de goles</p>
      </div>
    </template>
  </Card>
</template>

<script>
import constants from '@/assets/constants/constants'
export default {
  props: {
    topDifference: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      localTopDifference: JSON.parse(JSON.stringify(this.topDifference)),
      constants: constants
    }
  }
}
</script>

<style>
.v-sheet--offset {
  top: -3em;
  position: relative;
  z-index: 1;
  min-height: calc(100% - 32px);
}
</style>
